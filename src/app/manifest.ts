import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Valorox AI Trading System',
    short_name: 'Valorox',
    description: 'Sistema di AI trading automatizzato su XAU/USD con copy trading e risk management avanzato.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#F0B429',
    lang: 'it',
    categories: ['finance', 'productivity'],
    icons: [
      {
        src: '/valorox-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/eldorado.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
