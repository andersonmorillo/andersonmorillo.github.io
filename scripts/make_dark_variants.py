"""Create dark-mode variants of homepage illustrations (invert ink, keep alpha)."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "assets" / "images"
SOURCES = [
    "home-banner.png",
    "home-research.png",
    "home-blog.png",
    "home-collaborate.png",
]


def invert_ink(img: Image.Image) -> Image.Image:
    """Light-mode dark ink → dark-mode light ink; transparency unchanged."""
    rgba = img.convert("RGBA")
    r, g, b, a = rgba.split()
    inv = Image.merge("RGB", (r, g, b)).point(lambda c: 255 - c)
    out = inv.convert("RGBA")
    out.putalpha(a)
    return out


def main() -> None:
    for name in SOURCES:
        src = IMAGES / name
        dst = IMAGES / name.replace(".png", "-dark.png")
        out = invert_ink(Image.open(src))
        out.save(dst, format="PNG", optimize=True)
        print(f"{src.name} -> {dst.name} mode={out.mode}")


if __name__ == "__main__":
    main()
