'use client'

/**
 * EbookCard — "CRT Secrets" riservato agli utenti con piano attivo (trial incluso).
 * - variant "dashboard": appare SOLO se l'abbonamento è attivo/trialing
 * - variant "learn": sempre visibile, ma bloccato senza piano attivo
 */

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/i18n/LanguageContext'
import { useHasActiveSubscription } from '@/hooks/useSubscription'
import { BookOpen, Download, Lock, Sparkles, ArrowRight } from 'lucide-react'

function authToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

async function downloadEbook(file: string, setBusy: (b: boolean) => void, setError: (e: string | null) => void) {
  setBusy(true)
  setError(null)
  try {
    const res = await fetch(`/api/ebook?file=${file}`, {
      headers: { Authorization: `Bearer ${authToken() ?? ''}` },
    })
    if (!res.ok) {
      const data = await res.json().catch(() => null)
      throw new Error(data?.detail || `Errore ${res.status}`)
    }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file.includes('.epub') ? file.replace(/-/g, '_').replace(/crt_secrets/i, 'CRT_Secrets') : file
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  } catch (e) {
    setError(e instanceof Error ? e.message : 'Download non riuscito')
  } finally {
    setBusy(false)
  }
}

export default function EbookCard({ variant }: { variant: 'dashboard' | 'learn' }) {
  const { lang } = useLanguage()
  const en = lang === 'en'
  const { hasActive, isLoading } = useHasActiveSubscription()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // In dashboard la sezione esiste solo per chi ha attivato un piano
  if (variant === 'dashboard' && (!hasActive || isLoading)) return null

  const cover = `/ebook-cover-${en ? 'en' : 'it'}.jpg`
  const suffix = en ? 'en' : 'it'
  const locked = variant === 'learn' && !hasActive

  return (
    <div className="relative overflow-hidden rounded-2xl animate-fade-in-up"
      style={{
        background: 'linear-gradient(135deg, color-mix(in srgb, var(--gold) 9%, var(--glass-bg)), var(--glass-bg) 55%)',
        border: '1px solid var(--border-gold)',
      }}>
      {/* glow decorativo */}
      <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--gold)', opacity: 0.08 }} />

      <div className="relative flex flex-col sm:flex-row gap-5 p-5 sm:p-6 items-center sm:items-stretch">
        {/* copertina */}
        <div className="relative flex-shrink-0" style={{ width: 128 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt="CRT Secrets — eBook"
            className="rounded-lg w-full h-auto"
            style={{
              boxShadow: '0 12px 32px rgba(0,0,0,0.45), 0 0 0 1px color-mix(in srgb, var(--gold) 25%, transparent)',
              filter: locked ? 'blur(3px) brightness(0.6)' : 'none',
              transform: 'rotate(-2deg)',
            }} />
          {locked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'color-mix(in srgb, var(--gold) 18%, rgba(0,0,0,0.6))', border: '1px solid var(--border-gold)' }}>
                <Lock className="w-4 h-4" style={{ color: 'var(--gold)' }} />
              </div>
            </div>
          )}
        </div>

        {/* contenuto */}
        <div className="flex-1 min-w-0 flex flex-col justify-center text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 mb-2 mx-auto sm:mx-0 px-2.5 py-1 rounded-full self-center sm:self-start"
            style={{ background: 'var(--gold-subtle)', border: '1px solid var(--border-gold)' }}>
            <Sparkles className="w-3 h-3" style={{ color: 'var(--gold)' }} />
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
              {locked
                ? (en ? 'Subscribers only' : 'Solo per gli iscritti')
                : (en ? 'Included in your plan' : 'Incluso nel tuo piano')}
            </span>
          </div>

          <h3 className="text-lg font-black leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>
            {locked
              ? (en ? 'CRT Secrets — the complete guide' : 'CRT Secrets — la guida completa')
              : (en ? 'Get our free eBook now' : 'Ottieni adesso il nostro eBook gratuito')}
          </h3>
          <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {en
              ? '54 pages on CRT and the Power of Three: range, manipulation, expansion — with the diagrams, the playbook and the 30-day plan.'
              : '54 pagine su CRT e Power of Three: range, manipolazione, espansione — con i diagrammi, il playbook e il piano dei 30 giorni.'}
          </p>

          {locked ? (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link href="/dashboard/billing"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--gold)', color: '#0A0A14' }}>
                {en ? 'Activate a plan to unlock it' : 'Attiva un piano per sbloccarlo'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                {en ? 'Free with the trial — no payment needed' : 'Gratis col trial — nessun pagamento richiesto'}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <button onClick={() => downloadEbook(`crt-secrets-${suffix}.pdf`, setBusy, setError)} disabled={busy}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:-translate-y-0.5 disabled:opacity-50"
                  style={{ background: 'var(--gold)', color: '#0A0A14' }}>
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
                <button onClick={() => downloadEbook(`crt-secrets-${suffix}.epub`, setBusy, setError)} disabled={busy}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:-translate-y-0.5 disabled:opacity-50"
                  style={{ background: 'var(--gold-subtle)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}>
                  <BookOpen className="w-3.5 h-3.5" /> EPUB
                </button>
              </div>
              {error && <span className="text-[10px]" style={{ color: 'var(--red)' }}>{error}</span>}
              {busy && <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{en ? 'Downloading…' : 'Download in corso…'}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
