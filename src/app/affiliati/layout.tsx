import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://valoroxai.com'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Affiliati', item: `${SITE_URL}/affiliati` },
  ],
}

export const metadata: Metadata = {
  title: 'Programma Affiliati | Guadagna con Valorox',
  description: 'Guadagna commissioni ricorrenti con il programma affiliati Valorox. Presenta trader al sistema di AI trading XAU/USD e ricevi una percentuale su ogni abbonamento attivo.',
  keywords: [
    'Valorox affiliati', 'programma affiliazione trading AI',
    'guadagna con trading automatico', 'referral XAU/USD', 'commissioni trading ricorrenti',
  ],
  alternates: { canonical: `${SITE_URL}/affiliati` },
  openGraph: {
    title: 'Programma Affiliati Valorox | Commissioni Ricorrenti sul Trading AI',
    description: 'Guadagna commissioni ricorrenti presentando trader a Valorox, il sistema di AI trading automatizzato su XAU/USD.',
    type: 'website',
    url: `${SITE_URL}/affiliati`,
  },
}

export default function AffiliatiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
