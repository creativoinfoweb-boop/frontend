"""
Genera tutti gli asset SEO (favicon, icone PWA, OG image) partendo dal logo Valorox.
Eseguire una volta: python scripts/generate_seo_assets.py
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC_LOGO = ROOT / "public" / "valorox-icon.png"
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"

# Brand colors
BG_DARK = (10, 10, 10, 255)        # #0a0a0a
GOLD = (240, 180, 41, 255)          # #F0B429

def composite_on_bg(logo_path: Path, size: int, bg=BG_DARK, padding_ratio=0.15) -> Image.Image:
    """Logo centrato su sfondo pieno, con padding."""
    canvas = Image.new("RGBA", (size, size), bg)
    logo = Image.open(logo_path).convert("RGBA")
    inner = int(size * (1 - padding_ratio * 2))
    logo.thumbnail((inner, inner), Image.LANCZOS)
    x = (size - logo.width) // 2
    y = (size - logo.height) // 2
    canvas.alpha_composite(logo, (x, y))
    return canvas

def main():
    assert SRC_LOGO.exists(), f"Logo non trovato: {SRC_LOGO}"

    # 1. favicon.ico multi-size (16, 32, 48) - va in src/app/favicon.ico
    sizes = [(16, 16), (32, 32), (48, 48)]
    base = composite_on_bg(SRC_LOGO, 48)
    base.save(APP / "favicon.ico", format="ICO", sizes=sizes)
    print(f"Creato {APP / 'favicon.ico'}")

    # 2. PNG icons in public/
    for s in [192, 512]:
        img = composite_on_bg(SRC_LOGO, s)
        img.save(PUBLIC / f"icon-{s}.png", format="PNG", optimize=True)
        print(f"Creato {PUBLIC / f'icon-{s}.png'}")

    # 3. apple-touch-icon 180x180 (no padding, sfondo solid)
    apple = composite_on_bg(SRC_LOGO, 180, padding_ratio=0.10)
    apple.save(PUBLIC / "apple-touch-icon.png", format="PNG", optimize=True)
    print(f"Creato {PUBLIC / 'apple-touch-icon.png'}")

    # 4. OG image 1200x630 con logo + testo
    og = Image.new("RGB", (1200, 630), (10, 10, 10))
    draw = ImageDraw.Draw(og)
    # Gradient effect simulato con un rettangolo oro semi-trasparente
    overlay = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    for y in range(630):
        alpha = int(40 * (1 - y / 630))
        odraw.line([(0, y), (1200, y)], fill=(240, 180, 41, alpha))
    og = Image.alpha_composite(og.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(og)

    # Logo centrato in alto
    logo = Image.open(SRC_LOGO).convert("RGBA")
    logo.thumbnail((280, 280), Image.LANCZOS)
    og.paste(logo, ((1200 - logo.width) // 2, 80), logo)

    # Testo (font default — sufficiente per OG)
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
    draw.text(((1200 - tw) / 2, 410), title, fill=(240, 180, 41), font=font_title)
    draw.text(((1200 - sw) / 2, 500), subtitle, fill=(220, 220, 220), font=font_sub)

    og.save(PUBLIC / "og-image.png", format="PNG", optimize=True)
    print(f"Creato {PUBLIC / 'og-image.png'}")

if __name__ == "__main__":
    main()
