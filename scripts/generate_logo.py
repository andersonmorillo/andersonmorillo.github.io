from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

out_dir = Path(
    r"C:\Users\nosre\DESARROLLO\hugoplate-main\hugoplate-main\andersonmorillo.github.io\assets\images"
)

W, H = 640, 128
pad = 8

font_candidates = [
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\calibrib.ttf",
]
font_path = next((p for p in font_candidates if Path(p).exists()), None)
if not font_path:
    raise SystemExit("No suitable font found")

mark_font = ImageFont.truetype(font_path, 72)
text_font = ImageFont.truetype(font_path, 54)
brand = "Anderson's code"


def make_logo(fg, filename):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    r = 46
    cx, cy = pad + r, H // 2
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=fg, width=5)

    a = "A"
    ab = draw.textbbox((0, 0), a, font=mark_font)
    aw, ah = ab[2] - ab[0], ab[3] - ab[1]
    draw.text((cx - aw / 2 - ab[0], cy - ah / 2 - ab[1] - 2), a, font=mark_font, fill=fg)

    tb = draw.textbbox((0, 0), brand, font=text_font)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    tx = cx + r + 18
    ty = (H - th) / 2 - tb[1]
    draw.text((tx, ty), brand, font=text_font, fill=fg)

    bbox = img.getbbox()
    if bbox:
        left, top, right, bottom = bbox
        left = max(0, left - 8)
        top = max(0, top - 8)
        right = min(W, right + 8)
        bottom = min(H, bottom + 8)
        img = img.crop((left, top, right, bottom))

    target_h = 64
    scale = target_h / img.height
    target_w = max(1, int(img.width * scale))
    img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)

    path = out_dir / filename
    img.save(path, "PNG")
    print(f"Wrote {path} ({img.size[0]}x{img.size[1]})")


make_logo((18, 18, 18, 255), "logo.png")
make_logo((255, 255, 255, 255), "logo-darkmode.png")
