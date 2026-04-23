'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { adminApi } from '@/lib/api'
import type { AdminSignal } from '@/types'
import {
  TrendingUp, TrendingDown, RefreshCw, AlertCircle,
  CheckCircle2, XCircle, Activity, BarChart3
} from 'lucide-react'

type FilterStatus = 'ALL' | 'OPEN' | 'CLOSED' | 'CANCELLED'

function DirectionBadge({ direction }: { direction: 'BUY' | 'SELL' }) {
  return direction === 'BUY' ? (
    <span className="inline-flex items-center gap-1 text-[#22C55E] font-bold text-sm">
      <TrendingUp className="h-3.5 w-3.5" /> BUY
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[#EF4444] font-bold text-sm">
      <TrendingDown className="h-3.5 w-3.5" /> SELL
    </span>
  )
}

function SignalStatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { label: string; color: string }> = {
    OPEN:      { label: 'APERTO',    color: '#3B82F6' },
    CLOSED:    { label: 'CHIUSO',    color: '#22C55E' },
    CANCELLED: { label: 'ANNULLATO', color: '#EF4444' },
  }
  const { label, color } = cfg[status] ?? { label: status, color: '#71717A' }
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold tracking-wide"
      style={{ background: `${color}22`, color }}
    >
      {label}
    </span>
  )
}

function PipsCell({ pips }: { pips?: number }) {
  if (pips == null) return <span className="text-[#52525B]">—</span>
  const color = pips >= 0 ? '#22C55E' : '#EF4444'
  return <span style={{ color }} className="font-semibold">{pips >= 0 ? '+' : ''}{pips.toFixed(1)}</span>
}


