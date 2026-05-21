'use client'

import { TRUSTPILOT_CONFIG } from '@/lib/trustpilot-config'

/* ─── Trustpilot Star SVG ─────────────────────────────────
   Matches Trustpilot's official star design.
   Colors: filled = #00B67A, empty bg = #DCDCE6
   ────────────────────────────────────────────────────────── */

const TP_GREEN = '#00B67A'
const TP_GREEN_LIGHT = '#73CF11'
const TP_EMPTY = '#DCDCE6'

function StarIcon({ filled, half, size = 20 }: { filled: boolean; half?: boolean; size?: number }) {
  const bgColor = filled || half ? TP_GREEN : TP_EMPTY
  const starColor = filled || half ? '#fff' : '#fff'

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="2" fill={bgColor} />
      {half && <rect x="12" width="12" height="24" rx="0" fill={TP_EMPTY} />}
      <path
        d="M12 4.5l2.09 4.26 4.71.69-3.4 3.32.8 4.68L12 15.26l-4.2 2.19.8-4.68-3.4-3.32 4.71-.69L12 4.5z"
        fill={starColor}
      />
    </svg>
  )
}

/* ─── Star Row ────────────────────────────────────────────── */
export function TrustpilotStars({
  rating = TRUSTPILOT_CONFIG.rating,
  size = 20,
  gap = 2,
}: {
  rating?: number
  size?: number
  gap?: number
}) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<StarIcon key={i} filled size={size} />)
    } else if (rating >= i - 0.5) {
      stars.push(<StarIcon key={i} filled={false} half size={size} />)
    } else {
      stars.push(<StarIcon key={i} filled={false} size={size} />)
    }
  }

  return (
    <div className="inline-flex items-center" style={{ gap }}>
      {stars}
    </div>
  )
}

/* ─── Hero Mini Widget ──────────────────────────────────────
   Compact rating display for the hero section:
   [★★★★★] 4.8/5 — 47 recensioni su Trustpilot
   ────────────────────────────────────────────────────────── */
export function TrustpilotHeroWidget({
  reviewsLabel,
}: {
  label?: string
  reviewsLabel: string
}) {
  return (
    <a
      href={TRUSTPILOT_CONFIG.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-200 group"
      style={{
        background: 'rgba(0, 182, 122, 0.06)',
        border: '1px solid rgba(0, 182, 122, 0.15)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(0, 182, 122, 0.10)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 182, 122, 0.30)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(0, 182, 122, 0.06)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 182, 122, 0.15)'
      }}
    >
      <TrustpilotStars size={18} gap={1} />
      <span className="text-xs font-bold" style={{ color: TP_GREEN }}>
        {TRUSTPILOT_CONFIG.rating.toFixed(1)}
      </span>
      <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
        —
      </span>
      <span className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>
        {TRUSTPILOT_CONFIG.totalReviews} {reviewsLabel}
      </span>
      <TrustpilotLogo className="h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}

/* ─── Footer Badge ────────────────────────────────────────── */
export function TrustpilotFooterBadge({
  ratingLabel,
  reviewsLabel,
  ctaLabel,
}: {
  ratingLabel: string
  reviewsLabel: string
  ctaLabel: string
}) {
  return (
    <a
      href={TRUSTPILOT_CONFIG.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl p-4 transition-all duration-200 group"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 182, 122, 0.30)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)'
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <TrustpilotLogo className="h-4" />
        <span className="text-xs font-bold" style={{ color: TP_GREEN }}>
          {ratingLabel}: {TRUSTPILOT_CONFIG.rating.toFixed(1)}/5
        </span>
      </div>
      <TrustpilotStars size={16} gap={1} />
      <p className="text-[10px] mt-2" style={{ color: 'var(--text-muted)' }}>
        {TRUSTPILOT_CONFIG.totalReviews} {reviewsLabel}
      </p>
      <span
        className="text-[10px] font-semibold mt-1 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
        style={{ color: TP_GREEN }}
      >
        {ctaLabel} &rarr;
      </span>
    </a>
  )
}

/* ─── Trustpilot Logo SVG ─────────────────────────────────── */
export function TrustpilotLogo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 126 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M33.605 11.514h-8.92l-2.755-8.483L19.17 11.514l-8.92-.001 7.216 5.244-2.756 8.483 7.216-5.243 7.216 5.243-2.756-8.483 7.216-5.243z" fill={TP_GREEN} />
      <path d="M27.2 18.77l-.94-2.914-4.332 3.148L27.2 18.77z" fill={TP_GREEN_LIGHT} />
      <text x="38" y="22" fill={TP_GREEN} fontFamily="Arial,sans-serif" fontWeight="700" fontSize="16">
        Trustpilot
      </text>
    </svg>
  )
}
