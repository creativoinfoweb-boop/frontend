'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  ArrowRight, Sun, Moon, Check, Star, Users, TrendingUp,
  Headphones, Gift, ChevronRight, Send, AlertCircle, CheckCircle2,
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const BASE_URL = typeof window !== 'undefined' && window.location.protocol === 'https:'
  ? '/api'
  : API_URL

const CREATOR_TYPES = [
  'Influencer Social',
  'Youtuber / Video Creator',
  'Streamer',
  'Blogger / Giornalista',
  'Trader / Educatore Finanziario',
  'Altro',
]

const COMMUNITY_SIZES = [
  'Meno di 1.000 follower',
  '1.000 – 5.000',
  '5.000 – 20.000',
  '20.000 – 100.000',
  'Oltre 100.000',
]

const CHANNELS = ['Instagram', 'TikTok', 'YouTube', 'Telegram', 'Twitter/X', 'Facebook', 'Blog/Sito', 'Altro']

interface FormState {
  name: string
  email: string
  creator_type: string
  community_desc: string
  community_size: string
  channels: string[]
  main_link: string
  message: string
  accepted: boolean
}

export default function AffiliatiPage() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const isDark = theme !== 'light'

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    creator_type: '',
    community_desc: '',
    community_size: '',
    channels: [],
    main_link: '',
    message: '',
    accepted: false,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const toggleChannel = (ch: string) => {
    setForm(prev => ({
      ...prev,
      channels: prev.channels.includes(ch) ? prev.channels.filter(c => c !== ch) : [...prev.channels, ch],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.accepted) { setError('Devi accettare il consenso al trattamento dei dati.'); return }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${BASE_URL}/affiliates/public/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          creator_type: form.creator_type,
          community_desc: form.community_desc,
          community_size: form.community_size,
          channels: JSON.stringify(form.channels),
          main_link: form.main_link || null,
          message: form.message || null,
        }),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.detail || 'Errore invio') }
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Errore durante l\'invio. Riprova.')
    } finally {
      setLoading(false)
    }
  }

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      {/* Top accent bar */}
      <div className="h-[2px] w-full fixed top-0 z-[60]"
        style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500 mt-[2px]"
        style={scrolled ? {
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(32px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
          borderBottom: '1px solid var(--glass-border)',
          boxShadow: 'var(--shadow-lg)',
        } : { background: 'transparent' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/eldorado.jpg" alt="El Dorado" className="gold-avatar-ring" style={{ width: 34, height: 34 }} />
            <div>
              <span className="text-base font-semibold" style={{ fontFamily: 'var(--font-brand)', letterSpacing: '0.12em', background: 'linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-dark))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>El Dorado</span>
              <div className="text-[9px] font-medium tracking-widest uppercase leading-none mt-0.5" style={{ color: 'var(--text-muted)' }}>Metodo · Disciplina · XAU/USD</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Metodo', href: '/metodo' },
              { label: 'Come Funziona', href: '/#how' },
              { label: 'Performance', href: '/#performance' },
              { label: 'Pricing', href: '/#pricing' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}>
                {link.label}
              </Link>
            ))}
            <span className="text-sm font-semibold" style={{ color: 'var(--gold)' }}>Affiliati</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="theme-toggle hidden sm:inline-flex"
              title={isDark ? 'Modalità chiara' : 'Modalità scura'}>
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <Link href="/auth/login" className="hidden sm:inline-flex btn-ghost text-sm px-4 py-2">Accedi</Link>
            <Link href="/auth/register" className="btn-gold text-sm px-5 py-2.5">
              Inizia Gratis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(ellipse, var(--gold), transparent 70%)' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.3)', color: 'var(--gold)' }}>
            <Star className="w-3.5 h-3.5" />
            Creator Program
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            <span style={{ color: 'var(--text-primary)' }}>Collabora con </span>
            <span style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>El Dorado</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
            Diventa Affiliato e Guadagna Insieme a Noi
          </p>

          <p className="text-base max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Hai una community interessata al trading o alla finanza? Entra nel programma affiliati El Dorado e guadagna commissioni ricorrenti per ogni abbonato che porti sulla piattaforma.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToForm} className="btn-gold text-base px-8 py-4 flex items-center gap-2">
              Candidati ora <ChevronRight className="w-5 h-5" />
            </button>
            <Link href="/auth/register" className="btn-ghost text-base px-8 py-4">
              Registrati gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mb-3">Processo</div>
            <h2 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>Come Funziona</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Fai Richiesta',
                desc: 'Compila il form di candidatura con i dati della tua community. Bastano pochi minuti.',
                icon: Send,
              },
              {
                step: '02',
                title: 'Valutazione',
                desc: 'Il team El Dorado valuterà la tua candidatura e ti contatterà entro 3-5 giorni lavorativi.',
                icon: Users,
              },
              {
                step: '03',
                title: 'Inizia a Guadagnare',
                desc: 'Se approvato, ricevi il tuo link referral esclusivo e inizia a guadagnare commissioni ricorrenti.',
                icon: TrendingUp,
              },
            ].map((item, i) => (
              <div key={i} className="card-premium p-6 text-center relative">
                <div className="absolute top-4 right-4 text-5xl font-black opacity-[0.04]"
                  style={{ color: 'var(--gold)', fontFamily: 'var(--font-brand)' }}>
                  {item.step}
                </div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.25)' }}>
                  <item.icon className="w-7 h-7" style={{ color: 'var(--gold)' }} />
                </div>
                <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                  Step {item.step}
                </div>
                <h3 className="text-lg font-black mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefici */}
      <section className="py-20 px-4" style={{ background: 'var(--surface-1)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mb-3">Perché Sceglierci</div>
            <h2 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>I Tuoi Vantaggi</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Guadagni sulle Sottoscrizioni',
                desc: 'Commissioni ricorrenti su ogni abbonato che porti. Più cresci, più guadagni — il tuo tier aumenta con i referral attivi.',
                color: 'var(--green)',
                bg: 'rgba(0,230,118,0.08)',
                border: 'rgba(0,230,118,0.2)',
              },
              {
                icon: Gift,
                title: 'Sconto Creator 30%',
                desc: 'Come affiliato approvato hai diritto a uno sconto permanente del 30% sul tuo abbonamento El Dorado, per sempre.',
                color: 'var(--gold)',
                bg: 'rgba(240,180,41,0.08)',
                border: 'rgba(240,180,41,0.2)',
              },
              {
                icon: Users,
                title: 'Dashboard Dedicata',
                desc: 'Statistiche in tempo reale: referral attivi, guadagni disponibili, storico commissioni e richieste di pagamento direttamente dalla tua dashboard.',
                color: '#818CF8',
                bg: 'rgba(129,140,248,0.08)',
                border: 'rgba(129,140,248,0.2)',
              },
              {
                icon: Headphones,
                title: 'Supporto Prioritario',
                desc: 'Accesso diretto al team El Dorado. Le tue richieste vengono gestite con priorità e tempi di risposta garantiti.',
                color: '#38BDF8',
                bg: 'rgba(56,189,248,0.08)',
                border: 'rgba(56,189,248,0.2)',
              },
            ].map((item, i) => (
              <div key={i} className="card-premium p-6 flex items-start gap-5"
                style={{ border: `1px solid ${item.border}` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <div>
                  <h3 className="font-black mb-1.5" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tier table */}
          <div className="mt-10 card-premium p-6">
            <div className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Struttura Commissioni per Tier
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Tier', 'Abbonati Attivi', 'Commissione', 'Sconto Abbonamento'].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { badge: '🥉', name: 'Bronzo', range: '3 – 19', pct: '5%', discount: '30%' },
                    { badge: '🥈', name: 'Argento', range: '20 – 39', pct: '10%', discount: '30%' },
                    { badge: '🥇', name: 'Oro', range: '40+', pct: '15%', discount: '30%' },
                  ].map(row => (
                    <tr key={row.name} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="py-3 px-3 font-bold">
                        <span className="mr-2">{row.badge}</span>
                        <span style={{ color: 'var(--text-primary)' }}>{row.name}</span>
                      </td>
                      <td className="py-3 px-3" style={{ color: 'var(--text-secondary)' }}>{row.range}</td>
                      <td className="py-3 px-3 font-bold" style={{ color: 'var(--green)' }}>{row.pct}</td>
                      <td className="py-3 px-3 font-bold" style={{ color: 'var(--gold)' }}>{row.discount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
              * Le commissioni si calcolano su ogni rinnovo mensile degli abbonati referral. Minimo 3 abbonati attivi per iniziare a guadagnare.
            </p>
          </div>
        </div>
      </section>

      {/* Form Candidatura */}
      <section ref={formRef} className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Candidatura</div>
            <h2 className="text-3xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>
              Candidati al Programma Affiliati
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Il team El Dorado valuterà la tua candidatura e ti contatterà per email entro 3-5 giorni lavorativi.
            </p>
          </div>

          {success ? (
            <div className="card-premium p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)' }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--green)' }} />
              </div>
              <h3 className="text-xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
                Candidatura inviata con successo!
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Ti contatteremo all&apos;indirizzo <strong style={{ color: 'var(--gold)' }}>{form.email}</strong> entro 3-5 giorni lavorativi.
                <br />Nel frattempo puoi registrarti sulla piattaforma gratuitamente.
              </p>
              <div className="flex gap-3 mt-6 justify-center">
                <Link href="/auth/register" className="btn-gold px-6 py-3">
                  Registrati gratis <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/" className="btn-ghost px-6 py-3">Torna alla Home</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-premium p-8 space-y-6">

              {/* Nome e Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-muted)' }}>Nome e Cognome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Mario Rossi"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="input-premium w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-muted)' }}>Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="mario@example.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="input-premium w-full"
                  />
                </div>
              </div>

              {/* Tipo Creator */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-muted)' }}>Tipo di Creator *</label>
                <select
                  required
                  value={form.creator_type}
                  onChange={e => setForm(p => ({ ...p, creator_type: e.target.value }))}
                  className="input-premium w-full"
                >
                  <option value="">Seleziona categoria…</option>
                  {CREATOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Descrizione community */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-muted)' }}>La tua community *</label>
                <textarea
                  required
                  maxLength={300}
                  rows={3}
                  placeholder="Descrivi brevemente chi è il tuo pubblico e di cosa ti occupi..."
                  value={form.community_desc}
                  onChange={e => setForm(p => ({ ...p, community_desc: e.target.value }))}
                  className="input-premium w-full resize-none"
                />
                <div className="text-right text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
                  {form.community_desc.length}/300
                </div>
              </div>

              {/* Dimensione community */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-muted)' }}>Dimensione Community *</label>
                <select
                  required
                  value={form.community_size}
                  onChange={e => setForm(p => ({ ...p, community_size: e.target.value }))}
                  className="input-premium w-full"
                >
                  <option value="">Seleziona dimensione…</option>
                  {COMMUNITY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Canali */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--text-muted)' }}>Canali Principali *</label>
                <div className="flex flex-wrap gap-2">
                  {CHANNELS.map(ch => {
                    const sel = form.channels.includes(ch)
                    return (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => toggleChannel(ch)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                        style={sel ? {
                          background: 'rgba(240,180,41,0.15)',
                          border: '1px solid rgba(240,180,41,0.4)',
                          color: 'var(--gold)',
                        } : {
                          background: 'var(--surface-2)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {sel && <Check className="w-3 h-3 inline mr-1" />}
                        {ch}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Link principale */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-muted)' }}>Link Principale (opzionale)</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/tuoprofilo"
                  value={form.main_link}
                  onChange={e => setForm(p => ({ ...p, main_link: e.target.value }))}
                  className="input-premium w-full"
                />
              </div>

              {/* Messaggio */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-muted)' }}>Messaggio aggiuntivo (opzionale)</label>
                <textarea
                  maxLength={500}
                  rows={3}
                  placeholder="Vuoi aggiungere qualcosa? Perché pensi di essere un buon fit con El Dorado?"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="input-premium w-full resize-none"
                />
                <div className="text-right text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
                  {form.message.length}/500
                </div>
              </div>

              {/* Consenso */}
              <div className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <button
                  type="button"
                  onClick={() => setForm(p => ({ ...p, accepted: !p.accepted }))}
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                  style={form.accepted ? {
                    background: 'var(--gold)',
                    border: '1px solid var(--gold)',
                  } : {
                    background: 'transparent',
                    border: '1px solid var(--border)',
                  }}
                >
                  {form.accepted && <Check className="w-3 h-3 text-black" />}
                </button>
                <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Accetto che El Dorado conservi i miei dati per valutare la candidatura al programma affiliati. *
                </span>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl text-sm"
                  style={{ background: 'rgba(255,61,113,0.08)', border: '1px solid rgba(255,61,113,0.25)', color: 'var(--red)' }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || form.channels.length === 0}
                className="w-full btn-gold py-4 text-base font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Invio in corso…' : <><Send className="w-5 h-5" /> Invia Candidatura</>}
              </button>

              <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                Riceverai una risposta entro 3-5 giorni lavorativi all&apos;email indicata.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/eldorado.jpg" alt="El Dorado" className="gold-avatar-ring" style={{ width: 30, height: 30 }} />
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>El Dorado</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Metodo · Disciplina · XAU/USD</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
            <Link href="/legal/terms" style={{ color: 'var(--text-muted)' }}>Termini</Link>
            <span style={{ color: 'var(--text-muted)' }}>support@botbosco.com</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2026 El Dorado. Tutti i diritti riservati.
          </p>
        </div>
      </footer>

    </div>
  )
}
