'use client'

const n = (v: any, fallback = 0): number => parseFloat(String(v ?? fallback)) || fallback

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { statsApi, signalsApi } from '@/lib/api'
import { UserStats, PublicPerformance } from '@/types'
import {
  TrendingUp, Target, BarChart3, Clock, Activity,
  CheckCircle, XCircle,
} from 'lucide-react'

function StatCard({ label, value, sub, color, icon: Icon }: {
  label: string; value: string; sub?: string; color: string; icon: any
}) {
  return (
    <div className="kpi-card">
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-10 pointer-events-none"
        style={{ background: color }} />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: `color-mix(in srgb, ${color} 15%, transparent)`,
              border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
            }}>
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
        </div>
        <div className="text-2xl font-black font-mono number-mono mb-1" style={{ color }}>{value}</div>
        <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</div>
        {sub && <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</div>}
      </div>
    </div>
  )
}

interface EquityPoint {
  date: string
  cumulative_pips: number
  pips: number
  direction: string
  symbol: string
}

function buildPath(data: number[], w: number, h: number): string {
  if (data.length === 0) return ''
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  return data
    .map((v, i) => `${(i / Math.max(data.length - 1, 1)) * w},${h - ((v - min) / range) * (h - 10) - 5}`)
    .join(' L ')
}

function equityFromPoints(points: EquityPoint[]): number[] {
  if (points.length === 0) return []
  const start = points[0].cumulative_pips
  return points.map(p => 100 + (p.cumulative_pips - start))
}

export default function PerformancePage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [masterStats, setMasterStats] = useState<PublicPerformance | null>(null)
  const [equityCurve, setEquityCurve] = useState<EquityPoint[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [u, m, eq] = await Promise.allSettled([
        statsApi.getUserStats(),
        statsApi.getMasterPerformance(),
        signalsApi.getEquityCurve(),
      ])
      if (u.status === 'fulfilled') setUserStats(u.value.data)
      if (m.status === 'fulfilled') setMasterStats(m.value.data)
      if (eq.status === 'fulfilled') setEquityCurve(eq.value.data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) { router.push('/auth/login'); return }
    fetchAll()
  }, [isAuthenticated, router, fetchAll])

  if (loading) return (
    <div className="p-6 space-y-5">
      <div className="skeleton h-10 w-60 rounded-xl" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}
      </div>
      <div className="skeleton h-64 rounded-2xl" />
    </div>
  )

  const userCurveData = equityFromPoints(equityCurve)
  const hasUserData = userCurveData.length >= 2

  const tradesWin      = userStats?.trades_win  ?? 0
  const tradesLoss     = userStats?.trades_loss ?? 0
  const totalPips      = n(userStats?.total_profit_pips)
  const winRateMaster  = n(masterStats?.win_rate_percent)
  const avgDur         = n(masterStats?.avg_trade_duration_hours)
  const totalPipsMaster = n(masterStats?.total_profit_pips)

  return (
    <div className="p-5 sm:p-6 space-y-6 max-w-[1400px]">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>La Mia Performance</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Statistiche reali basate sui tuoi trade eseguiti
          </p>
        </div>
      </div>

      {/* KPI Row 1 — trade counts (utente) + Win Rate (master) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Trade Eseguiti"
          value={String(userStats?.trades_executed ?? 0)}
          sub="Confermati sul conto"
          color="var(--gold)" icon={Activity} />
        <StatCard
          label="Trade Vincenti"
          value={String(tradesWin)}
          sub="Chiusi in profitto"
          color="var(--green)" icon={CheckCircle} />
        <StatCard
          label="Trade Perdenti"
          value={String(tradesLoss)}
          sub="Chiusi in perdita"
          color="var(--red)" icon={XCircle} />
        <StatCard
          label="Win Rate Sistema"
          value={`${winRateMaster.toFixed(1)}%`}
          sub={`Media su ${masterStats?.trades_total ?? 0} trade master`}
          color="var(--green)" icon={Target} />
      </div>

      {/* KPI Row 2 — profit sistema + profit utente + durata */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Profit Pips Sistema"
          value={totalPipsMaster !== 0
            ? `${totalPipsMaster >= 0 ? '+' : ''}${totalPipsMaster.toFixed(0)} pips`
            : '— pips'}
          sub="Totale storico master"
          color={totalPipsMaster >= 0 ? 'var(--green)' : 'var(--red)'} icon={TrendingUp} />
        <StatCard
          label="I Miei Pips"
          value={totalPips !== 0
            ? `${totalPips >= 0 ? '+' : ''}${totalPips.toFixed(1)} pips`
            : '— pips'}
          sub="Pips accumulati sul tuo conto"
          color={totalPips >= 0 ? 'var(--green)' : 'var(--red)'} icon={BarChart3} />
        <StatCard
          label="Durata Media"
          value={avgDur > 0 ? `${avgDur.toFixed(1)}h` : '—'}
          sub="Per trade chiuso · sistema"
          color="var(--gold)" icon={Clock} />
      </div>

      {/* Equity Curve */}
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>La Tua Equity Curve</h2>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              {hasUserData
                ? `Pips cumulativi · ${equityCurve.length} trade chiusi`
                : 'In attesa dei tuoi primi trade chiusi'}
            </p>
          </div>
          {hasUserData && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded" style={{ background: 'var(--green)' }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Il Tuo Account</span>
            </div>
          )}
        </div>

        {hasUserData ? (
          <>
            <svg viewBox="0 0 700 200" className="w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="userFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="var(--green)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[50, 100, 150].map(y => (
                <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="var(--border)" strokeWidth="1" />
              ))}
              <path d={`M 0,200 L ${buildPath(userCurveData, 700, 200)} L 700,200 Z`} fill="url(#userFill)" />
              <polyline points={buildPath(userCurveData, 700, 200)}
                fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex justify-between mt-2 px-1 overflow-hidden">
              {equityCurve.slice(0, 12).map((p, i) => (
                <span key={i} className="text-[9px] font-medium" style={{ color: 'var(--text-muted)' }}>
                  {new Date(p.date).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <BarChart3 className="w-12 h-12 opacity-20" style={{ color: 'var(--gold)' }} />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Nessun trade chiuso ancora
            </p>
            <p className="text-xs text-center max-w-xs" style={{ color: 'var(--text-muted)' }}>
              La tua equity curve apparirà qui non appena il Master chiuderà i primi trade
              e il sistema li avrà eseguiti sul tuo conto.
            </p>
          </div>
        )}
      </div>

    </div>
  )
}
