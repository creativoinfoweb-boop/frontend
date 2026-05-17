'use client'

import Link from 'next/link'
import {
  Shield, Brain, Clock,
  AlertTriangle, Zap, Target, BarChart3, ArrowRight,
  Bot, GraduationCap, CheckCircle2, XCircle, Activity,
  BookOpen,
} from 'lucide-react'
import PublicPageNav from '@/components/PublicPageNav'
import { useLanguage } from '@/i18n/LanguageContext'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3"
      style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)', color: 'var(--gold)' }}>
      {children}
    </span>
  )
}

function InfoCard({ title, children, accent = 'gold' }: { title: string; children: React.ReactNode; accent?: 'gold' | 'green' | 'red' | 'blue' }) {
  const colors = {
    gold: { bg: 'rgba(240,180,41,0.05)', border: 'rgba(240,180,41,0.18)', title: 'var(--gold)' },
    green: { bg: 'rgba(0,230,118,0.05)', border: 'rgba(0,230,118,0.18)', title: 'var(--green)' },
    red: { bg: 'rgba(255,61,113,0.05)', border: 'rgba(255,61,113,0.18)', title: '#FF3D71' },
    blue: { bg: 'rgba(0,194,255,0.05)', border: 'rgba(0,194,255,0.18)', title: '#00C2FF' },
  }
  const c = colors[accent]
  return (
    <div className="rounded-xl p-5" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <p className="text-sm font-bold mb-2" style={{ color: c.title }}>{title}</p>
      <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{children}</div>
    </div>
  )
}

