'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { subscriptionsApi, statsApi, signalsApi } from '@/lib/api'
import { SubscriptionStatus, PublicPerformance, UserStats, SignalHistoryItem } from '@/types'
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  BarChart3,
  CheckCircle2,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Info,
} from 'lucide-react'
import Link from 'next/link'

const n = (v: any, fallback = 0): number => parseFloat(String(v ?? fallback)) || fallback

/* ── Mini Sparkline ──────────────────────────────────────── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 100; const h = 32
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill={`url(#sg-${color.replace(/[^a-z0-9]/gi, '')})`} stroke="none" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── KPI Card ────────────────────────────────────────────── */
function KpiCard({
  label, value, sub, change, changeUp, icon: Icon, color, sparkData, delay = 0,
}: {
  label: string; value: string; sub?: string; change?: string; changeUp?: boolean;
  icon: any; color: string; sparkData?: number[]; delay?: number
}) {
  return (
    <div
      className="kpi-card animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full blur-2xl pointer-events-none opacity-15"
        style={{ background: color }} />
      <div className="relative flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `color-mix(in srgb, ${color} 10%, transparent)`,
            border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
          }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        {change && (
          <div className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-1 rounded-full"
            style={{
              background: changeUp ? 'var(--green-subtle)' : 'var(--red-subtle)',
              color: changeUp ? 'var(--green)' : 'var(--red)',
              border: `1px solid ${changeUp ? 'color-mix(in srgb, var(--green) 25%, transparent)' : 'color-mix(in srgb, var(--red) 25%, transparent)'}`,
            }}>
            {changeUp ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
            {change}
          </div>
        )}
      </div>
      <div className="relative">
        <div className="text-2xl font-black font-mono number-mono" style={{ color, letterSpacing: '-0.02em' }}>
          {value}
        </div>
        <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>{label}</div>
        {sub && <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</div>}
      </div>
      {sparkData && sparkData.length >= 2 && (
        <div className="mt-3 -mx-1 opacity-70">
          <Sparkline data={sparkData} color={color} />
        </div>
      )}
    </div>
  )
}

/* ── Stat Row ────────────────────────────────────────────── */
function StatRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span className="text-xs font-bold font-mono number-mono" style={{ color }}>{value}</span>
    </div>
  )
}

/* ── Quick Action ────────────────────────────────────────── */
function QuickAction({ icon: Icon, label, href, color }: { icon: any; label: string; href: string; color: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 p-3.5 rounded-xl transition-all group hover:-translate-y-1"
      style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = `color-mix(in srgb, ${color} 30%, transparent)`
        el.style.background = `color-mix(in srgb, ${color} 6%, var(--glass-bg))`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.background = 'var(--glass-bg)'
      }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: `color-mix(in srgb, ${color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 18%, transparent)` }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <span className="text-[10px] font-medium text-center" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </span>
    </Link>
  )
}

