import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Cinzel, Cormorant, Exo_2, Audiowide } from 'next/font/google'
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

const valoroxBrand = Audiowide({
  variable: '--font-valorox-brand',
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://valoroxai.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Valorox AI Trading System',
    template: '%s | Valorox',
  },
  description: 'Valorox: sistema AI per il trading automatizzato su XAU/USD. Copy trading sull\'oro con intelligenza artificiale, risk management avanzato e dashboard in tempo reale. Trial gratuito 5 giorni.',
  keywords: [
    'Valorox', 'Valorox AI', 'Valorox Trading', 'Valorox System', 'Valorox AI Trading',
    'valoroxai', 'valoroxai.com',
    'AI Trading System', 'sistema trading AI', 'trading automatico XAU/USD',
    'copy trading oro automatico', 'copy trading gold AI', 'robot trading gold',
    'trading automatico oro', 'gold trading intelligenza artificiale',
    'XAU/USD', 'trading oro', 'MetaTrader 5', 'copy trading MT5',
    'sistema copy trading', 'trading automatizzato Italia',
    'piattaforma trading AI', 'automazione trading',
  ],
  authors: [{ name: 'Valorox', url: SITE_URL }],
  creator: 'Valorox',
  publisher: 'Valorox',
  applicationName: 'Valorox AI Trading System',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
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
    title: 'Valorox AI Trading System | Copy Trading XAU/USD Automatizzato',
    description: 'Sistema di AI trading su oro (XAU/USD). Copy trading automatizzato con intelligenza artificiale, risk management professionale, dashboard in tempo reale. Trial 5 giorni gratis.',
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
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@valorox',
    creator: '@valorox',
    title: 'Valorox AI Trading System | Copy Trading XAU/USD',
    description: 'Trading automatico sull\'oro con AI. Risk management avanzato, dashboard in tempo reale, trial gratuito 5 giorni.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'it-IT': SITE_URL,
    },
  },
  category: 'finance',
  classification: 'Finance, Trading, Technology',
  other: {
    'theme-color': '#F0B429',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#F0B429' },
    { media: '(prefers-color-scheme: light)', color: '#F0B429' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// ── Structured Data (JSON-LD) ─────────────────────────────────────────────────

const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Valorox',
  alternateName: ['Valorox AI', 'Valorox AI Trading', 'Valorox System'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/icon-512.png`,
    width: 512,
    height: 512,
    caption: 'Valorox AI Trading System',
  },
  image: { '@id': `${SITE_URL}/#logo` },
  description: 'Valorox è il sistema di AI trading automatizzato su XAU/USD. Copy trading sull\'oro con intelligenza artificiale e risk management avanzato.',
  foundingDate: '2024',
  inLanguage: 'it-IT',
}

const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Valorox AI Trading System',
  alternateName: 'Valorox',
  description: 'Sistema di copy trading automatizzato su XAU/USD con intelligenza artificiale.',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'it-IT',
  copyrightYear: new Date().getFullYear(),
}

const softwareSchema = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#app`,
  name: 'Valorox AI Trading System',
  alternateName: 'Valorox',
  applicationCategory: 'FinanceApplication',
  applicationSubCategory: 'Trading Software',
  operatingSystem: 'Web Browser, iOS, Android',
  url: SITE_URL,
  description: 'Piattaforma di AI trading automatizzato su XAU/USD. Copy trading sull\'oro con MetaTrader 5, risk management avanzato e dashboard in tempo reale.',
  screenshot: `${SITE_URL}/og-image.png`,
  featureList: [
    'Copy trading automatizzato su XAU/USD',
    'Intelligenza artificiale per l\'analisi dei segnali',
    'Risk management con stop loss e take profit automatici',
    'Dashboard in tempo reale',
    'Compatibile con MetaTrader 5',
    'Conto demo e live supportati',
    'Trial gratuito 5 giorni',
  ],
  offers: {
    '@type': 'Offer',
    price: '39',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
    description: 'Abbonamento mensile con trial gratuito di 5 giorni',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '39',
      priceCurrency: 'EUR',
      billingDuration: 'P1M',
    },
  },
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'it-IT',
  isAccessibleForFree: false,
}

const faqSchema = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Cos\'è Valorox e a cosa serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Valorox è un sistema di AI trading automatizzato su XAU/USD (oro). Unisce intelligenza artificiale e metodo Smart Money per eseguire operazioni di copy trading in modo sistematico, senza interferenza emotiva. Non è un servizio di consulenza finanziaria.',
      },
    },
    {
      '@type': 'Question',
      name: 'Come funziona il sistema AI di Valorox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Colleghi le credenziali del tuo conto MT5 (cifrate AES-128). L\'AI di Valorox analizza il mercato XAU/USD e applica automaticamente la strategia sul tuo conto secondo parametri configurabili: rischio per operazione, orari, stop loss e take profit. Non serve avere MT5 aperto sul PC.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso provare Valorox gratuitamente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì. Valorox offre un trial gratuito di 5 giorni. Puoi iniziare con un conto demo MT5 per osservare il sistema in azione prima di collegare un conto live.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quali rischi comporta il trading con Valorox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il trading sui mercati finanziari comporta rischio reale di perdita del capitale. Valorox non garantisce risultati. I parametri di rischio (stop loss, size, take profit) sono configurabili dall\'utente. Consigliamo di iniziare con un conto demo. Non forniamo consulenza finanziaria.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto costa Valorox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Valorox costa €39 al mese con trial gratuito di 5 giorni. Nessun costo nascosto, nessun lock-in: puoi cancellare in qualsiasi momento senza penalità.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quale broker devo usare con Valorox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Qualsiasi broker MetaTrader 5 che offra XAU/USD (oro). Valorox non ha affiliazioni con broker. Consigliamo broker ECN con spread ridotti come Exness, IC Markets o Pepperstone. Sono supportati sia conti demo che live.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual è la differenza tra Valorox e i segnali di trading tradizionali?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I segnali richiedono esecuzione manuale — con ritardi, errori emotivi e slippage. Valorox esegue ogni operazione automaticamente, con la stessa logica su ogni trade, senza esitazioni. La differenza non è nella strategia, è nell\'esecuzione coerente.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso cancellare l\'abbonamento Valorox quando voglio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, in qualsiasi momento senza penalità. Le operazioni già aperte rimangono sul tuo conto MT5 e puoi gestirle come preferisci. Nessun lock-in, nessun costo nascosto.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    websiteSchema,
    softwareSchema,
    faqSchema,
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
        className={`${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable} ${cormorant.variable} ${exo2.variable} ${braveEightyone.variable} ${valoroxBrand.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClerkWrapper>
          <Providers>{children}</Providers>
        </ClerkWrapper>
      </body>
    </html>
  )
}
