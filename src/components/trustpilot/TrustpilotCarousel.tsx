'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { TRUSTPILOT_CONFIG, TRUSTPILOT_REVIEWS, type TrustpilotReview } from '@/lib/trustpilot-config'
import { TrustpilotStars, TrustpilotLogo } from './TrustpilotStars'

/* ─── Single Review Card ──────────────────────────────────── */
function ReviewCard({ review }: { review: TrustpilotReview }) {
  return (
    <div
      className="card-premium p-6 flex flex-col min-w-[280px] max-w-[340px] flex-shrink-0 snap-start"
      style={{ minHeight: '220px' }}
    >
      {/* Header: stars + date */}
      <div className="flex items-center justify-between mb-3">
        <TrustpilotStars rating={review.rating} size={16} gap={1} />
        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
          {new Date(review.date).toLocaleDateString('it-IT', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
        {review.title}
      </h4>

      {/* Body */}
      <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
        {review.text}
      </p>

      {/* Author */}
      <div className="flex items-center gap-2 mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
        {/* Avatar circle with initial */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
          style={{ background: 'rgba(0,182,122,0.12)', color: '#00B67A' }}
        >
          {review.author.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
            {review.author}
          </p>
          {review.verified && (
            <p className="text-[9px] font-medium" style={{ color: '#00B67A' }}>
              Verified
            </p>
          )}
        </div>
        {review.country && (
          <span className={`fi fi-${review.country}`} style={{ width: '1.2em', height: '0.9em', display: 'inline-block', opacity: 0.6 }} />
        )}
      </div>
    </div>
  )
}

/* ─── Reviews Carousel Section ────────────────────────────── */
export function TrustpilotCarousel({
  sectionLabel,
  title,
  subtitle,
  ctaText,
}: {
  sectionLabel: string
  title: string
  subtitle: string
  ctaText: string
}) {
  const reviews = TRUSTPILOT_REVIEWS
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true })
      return () => el.removeEventListener('scroll', checkScroll)
    }
  }, [checkScroll])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = 360
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  // Don't render section if no reviews
  if (reviews.length === 0) return null

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--surface-overlay)' }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label mb-3">{sectionLabel}</div>
          <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
            {title}
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {subtitle}
          </p>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <TrustpilotLogo className="h-5" />
            <TrustpilotStars size={22} gap={2} />
            <span className="text-sm font-bold" style={{ color: '#00B67A' }}>
              {TRUSTPILOT_CONFIG.rating.toFixed(1)}/5
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              ({TRUSTPILOT_CONFIG.totalReviews})
            </span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          {reviews.length > 3 && (
            <>
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hidden md:flex"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'blur(12px)',
                  opacity: canScrollLeft ? 1 : 0.3,
                  cursor: canScrollLeft ? 'pointer' : 'default',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <ChevronLeft className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hidden md:flex"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'blur(12px)',
                  opacity: canScrollRight ? 1 : 0.3,
                  cursor: canScrollRight ? 'pointer' : 'default',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <ChevronRight className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </button>
            </>
          )}

          {/* Cards container */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin"
            style={{ scrollPaddingLeft: '1rem' }}
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={TRUSTPILOT_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:opacity-80"
            style={{ color: '#00B67A' }}
          >
            <ExternalLink className="w-4 h-4" />
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  )
}
