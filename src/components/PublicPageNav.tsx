'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, Sun, Moon } from 'lucide-react'
import { useLanguage, LANGUAGES, LangCode } from '@/i18n/LanguageContext'
import { useTheme } from 'next-themes'

interface PublicPageNavProps {
  showMethod?: boolean
  showAbout?: boolean
}

export default function PublicPageNav({ showMethod = true, showAbout = false }: PublicPageNavProps) {
  const { t, lang, setLang } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const currentLang = LANGUAGES.find(l => l.code === lang)
  const isDark = theme !== 'light'

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        <div className="flex-1" />

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="theme-toggle inline-flex"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Language selector — same style as main page navbar */}
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(v => !v)}
            className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-all"
            style={{
              background: langMenuOpen ? 'rgba(240,180,41,0.12)' : 'var(--glass-bg)',
              border: `1px solid ${langMenuOpen ? 'rgba(240,180,41,0.35)' : 'var(--border)'}`,
              color: langMenuOpen ? 'var(--gold)' : 'var(--text-secondary)',
            }}
            aria-label="Select language"
          >
            <span className={`fi fi-${currentLang?.flagCode}`} style={{ width: '1.2em', height: '0.9em', display: 'inline-block' }} />
            <span>{lang.toUpperCase()}</span>
            <ChevronDown
              className="w-3 h-3 opacity-60"
              style={{ transform: langMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            />
          </button>

          {langMenuOpen && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 z-[70]" onClick={() => setLangMenuOpen(false)} />
              {/* Dropdown */}
              <div
                className="absolute right-0 top-full mt-1.5 z-[80] rounded-xl overflow-hidden shadow-xl"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid var(--glass-border)',
                  minWidth: '150px',
                }}
              >
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code as LangCode); setLangMenuOpen(false) }}
                    className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left text-sm transition-all"
                    style={{
                      color: l.code === lang ? 'var(--gold)' : 'var(--text-secondary)',
                      background: l.code === lang ? 'rgba(240,180,41,0.08)' : 'transparent',
                      fontWeight: l.code === lang ? '700' : '500',
                    }}
                    onMouseEnter={e => { if (l.code !== lang) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
                    onMouseLeave={e => { if (l.code !== lang) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  >
                    <span className={`fi fi-${l.flagCode}`} style={{ width: '1.2em', height: '0.9em', display: 'inline-block' }} />
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

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
