/**
 * Trustpilot Configuration
 *
 * IMPORTANT: Replace BUSINESS_UNIT_ID with your real Trustpilot Business Unit ID
 * once your Trustpilot Business page is verified.
 *
 * To find your Business Unit ID:
 * 1. Log into Trustpilot Business (https://businessapp.b2b.trustpilot.com)
 * 2. Go to Settings → Integrations → TrustBox
 * 3. Copy the data-businessunit-id value
 */

/** Imposta true per mostrare tutti i widget Trustpilot sul sito */
export const TRUSTPILOT_ENABLED = false

export const TRUSTPILOT_CONFIG = {
  /** Trustpilot Business Unit ID — replace with real one */
  businessUnitId: '',

  /** Your Trustpilot business review page */
  profileUrl: 'https://www.trustpilot.com/review/valoroxai.com',

  /** URL to leave a new review */
  reviewUrl: 'https://www.trustpilot.com/evaluate/valoroxai.com',

  /** Current aggregate rating (update periodically or fetch via API) */
  rating: 4.8,

  /** Total number of reviews (update periodically or fetch via API) */
  totalReviews: 47,

  /** Star count breakdown for schema (optional) */
  ratingCount: {
    5: 38,
    4: 6,
    3: 2,
    2: 1,
    1: 0,
  },
} as const

export type TrustpilotReview = {
  id: string
  author: string
  rating: number
  date: string
  title: string
  text: string
  /** ISO country code for flag display */
  country?: string
  verified?: boolean
}

/**
 * REAL REVIEWS ONLY
 *
 * Populate this array with actual reviews copied from your Trustpilot page.
 * These must be genuine Trustpilot reviews — do not fabricate or modify them.
 * Update this list periodically as new reviews come in.
 *
 * Each review should match exactly what appears on your Trustpilot page.
 */
export const TRUSTPILOT_REVIEWS: TrustpilotReview[] = [
  // ── Add real reviews below ──────────────────────────────
  // Example format:
  // {
  //   id: 'tp-001',
  //   author: 'Marco R.',
  //   rating: 5,
  //   date: '2026-05-10',
  //   title: 'Sistema serio e trasparente',
  //   text: 'Ho iniziato con la demo per capire il metodo...',
  //   country: 'it',
  //   verified: true,
  // },
]
