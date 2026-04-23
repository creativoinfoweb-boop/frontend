'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { affiliatesApi, getApiErrorMessage } from '@/lib/api'
import { AffiliateDashboardResponse } from '@/types'
import {
  Copy, AlertCircle, CheckCircle2, TrendingUp, Users, Gift,
  Star, Zap, Clock, AlertTriangle, ArrowRight, Info,
  DollarSign,
} from 'lucide-react'
import Link from 'next/link'

// ── Tier config ────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: null,
    label: 'Bronze',
    pct: 0,
    minRef: 0,
    maxRef: 2,
    color: '#CD7F32',
    bg: 'rgba(205,127,50,0.08)',
    border: 'rgba(205,127,50,0.2)',
    desc: 'Porta 3 referral attivi per sbloccare le commissioni',
    icon: '🥉',
  },
  {
    id: 'silver',
    label: 'Argento',
    pct: 5,
    minRef: 3,
    maxRef: 9,
    color: '#94A3B8',
    bg: 'rgba(148,163,184,0.08)',
    border: 'rgba(148,163,184,0.22)',
    desc: '5% su ogni abbonamento dei tuoi referral',
    icon: '🥈',
  },
  {
    id: 'gold',
    label: 'Oro',
    pct: 10,
    minRef: 10,
    maxRef: 39,
    color: '#F0B429',
    bg: 'rgba(240,180,41,0.08)',
    border: 'rgba(240,180,41,0.22)',
    desc: '10% su ogni abbonamento dei tuoi referral',
    icon: '🥇',
  },
  {
    id: 'platinum',
    label: 'Platino',
    pct: 15,
    minRef: 40,
    maxRef: null,
    color: '#C084FC',
    bg: 'rgba(192,132,252,0.08)',
    border: 'rgba(192,132,252,0.22)',
    desc: '15% su ogni abbonamento dei tuoi referral',
    icon: '💎',
  },
]

const USD_RATE = 1.08

// ── Helpers ───────────────────────────────────────────────────────────────
function fmtMoney(eur: number, currency: 'EUR' | 'USD') {
  const val = currency === 'USD' ? eur * USD_RATE : eur
  return currency === 'USD'
    ? `$${val.toFixed(2)}`
    : `€${val.toFixed(2)}`
}

function getCurrentTier(apiTier: string | null) {
  return TIERS.find(t => t.id === (apiTier ?? null)) ?? TIERS[0]
}

function getNextTier(apiTier: string | null) {
  const idx = TIERS.findIndex(t => t.id === (apiTier ?? null))
  return idx < TIERS.length - 1 ? TIERS[idx + 1] : null
}

// ── Skeleton ──────────────────────────────────────────────────────────────
function AffiliateSkeleton() {
  return (
    <div className="p-5 sm:p-6 space-y-6 max-w-5xl">
      <div className="skeleton h-8 w-56 rounded-xl" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-28 rounded-xl" />)}
      </div>
      <div className="skeleton h-44 rounded-2xl" />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 skeleton h-72 rounded-xl" />
        <div className="skeleton h-72 rounded-xl" />
      </div>
    </div>
  )
}

