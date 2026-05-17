"""
Genera tutti gli asset SEO (favicon, icone PWA, OG image) partendo dal logo Valorox.

Sorgente ufficiale: public/valoroxoro.svg

PREFERITO: usa lo script Node.js (nessuna dipendenza nativa):
    node scripts/generate_icons.mjs

Questo script Python è mantenuto come alternativa quando sharp/Node non sono
disponibili. Su Windows senza libreria Cairo nativa la conversione SVG non è
supportata — usa generate_icons.mjs in quel caso.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
SRC_SVG = ROOT / "public" / "valoroxoro.svg"
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"

BG_TRANSPARENT = (0, 0, 0, 0)
GOLD = (190, 150, 40, 255)
DARK_INNER = (12, 12, 16, 255)


def svg_to_pil(size: int) -> Image.Image:
    """Converte valoroxoro.svg in PIL Image tramite cairosvg."""
    try:
        import cairosvg  # type: ignore
        import io
        png_bytes = cairosvg.svg2png(url=str(SRC_SVG), output_width=size, output_height=size)
        return Image.open(io.BytesIO(png_bytes)).convert("RGBA")
    except Exception as e:
        print(f"ERRORE: cairosvg non disponibile ({e})")
        print("Usa invece: node scripts/generate_icons.mjs")
        sys.exit(1)


def composite_circle(size: int, padding_ratio: float = 0.10) -> Image.Image:
    """Logo centrato dentro un cerchio dorato pieno, su sfondo trasparente."""
    canvas = Image.new("RGBA", (size, size), BG_TRANSPARENT)
    draw = ImageDraw.Draw(canvas)

    pad = max(2, int(size * 0.03))
    border_w = max(2, size // 48)
    draw.ellipse([pad, pad, size - pad, size - pad], fill=DARK_INNER)
    draw.ellipse([pad, pad, size - pad, size - pad], outline=GOLD, width=border_w)

    logo = svg_to_pil(int(size * (1 - padding_ratio * 2)))
    x = (size - logo.width) // 2
    y = (size - logo.height) // 2
    canvas.alpha_composite(logo, (x, y))
    return canvas


def main():
    assert SRC_SVG.exists(), f"Logo non trovato: {SRC_SVG}"
    print(f"Sorgente: {SRC_SVG}")

    sizes = [(16, 16), (32, 32), (48, 48)]
    base = composite_circle(48)
    base.save(APP / "favicon.ico", format="ICO", sizes=sizes)
    print(f"favicon.ico")

    for s in [192, 512]:
        img = composite_circle(s)
        img.save(PUBLIC / f"icon-{s}.png", format="PNG", optimize=True)
        print(f"icon-{s}.png")

    apple = composite_circle(180, padding_ratio=0.09)
    apple.save(PUBLIC / "apple-touch-icon.png", format="PNG", optimize=True)
    print(f"apple-touch-icon.png")

    og = Image.new("RGB", (1200, 630), (10, 10, 10))
    logo_og = svg_to_pil(280)
    og.paste(logo_og, ((1200 - logo_og.width) // 2, 60), logo_og)
    draw = ImageDraw.Draw(og)
    try:
        font_title = ImageFont.truetype("arial.ttf", 64)
        font_sub = ImageFont.truetype("arial.ttf", 32)
    except OSError:
        font_title = font_sub = ImageFont.load_default()
    title = "Valorox AI"
    subtitle = "AI Trading System  -  XAU/USD"
    draw.text(((1200 - draw.textlength(title, font=font_title)) / 2, 400),
              title, fill=(240, 180, 41), font=font_title)
    draw.text(((1200 - draw.textlength(subtitle, font=font_sub)) / 2, 490),
              subtitle, fill=(220, 220, 220), font=font_sub)
    og.save(PUBLIC / "og-image.png", format="PNG", optimize=True)
    print(f"og-image.png")

    print("\nTutte le icone generate da valoroxoro.svg")


if __name__ == "__main__":
    main()