function formatDate(iso?: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('it-IT', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function AdminSignalsPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()

  const [signals, setSignals] = useState<AdminSignal[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterStatus>('ALL')

  useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, user, router])

  const fetchSignals = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await adminApi.listSignals()
      setSignals(res.data.signals)
      setTotal(res.data.total)
    } catch {
      setError('Impossibile caricare i segnali.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && user?.is_admin) fetchSignals()
  }, [isAuthenticated, user, fetchSignals])

  const filtered = filter === 'ALL'
    ? signals
    : signals.filter(s => s.status === filter)

  // Stats
  const openCount     = signals.filter(s => s.status === 'OPEN').length
  const closedCount   = signals.filter(s => s.status === 'CLOSED').length
  const totalExec     = signals.reduce((a, s) => a + s.executions_total, 0)
  const totalSuccess  = signals.reduce((a, s) => a + s.executions_success, 0)
  const avgWinRate    = totalExec > 0 ? Math.round((totalSuccess / totalExec) * 100) : 0
  const totalPips     = signals.reduce((a, s) => a + (s.profit_pips ?? 0), 0)

  if (!isAuthenticated || !user?.is_admin) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F4F4F5]">Gestione Segnali</h1>
          <p className="mt-1 text-sm text-[#A1A1AA]">
            Storico completo dei segnali Master e relative esecuzioni
          </p>
        </div>
        <button
          onClick={fetchSignals}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Aggiorna
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl p-4 bg-[#12121F] border border-[#1E1E35]">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-4 w-4 text-[#3B82F6]" />
            <span className="text-sm text-[#A1A1AA]">Aperti ora</span>
          </div>
          <p className="text-2xl font-bold text-[#3B82F6]">{openCount}</p>
        </div>
        <div className="rounded-xl p-4 bg-[#12121F] border border-[#1E1E35]">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
            <span className="text-sm text-[#A1A1AA]">Chiusi</span>
          </div>
          <p className="text-2xl font-bold text-[#22C55E]">{closedCount}</p>
        </div>
        <div className="rounded-xl p-4 bg-[#12121F] border border-[#1E1E35]">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="h-4 w-4 text-[#F59E0B]" />
            <span className="text-sm text-[#A1A1AA]">Copy rate</span>
          </div>
          <p className="text-2xl font-bold text-[#F59E0B]">{avgWinRate}%</p>
          <p className="text-xs text-[#71717A]">{totalSuccess}/{totalExec} eseguiti</p>
        </div>
        <div className="rounded-xl p-4 bg-[#12121F] border border-[#1E1E35]">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className={`h-4 w-4 ${totalPips >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`} />
            <span className="text-sm text-[#A1A1AA]">Pips totali</span>
          </div>
          <p className={`text-2xl font-bold ${totalPips >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
            {totalPips >= 0 ? '+' : ''}{totalPips.toFixed(1)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['ALL', 'OPEN', 'CLOSED', 'CANCELLED'] as FilterStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-4 py-2 rounded-lg font-semibold transition-all text-sm"
            style={filter === s
              ? { background: 'linear-gradient(135deg, #B8860B, #FFD700)', color: '#0A0A0F' }
              : { background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }
            }
          >
            {s === 'ALL' ? `Tutti (${total})` : s === 'OPEN' ? `Aperti (${openCount})` : s === 'CLOSED' ? `Chiusi (${closedCount})` : 'Annullati'}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl p-4 flex items-center gap-3 bg-red-500/10 border border-red-500/30">
          <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-[#1E1E35]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1E1E35] bg-[#0F0F1A]">
                {['Aperto il', 'Simbolo', 'Dir.', 'Entry', 'Pips', 'Chiuso il', 'Stato', 'Copy %', 'Esecuzioni'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide text-[#71717A]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-[#1E1E35]">
                    {Array.from({ length: 9 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 rounded animate-pulse bg-[#1E1E35]" style={{ width: '60%' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Activity className="h-10 w-10 opacity-20 text-[#A1A1AA]" />
                      <p className="text-[#A1A1AA]">Nessun segnale trovato</p>
                      <p className="text-xs text-[#71717A]">
                        I segnali pubblicati dal Master EA appariranno qui
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((signal) => {
                  const copyRate = signal.executions_total > 0
                    ? Math.round((signal.executions_success / signal.executions_total) * 100)
                    : null
                  return (
                    <tr key={signal.id}
                      className="border-b border-[#1E1E35] hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3 text-xs text-[#71717A]">
                        {formatDate(signal.opened_at)}
                      </td>
                      <td className="px-4 py-3 font-mono font-semibold text-[#F4F4F5]">
                        {signal.symbol}
                      </td>
                      <td className="px-4 py-3">
                        <DirectionBadge direction={signal.direction} />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[#F4F4F5]">
                        {signal.entry_price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <PipsCell pips={signal.profit_pips} />
                      </td>
                      <td className="px-4 py-3 text-xs text-[#71717A]">
                        {formatDate(signal.closed_at)}
                      </td>
                      <td className="px-4 py-3">
                        <SignalStatusBadge status={signal.status} />
                      </td>
                      <td className="px-4 py-3">
                        {copyRate != null ? (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full overflow-hidden bg-[#1E1E35]">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${copyRate}%`,
                                  background: copyRate >= 80 ? '#22C55E' : copyRate >= 50 ? '#F59E0B' : '#EF4444'
                                }}
                              />
                            </div>
                            <span className="text-xs text-[#A1A1AA]">{copyRate}%</span>
                          </div>
                        ) : (
                          <span className="text-xs text-[#52525B]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="flex items-center gap-0.5 text-[#22C55E]">
                            <CheckCircle2 className="h-3 w-3" />
                            {signal.executions_success}
                          </span>
                          {signal.executions_failed > 0 && (
                            <>
                              <span className="text-[#52525B]">/</span>
                              <span className="flex items-center gap-0.5 text-[#EF4444]">
                                <XCircle className="h-3 w-3" />
                                {signal.executions_failed}
                              </span>
                            </>
                          )}
                          <span className="text-[#52525B]">
                            ({signal.executions_total} tot)
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer count */}
      {!loading && filtered.length > 0 && (
        <p className="text-xs text-center text-[#52525B]">
          {filtered.length} segnali mostrati
        </p>
      )}
    </div>
  )
}