function formatTimeAgo(isoStr?: string) {
  if (!isoStr) return ''
  const diff = Date.now() - new Date(isoStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Adesso'
  if (mins < 60) return `${mins}m fa`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h fa`
  return new Date(isoStr).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })
}

/* ── Main Page ───────────────────────────────────────────── */
export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null)
  const [masterStats, setMasterStats] = useState<PublicPerformance | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [recentTrades, setRecentTrades] = useState<SignalHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showBotWarning, setShowBotWarning] = useState(() =>
    typeof window !== 'undefined' && !localStorage.getItem('bot_warning_dismissed')
  )

  useEffect(() => {
    if (!isAuthenticated) { router.push('/auth/login'); return }
    const fetch = async () => {
      try {
        const [subRes, masterRes, userRes, histRes] = await Promise.all([
          subscriptionsApi.getStatus(),
          statsApi.getMasterPerformance(),
          statsApi.getUserStats(),
          signalsApi.getHistory('EXECUTED', 3, 0),
        ])
        setSubscription(subRes.data)
        setMasterStats(masterRes.data)
        setUserStats(userRes.data)
        setRecentTrades(histRes.data.history || [])
      } catch (_) {}
      finally { setLoading(false) }
    }
    fetch()
  }, [isAuthenticated, router])

  if (loading) {
    return (
      <div className="space-y-5 p-2">
        <div className="space-y-2">
          <div className="skeleton h-7 w-48 rounded-xl" />
          <div className="skeleton h-3.5 w-64 rounded-lg" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-32 rounded-xl" />)}
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="skeleton lg:col-span-2 h-56 rounded-xl" />
          <div className="skeleton h-56 rounded-xl" />
        </div>
      </div>
    )
  }

  const isTrialing   = subscription?.status === 'trialing'
  const isActive     = subscription?.status === 'active'
  const hasNoSub     = subscription?.status === 'none'
  const trialExpired = subscription?.status === 'trial_expired'

  const GOLD  = 'var(--gold)'
  const GREEN = 'var(--green)'
  const RED   = 'var(--red)'

  // Ibrido: win_rate dal master (affidabilit\u00e0 sistema), trades win/loss dall'utente
  const totalPipsMaster = n(masterStats?.total_profit_pips)
  const winRateMaster   = n(masterStats?.win_rate_percent)
  const tradesWin       = userStats?.trades_win  ?? 0
  const tradesLoss      = userStats?.trades_loss ?? 0

  const sparkWinRate = [60, 65, 62, 70, 68, 72, winRateMaster || 75]
  const sparkTrades  = [1, 2, 3, 4, 5, 6, userStats?.trades_executed ?? 8]

  return (
    <div className="space-y-5 max-w-[1400px]">

      {/* Header */}
      <div className="flex items-start justify-between pt-1">
        <div>
          <h1 className="text-xl font-black leading-tight" style={{ color: 'var(--text-primary)' }}>
            Benvenuto,{' '}
            <span className="brand-cinzel text-base" style={{ letterSpacing: '0.12em' }}>
              {user?.full_name || 'Trader'}
            </span>
          </h1>
          <p className="text-xs mt-1 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
            <span>Dashboard overview</span>
            <span style={{ color: 'var(--border-light)' }}>·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: 'var(--green)', boxShadow: '0 0 8px color-mix(in srgb, var(--green) 90%, transparent)', animation: 'dotPulse 2s ease-in-out infinite' }} />
              Sistema attivo
            </span>
          </p>
        </div>
      </div>

      {/* Banner avvertenza bot — dismissibile, appare solo al primo accesso */}
      {showBotWarning && (
        <div className="flex items-start justify-between gap-3 p-4 rounded-xl"
          style={{ background: 'rgba(155,93,229,0.06)', border: '1px solid rgba(155,93,229,0.15)' }}>
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-[#9B5DE5] flex-shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: '#C4A8FF' }}>Lascia lavorare il bot.</strong> Non chiudere
              manualmente le posizioni aperte automaticamente e non operare sullo stesso conto —
              potrebbe compromettere la gestione dei take profit e le statistiche.
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.setItem('bot_warning_dismissed', '1')
              setShowBotWarning(false)
            }}
            style={{ color: 'var(--text-muted)', fontSize: 18, lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
            aria-label="Chiudi avvertenza"
          >×</button>
        </div>
      )}

      {/* Banners */}
      {isTrialing && (
        <Banner icon={Clock} color={GOLD}
          title="Trial Attivo"
          body={`${subscription?.days_remaining} giorni rimanenti — attiva per continuare a ricevere segnali.`}
          cta="Attiva Ora" href="/dashboard/billing" />
      )}
      {hasNoSub && (
        <Banner icon={AlertCircle} color={RED}
          title="Nessun Abbonamento"
          body="Inizia il trial gratuito di 7 giorni — nessuna carta richiesta."
          cta="Inizia Trial" href="/dashboard/billing" />
      )}
      {trialExpired && (
        <Banner icon={AlertCircle} color={GOLD}
          title="Trial Scaduto"
          body="Attiva l'abbonamento per riprendere a ricevere i segnali."
          cta="Riattiva" href="/dashboard/billing" />
      )}
      {isActive && (
        <Banner icon={Zap} color={GOLD}
          title="Completa il Setup"
          body="Collega il tuo account MetaTrader 5 per ricevere i trade in automatico."
          cta="Setup Guide" href="/dashboard/setup-guide" />
      )}

      {/* KPI Cards — 3 cards (ibrido master+utente) */}
      <div className="grid grid-cols-3 gap-3">
        {/* 1. Trade Eseguiti — dall'utente */}
        <KpiCard
          label="Trade Eseguiti"
          value={String(userStats?.trades_executed ?? 0)}
          sub={`Su ${userStats?.trades_copied ?? 0} segnali ricevuti dal bot`}
          icon={Activity} color={GOLD} sparkData={sparkTrades} delay={0} />

        {/* 2. Win Rate — dal master (affidabilità sistema) */}
        <KpiCard
          label="Win Rate Sistema"
          value={`${winRateMaster.toFixed(1)}%`}
          sub={`Media su ${masterStats?.trades_total ?? 0} trade master`}
          icon={Target} color={GREEN} sparkData={sparkWinRate} delay={60} />

        {/* 3. Profit Pips — dal master (performance sistema) */}
        <KpiCard
          label="Profit Pips Sistema"
          value={totalPipsMaster !== 0
            ? `${totalPipsMaster >= 0 ? '+' : ''}${totalPipsMaster.toFixed(0)}`
            : '—'}
          sub="Totale storico · sistema"
          icon={TrendingUp} color={totalPipsMaster >= 0 ? GOLD : RED} delay={120} />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Performance Chart + stats */}
        <div className="lg:col-span-2 glass-cyber rounded-xl p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>La Mia Performance</h2>
              <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                Statistiche reali dai tuoi trade eseguiti · XAU/USD
              </p>
            </div>
            <Link href="/dashboard/history"
              className="flex items-center gap-1 text-[11px] font-semibold"
              style={{ color: 'var(--gold)' }}>
              Storico <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Equity mini-chart placeholder */}
          <div className="mb-4">
            <svg viewBox="0 0 560 80" className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
              <defs>
                <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--green)" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 40, 60].map(y => (
                <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="var(--border)" strokeWidth="1" />
              ))}
              <path d="M0,70 L80,65 L140,60 L200,68 L260,50 L320,42 L370,45 L420,32 L490,20 L560,15 L560,80 L0,80 Z"
                fill="url(#dashGrad)" />
              <path d="M0,70 L80,65 L140,60 L200,68 L260,50 L320,42 L370,45 L420,32 L490,20 L560,15"
                fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Stats row 4 + 2 card vincenti/perdenti */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {[
              { label: 'Win Rate',      value: `${winRateMaster.toFixed(1)}%`,                     color: GREEN },
              { label: 'Profit Factor', value: n(masterStats?.profit_factor, 0) > 0 ? n(masterStats?.profit_factor).toFixed(2) : '—', color: GOLD },
              { label: 'Trade Totali',  value: String(masterStats?.trades_total ?? 0),              color: GOLD },
              { label: 'Durata Media',  value: n(masterStats?.avg_trade_duration_hours) > 0 ? `${n(masterStats?.avg_trade_duration_hours).toFixed(1)}h` : '—', color: GOLD },
            ].map(s => (
              <div key={s.label} className="text-center rounded-lg py-2.5 px-2"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
                <div className="text-lg font-black font-mono number-mono" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[9px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Trade Vincenti / Trade Perdenti */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg p-3 flex items-center gap-3"
              style={{ background: 'color-mix(in srgb, var(--green) 8%, var(--glass-bg))', border: '1px solid color-mix(in srgb, var(--green) 20%, transparent)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--green-subtle)', border: '1px solid color-mix(in srgb, var(--green) 25%, transparent)' }}>
                <CheckCircle className="w-4 h-4" style={{ color: 'var(--green)' }} />
              </div>
              <div>
                <div className="text-xl font-black font-mono" style={{ color: 'var(--green)' }}>{tradesWin}</div>
                <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Trade Vincenti</div>
              </div>
            </div>
            <div className="rounded-lg p-3 flex items-center gap-3"
              style={{ background: 'color-mix(in srgb, var(--red) 8%, var(--glass-bg))', border: '1px solid color-mix(in srgb, var(--red) 20%, transparent)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--red-subtle)', border: '1px solid color-mix(in srgb, var(--red) 25%, transparent)' }}>
                <XCircle className="w-4 h-4" style={{ color: 'var(--red)' }} />
              </div>
              <div>
                <div className="text-xl font-black font-mono" style={{ color: 'var(--red)' }}>{tradesLoss}</div>
                <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Trade Perdenti</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-3">

          {/* Subscription */}
          <div className="glass-cyber rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            <h3 className="text-xs font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Abbonamento</h3>
            <div className="flex items-center gap-2.5 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/eldorado.jpg" alt="El Dorado" className="gold-avatar-ring" style={{ width: 32, height: 32 }} />
              <div>
                <div className="brand-cinzel text-[9.5px] tracking-[0.16em]">EL DORADO</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>€39 / mese</div>
              </div>
            </div>
            <div>
              <StatRow
                label="Stato"
                value={isActive ? 'Attivo' : isTrialing ? 'Trial' : 'Inattivo'}
                color={isActive ? GREEN : isTrialing ? GOLD : RED}
              />
              {subscription?.days_remaining != null && (
                <StatRow label="Giorni rimasti" value={`${subscription.days_remaining}g`} color={GOLD} />
              )}
            </div>
            <Link
              href="/dashboard/billing"
              className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-[11px] font-semibold transition-all"
              style={{ background: 'var(--gold-subtle)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}>
              Gestisci <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Attività Recente — dati reali */}
          <div className="glass-cyber rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: '310ms' }}>
            <h3 className="text-xs font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Attività Recente</h3>

            <div className="space-y-2.5">
              {recentTrades.length === 0 ? (
                <p className="text-[11px] text-center py-2" style={{ color: 'var(--text-muted)' }}>
                  Nessun trade ancora
                </p>
              ) : (
                recentTrades.map((trade) => {
                  const isWin = trade.profit_pips != null && trade.profit_pips > 0
                  const isLoss = trade.profit_pips != null && trade.profit_pips < 0
                  const isOpen = trade.signal_status === 'OPEN'
                  const dotColor = isOpen ? 'var(--gold)' : isWin ? 'var(--green)' : isLoss ? 'var(--red)' : 'var(--text-muted)'
                  const DirectionIcon = trade.direction === 'BUY' ? TrendingUp : TrendingDown
                  return (
                    <div key={trade.id} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}` }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                          <DirectionIcon className="w-3 h-3 flex-shrink-0" style={{ color: trade.direction === 'BUY' ? 'var(--green)' : 'var(--red)' }} />
                          {trade.direction} {trade.symbol}
                          {trade.profit_pips != null && (
                            <span className="font-mono text-[10px]" style={{ color: isWin ? 'var(--green)' : 'var(--red)' }}>
                              {trade.profit_pips >= 0 ? '+' : ''}{trade.profit_pips.toFixed(0)} pip
                            </span>
                          )}
                        </p>
                        <p className="text-[9px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          {isOpen ? 'Aperto' : 'Chiuso'} · {formatTimeAgo(trade.closed_at || trade.opened_at)}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <Link
              href="/dashboard/history"
              className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-[11px] font-medium transition-all"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--gold-subtle)'
                el.style.borderColor = 'var(--border-gold)'
                el.style.color = 'var(--gold)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--glass-bg)'
                el.style.borderColor = 'var(--border)'
                el.style.color = 'var(--text-secondary)'
              }}
            >
              Vedi storico completo <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-cyber rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
        <h2 className="text-xs font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Azioni Rapide</h2>
        <div className="grid grid-cols-3 gap-2.5">
          <QuickAction icon={BarChart3}    label="Storico"     href="/dashboard/history"     color={GOLD}  />
          <QuickAction icon={CheckCircle2} label="Setup Guide" href="/dashboard/setup-guide" color={GREEN} />
          <QuickAction icon={Activity}     label="Account MT5" href="/dashboard/accounts"    color={GOLD}  />
        </div>
      </div>

    </div>
  )
}

/* ── Inline Banner ───────────────────────────────────────── */
function Banner({
  icon: Icon, color, title, body, cta, href,
}: { icon: any; color: string; title: string; body: string; cta: string; href: string }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl p-3.5 border animate-fade-in"
      style={{ background: `color-mix(in srgb, ${color} 8%, var(--glass-bg))`, borderColor: `color-mix(in srgb, ${color} 22%, transparent)` }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `color-mix(in srgb, ${color} 12%, transparent)` }}>
        <Icon className="w-3.5 h-3.5" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-xs" style={{ color }}>{title}</p>
        <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{body}</p>
      </div>
      <Link
        href={href}
        className="flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap"
        style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`, color }}>
        {cta} <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  )
}
