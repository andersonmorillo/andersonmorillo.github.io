"""Remove white backgrounds from homepage PNGs with clean edges (no white fringe)."""

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "assets" / "images"
FILES = [
    "home-banner.png",
    "home-research.png",
    "home-blog.png",
    "home-collaborate.png",
]

# Near-white tolerance for connected background flood-fill.
BG_TOL = 18
# Soft edge band: pixels this close to white get unmatted when next to background.
EDGE_WHITE = 240


def flatten_on_white(img: Image.Image) -> Image.Image:
    """Restore an opaque RGB image (transparent areas were white)."""
    rgba = img.convert("RGBA")
    bg = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    return Image.alpha_composite(bg, rgba).convert("RGB")


def is_near_white(r: int, g: int, b: int, tol: int = BG_TOL) -> bool:
    return r >= 255 - tol and g >= 255 - tol and b >= 255 - tol


def background_mask(rgb: Image.Image) -> list[list[bool]]:
    """Flood-fill near-white from the borders so enclosed gray fills stay solid."""
    w, h = rgb.size
    px = rgb.load()
    mask = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    seeds: list[tuple[int, int]] = []
    for x in range(w):
        seeds.append((x, 0))
        seeds.append((x, h - 1))
    for y in range(h):
        seeds.append((0, y))
        seeds.append((w - 1, y))

    for x, y in seeds:
        if not mask[y][x] and is_near_white(*px[x, y]):
            mask[y][x] = True
            q.append((x, y))

    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not mask[ny][nx]:
                if is_near_white(*px[nx, ny]):
                    mask[ny][nx] = True
                    q.append((nx, ny))
    return mask


def dilate_mask(mask: list[list[bool]], w: int, h: int, radius: int = 3) -> list[list[bool]]:
    """Expand background so light anti-alias rings around the silhouette are included."""
    out = [row[:] for row in mask]
    for y in range(h):
        for x in range(w):
            if mask[y][x]:
                continue
            for dy in range(-radius, radius + 1):
                hit = False
                for dx in range(-radius, radius + 1):
                    if dx * dx + dy * dy > radius * radius:
                        continue
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h and mask[ny][nx]:
                        out[y][x] = True
                        hit = True
                        break
                if hit:
                    break
    return out


def unmatte_white(r: int, g: int, b: int) -> tuple[int, int, int, int]:
    """Remove white matte contribution so anti-aliased edges don't fringe on dark UI."""
    a = 1.0 - (min(r, g, b) / 255.0)
    if a < 0.04:
        return (0, 0, 0, 0)
    inv = 1.0 - a

    def ch(c: int) -> int:
        v = (c - 255 * inv) / a
        return max(0, min(255, int(round(v))))

    # Bias edge RGB toward ink so residual fringe stays dark on dark mode.
    rr, gg, bb = ch(r), ch(g), ch(b)
    alpha = max(1, min(255, int(round(a * 255))))
    return (rr, gg, bb, alpha)


def remove_white_bg(img: Image.Image) -> Image.Image:
    rgb = flatten_on_white(img)
    bg = background_mask(rgb)
    edge = dilate_mask(bg, *rgb.size, radius=3)
    w, h = rgb.size
    src = rgb.load()
    out = Image.new("RGBA", (w, h))
    dst = out.load()

    for y in range(h):
        for x in range(w):
            r, g, b = src[x, y]
            if bg[y][x]:
                dst[x, y] = (0, 0, 0, 0)
            elif edge[y][x]:
                # Outer anti-alias ring: unmatte from white (kills halo on dark UI).
                dst[x, y] = unmatte_white(r, g, b)
            elif is_near_white(r, g, b, tol=8):
                dst[x, y] = (0, 0, 0, 0)
            else:
                dst[x, y] = (r, g, b, 255)
    return out

def main() -> None:
    for name in FILES:
        path = IMAGES / name
        out = remove_white_bg(Image.open(path))
        out.save(path, format="PNG", optimize=True)
        print(f"{name}: mode={out.mode} corner={out.getpixel((10, 10))}")


if __name__ == "__main__":
    main()
