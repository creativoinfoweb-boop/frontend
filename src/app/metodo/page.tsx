import type { Metadata } from 'next'
import MetodoContent from './MetodoContent'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://valoroxai.com'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Come Funziona', item: `${SITE_URL}/metodo` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Come funziona Valorox AI Trading System su XAU/USD',
  description: 'Guida completa al sistema di AI trading di Valorox: metodo Smart Money, esecuzione multi-stile (scalping, intraday, analisi volumetrica, CRT), risk management e automazione su XAU/USD.',
  author: { '@type': 'Organization', name: 'Valorox', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Valorox', logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` } },
  url: `${SITE_URL}/metodo`,
  inLanguage: 'it-IT',
  mainEntityOfPage: `${SITE_URL}/metodo`,
}

export const metadata: Metadata = {
  title: 'Come Funziona il Sistema AI Trading',
  description: 'Scopri come Valorox automatizza il trading su XAU/USD con AI e metodo Smart Money. Copy trading automatico sull\'oro, risk management strutturato, MetaTrader 5. Inizia gratis.',
  keywords: [
    'Valorox come funziona', 'AI trading XAU/USD come funziona',
    'copy trading oro automatico', 'Smart Money trading automatizzato',
    'sistema trading automatico oro', 'MetaTrader 5 copy trading',
    'Valorox metodo', 'gold trading AI Italia',
  ],
  alternates: { canonical: `${SITE_URL}/metodo` },
  openGraph: {
    title: 'Come Funziona Valorox AI Trading System',
    description: 'Metodo Smart Money + AI per il trading automatizzato su XAU/USD. Scopri come funziona il sistema di copy trading di Valorox.',
    type: 'article',
    url: `${SITE_URL}/metodo`,
  },
}

export default function MetodoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <MetodoContent />
    </>
  )
}
