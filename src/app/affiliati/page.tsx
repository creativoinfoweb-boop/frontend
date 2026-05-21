'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Check, Star, Users, TrendingUp,
  Headphones, Gift, ChevronRight, Send, AlertCircle, CheckCircle2,
} from 'lucide-react'
import PublicPageNav from '@/components/PublicPageNav'
import { useLanguage } from '@/i18n/LanguageContext'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const BASE_URL = typeof window !== 'undefined' && window.location.protocol === 'https:'
  ? '/api'
  : API_URL

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
  const { t } = useLanguage()
  const a = t.affiliati

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

  const toggleChannel = (ch: string) => {
    setForm(prev => ({
      ...prev,
      channels: prev.channels.includes(ch) ? prev.channels.filter(c => c !== ch) : [...prev.channels, ch],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.accepted) { setError(a.errorConsent); return }
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
      if (!res.ok) { const d = await res.json(); throw new Error(d.detail || a.formError) }
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || a.formError)
    } finally {
      setLoading(false)
    }
  }

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const BENEFIT_STYLES = [
    { color: 'var(--green)', bg: 'rgba(0,230,118,0.08)', border: 'rgba(0,230,118,0.25)' },
    { color: 'var(--gold)', bg: 'rgba(240,180,41,0.08)', border: 'rgba(240,180,41,0.25)' },
    { color: '#00C2FF', bg: 'rgba(0,194,255,0.08)', border: 'rgba(0,194,255,0.25)' },
    { color: '#A78BFA', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      {/* Top accent bar */}
      <div className="h-[2px] w-full fixed top-0 z-[60]"
        style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }} />

      {/* Navigation with language selector */}
      <PublicPageNav showMethod={true} showAbout={true} />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(ellipse, var(--gold), transparent 70%)' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.3)', color: 'var(--gold)' }}>
            <Star className="w-3.5 h-3.5" />
            {a.heroLabel}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            <span style={{ color: 'var(--text-primary)' }}>{a.heroTitle1}</span>
            <span style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Valorox</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
            {a.heroSubtitle}
          </p>

          <p className="text-base max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {a.heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToForm} className="btn-gold text-base px-8 py-4 flex items-center gap-2">
              {a.heroCta} <ChevronRight className="w-5 h-5" />
            </button>
            <Link href="/auth/register" className="btn-ghost text-base px-8 py-4">
              {a.heroSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mb-3">{a.howLabel}</div>
            <h2 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{a.howTitle}</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[Send, Users, TrendingUp].map((Icon, i) => (
              <div key={i} className="card-premium p-6 text-center relative">
                <div className="absolute top-4 right-4 text-5xl font-black opacity-[0.04]"
                  style={{ color: 'var(--gold)', fontFamily: 'var(--font-inter)' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.25)' }}>
                  <Icon className="w-7 h-7" style={{ color: 'var(--gold)' }} />
                </div>
                <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                  Step {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-black mb-2" style={{ color: 'var(--text-primary)' }}>{a.howSteps[i].title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{a.howSteps[i].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefici */}
      <section className="py-20 px-4" style={{ background: 'var(--surface-1)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mb-3">{a.benefitsLabel}</div>
            <h2 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{a.benefitsTitle}</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[TrendingUp, Gift, Users, Headphones].map((Icon, i) => {
              const b = a.benefits[i]
              const s = BENEFIT_STYLES[i]
              return (
                <div key={i} className="card-premium p-6 flex items-start gap-5"
                  style={{ border: `1px solid ${s.border}` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                    <Icon className="w-6 h-6" style={{ color: s.color }} />
                  </div>
                  <div>
                    <h3 className="font-black mb-1.5" style={{ color: 'var(--text-primary)' }}>{b.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{b.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Tier table */}
          <div className="mt-10 card-premium p-6">
            <div className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {a.tierTitle}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {a.tierHeaders.map((h: string) => (
                      <th key={h} className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {a.tierRows.map((row: { badge: string; name: string; range: string; pct: string; discount: string }) => (
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
              {a.tierNote}
            </p>
          </div>
        </div>
      </section>

      {/* Form Candidatura */}
      <section ref={formRef} className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-3">{a.formLabel}</div>
            <h2 className="text-3xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>
              {a.formTitle}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {a.formDesc}
            </p>
          </div>

          {success ? (
            <div className="card-premium p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)' }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--green)' }} />
              </div>
              <h3 className="text-xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
                {a.successTitle}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {a.successDesc1} <strong>{form.email}</strong> {a.successDesc2}
              </p>
              <div className="flex gap-3 mt-6 justify-center">
                <Link href="/auth/register" className="btn-gold px-6 py-3 flex items-center gap-2">
                  {a.successRegister} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/" className="btn-ghost px-6 py-3">{a.successHome}</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-premium p-8 space-y-6">

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-muted)' }}>{a.fieldName}</label>
                  <input type="text" required
                    value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="input-premium w-full" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-muted)' }}>{a.fieldEmail}</label>
                  <input type="email" required placeholder="mario@example.com"
                    value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="input-premium w-full" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-muted)' }}>{a.fieldCreatorType}</label>
                <select required value={form.creator_type}
                  onChange={e => setForm(p => ({ ...p, creator_type: e.target.value }))}
                  className="input-premium w-full">
                  <option value="">{a.fieldCreatorTypePlaceholder}</option>
                  {a.creatorTypes.map((ct: string) => <option key={ct} value={ct}>{ct}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-muted)' }}>{a.fieldCommunity}</label>
                <textarea required maxLength={300} rows={3} placeholder={a.fieldCommunityPlaceholder}
                  value={form.community_desc} onChange={e => setForm(p => ({ ...p, community_desc: e.target.value }))}
                  className="input-premium w-full resize-none" />
                <div className="text-right text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
                  {form.community_desc.length}/300
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-muted)' }}>{a.fieldCommunitySize}</label>
                <select required value={form.community_size}
                  onChange={e => setForm(p => ({ ...p, community_size: e.target.value }))}
                  className="input-premium w-full">
                  <option value="">{a.fieldCommunitySizePlaceholder}</option>
                  {a.communitySizes.map((s: string) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--text-muted)' }}>{a.fieldChannels}</label>
                <div className="flex flex-wrap gap-2">
                  {a.channels.map((ch: string) => {
                    const sel = form.channels.includes(ch)
                    return (
                      <button key={ch} type="button" onClick={() => toggleChannel(ch)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                        style={sel ? {
                          background: 'rgba(240,180,41,0.15)', border: '1px solid rgba(240,180,41,0.4)', color: 'var(--gold)',
                        } : {
                          background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-secondary)',
                        }}>
                        {sel && <Check className="w-3 h-3 inline mr-1" />}
                        {ch}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-muted)' }}>{a.fieldMainLink}</label>
                <input type="url" placeholder="https://instagram.com/tuoprofilo"
                  value={form.main_link} onChange={e => setForm(p => ({ ...p, main_link: e.target.value }))}
                  className="input-premium w-full" />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-muted)' }}>{a.fieldMessage}</label>
                <textarea maxLength={500} rows={3} placeholder={a.fieldMessagePlaceholder}
                  value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="input-premium w-full resize-none" />
                <div className="text-right text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
                  {form.message.length}/500
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <button type="button" onClick={() => setForm(p => ({ ...p, accepted: !p.accepted }))}
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                  style={form.accepted ? { background: 'var(--gold)', border: '1px solid var(--gold)' } : { background: 'transparent', border: '1px solid var(--border)' }}>
                  {form.accepted && <Check className="w-3 h-3 text-black" />}
                </button>
                <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {a.fieldConsent}
                </span>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl text-sm"
                  style={{ background: 'rgba(255,61,113,0.08)', border: '1px solid rgba(255,61,113,0.25)', color: 'var(--red)' }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading || form.channels.length === 0}
                className="w-full btn-gold py-4 text-base font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? a.submitting : <><Send className="w-5 h-5" /> {a.submitBtn}</>}
              </button>

              <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                {a.replyNote}
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
            <img src="/valoroxoro.svg" alt="Valorox" className="gold-avatar-ring" style={{ width: 32, height: 32 }} />
            <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-brand)', letterSpacing: '0.12em', background: 'linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-dark))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Valorox</span>
          </div>
          <div className="flex flex-wrap gap-6 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <Link href="/metodo" className="hover:opacity-70 transition-opacity">{t.nav.method}</Link>
            <Link href="/chi-siamo" className="hover:opacity-70 transition-opacity">{t.nav.about}</Link>
            <Link href="/legal/terms" className="hover:opacity-70 transition-opacity">{a.footerTerms}</Link>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{a.footerCopy}</p>
        </div>
      </footer>
    </div>
  )
}
