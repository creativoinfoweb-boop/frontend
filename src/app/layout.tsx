import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Cinzel, Cormorant } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ClerkWrapper from '@/components/ClerkWrapper'

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

export const metadata: Metadata = {
  title: 'Valorox — Metodo, Disciplina e Strategia su XAU/USD',
  description: 'Piattaforma educativa e operativa per trader su XAU/USD. Approccio disciplinato, riduzione interferenza emotiva, monitoraggio completo dalla dashboard personale.',
  keywords: ['trading disciplinato', 'metodo trading', 'XAU/USD', 'MetaTrader 5', 'gold trading', 'strategia operativa', 'Valorox'],
  authors: [{ name: 'Valorox' }],
  icons: {
    icon: [
      { url: '/valorox-icon.png', type: 'image/png' },
    ],
    apple: '/valorox-icon.png',
  },
  openGraph: {
    title: 'Valorox — Metodo, Disciplina e Strategia su XAU/USD',
    description: 'Piattaforma educativa e operativa su XAU/USD. Strategia applicata, riduzione emotività, dashboard personale con monitoraggio completo. Trial 5 giorni gratuito.',
    type: 'website',
    locale: 'it_IT',
  },
}

export const viewport: Viewport = {
  themeColor: '#F0B429',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable} ${cormorant.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClerkWrapper>
          <Providers>{children}</Providers>
        </ClerkWrapper>
      </body>
    </html>
  )
}
