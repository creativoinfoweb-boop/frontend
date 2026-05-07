import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programma Affiliati | Guadagna con Valorox',
  description: 'Unisciti al programma affiliati Valorox. Guadagna commissioni ricorrenti presentando trader al sistema di AI trading su XAU/USD più avanzato d\'Italia.',
  keywords: ['Valorox affiliati', 'programma affiliazione trading', 'guadagna con trading AI', 'referral trading'],
  openGraph: {
    title: 'Programma Affiliati Valorox | Commissioni Ricorrenti',
    description: 'Guadagna commissioni ricorrenti con il programma affiliati Valorox. Sistema di AI trading XAU/USD.',
    type: 'website',
  },
}

export default function AffiliatiLayout({ children }: { children: React.ReactNode }) {
  return children
}
