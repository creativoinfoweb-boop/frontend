import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = join(__dirname, '..', 'public');
const svg = readFileSync(join(pub, 'valorox-logo.svg'));

const sizes = [
  { name: 'valorox-logo.png', size: 1024 },
  { name: 'valorox-logo-512.png', size: 512 },
  { name: 'valorox-logo-256.png', size: 256 },
  { name: 'valorox-icon-64.png', size: 64 },
  { name: 'favicon-32.png', size: 32 },
];

for (const { name, size } of sizes) {
  await sharp(svg, { density: 600 })
    .resize(size, size)
    .png()
    .toFile(join(pub, name));
  console.log('wrote', name);
}
