'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getLesson, getNextLesson, getModule } from '@/data/course'
import { useLearnStore } from '@/store/learn'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'

export default function LessonPage() {
  const params = useParams()
  const moduleId = params.moduleId as string
  const lessonId = params.lessonId as string
  const lesson = getLesson(moduleId, lessonId)
  const mod = getModule(moduleId)
  const store = useLearnStore()
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  if (!lesson || !mod) return <div className="p-8">Lezione non trovata</div>

  const isCompleted = store.isLessonCompleted(lesson.id)
  const nextLesson = getNextLesson(moduleId, lessonId)
  const quizScore = Object.values(quizAnswers).reduce((sum, idx, i) => sum + (lesson.quiz[i]?.correctIndex === idx ? 1 : 0), 0)
  const quizPass = Math.round((quizScore / lesson.quiz.length) * 100) >= 75

  const handleQuizSubmit = () => {
    if (!isCompleted) {
      store.markLessonCompleted(lesson.id, Math.round((quizScore / lesson.quiz.length) * 100))
    }
    setQuizSubmitted(true)
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs" style={{ color: 'var(--text-muted)' }}>
          <Link href="/dashboard/learn">Impara</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/dashboard/learn/${mod.slug}`}>{mod.title}</Link>
          <ChevronRight className="w-3 h-3" />
          <span>{lesson.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>{lesson.title}</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{lesson.summary}</p>
            </div>
            {isCompleted && <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'var(--green-subtle)', border: '1px solid var(--green)' }}>
              <Check className="w-3.5 h-3.5" style={{ color: 'var(--green)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--green)' }}>Completata</span>
            </div>}
          </div>
          <div className="flex gap-6 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>⏱ {lesson.estimatedMinutes} min</span>
            <span>✨ {quizPass || isCompleted ? '+100 XP' : '+50 XP'}</span>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="card-premium p-8 mb-8 space-y-6">
          {lesson.blocks.map((block, i) => {
            if (block.type === 'heading') return <h2 key={i} className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{block.text}</h2>
            if (block.type === 'paragraph') return <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{block.text}</p>
            if (block.type === 'list') return <ul key={i} className="space-y-2 text-sm">
              {block.items.map((item, j) => <li key={j} className="flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--gold)' }}>·</span> {item}
              </li>)}
            </ul>
            if (block.type === 'callout') return <div key={i} className="p-4 rounded-lg" style={{ background: block.variant === 'info' ? 'rgba(240,180,41,0.08)' : 'rgba(255,61,113,0.08)', border: `1px solid ${block.variant === 'info' ? 'rgba(240,180,41,0.2)' : 'rgba(255,61,113,0.2)'}` }}>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{block.text}</p>
            </div>
            if (block.type === 'example') return <div key={i} className="p-4 rounded-lg" style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-bold mb-1" style={{ color: 'var(--gold)' }}>{block.title}</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{block.body}</p>
            </div>
            return null
          })}
        </div>

        {/* Quiz */}
        <div className="card-premium p-8 mb-8">
          <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Quiz di verifica</h2>
          <div className="space-y-6">
            {lesson.quiz.map((q, i) => (
              <div key={q.id} className="space-y-3">
                <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{i + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, j) => (
                    <button
                      key={j}
                      onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [i]: j })}
                      disabled={quizSubmitted}
                      className="w-full text-left p-3 rounded-lg text-sm transition-all"
                      style={{
                        background: quizAnswers[i] === j ? 'var(--gold-subtle)' : 'var(--glass-bg)',
                        border: `1px solid ${quizAnswers[i] === j ? 'var(--border-gold)' : 'var(--border)'}`,
                        color: 'var(--text-secondary)',
                        opacity: quizSubmitted && q.correctIndex !== j ? 0.5 : 1,
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {quizSubmitted && <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>{q.explanation}</p>}
              </div>
            ))}
          </div>

          {!quizSubmitted ? (
            <button onClick={handleQuizSubmit} className="mt-6 btn-gold w-full text-sm">
              Verifica risposte
            </button>
          ) : (
            <div className="mt-6 p-4 rounded-lg text-center" style={{ background: quizPass ? 'rgba(0,230,118,0.1)' : 'rgba(255,61,113,0.1)', border: `1px solid ${quizPass ? 'rgba(0,230,118,0.2)' : 'rgba(255,61,113,0.2)'}` }}>
              <p className="text-sm font-bold" style={{ color: quizPass ? 'var(--green)' : 'var(--red)' }}>
                {quizPass ? `✓ Passato! ${quizScore}/${lesson.quiz.length} risposte corrette` : `Riprova — hai fatto ${quizScore}/${lesson.quiz.length}. Serve il 75%.`}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        {quizPass || isCompleted ? (
          <div className="flex gap-4">
            <Link href={`/dashboard/learn/${mod.slug}`} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium" style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <ChevronLeft className="w-4 h-4" /> Indietro
            </Link>
            {nextLesson && (
              <Link href={`/dashboard/learn/${nextLesson.moduleId}/${nextLesson.id}`} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold btn-gold">
                Prossima <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
