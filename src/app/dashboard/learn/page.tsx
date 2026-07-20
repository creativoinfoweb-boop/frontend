'use client'

import Link from 'next/link'
import { COURSE } from '@/data/course'
import { useLearnStore } from '@/store/learn'
import { useHasActiveSubscription } from '@/hooks/useSubscription'
import { useLanguage } from '@/i18n/LanguageContext'
import EbookCard from '@/components/ebook/EbookCard'
import AnimatedStrategyChart, { ScenarioKey } from '@/components/charts/AnimatedStrategyChart'
import { Lock, Play, Zap, Award } from 'lucide-react'
import { useState } from 'react'

const SCENARIOS: Array<{ key: ScenarioKey; it: string; en: string }> = [
  { key: 'po3', it: 'Power of Three', en: 'Power of Three' },
  { key: 'turtle-model1', it: 'Turtle Soup → Model #1', en: 'Turtle Soup → Model #1' },
  { key: 'kiss-of-death', it: 'Kiss of Death', en: 'Kiss of Death' },
  { key: 'order-block', it: 'Order Block', en: 'Order Block' },
  { key: 'fvg', it: 'Fair Value Gap', en: 'Fair Value Gap' },
]

function StrategyLab({ lang }: { lang: string }) {
  const [active, setActive] = useState<ScenarioKey>('po3')
  const en = lang === 'en'
  return (
    <div className="mb-12 animate-fade-in-up">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>
            {en ? 'The strategy, live' : 'La strategia, dal vivo'}
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {en
              ? 'Watch each concept draw itself on the chart, candle by candle.'
              : 'Guarda ogni concetto disegnarsi sul grafico, candela dopo candela.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SCENARIOS.map(s => (
            <button key={s.key} onClick={() => setActive(s.key)}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold transition-all"
              style={active === s.key
                ? { background: 'var(--gold)', color: '#0A0A14' }
                : { background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              {en ? s.en : s.it}
            </button>
          ))}
        </div>
      </div>
      <AnimatedStrategyChart key={active} scenario={active} lang={lang} />
    </div>
  )
}

export default function LearnHub() {
  const store = useLearnStore()
  const { hasActive } = useHasActiveSubscription()
  const { lang } = useLanguage()

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-3 inline-block px-3 py-1 rounded-full" style={{ background: 'var(--gold-subtle)', border: '1px solid var(--border-gold)' }}>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Sistema di Apprendimento</span>
          </div>
          <h1 className="text-4xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>Il tuo percorso educativo</h1>
          <p className="max-w-xl text-sm" style={{ color: 'var(--text-secondary)' }}>7 moduli, 47 lezioni. Dai fondamenti all'automatizzazione completa.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Lezioni completate', value: store.completedLessons.length, icon: Play, color: 'var(--green)' },
            { label: 'XP accumulati', value: store.xp, icon: Zap, color: 'var(--gold)' },
            { label: 'Streak', value: `${store.streak}gg`, icon: Award, color: 'var(--gold)' }
          ].map(stat => (
            <div key={stat.label} className="card-premium p-4" style={{ background: 'var(--glass-bg)' }}>
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
              </div>
              <div className="text-2xl font-black font-mono" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Laboratorio strategia — grafici animati */}
        <StrategyLab lang={lang} />

        {/* eBook CRT Secrets — sbloccato solo con piano attivo */}
        <div className="mb-12">
          <EbookCard variant="learn" />
        </div>

        {/* Moduli Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSE.map(mod => {
            const progress = store.getModuleProgress(mod.id, mod.lessons.length)
            const canAccess = !mod.isPremium || hasActive
            return (
              <Link
                key={mod.id}
                href={canAccess ? `/dashboard/learn/${mod.slug}` : '#'}
                className={`card-premium p-6 flex flex-col transition-all ${canAccess ? 'hover:border-gold cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black font-mono" style={{ opacity: 0.15, color: 'var(--gold)' }}>{mod.id}</span>
                  {mod.isPremium && <Lock className="w-4 h-4" style={{ color: 'var(--gold)' }} />}
                </div>
                <h3 className="font-bold mb-1 text-sm" style={{ color: 'var(--text-primary)' }}>{mod.title}</h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>{mod.description}</p>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full mb-2" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'var(--gold)' }} />
                </div>
                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{progress}% completato</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
