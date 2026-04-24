'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ArrowRight, Zap, TrendingUp, CreditCard } from 'lucide-react'

/** Contenuti allineati landing ↔ dashboard abbonamento */
export const PRICING_FEATURES: { text: string; highlight: boolean }[] = [
  { text: 'Automazione 100% su XAU/USD — nulla da installare', highlight: true },
  { text: 'Piattaforma server-side — il tuo conto rimane sempre protetto', highlight: true },
  { text: 'Dashboard live con posizioni in tempo reale', highlight: false },
  { text: 'Risk management configurabile — controllo totale', highlight: false },
  { text: 'Verifica giornaliera credenziali automatica', highlight: false },
  { text: 'Supporto email dedicato', highlight: false },
  { text: 'Cancella quando vuoi — zero vincoli', highlight: false },
]

const SESSION_POST_AUTH = 'eldorado_post_auth_path'

export function setPostAuthRedirect(path: string) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(SESSION_POST_AUTH, path)
}

export type PricingPlanCardProps = {
  variant: 'landing' | 'dashboard'
  /** Se false, nasconde il CTA trial (es. utente già in trial o scaduto) */
  showTrial?: boolean
  actionLoading?: boolean
  onStartTrial?: () => void
  /** Checkout Stripe (dashboard) — piano scelto con lo switch mensile/annuale */
  onCheckout?: (plan: 'monthly' | 'yearly') => void
  /** Dashboard: testo sopra i pulsanti (es. stato trial) */
  intro?: React.ReactNode
  compact?: boolean
}

function BillingToggle({
  yearly,
  onChange,
  disabled,
}: {
  yearly: boolean
  onChange: (yearly: boolean) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
      <span
        className="text-[11px] font-bold uppercase tracking-wide transition-opacity"
        style={{
          color: !yearly ? 'var(--gold)' : 'var(--text-muted)',
          opacity: !yearly ? 1 : 0.55,
        }}
      >
        Mensile
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={yearly}
        disabled={disabled}
        onClick={() => onChange(!yearly)}
        className="relative h-7 w-[52px] rounded-full flex-shrink-0 transition-colors disabled:opacity-45 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-2)]"
        style={{
          background: yearly ? 'rgba(240,180,41,0.35)' : 'rgba(100,100,120,0.35)',
          border: '1px solid',
          borderColor: yearly ? 'rgba(240,180,41,0.5)' : 'var(--border)',
        }}
      >
        <span
          className="absolute top-0.5 h-6 w-6 rounded-full shadow-md transition-transform duration-200 ease-out"
          style={{
            left: yearly ? 'calc(100% - 1.625rem)' : '2px',
            background: 'linear-gradient(180deg, #fafafa 0%, #e8e8e8 100%)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
          }}
        />
      </button>
      <span
        className="text-[11px] font-bold uppercase tracking-wide transition-opacity"
        style={{
          color: yearly ? 'var(--gold)' : 'var(--text-muted)',
          opacity: yearly ? 1 : 0.55,
        }}
      >
        Annuale
      </span>
    </div>
  )
}

/**
 * Stesso blocco pricing della landing: offerta lancio, card oro, lista benefit,
 * trial + switch mensile/annuale vicino al prezzo + un solo CTA pagamento.
 */
