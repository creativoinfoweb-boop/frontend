'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage, LANGUAGES, LangCode } from '@/i18n/LanguageContext'

interface PublicPageNavProps {
  showMethod?: boolean
  showAbout?: boolean
}

export default function PublicPageNav({ showMethod = true, showAbout = false }: PublicPageNavProps) {
  const { t, lang, setLang } = useLanguage()

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(24px)', borderColor: 'var(--border)' }}
    >
      {/* Gold top rule */}
      <div
        className="absolute top-0 left-0 w-full h-[2px]"
        style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
        <div className="flex-1" />

        {/* Language selector */}
        <select
          value={lang}
          onChange={e => setLang(e.target.value as LangCode)}
          className="appearance-none text-[11px] font-bold px-2.5 py-1.5 rounded-lg cursor-pointer border"
          style={{
            background: 'var(--glass-bg)',
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
          }}
          aria-label="Language"
        >
          {LANGUAGES.map(l => (
            <option key={l.code} value={l.code}>{l.flag} {l.code.toUpperCase()}</option>
          ))}
        </select>

        {showAbout && (
          <Link
            href="/chi-siamo"
            className="text-sm transition-opacity hover:opacity-70 hidden sm:block"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.nav.about}
          </Link>
        )}
        {showMethod && (
          <Link
            href="/metodo"
            className="text-sm transition-opacity hover:opacity-70 hidden sm:block"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.nav.method}
          </Link>
        )}
        <Link href="/auth/register" className="btn-gold text-xs px-4 py-2">
          {t.nav.startFree}
        </Link>
      </div>
    </nav>
  )
}
