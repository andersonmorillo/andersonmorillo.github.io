from PIL import Image, ImageDraw, ImageFont
import os

out_dir = r"assets/images"
os.makedirs(out_dir, exist_ok=True)

CREAM = (247, 240, 228, 255)
GOLD = (201, 162, 39, 255)
TRANSPARENT = (0, 0, 0, 0)


def get_font(size):
    for path in [
        r"C:\Windows\Fonts\arialbd.ttf",
        r"C:\Windows\Fonts\segoeuib.ttf",
        r"C:\Windows\Fonts\arial.ttf",
    ]:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def get_mark_font(size):
    for path in [
        r"C:\Windows\Fonts\ariblk.ttf",
        r"C:\Windows\Fonts\arialbd.ttf",
        r"C:\Windows\Fonts\seguisb.ttf",
        r"C:\Windows\Fonts\segoeuib.ttf",
    ]:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return get_font(size)


def draw_mark(size, bg, gold, pad_ratio=0.12):
    img = Image.new("RGBA", (size, size), bg)
    d = ImageDraw.Draw(img)
    pad = int(size * pad_ratio)
    stroke = max(5, size // 14)
    x0, y0, x1, y1 = pad, pad, size - pad, size - pad
    bracket_w = int(size * 0.16)
    # left [
    d.rectangle([x0, y0, x0 + stroke, y1], fill=gold)
    d.rectangle([x0, y0, x0 + bracket_w, y0 + stroke], fill=gold)
    d.rectangle([x0, y1 - stroke, x0 + bracket_w, y1], fill=gold)
    # right ]
    d.rectangle([x1 - stroke, y0, x1, y1], fill=gold)
    d.rectangle([x1 - bracket_w, y0, x1, y0 + stroke], fill=gold)
    d.rectangle([x1 - bracket_w, y1 - stroke, x1, y1], fill=gold)
    # AL letters
    font = get_mark_font(int(size * 0.38))
    text = "AL"
    bbox = d.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (size - tw) // 2 - bbox[0]
    ty = (size - th) // 2 - bbox[1]
    d.text((tx, ty), text, font=font, fill=gold)
    return img


def draw_mark_outline(size, gold):
    return draw_mark(size, TRANSPARENT, gold)


def wordmark(height=64, dark=False):
    mark_size = height
    if dark:
        mark = draw_mark_outline(mark_size * 2, GOLD).resize(
            (mark_size, mark_size), Image.Resampling.LANCZOS
        )
        text_color = (255, 247, 251, 255)
    else:
        mark = draw_mark(mark_size * 2, CREAM, GOLD).resize(
            (mark_size, mark_size), Image.Resampling.LANCZOS
        )
        text_color = (26, 11, 22, 255)
    font = get_font(int(height * 0.42))
    text = "Anderson Labs"
    tmp = Image.new("RGBA", (10, 10), TRANSPARENT)
    td = ImageDraw.Draw(tmp)
    bbox = td.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    gap = int(height * 0.2)
    width = mark_size + gap + tw + int(height * 0.15)
    canvas = Image.new("RGBA", (width, height), TRANSPARENT)
    canvas.paste(mark, (0, 0), mark)
    d = ImageDraw.Draw(canvas)
    ty = (height - (bbox[3] - bbox[1])) // 2 - bbox[1]
    d.text((mark_size + gap, ty), text, font=font, fill=text_color)
    return canvas


draw_mark(64, CREAM, GOLD).save(os.path.join(out_dir, "favicon.png"))
draw_mark(512, CREAM, GOLD).save(os.path.join(out_dir, "logo-mark.png"))
wordmark(64, dark=False).save(os.path.join(out_dir, "logo.png"))
wordmark(64, dark=True).save(os.path.join(out_dir, "logo-darkmode.png"))

og = Image.new("RGB", (1200, 630), (26, 11, 22))
d = ImageDraw.Draw(og)
d.ellipse([-500, -500, 500, 500], fill=(90, 24, 72))
d.ellipse([780, -420, 1620, 420], fill=(59, 23, 104))
mark = draw_mark(180, CREAM, GOLD)
og.paste(mark, (80, 225), mark)
f_title = get_font(72)
f_sub = get_font(32)
d.text((300, 250), "Anderson Labs", font=f_title, fill=(255, 247, 251))
d.text((300, 340), "Build · Teach · Research", font=f_sub, fill=(251, 191, 36))
og.save(os.path.join(out_dir, "og-image.png"))

for name in ["logo.png", "logo-darkmode.png", "favicon.png", "logo-mark.png", "og-image.png"]:
    p = os.path.join(out_dir, name)
    im = Image.open(p)
    print(name, im.size, im.mode)
print("done")
