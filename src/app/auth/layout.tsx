import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accedi',
  description: 'Accedi a Valorox per gestire il tuo sistema di copy trading automatizzato su XAU/USD.',
  robots: { index: false, follow: false },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children
}
