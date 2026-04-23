'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { signalsApi, getApiErrorMessage } from '@/lib/api'
import type { SignalHistoryItem } from '@/types'
import { AlertCircle, RefreshCw, TrendingUp, TrendingDown, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'

type FilterStatus = 'ALL' | 'EXECUTED'

const PAGE_SIZE = 20

function StatusBadge({ signalStatus, profitUsd }: { signalStatus: string; profitUsd?: number }) {
  // Stato basato su se il trade è aperto o chiuso, e se profitto o perdita
  if (signalStatus === 'OPEN') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{ background: '#3B82F622', color: '#3B82F6' }}>
        Aperto
      </span>
    )
  }
  // Chiuso — profitto o perdita
  if (profitUsd != null && profitUsd > 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{ background: '#22C55E22', color: '#22C55E' }}>
        Profitto
      </span>
    )
  }
  if (profitUsd != null && profitUsd < 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{ background: '#EF444422', color: '#EF4444' }}>
        Perdita
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: '#71717A22', color: '#71717A' }}>
      Chiuso
    </span>
  )
}

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

function formatDate(iso?: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('it-IT', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

function PnlCell({ pnlUsd }: { pnlUsd?: number }) {
  if (pnlUsd == null) return <span className="text-[#52525B]">—</span>
  const color = pnlUsd >= 0 ? '#22C55E' : '#EF4444'
  return <span style={{ color }} className="font-semibold">{pnlUsd >= 0 ? '+' : ''}{pnlUsd.toFixed(2)}</span>
}

export default function HistoryPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL')
  const [page, setPage] = useState(0)
  const [history, setHistory] = useState<SignalHistoryItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) router.push('/auth/login')
  }, [isAuthenticated, router])

  const fetchHistory = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Solo trade EXECUTED (nostri, non falliti/saltati)
      const statusFilter = filterStatus === 'ALL' ? 'EXECUTED' : filterStatus
      const res = await signalsApi.getHistory(statusFilter, PAGE_SIZE, page * PAGE_SIZE)
      setHistory(res.data.history)
      setTotal(res.data.total)
    } catch (err: unknown) {
      console.error('History fetch failed:', err)
      setError(getApiErrorMessage(err, 'Impossibile caricare lo storico. Riprova.'))
    } finally {
      setLoading(false)
    }
  }, [filterStatus, page])

  useEffect(() => {
    if (isAuthenticated) fetchHistory()
  }, [isAuthenticated, fetchHistory])

  useEffect(() => { setPage(0) }, [filterStatus])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  // Summary per la pagina corrente
  const openTrades = history.filter(h => h.signal_status === 'OPEN').length
  const closedTrades = history.filter(h => h.signal_status === 'CLOSED').length
  const totalUsd = history
    .filter(h => h.signal_status === 'CLOSED' && h.profit_usd !== undefined && h.profit_usd !== null)
    .reduce((acc, h) => acc + (h.profit_usd ?? 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Storico Trade
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Tutti i trade copiati dal sistema sul tuo conto
          </p>
        </div>
        <button
          onClick={fetchHistory}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Aggiorna
        </button>
      </div>

      {/* Summary cards */}
      {!loading && history.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl p-4" style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="h-4 w-4 text-[#3B82F6]" />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Aperti</span>
            </div>
            <p className="text-2xl font-bold text-[#3B82F6]">{openTrades}</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Chiusi</span>
            </div>
            <p className="text-2xl font-bold text-[#22C55E]">{closedTrades}</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4" style={{ color: totalUsd >= 0 ? '#22C55E' : '#EF4444' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Profitto totale ($)</span>
            </div>
            <p className={`text-2xl font-bold ${totalUsd >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
              {totalUsd >= 0 ? '+' : ''}{totalUsd.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Filters — solo Tutti e Aperti */}
      <div className="flex gap-2 flex-wrap">
        {(['ALL', 'EXECUTED'] as FilterStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className="px-4 py-2 rounded-lg font-semibold transition-all text-sm"
            style={filterStatus === status
              ? { background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', color: 'var(--text-inverse)' }
              : { background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }
            }
          >
            {status === 'ALL' ? 'Tutti' : 'Eseguiti'}
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
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                {['Data', 'Simbolo', 'Direzione', 'Entry', 'SL', 'Chiusura', 'Lotto', 'Pips', 'P/L ($)', 'Stato'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide"
                    style={{ color: 'var(--text-secondary)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    {Array.from({ length: 10 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 rounded animate-pulse" style={{ background: 'var(--glass-bg)', width: '60%' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : history.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Clock className="h-10 w-10 opacity-30" style={{ color: 'var(--text-muted)' }} />
                      <p style={{ color: 'var(--text-secondary)' }}>Nessun trade nella cronologia</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        I trade copiati dal sistema sul tuo conto appariranno qui
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                history.map((item) => (
                  <tr key={item.id}
                    className="transition-colors hover:bg-white/2"
                    style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {formatDate(item.opened_at || item.created_at)}
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {item.symbol}
                    </td>
                    <td className="px-4 py-3">
                      <DirectionBadge direction={item.direction} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-primary)' }}>
                      {item.entry_price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#EF4444]">
                      {item.sl.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-primary)' }}>
                      {item.close_price != null
                        ? item.close_price.toFixed(2)
                        : item.signal_status === 'OPEN'
                          ? <span style={{ color: 'var(--text-muted)' }}>Aperto</span>
                          : <span style={{ color: 'var(--text-muted)' }}>—</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {item.lot_size != null ? item.lot_size.toFixed(2) : '—'}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs font-semibold"
                      style={{ color: item.profit_pips != null ? (item.profit_pips >= 0 ? 'var(--green)' : 'var(--red)') : 'var(--text-muted)' }}>
                      {item.profit_pips != null
                        ? `${item.profit_pips >= 0 ? '+' : ''}${item.profit_pips} pips`
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <PnlCell pnlUsd={item.profit_usd} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge signalStatus={item.signal_status} profitUsd={item.profit_usd} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {total} trade totali · Pagina {page + 1} di {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-2 rounded-lg transition-colors disabled:opacity-40"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}
            >
              <ChevronLeft className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-2 rounded-lg transition-colors disabled:opacity-40"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}
            >
              <ChevronRight className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
