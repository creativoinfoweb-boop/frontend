import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pagina non trovata',
  description: 'La pagina che stai cercando non esiste. Torna alla homepage di Valorox AI Trading System.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl font-black" style={{
          background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          404
        </div>
        <h1 className="text-2xl font-bold">Pagina non trovata</h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link href="/" className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold">
          Torna alla Home
        </Link>
      </div>
    </div>
  )
}
