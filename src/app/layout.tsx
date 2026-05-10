import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Cinzel, Cormorant, Exo_2 } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './providers'
import ClerkWrapper from '@/components/ClerkWrapper'

const braveEightyone = localFont({
  src: './fonts/BRAVEEightyone-Regular.ttf',
  variable: '--font-brave',
  display: 'swap',
  weight: '400',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const cormorant = Cormorant({
  variable: '--font-cormorant',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const exo2 = Exo_2({
  variable: '--font-exo2',
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://valoroxai.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Valorox AI Trading System',
    template: '%s | Valorox',
  },
  description: 'Valorox è il sistema di AI Trading su XAU/USD. Copy trading automatizzato sull\'oro con intelligenza artificiale, risk management avanzato e dashboard in tempo reale. Prova gratis 5 giorni.',
  keywords: [
    'Valorox', 'Valorox AI', 'Valorox Trading', 'Valorox System', 'Valorox AI Trading',
    'AI Trading System', 'AI trading XAU/USD', 'copy trading oro', 'copy trading automatizzato',
    'trading automatico oro', 'gold trading AI', 'sistema trading automatico',
    'XAU/USD', 'trading oro', 'MetaTrader 5', 'copy trading MT5',
    'intelligenza artificiale trading', 'robot trading gold',
  ],
  authors: [{ name: 'Valorox', url: SITE_URL }],
  creator: 'Valorox',
  publisher: 'Valorox',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'google2f3368ce4bb147c3',
  },
  openGraph: {
    title: 'Valorox AI Trading System',
    description: 'Sistema di AI trading su XAU/USD. Copy trading automatizzato sull\'oro con risk management avanzato. Trial gratuito 5 giorni.',
    type: 'website',
    locale: 'it_IT',
    url: SITE_URL,
    siteName: 'Valorox',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Valorox AI Trading System — Copy trading automatizzato su XAU/USD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valorox AI Trading System',
    description: 'Copy trading automatizzato su XAU/USD con AI. Risk management avanzato, dashboard in tempo reale. Prova gratis 5 giorni.',
    images: ['/og-image.png'],
    creator: '@valorox',
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'finance',
}

export const viewport: Viewport = {
  themeColor: '#F0B429',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Valorox',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      description: 'Sistema di AI trading automatizzato su XAU/USD con copy trading e risk management avanzato.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Valorox AI Trading System',
      description: 'Copy trading automatizzato su XAU/USD con intelligenza artificiale.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'it-IT',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#app`,
      name: 'Valorox AI Trading System',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '39',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '39',
          priceCurrency: 'EUR',
          billingDuration: 'P1M',
        },
      },
      description: 'Sistema di copy trading AI su XAU/USD. Trading automatizzato sull\'oro con MetaTrader 5.',
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable} ${cormorant.variable} ${exo2.variable} ${braveEightyone.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClerkWrapper>
          <Providers>{children}</Providers>
        </ClerkWrapper>
      </body>
    </html>
  )
}
