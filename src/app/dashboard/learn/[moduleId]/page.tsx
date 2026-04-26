'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getModule } from '@/data/course'
import { useLearnStore } from '@/store/learn'
import { useHasActiveSubscription } from '@/hooks/useSubscription'
import { ChevronRight, Lock } from 'lucide-react'

export default function ModulePage() {
  const params = useParams()
  const moduleId = params.moduleId as string
  const mod = getModule(moduleId)
  const store = useLearnStore()
  const { hasActive } = useHasActiveSubscription()

  if (!mod) return <div className="p-8">Modulo non trovato</div>

  const canAccess = !mod.isPremium || hasActive
  const progress = store.getModuleProgress(mod.id, mod.lessons.length)

  if (!canAccess) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <Lock className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--gold)' }} />
          <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>Il metodo diventa automatico</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Hai imparato la teoria. Ora vedi il Sistema AI El Dorado applicarlo 24/5 — senza emotività, senza eccezioni.
          </p>
          <ul className="text-left text-sm mb-8 space-y-3 inline-block">
            {[
              'Strategia SMC eseguita 24/7 su XAU/USD',
              'Risk management 1–3% automatico',
              'Nessun software da installare',
              'Dashboard in tempo reale',
              'Stop loss e take profit gestiti dal sistema',
            ].map(item => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-base" style={{ color: 'var(--green)' }}>✓</span>
                <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
              </li>
            ))}
          </ul>
          <Link href="/dashboard/billing" className="btn-gold text-sm px-8 py-3 block">
            Attiva il Sistema AI →
          </Link>
          <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>Conto demo gratuito disponibile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs" style={{ color: 'var(--text-muted)' }}>
          <Link href="/dashboard/learn">Impara</Link>
          <ChevronRight className="w-3 h-3" />
          <span>{mod.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 inline-block px-3 py-1 rounded-full" style={{ background: 'var(--gold-subtle)', border: '1px solid var(--border-gold)' }}>
            <span className="text-xs font-bold tracking-widest" style={{ color: 'var(--gold)' }}>Modulo {mod.order}</span>
          </div>
          <h1 className="text-4xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>{mod.title}</h1>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>{mod.description}</p>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full" style={{ background: 'var(--border)' }}>
            <div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'var(--gold)' }} />
          </div>
          <span className="text-xs mt-2 inline-block" style={{ color: 'var(--text-muted)' }}>{progress}% completato — {mod.lessons.filter(l => store.isLessonCompleted(l.id)).length} / {mod.lessons.length} lezioni</span>
        </div>

        {/* Lezioni */}
        <div className="space-y-3">
          {mod.lessons.map((lesson, idx) => {
            const isCompleted = store.isLessonCompleted(lesson.id)
            return (
              <Link
                key={lesson.id}
                href={`/dashboard/learn/${mod.slug}/${lesson.id}`}
                className="block card-premium p-4 transition-all hover:border-gold group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: isCompleted ? 'var(--green-subtle)' : 'var(--glass-bg)', border: `1px solid ${isCompleted ? 'var(--green)' : 'var(--border)'}` }}>
                    {isCompleted ? <span style={{ color: 'var(--green)', fontSize: '14px' }}>✓</span> : <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{idx + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{lesson.title}</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{lesson.estimatedMinutes} min • {lesson.summary}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-secondary)' }} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
