"""
Genera tutti gli asset SEO (favicon, icone PWA, OG image) partendo dal logo Valorox.

Le icone hanno SFONDO TRASPARENTE con un cerchio dorato pieno scuro al centro —
così su qualunque sfondo (tab browser chiari, dock OS) restano tonde, niente bordi quadrati neri.

Uso: python scripts/generate_seo_assets.py
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC_LOGO = ROOT / "public" / "eldorado.png"
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"

BG_TRANSPARENT = (0, 0, 0, 0)
GOLD = (240, 180, 41, 255)
DARK_INNER = (12, 12, 16, 255)  # #0C0C10 — leggermente più caldo del nero puro

def composite_circle(logo_path: Path, size: int, padding_ratio: float = 0.10) -> Image.Image:
    """Logo centrato dentro un cerchio dorato pieno, su sfondo trasparente."""
    canvas = Image.new("RGBA", (size, size), BG_TRANSPARENT)
    draw = ImageDraw.Draw(canvas)

    pad = max(1, int(size * 0.04))
    # Cerchio interno scuro
    draw.ellipse([pad, pad, size - pad, size - pad], fill=DARK_INNER)
    # Bordo dorato sottile
    border_w = max(2, size // 64)
    draw.ellipse([pad, pad, size - pad, size - pad], outline=GOLD, width=border_w)

    # Logo sopra
    logo = Image.open(logo_path).convert("RGBA")
    inner = int(size * (1 - padding_ratio * 2))
    logo.thumbnail((inner, inner), Image.LANCZOS)
    x = (size - logo.width) // 2
    y = (size - logo.height) // 2
    canvas.alpha_composite(logo, (x, y))
    return canvas


def main():
    assert SRC_LOGO.exists(), f"Logo non trovato: {SRC_LOGO}"

    # favicon.ico multi-size — il formato ICO supporta canale alpha
    sizes = [(16, 16), (32, 32), (48, 48)]
    base = composite_circle(SRC_LOGO, 48)
    base.save(APP / "favicon.ico", format="ICO", sizes=sizes)
    print(f"Creato {APP / 'favicon.ico'}")

    # PNG icons PWA in public/
    for s in [192, 512]:
        img = composite_circle(SRC_LOGO, s)
        img.save(PUBLIC / f"icon-{s}.png", format="PNG", optimize=True)
        print(f"Creato {PUBLIC / f'icon-{s}.png'}")

    # apple-touch-icon 180x180 — iOS lo crop in rounded-square, il cerchio interno resta dorato
    apple = composite_circle(SRC_LOGO, 180, padding_ratio=0.08)
    apple.save(PUBLIC / "apple-touch-icon.png", format="PNG", optimize=True)
    print(f"Creato {PUBLIC / 'apple-touch-icon.png'}")

    # OG image 1200x630 con logo + testo — qui sfondo pieno scuro intenzionale (preview social)
    og = Image.new("RGB", (1200, 630), (10, 10, 10))
    overlay = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    for y in range(630):
        alpha = int(40 * (1 - y / 630))
        odraw.line([(0, y), (1200, y)], fill=(240, 180, 41, alpha))
    og = Image.alpha_composite(og.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(og)

    logo = Image.open(SRC_LOGO).convert("RGBA")
    logo.thumbnail((300, 300), Image.LANCZOS)
    og.paste(logo, ((1200 - logo.width) // 2, 60), logo)

    try:
        font_title = ImageFont.truetype("arial.ttf", 64)
        font_sub = ImageFont.truetype("arial.ttf", 32)
    except OSError:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    title = "Valorox AI"
    subtitle = "AI Trading System  -  XAU/USD"
    tw = draw.textlength(title, font=font_title)
    sw = draw.textlength(subtitle, font=font_sub)
    draw.text(((1200 - tw) / 2, 400), title, fill=(240, 180, 41), font=font_title)
    draw.text(((1200 - sw) / 2, 490), subtitle, fill=(220, 220, 220), font=font_sub)

    og.save(PUBLIC / "og-image.png", format="PNG", optimize=True)
    print(f"Creato {PUBLIC / 'og-image.png'}")


if __name__ == "__main__":
    main()