export default function MetodoContent() {
  const { t } = useLanguage()
  const m = t.metodo

  const s02Accents: Array<'gold' | 'blue' | 'green' | 'red'> = ['gold', 'blue', 'gold', 'blue']
  const s04Accents: Array<'gold' | 'blue' | 'green' | 'red'> = ['gold', 'blue', 'green', 'gold']
  const s06Accents: Array<'gold' | 'blue' | 'green' | 'red'> = ['gold', 'red', 'blue', 'green']

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <div className="fixed top-0 w-full h-[2px] z-[60]"
        style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }} />

      <PublicPageNav showMethod={false} showAbout={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-20">

        {/* Hero */}
        <div className="text-center space-y-5">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
              <Bot className="w-7 h-7" style={{ color: 'var(--gold)' }} />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black">
            <span style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {m.heroTitle}
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {m.heroDesc}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
            style={{ background: 'rgba(255,61,113,0.07)', border: '1px solid rgba(255,61,113,0.2)', color: '#FF6B6B' }}>
            <AlertTriangle className="w-3.5 h-3.5" />
            {m.heroDisclaimer}
          </div>
        </div>

        {/* Quick nav */}
        <div className="flex flex-wrap gap-2 justify-center">
          {m.quickNav.map((item: { label: string; href: string }) => (
            <a key={item.href} href={item.href}
              className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              {item.label}
            </a>
          ))}
        </div>

        {/* 01 Il problema */}
        <section id="problema" className="space-y-6 scroll-mt-20">
          <SectionLabel>{m.s01Label}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">{m.s01Title}</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.s01Desc}</p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[Brain, Zap, Activity].map((Icon, i) => (
              <div key={i} className="card-premium p-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
                  <Icon className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                </div>
                <h3 className="font-bold mb-2 text-sm" style={{ color: 'var(--text-primary)' }}>{m.s01Cards[i].title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.s01Cards[i].desc}</p>
              </div>
            ))}
          </div>

          <InfoCard title={m.s01Solution} accent="green">
            {m.s01SolutionDesc}
          </InfoCard>
        </section>

        {/* 02 Il Metodo SMC */}
        <section id="metodo" className="space-y-6 scroll-mt-20">
          <SectionLabel>{m.s02Label}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">{m.s02Title}</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.s02Desc}</p>

          <div className="grid sm:grid-cols-2 gap-4">
            {m.s02Cards.map((card: { title: string; desc: string }, i: number) => (
              <InfoCard key={i} title={card.title} accent={s02Accents[i]}>
                {card.desc}
              </InfoCard>
            ))}
          </div>

          <div className="rounded-2xl p-5" style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.12)' }}>
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--gold)' }}>{m.s02CourseTitle}</p>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{m.s02CourseDesc}</p>
            <Link href="/dashboard/learn" className="inline-flex items-center gap-2 text-xs font-bold transition-opacity hover:opacity-70"
              style={{ color: 'var(--gold)' }}>
              <GraduationCap className="w-3.5 h-3.5" />
              {m.s02CourseLink}
            </Link>
          </div>
        </section>

        {/* 03 La Strategia */}
        <section id="strategia" className="space-y-6 scroll-mt-20">
          <SectionLabel>{m.s03Label}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">{m.s03Title}</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.s03Desc}</p>

          <div className="space-y-3">
            {m.s03Steps.map((step: { num: string; title: string; desc: string }, i: number) => (
              <div key={i} className="card-premium p-6 flex gap-5">
                <span className="text-3xl font-black font-mono flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)', opacity: 0.2 }}>{step.num}</span>
                <div>
                  <h3 className="font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard title={m.s03CrtTitle} accent="blue">
              {m.s03CrtDesc}
            </InfoCard>
            <InfoCard title={m.s03FilterTitle} accent="green">
              {m.s03FilterDesc}
            </InfoCard>
          </div>
        </section>

        {/* 04 Stili di esecuzione adattivi */}
        <section id="stili" className="space-y-6 scroll-mt-20">
          <SectionLabel>{m.s04Label}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">{m.s04Title}</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.s04Desc}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {m.s04Cards.map((card: { title: string; desc: string }, i: number) => (
              <InfoCard key={i} title={card.title} accent={s04Accents[i]}>
                {card.desc}
              </InfoCard>
            ))}
          </div>

          <div className="card-premium p-6 space-y-3">
            <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{m.s04CapTitle}</h3>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>{m.s04Cap1}</p>
              <p>{m.s04Cap2}</p>
              <p>{m.s04Cap3}</p>
            </div>
          </div>
        </section>

        {/* 05 Automazione */}
        <section id="automazione" className="space-y-6 scroll-mt-20">
          <SectionLabel>{m.s05Label}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">{m.s05Title}</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.s05Desc}</p>

          <div className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.15)' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--gold)' }}>{m.s05HowTitle}</p>
            <div className="space-y-3">
              {m.s05Steps.map((text: string, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black mt-0.5"
                    style={{ background: 'rgba(240,180,41,0.15)', color: 'var(--gold)' }}>{i + 1}</span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[Bot, Clock, Shield].map((Icon, i) => (
              <div key={i} className="card-premium p-5 text-center">
                <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--gold)' }} />
                <p className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{m.s05Cards[i].title}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{m.s05Cards[i].desc}</p>
              </div>
            ))}
          </div>

          {/* Manual vs automated */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid grid-cols-2">
              <div className="p-5" style={{ borderRight: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-4 h-4" style={{ color: '#FF3D71' }} />
                  <p className="text-sm font-bold" style={{ color: '#FF3D71' }}>{m.s05ManualTitle}</p>
                </div>
                <ul className="space-y-2">
                  {m.s05ManualItems.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: '#FF3D71' }}>—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--green)' }} />
                  <p className="text-sm font-bold" style={{ color: 'var(--green)' }}>{m.s05AutoTitle}</p>
                </div>
                <ul className="space-y-2">
                  {m.s05AutoItems.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--green)' }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 06 Risk Management */}
        <section id="risk" className="space-y-6 scroll-mt-20">
          <SectionLabel>{m.s06Label}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">{m.s06Title}</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.s06Desc}</p>

          <div className="grid sm:grid-cols-2 gap-4">
            {m.s06Cards.map((card: { title: string; desc: string }, i: number) => (
              <InfoCard key={i} title={card.title} accent={s06Accents[i]}>
                {card.desc}
              </InfoCard>
            ))}
          </div>

          <div className="rounded-xl p-5 text-center" style={{ background: 'rgba(255,61,113,0.04)', border: '1px solid rgba(255,61,113,0.15)' }}>
            <AlertTriangle className="w-5 h-5 mx-auto mb-2" style={{ color: '#FF6B6B' }} />
            <p className="text-sm font-bold mb-1" style={{ color: '#FF6B6B' }}>{m.s06RiskTitle}</p>
            <p className="text-xs leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              {m.s06RiskDesc}
            </p>
          </div>
        </section>

        {/* 07 Demo */}
        <section id="demo" className="space-y-6 scroll-mt-20">
          <SectionLabel>{m.s07Label}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">{m.s07Title}</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.s07Desc}</p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[GraduationCap, Target, BarChart3].map((Icon, i) => (
              <div key={i} className="card-premium p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
                    <Icon className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                  </div>
                  <span className="text-3xl font-black font-mono" style={{ opacity: 0.1, color: 'var(--gold)' }}>{m.s07Steps[i].num}</span>
                </div>
                <h3 className="font-bold mb-2 text-sm" style={{ color: 'var(--text-primary)' }}>{m.s07Steps[i].title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.s07Steps[i].desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-3xl p-8 sm:p-12 text-center space-y-5"
          style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.15)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/valoroxoro.svg" alt="Valorox" className="gold-avatar-ring mx-auto" style={{ width: 64, height: 64 }} />
          <h2 className="text-3xl font-black">
            <span style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {m.ctaTitle}
            </span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {m.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/auth/register" className="btn-gold text-sm px-8 py-3 rounded-xl">
              {m.ctaStart}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/dashboard/learn"
              className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-3 rounded-xl transition-all"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <BookOpen className="w-4 h-4" />
              {m.ctaLearn}
            </Link>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {m.ctaDisclaimer}
          </p>
        </section>

      </div>

      {/* Footer minimal */}
      <footer className="py-8 px-4 text-center" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex flex-wrap gap-4 justify-center text-xs" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <Link href="/chi-siamo" className="hover:opacity-70 transition-opacity">{t.nav.about}</Link>
          {m.footerLinks.map((link: { label: string; href: string }) => (
            <Link key={link.href} href={link.href} className="hover:opacity-70 transition-opacity">{link.label}</Link>
          ))}
        </div>
        <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
          {m.footerCopy}
        </p>
      </footer>
    </div>
  )
}