export function PricingPlanCard({
  variant,
  showTrial = true,
  actionLoading = false,
  onStartTrial,
  onCheckout,
  intro,
  compact = false,
}: PricingPlanCardProps) {
  const isLanding = variant === 'landing'
  const pad = compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
  const titleSize = compact ? 'text-3xl' : 'text-5xl'
  const [billingYearly, setBillingYearly] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const goRegisterWithBillingCheckout = (plan: 'monthly' | 'yearly') => {
    setPostAuthRedirect(`/dashboard/billing?checkout=${plan}`)
    window.location.href = '/auth/register'
  }

  const handlePayNow = () => {
    const plan = billingYearly ? 'yearly' : 'monthly'
    if (isLanding) {
      goRegisterWithBillingCheckout(plan)
      return
    }
    onCheckout?.(plan)
  }

  const handleTrialClick = () => {
    setPostAuthRedirect('/dashboard/billing')
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Primo mese sconto */}
      <div
        className="rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 relative overflow-hidden"
        style={{ background: 'rgba(0,201,107,0.08)', border: '1px solid rgba(0,201,107,0.25)' }}
      >
        <div className="relative flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xl flex-shrink-0">✓</span>
          <div>
            <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>
              Primo Mese Scontato del 15%
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-bold" style={{ color: 'var(--green)' }}>
                Primo mese a €75.65
              </span>
              , poi €89/mese · o scegli annuale per <span className="font-bold text-[#F0B429]">€907.80/anno</span>
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right flex-shrink-0">
          <div className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>
            €89/mese
          </div>
          <div className="text-xl font-black text-gradient-gold">
            €75.65<span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>/mese*</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute -inset-1 rounded-[1.5rem] blur-xl opacity-40 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }}
        />

        <div className={`relative glass-gold rounded-2xl ${pad} overflow-hidden`}>
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex flex-wrap items-center justify-end gap-1.5 pointer-events-none">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-black"
              style={{ background: 'rgba(255,80,50,0.15)', border: '1px solid rgba(255,80,50,0.35)', color: '#FF6432' }}
            >
              Promo
            </span>
            <span className="badge-warning text-xs font-bold">5gg GRATIS</span>
          </div>

          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, var(--gold-subtle) 0%, transparent 70%)' }} />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3 pr-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/eldorado.jpg" alt="El Dorado" className="gold-avatar-ring" style={{ width: compact ? 28 : 30, height: compact ? 28 : 30 }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--gold)' }}>
                El Dorado Premium
              </span>
            </div>

            {/* Prezzo + switch (stesso blocco, in alto) */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mt-2 mb-3">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className={`${titleSize} font-black text-gradient-gold leading-none`}>
                  {billingYearly ? '€907.80' : '€89'}
                </span>
                <span className="text-sm font-medium pb-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {billingYearly ? '/anno' : '/mese'}
                </span>
                {billingYearly && (
                  <div className="text-sm font-bold pb-0.5 text-[#00C96B]" style={{ color: 'var(--green)' }}>
                    € 75.65/mese*
                  </div>
                )}
              </div>
              <BillingToggle yearly={billingYearly} onChange={setBillingYearly} disabled={actionLoading} />
            </div>

            {billingYearly ? (
              <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>€907.80/anno</strong> — fatturazione unica per{' '}
                <strong style={{ color: 'var(--gold)' }}>12 mesi</strong> (equiv. €75.65/mese), risparmi{' '}
                <span style={{ color: 'var(--gold)' }}>€160.20 l'anno</span> rispetto al mensile pieno.
              </p>
            ) : (
              <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Piano mensile: <strong style={{ color: 'var(--text-primary)' }}>€89/mese</strong>. Primo mese{' '}
                <strong style={{ color: 'var(--green)' }}>€75.65</strong> (−15%), poi €89 in automatico.
              </p>
            )}

            <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
              Inizia con <strong style={{ color: 'var(--text-primary)' }}>5 giorni gratuiti</strong> — nessuna carta richiesta
            </p>

            {intro}

            <div className={`space-y-2.5 ${compact ? 'mb-5' : 'mb-6'}`}>
              {PRICING_FEATURES.map((f) => (
                <div key={f.text} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: f.highlight ? 'var(--gold-subtle)' : 'var(--green-subtle)',
                      border: f.highlight ? '1px solid var(--border-gold)' : '1px solid color-mix(in srgb, var(--green) 30%, transparent)',
                    }}
                  >
                    <Check className="w-3 h-3" style={{ color: f.highlight ? 'var(--gold)' : 'var(--green)' }} />
                  </div>
                  <span
                    className="text-sm"
                    style={{
                      color: f.highlight ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: f.highlight ? 500 : 400,
                    }}
                  >
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA — z-10 così nulla sopra intercetta i click */}
            <div className="relative z-20 space-y-3">

              {/* Checkbox accettazione Termini */}
              <label
                className="flex items-start gap-3 cursor-pointer group select-none"
                style={{ padding: '0.75rem 0' }}
              >
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-150"
                    style={termsAccepted
                      ? { background: 'var(--gold)', border: '1.5px solid var(--gold)' }
                      : { background: 'transparent', border: '1.5px solid rgba(240,180,41,0.35)' }
                    }
                  >
                    {termsAccepted && (
                      <Check className="w-3 h-3" style={{ color: '#0a0a14', strokeWidth: 3 }} />
                    )}
                  </div>
                </div>
                <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Ho letto e accetto i{' '}
                  <Link
                    href="/legal/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
                    style={{ color: 'var(--gold)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Termini di Servizio
                  </Link>
                  {' '}e comprendo che il trading comporta rischi, inclusa la possibile perdita del capitale investito.
                </span>
              </label>

              {showTrial && (
                <>
                  {isLanding ? (
                    <Link
                      href="/auth/register"
                      prefetch={false}
                      onClick={termsAccepted ? handleTrialClick : (e) => e.preventDefault()}
                      className="btn-gold w-full text-base py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2"
                      style={!termsAccepted ? { opacity: 0.45, pointerEvents: 'none' } : undefined}
                      aria-disabled={!termsAccepted}
                    >
                      <Zap className="w-5 h-5" />
                      Inizia 7 giorni gratis
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={onStartTrial}
                      disabled={actionLoading || !termsAccepted}
                      className="btn-gold w-full text-base py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {actionLoading ? (
                        <div className="w-5 h-5 border-2 border-[color-mix(in_srgb,var(--text-primary)_25%,transparent)] border-t-[var(--text-primary)] rounded-full animate-spin" />
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          Inizia 7 giorni gratis
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  )}
                  <p className="text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    Nessuna carta · Nessun obbligo · Scegli mensile o annuale dopo il trial
                  </p>
                </>
              )}

              <div className="flex items-center gap-2 py-1">
                <div className="h-px flex-1 bg-[var(--border)]" />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  oppure paga ora
                </span>
                <div className="h-px flex-1 bg-[var(--border)]" />
              </div>

              <button
                type="button"
                onClick={handlePayNow}
                disabled={actionLoading || !termsAccepted}
                className={`w-full py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all disabled:opacity-45 ${!billingYearly ? 'btn-gold' : ''}`}
                style={
                  billingYearly
                    ? {
                        background: 'linear-gradient(135deg, rgba(30,30,50,0.95), rgba(20,20,35,0.98))',
                        border: '1px solid rgba(240,180,41,0.45)',
                        color: 'var(--text-primary)',
                      }
                    : undefined
                }
              >
                {actionLoading ? (
                  <div
                    className={`w-5 h-5 border-2 rounded-full animate-spin ${billingYearly ? 'border-[#F0B429] border-t-transparent' : 'border-current border-t-transparent'}`}
                  />
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    {billingYearly ? 'Paga ora — piano annuale' : 'Paga ora — piano mensile'}
                  </>
                )}
              </button>

              {isLanding && (
                <p className="text-center text-[10px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Dopo la registrazione / accesso si apre il checkout Stripe in modo sicuro.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
        {[
          { period: 'Giorni 1–5', price: 'GRATIS', color: 'var(--green)', bg: 'var(--green-subtle)', border: 'color-mix(in srgb, var(--green) 30%, transparent)' },
          { period: 'Mensile', price: '€75.65*', color: 'var(--gold)', bg: 'var(--gold-subtle)', border: 'var(--border-gold)' },
          { period: 'Dal Mese 2', price: '€89/mese', color: 'var(--text-secondary)', bg: 'var(--glass-bg)', border: 'var(--border)' },
        ].map((item) => (
          <div key={item.period} className="rounded-xl py-2.5 sm:py-3 px-1.5" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
            <div className="text-xs sm:text-sm font-black" style={{ color: item.color }}>
              {item.price}
            </div>
            <div className="text-[9px] sm:text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {item.period}
            </div>
          </div>
        ))}
      </div>

      {!isLanding && (
        <div className="flex items-center gap-1.5 text-xs justify-center" style={{ color: 'var(--text-muted)' }}>
          <TrendingUp className="w-3.5 h-3.5 text-[#F0B429]" />
          Pagamenti gestiti da Stripe — carta non salvata sui nostri server
        </div>
      )}
    </div>
  )
}
