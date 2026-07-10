from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

out = Path(
    r"C:\Users\nosre\DESARROLLO\hugoplate-main\hugoplate-main\andersonmorillo.github.io\assets\images\favicon.png"
)

size = 512
img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Rounded square background (light, works on light and dark tabs)
radius = 96
bg = (246, 246, 246, 255)
fg = (18, 18, 18, 255)
draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=bg)

# Circle + A monogram (matches navbar logo)
cx = cy = size // 2
r = 170
draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=fg, width=28)

font_candidates = [
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\calibrib.ttf",
]
font_path = next(p for p in font_candidates if Path(p).exists())
font = ImageFont.truetype(font_path, 260)

letter = "A"
bbox = draw.textbbox((0, 0), letter, font=font)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
draw.text((cx - tw / 2 - bbox[0], cy - th / 2 - bbox[1] - 8), letter, font=font, fill=fg)

img.save(out, "PNG")
print(f"Wrote {out} ({size}x{size})")