// ── KPI Card ──────────────────────────────────────────────────────────────
function KpiCard({
  icon: Icon, label, value, sub, color, delay = 0,
}: {
  icon: any; label: string; value: string; sub?: string; color: string; delay?: number
}) {
  return (
    <div
      className="card-premium p-4 animate-fade-in-up relative overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="absolute -top-6 -right-6 w-16 h-16 rounded-full blur-2xl pointer-events-none opacity-20"
        style={{ background: color }}
      />
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
        style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 22%, transparent)` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="text-xl font-black font-mono" style={{ color }}>{value}</div>
      <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</div>
      {sub && <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</div>}
    </div>
  )
}

// ── Tier Bar ──────────────────────────────────────────────────────────────
function TierProgressSection({
  tier, activeReferrals,
}: {
  tier: (typeof TIERS)[0]; activeReferrals: number
}) {
  const next = getNextTier(tier.id)
  const pct = next
    ? Math.min(((activeReferrals - tier.minRef) / (next.minRef - tier.minRef)) * 100, 100)
    : 100
  const isMonetized = tier.id !== null
  const toNext = next ? next.minRef - activeReferrals : 0

  return (
    <div className="card-premium p-5 space-y-4 animate-fade-in-up" style={{ animationDelay: '160ms' }}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            Tier & progressione
          </h3>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {tier.icon} {tier.label} · {tier.pct}% commissione
          </p>
        </div>
        <div
          className="px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: tier.bg, border: `1px solid ${tier.border}`, color: tier.color }}
        >
          {tier.icon} {tier.label}
        </div>
      </div>

      {!isMonetized && (
        <div
          className="flex items-start gap-3 p-3 rounded-xl"
          style={{ background: 'rgba(240,180,41,0.05)', border: '1px solid rgba(240,180,41,0.2)' }}
        >
          <Zap className="w-4 h-4 text-[#F0B429] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold" style={{ color: '#F0B429' }}>Commissioni non ancora attive</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Porta <strong style={{ color: '#F0B429' }}>ancora {3 - activeReferrals} referral</strong> (minimo 3 attivi) per iniziare a guadagnare commissioni.
            </p>
          </div>
        </div>
      )}

      {isMonetized && (
        <div
          className="flex items-start gap-3 p-3 rounded-xl"
          style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.18)' }}
        >
          <CheckCircle2 className="w-4 h-4 text-[#00E676] flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            <strong style={{ color: '#00E676' }}>Commissioni attive!</strong> Guadagni il <strong style={{ color: '#00E676' }}>{tier.pct}%</strong> su ogni pagamento mensile dei tuoi referral.
          </p>
        </div>
      )}

      {next && (
        <div>
          <div className="flex justify-between text-[10px] mb-1.5" style={{ color: 'var(--text-muted)' }}>
            <span>{activeReferrals} referral attivi</span>
            <span>
              {toNext > 0 ? `Mancano ${toNext} per ${next.icon} ${next.label} (${next.pct}%)` : `${next.icon} ${next.label} sbloccato!`}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${tier.color}, ${next.color})`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Tier Grid ─────────────────────────────────────────────────────────────
function TierGrid({ currentTierId }: { currentTierId: string | null }) {
  return (
    <div className="card-premium p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
        Come funziona il programma
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {TIERS.map(t => {
          const isCurrent = t.id === (currentTierId ?? null)
          return (
            <div
              key={t.label}
              className="rounded-xl p-3 text-center relative"
              style={{
                background: isCurrent ? t.bg : 'var(--surface-2)',
                border: `1px solid ${isCurrent ? t.border : 'var(--border)'}`,
              }}
            >
              {isCurrent && (
                <span
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{ background: t.color, color: '#000' }}
                >
                  TU SEI QUI
                </span>
              )}
              <div className="text-2xl mb-1">{t.icon}</div>
              <div className="text-xs font-bold mb-0.5" style={{ color: isCurrent ? t.color : 'var(--text-primary)' }}>
                {t.label}
              </div>
              <div
                className="text-xl font-black font-mono"
                style={{ color: isCurrent ? t.color : 'var(--text-secondary)' }}
              >
                {t.pct}%
              </div>
              <div className="text-[9px] mt-1" style={{ color: 'var(--text-muted)' }}>
                {t.id === null ? '0–2 referral' : t.maxRef ? `${t.minRef}–${t.maxRef}` : `${t.minRef}+`} attivi
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-[10px] mt-3 text-center" style={{ color: 'var(--text-muted)' }}>
        La commissione si calcola sul prezzo dell'abbonamento mensile (€39) per ogni referral attivo pagante.
      </p>
    </div>
  )
}

// ── Referral Link ─────────────────────────────────────────────────────────
function ReferralLinkBox({ link, code }: { link: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [link])

  return (
    <div className="card-premium p-5 animate-fade-in-up" style={{ animationDelay: '240ms' }}>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.22)' }}
        >
          <Gift className="w-4 h-4" style={{ color: 'var(--gold)' }} />
        </div>
        <div>
          <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Il tuo link referral</h3>
          <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Codice: <span className="font-mono font-bold" style={{ color: 'var(--gold)' }}>{code}</span></p>
        </div>
      </div>

      <div
        className="rounded-xl px-3 py-2.5 mb-3 text-xs font-mono break-all"
        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      >
        {link}
      </div>

      <button
        onClick={handleCopy}
        className="btn-gold w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
      >
        {copied
          ? <><CheckCircle2 className="w-4 h-4" /> Copiato!</>
          : <><Copy className="w-4 h-4" /> Copia link referral</>}
      </button>

      <div
        className="mt-3 flex items-start gap-2 p-3 rounded-xl text-xs"
        style={{ background: 'rgba(0,194,255,0.05)', border: '1px solid rgba(0,194,255,0.15)', color: 'var(--text-secondary)' }}
      >
        <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#00C2FF' }} />
        <span>Condividi il link con i tuoi follower. Chi si registra tramite il tuo link viene contato come tuo referral.</span>
      </div>
    </div>
  )
}

// ── Commissioni ────────────────────────────────────────────────────────────
function CommissionsTable({
  commissions, currency,
}: {
  commissions: any[]; currency: 'EUR' | 'USD'
}) {
  if (commissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3" style={{ color: 'var(--text-muted)' }}>
        <AlertCircle className="w-10 h-10 opacity-40" />
        <p className="text-sm">Nessuna commissione ancora</p>
        <p className="text-xs text-center max-w-xs">Le commissioni appariranno qui ogni volta che uno dei tuoi referral rinnova l'abbonamento.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
      {commissions.map((c: any) => {
        const amtEur = parseFloat(c.commission_eur ?? c.amount_eur ?? 0)
        return (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                Pagamento referral · {c.commission_pct ?? c.pct}%
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {c.created_at ? new Date(c.created_at).toLocaleDateString('it-IT') : '—'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-black font-mono" style={{ color: 'var(--green)' }}>
                +{fmtMoney(amtEur, currency)}
              </p>
              <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{c.status ?? 'confirmed'}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Payout ────────────────────────────────────────────────────────────────
function PayoutCard({
  available, paid, pending, canRequest, currency, onRequest,
}: {
  available: number; paid: number; pending: any; canRequest: boolean; currency: 'EUR' | 'USD'; onRequest: () => Promise<void>
}) {
  const [loading, setLoading] = useState(false)

  const handle = useCallback(async () => {
    setLoading(true)
    try { await onRequest() } finally { setLoading(false) }
  }, [onRequest])

  return (
    <div className="card-premium p-5 space-y-4">
      <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Guadagni & payout</h3>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl p-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Disponibile</p>
          <p className="text-lg font-black font-mono mt-0.5" style={{ color: 'var(--green)' }}>
            {fmtMoney(available, currency)}
          </p>
        </div>
        <div className="rounded-xl p-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Già pagato</p>
          <p className="text-lg font-black font-mono mt-0.5" style={{ color: 'var(--gold)' }}>
            {fmtMoney(paid, currency)}
          </p>
        </div>
      </div>

      {pending && (
        <div
          className="flex items-start gap-2 p-3 rounded-xl text-xs"
          style={{ background: 'rgba(240,180,41,0.06)', border: '1px solid rgba(240,180,41,0.2)' }}
        >
          <Clock className="w-3.5 h-3.5 text-[#F0B429] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold" style={{ color: '#F0B429' }}>Payout in elaborazione</p>
            <p className="mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {fmtMoney(parseFloat(pending.amount_eur ?? 0), currency)} · {pending.status}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={handle}
        disabled={!canRequest || loading}
        className="w-full py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={
          canRequest && !loading
            ? { background: 'rgba(0,230,118,0.12)', border: '1px solid rgba(0,230,118,0.3)', color: '#00E676' }
            : { background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }
        }
      >
        {loading ? 'Elaborazione…' : canRequest ? 'Richiedi payout' : 'Nessun saldo disponibile'}
      </button>

      <p className="text-[10px] text-center" style={{ color: 'var(--text-muted)' }}>
        Pagamento entro 5–7 giorni lavorativi dalla richiesta
      </p>
    </div>
  )
}

// ── Creator Discount ──────────────────────────────────────────────────────
function CreatorDiscountCard({ active, onActivate }: { active: boolean; onActivate: () => Promise<void> }) {
  const [loading, setLoading] = useState(false)

  const handle = useCallback(async () => {
    setLoading(true)
    try { await onActivate() } finally { setLoading(false) }
  }, [onActivate])

  return (
    <div
      className="card-premium p-5 space-y-3"
      style={active ? { borderColor: 'rgba(192,132,252,0.35)' } : {}}
    >
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4" style={{ color: active ? '#C084FC' : 'var(--text-muted)' }} />
        <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Sconto Creator 30%</h3>
      </div>

      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
        Come affiliato attivo puoi attivare uno sconto del 30% sul tuo abbonamento mensile.
      </p>

      {active ? (
        <div
          className="flex items-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold"
          style={{ background: 'rgba(192,132,252,0.08)', border: '1px solid rgba(192,132,252,0.25)', color: '#C084FC' }}
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Sconto attivato sul tuo abbonamento
        </div>
      ) : (
        <button
          onClick={handle}
          disabled={loading}
          className="w-full py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40"
          style={{ background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.25)', color: '#C084FC' }}
        >
          {loading ? 'Elaborazione…' : 'Attiva sconto'}
        </button>
      )}
    </div>
  )
}

// ── How It Works ──────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: '1', text: 'Condividi il tuo link referral sui tuoi canali (social, community, sito)', icon: '🔗' },
    { n: '2', text: 'Un utente si registra tramite il tuo link e diventa un tuo referral', icon: '👤' },
    { n: '3', text: 'Quando il referral attiva e paga l\'abbonamento, scatta la commissione', icon: '💳' },
    { n: '4', text: 'Con 3+ referral attivi si attiva il tier Argento (5%). Più referral = tier più alto', icon: '📈' },
    { n: '5', text: 'Richiedi il payout dalla dashboard quando vuoi. Pagamento entro 7 giorni lavorativi', icon: '💸' },
  ]

  return (
    <div className="card-premium p-5 animate-fade-in-up" style={{ animationDelay: '280ms' }}>
      <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
        Come funziona passo per passo
      </h3>
      <div className="space-y-3">
        {steps.map(s => (
          <div key={s.n} className="flex items-start gap-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(240,180,41,0.12)', border: '1px solid rgba(240,180,41,0.25)', color: '#F0B429' }}
            >
              {s.n}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {s.icon} {s.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Content ──────────────────────────────────────────────────────────
function AffiliateContent() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const [data, setData] = useState<AffiliateDashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR')

  useEffect(() => {
    if (!isAuthenticated) { router.push('/auth/login'); return }

    affiliatesApi.getDashboard()
      .then(res => setData(res.data))
      .catch(e => {
        const msg = getApiErrorMessage(e, 'Errore nel caricamento')
        setError(msg)
        if (msg.includes('403') || msg.includes('404')) {
          setTimeout(() => router.push('/dashboard'), 2500)
        }
      })
      .finally(() => setLoading(false))
  }, [isAuthenticated, router])

  const handleRequestPayout = useCallback(async () => {
    if (!data) return
    try {
      const res = await affiliatesApi.requestPayout()
      setData({ ...data, pending_payout: res.data.payout, earnings_available: 0 })
    } catch (e: unknown) {
      alert(getApiErrorMessage(e, 'Errore payout'))
    }
  }, [data])

  const handleCreatorDiscount = useCallback(async () => {
    if (!data) return
    try {
      const res = await affiliatesApi.activateCreatorDiscount()
      setData({ ...data, affiliate: { ...data.affiliate, creator_discount_active: true } })
      alert(res.data.message)
    } catch (e: unknown) {
      alert(getApiErrorMessage(e, 'Errore sconto'))
    }
  }, [data])

  if (loading) return <AffiliateSkeleton />

  if (error) {
    const isAdminNoAffiliate = !!user?.is_admin
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <div className="flex items-start gap-4 p-5 rounded-2xl"
          style={{ background: 'rgba(255,61,113,0.06)', border: '1px solid rgba(255,61,113,0.2)' }}>
          <AlertTriangle className="w-5 h-5 text-[#FF3D71] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Account affiliato non trovato</h3>
            {isAdminNoAffiliate ? (
              <>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Sei admin ma non sei ancora registrato come affiliato. Aggiungiti dal pannello Admin inserendo la tua email.
                </p>
                <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Vai su <strong style={{ color: '#F0B429' }}>Admin → Affiliati</strong> e usa il form "Aggiungi affiliato manualmente" con la tua email admin.
                </p>
                <Link
                  href="/admin/affiliates"
                  className="text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold"
                  style={{ background: 'rgba(240,180,41,0.12)', border: '1px solid rgba(240,180,41,0.3)', color: '#F0B429' }}
                >
                  Vai al pannello Admin → Affiliati <ArrowRight className="w-3 h-3" />
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Il tuo account non risulta ancora attivato come affiliato nel sistema. Questo accade quando la candidatura è stata approvata ma l'account affiliato non è stato creato correttamente.
                </p>
                <div className="text-xs px-3 py-2 rounded-lg font-mono mb-3"
                  style={{ background: 'rgba(0,0,0,0.3)', color: '#FF3D71', border: '1px solid rgba(255,61,113,0.2)' }}>
                  Errore API: {error}
                </div>
                <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Cosa fare:</strong> contatta l'amministratore e chiedigli di cliccare il pulsante <strong style={{ color: '#F0B429' }}>"Attiva affiliato"</strong> nella pagina Admin → Candidature accanto alla tua candidatura approvata.
                </p>
                <Link href="/dashboard" className="text-xs mt-2 inline-flex items-center gap-1" style={{ color: 'var(--gold)' }}>
                  Torna alla dashboard <ArrowRight className="w-3 h-3" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  const tier = getCurrentTier(data.tier_info.tier)
  const isMonetized = tier.id !== null
  const earningsAvail = Number(data.earnings_available ?? 0)
  const earningsPaid = Number(data.earnings_paid ?? 0)
  const earningsTotal = Number(data.earnings_total ?? 0)
  const GOLD = 'var(--gold)'
  const GREEN = 'var(--green)'

  return (
    <div className="p-5 sm:p-6 space-y-5 max-w-5xl">

      {/* ── Header ────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>Dashboard Affiliato</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Programma referral El Dorado · Guadagna commissioni su ogni abbonamento
          </p>
        </div>
        {/* Currency toggle */}
        <div
          className="flex rounded-xl overflow-hidden flex-shrink-0"
          style={{ border: '1px solid var(--border)' }}
        >
          {(['EUR', 'USD'] as const).map(c => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className="px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1"
              style={
                currency === c
                  ? { background: 'var(--gold-subtle)', color: 'var(--gold)', borderColor: 'var(--border-gold)' }
                  : { background: 'transparent', color: 'var(--text-muted)' }
              }
            >
              {c === 'EUR' ? '€' : <DollarSign className="w-3 h-3" />} {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI ───────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard
          icon={Users} label="Referral totali" color={GOLD} delay={0}
          value={String(data.referrals_total)}
          sub={`${data.referrals_active} attivi ora`}
        />
        <KpiCard
          icon={TrendingUp} label="Disponibile" color={GREEN} delay={60}
          value={fmtMoney(earningsAvail, currency)}
          sub="Pronto per il payout"
        />
        <KpiCard
          icon={Zap} label="Commissione" delay={120}
          color={isMonetized ? tier.color : 'var(--text-muted)'}
          value={`${tier.pct}%`}
          sub={isMonetized ? tier.label : 'Non ancora attiva'}
        />
        <KpiCard
          icon={Star} label="Guadagnato" color="#C084FC" delay={180}
          value={fmtMoney(earningsTotal, currency)}
          sub="Totale storico"
        />
      </div>

      {/* ── Tier progress ─────────────────────── */}
      <TierProgressSection tier={tier} activeReferrals={data.referrals_active} />

      {/* ── Tier grid ─────────────────────────── */}
      <TierGrid currentTierId={data.tier_info.tier} />

      {/* ── Referral link ─────────────────────── */}
      <ReferralLinkBox link={data.referral_link} code={data.affiliate.affiliate_code} />

      {/* ── Main 2-col grid ───────────────────── */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Commissioni */}
        <div className="lg:col-span-2 card-premium p-5 animate-fade-in-up" style={{ animationDelay: '260ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Commissioni recenti</h3>
            {currency === 'USD' && (
              <span className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(0,194,255,0.08)', border: '1px solid rgba(0,194,255,0.2)', color: '#00C2FF' }}>
                Rate EUR→USD ×{USD_RATE}
              </span>
            )}
          </div>
          <CommissionsTable commissions={data.recent_conversions} currency={currency} />
        </div>

        {/* Payout + Creator discount */}
        <div className="space-y-4">
          <PayoutCard
            available={earningsAvail}
            paid={earningsPaid}
            pending={data.pending_payout}
            canRequest={data.can_request_payout}
            currency={currency}
            onRequest={handleRequestPayout}
          />
          <CreatorDiscountCard
            active={data.affiliate.creator_discount_active}
            onActivate={handleCreatorDiscount}
          />
        </div>
      </div>

      {/* ── How it works ──────────────────────── */}
      <HowItWorks />

      {/* ── FAQ / info strip ──────────────────── */}
      <div
        className="flex items-start gap-3 p-4 rounded-2xl animate-fade-in-up"
        style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.12)', animationDelay: '320ms' }}
      >
        <Info className="w-4 h-4 text-[#F0B429] flex-shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed space-y-1" style={{ color: 'var(--text-secondary)' }}>
          <p><strong style={{ color: 'var(--text-primary)' }}>Conteggio referral:</strong> Un referral è contato come "attivo" finché ha un abbonamento pagante. Se cancella, il conteggio decresce.</p>
          <p><strong style={{ color: 'var(--text-primary)' }}>Upgrade tier:</strong> Il tier si aggiorna automaticamente in tempo reale al raggiungimento della soglia referral.</p>
          <p><strong style={{ color: 'var(--text-primary)' }}>Payout minimo:</strong> Non c'è un importo minimo — puoi richiedere il payout anche per piccoli importi.</p>
        </div>
      </div>

    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────
export default function AffiliatePage() {
  return (
    <Suspense fallback={<AffiliateSkeleton />}>
      <AffiliateContent />
    </Suspense>
  )
}
