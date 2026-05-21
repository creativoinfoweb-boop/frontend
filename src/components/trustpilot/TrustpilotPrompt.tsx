'use client'

import { useState, useEffect } from 'react'
import { X, Star, ExternalLink, MessageSquare } from 'lucide-react'
import { TRUSTPILOT_CONFIG } from '@/lib/trustpilot-config'
import { TrustpilotLogo } from './TrustpilotStars'
import { useLanguage } from '@/i18n/LanguageContext'

const STORAGE_KEY = 'valorox-tp-prompt'
const MIN_DAYS_ACTIVE = 7

/**
 * TrustpilotPrompt — Dashboard component for the satisfaction redirect system
 *
 * Shows a subtle banner after the user has been active for 7+ days.
 * - If user rates 4-5 stars → redirect to Trustpilot review page
 * - If user rates 1-3 stars → show support contact info
 * - Can be dismissed (won't show again for 30 days)
 *
 * Trigger conditions:
 * 1. User registered >= MIN_DAYS_ACTIVE days ago
 * 2. User hasn't dismissed or completed the prompt recently
 */
export function TrustpilotPrompt({ registeredAt }: { registeredAt?: string }) {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [phase, setPhase] = useState<'ask' | 'positive' | 'negative'>('ask')

  useEffect(() => {
    // Check if we should show
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      // If dismissed, check if 30 days have passed
      if (data.dismissed) {
        const dismissedAt = new Date(data.dismissedAt).getTime()
        const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24)
        if (daysSince < 30) return
      }
      // If already reviewed, never show again
      if (data.reviewed) return
    }

    // Check if user has been active long enough
    if (registeredAt) {
      const regDate = new Date(registeredAt).getTime()
      const daysSinceReg = (Date.now() - regDate) / (1000 * 60 * 60 * 24)
      if (daysSinceReg < MIN_DAYS_ACTIVE) return
    }

    // Small delay before showing
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [registeredAt])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      dismissed: true,
      dismissedAt: new Date().toISOString(),
    }))
    setVisible(false)
  }

  const handleRating = (rating: number) => {
    setSelectedRating(rating)
    if (rating >= 4) {
      setPhase('positive')
    } else {
      setPhase('negative')
    }
  }

  const goToTrustpilot = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ reviewed: true }))
    window.open(TRUSTPILOT_CONFIG.reviewUrl, '_blank', 'noopener,noreferrer')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="rounded-xl p-5 mb-6 relative animate-fade-in-up"
      style={{
        background: 'linear-gradient(135deg, rgba(0,182,122,0.04), rgba(0,182,122,0.01))',
        border: '1px solid rgba(0,182,122,0.15)',
      }}
    >
      {/* Dismiss */}
      <button
        onClick={dismiss}
        className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-70"
        style={{ color: 'var(--text-muted)', background: 'rgba(0,0,0,0.05)' }}
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {phase === 'ask' && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <TrustpilotLogo className="h-4" />
            </div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t.trustpilot.promptTitle}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              {t.trustpilot.promptDesc}
            </p>
          </div>

          {/* Interactive star rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <button
                key={i}
                onClick={() => handleRating(i)}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{
                  background: (hoverRating >= i || selectedRating >= i)
                    ? 'rgba(0,182,122,0.15)'
                    : 'rgba(0,0,0,0.04)',
                  border: `1px solid ${(hoverRating >= i || selectedRating >= i)
                    ? 'rgba(0,182,122,0.35)'
                    : 'var(--border)'}`,
                }}
              >
                <Star
                  className="w-5 h-5"
                  style={{
                    color: (hoverRating >= i || selectedRating >= i) ? '#00B67A' : 'var(--text-muted)',
                    fill: (hoverRating >= i || selectedRating >= i) ? '#00B67A' : 'none',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'positive' && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: '#00B67A' }}>
              {t.trustpilot.thankYou}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              {t.trustpilot.positiveMsg}
            </p>
          </div>
          <button
            onClick={goToTrustpilot}
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all flex-shrink-0"
            style={{
              background: '#00B67A',
              color: '#fff',
            }}
          >
            <ExternalLink className="w-4 h-4" />
            {t.trustpilot.leaveReview}
          </button>
        </div>
      )}

      {phase === 'negative' && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t.trustpilot.sorryTitle}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              {t.trustpilot.negativeMsg}
            </p>
          </div>
          <a
            href="mailto:valoroxinfo@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all flex-shrink-0"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            <MessageSquare className="w-4 h-4" />
            {t.trustpilot.contactSupport}
          </a>
        </div>
      )}
    </div>
  )
}
