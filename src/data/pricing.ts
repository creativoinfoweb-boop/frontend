// Single source of truth per i prezzi visibili in app.
// Modificare QUI = aggiorna landing + dashboard billing + setup guide.

export const PRICING = {
  currency: 'EUR',
  symbol: '€',

  // Trial abbonamento (mostrato in landing + billing).
  // Allineato a backend in produzione: 5gg signup standard, 7gg con codice referral (5 + 2 bonus).
  trialDays: 5,
  trialDaysWithReferral: 7,
  trialReferralBonusDays: 2,

  monthly: {
    amount: 89,
    amountStr: '€89',
    label: 'al mese',
    interval: 'month' as const,
    firstMonth: 75.65,
    firstMonthStr: '€75.65',
    firstMonthDiscountPercent: 15,
  },

  yearly: {
    amount: 907.80,
    amountStr: '€907.80',
    label: "all'anno",
    interval: 'year' as const,
    monthlyEquivalent: 75.65,
    monthlyEquivalentStr: '€75.65',
    savingsPerYear: 160.20,
    savingsPerYearStr: '€160.20',
  },
} as const

export type PricingPlan = 'monthly' | 'yearly'
