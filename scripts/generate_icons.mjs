/**
 * Genera tutte le icone PWA/SEO partendo da valoroxoro.svg
 * Usa sharp (pre-compiled binaries, nessuna dipendenza nativa aggiuntiva)
 *
 * Uso: node scripts/generate_icons.mjs
 */

import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SVG_PATH = resolve(ROOT, 'public', 'valoroxoro.svg')
const PUBLIC = resolve(ROOT, 'public')
const APP_DIR = resolve(ROOT, 'src', 'app')

// Colori brand
const GOLD = { r: 190, g: 150, b: 40, alpha: 1 }      // bordo dorato
const DARK = { r: 12,  g: 12,  b: 16,  alpha: 1 }      // sfondo cerchio

/**
 * Crea un SVG cerchio+bordo come buffer da sovrapporre/fondere.
 * Il logo viene scalato e centrato dentro al cerchio.
 */
async function makeIcon(sizePx, paddingRatio = 0.12) {
  const pad = Math.max(2, Math.round(sizePx * 0.03))
  const inner = sizePx - pad * 2
  const logoSize = Math.round(sizePx * (1 - paddingRatio * 2))

  // 1. SVG del cerchio (sfondo scuro + bordo dorato)
  const borderW = Math.max(2, Math.round(sizePx / 48))
  const circleSvg = `
    <svg width="${sizePx}" height="${sizePx}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${sizePx/2}" cy="${sizePx/2}" r="${inner/2}"
        fill="#0c0c10" stroke="#be9628" stroke-width="${borderW}"/>
    </svg>`

  // 2. Logo PNG rasterizzato dalla SVG
  const logoPng = await sharp(SVG_PATH)
    .resize(logoSize, logoSize, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } })
    .png()
    .toBuffer()

  // 3. Compositing: cerchio + logo centrato
  const offset = Math.round((sizePx - logoSize) / 2)
  const result = await sharp(Buffer.from(circleSvg))
    .resize(sizePx, sizePx)
    .composite([{ input: logoPng, top: offset, left: offset }])
    .png({ compressionLevel: 9 })
    .toBuffer()

  return result
}

async function makeOgImage() {
  const W = 1200, H = 630
  const logoSize = 280

  const logoPng = await sharp(SVG_PATH)
    .resize(logoSize, logoSize, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } })
    .png()
    .toBuffer()

  // Sfondo scuro con gradient dorato sottile
  const bg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#be9628" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#be9628" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="#0a0a0a"/>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <text x="${W/2}" y="440" font-family="Arial,sans-serif" font-size="72"
        font-weight="bold" fill="#f0b429" text-anchor="middle">Valorox AI</text>
      <text x="${W/2}" y="510" font-family="Arial,sans-serif" font-size="34"
        fill="#dddddd" text-anchor="middle">AI Trading System · XAU/USD</text>
    </svg>`

  const logoOffset = { top: 60, left: Math.round((W - logoSize) / 2) }

  return sharp(Buffer.from(bg))
    .composite([{ input: logoPng, ...logoOffset }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

async function makeFavico(sizes = [16, 32, 48, 64, 128]) {
  // ICO = header + directory + embedded PNGs
  const pngBuffers = await Promise.all(
    sizes.map(s => sharp(SVG_PATH)
      .resize(s, s, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } })
      .png()
      .toBuffer()
    )
  )

  // Costruisci ICO manualmente (ICONDIR + entries + data)
  const n = sizes.length
  const headerSize = 6 + 16 * n
  let offset = headerSize
  const parts = []

  // ICONDIR
  const dir = Buffer.alloc(6)
  dir.writeUInt16LE(0, 0)  // reserved
  dir.writeUInt16LE(1, 2)  // type = ICO
  dir.writeUInt16LE(n, 4)
  parts.push(dir)

  const entries = []
  for (let i = 0; i < n; i++) {
    const png = pngBuffers[i]
    const s = sizes[i]
    const entry = Buffer.alloc(16)
    entry.writeUInt8(s >= 256 ? 0 : s, 0)   // width  (0 = 256)
    entry.writeUInt8(s >= 256 ? 0 : s, 1)   // height
    entry.writeUInt8(0, 2)                   // color count
    entry.writeUInt8(0, 3)                   // reserved
    entry.writeUInt16LE(1, 4)               // planes
    entry.writeUInt16LE(32, 6)              // bit count
    entry.writeUInt32LE(png.length, 8)      // size of image data
    entry.writeUInt32LE(offset, 12)         // offset
    entries.push(entry)
    offset += png.length
  }

  return Buffer.concat([dir, ...entries, ...pngBuffers])
}

async function main() {
  console.log('Sorgente:', SVG_PATH)

  // favicon.ico (5 sizes)
  const ico = await makeFavico([16, 32, 48, 64, 128])
  writeFileSync(resolve(APP_DIR, 'favicon.ico'), ico)
  console.log(`favicon.ico  ${ico.length} bytes`)

  // icon-192.png
  const i192 = await makeIcon(192)
  writeFileSync(resolve(PUBLIC, 'icon-192.png'), i192)
  console.log(`icon-192.png  ${i192.length} bytes`)

  // icon-512.png
  const i512 = await makeIcon(512)
  writeFileSync(resolve(PUBLIC, 'icon-512.png'), i512)
  console.log(`icon-512.png  ${i512.length} bytes`)

  // apple-touch-icon.png  180x180
  const apple = await makeIcon(180, 0.09)
  writeFileSync(resolve(PUBLIC, 'apple-touch-icon.png'), apple)
  console.log(`apple-touch-icon.png  ${apple.length} bytes`)

  // og-image.png  1200x630
  const og = await makeOgImage()
  writeFileSync(resolve(PUBLIC, 'og-image.png'), og)
  console.log(`og-image.png  ${og.length} bytes`)

  console.log('\nTutte le icone generate da valoroxoro.svg')
}

main().catch(e => { console.error(e); process.exit(1) })
