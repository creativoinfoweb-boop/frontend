'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import api from '@/lib/api'
import {
  Server, Trash2, AlertCircle, CheckCircle2,
  XCircle, Clock, RefreshCw, Wifi, WifiOff,
  AlertTriangle, ShieldOff
} from 'lucide-react'

interface AdminAccount {
  id: string
  user_id: string
  user_email: string
  user_name: string
  name: string
  mt5_server: string
  mt5_login: string
  account_type: string
  is_active: boolean
  risk_percent: number
  subscription_active: boolean
  last_check_at: string | null
  last_check_ok: boolean | null
  last_check_error: string | null
  created_at: string
  needs_attention: boolean
}

interface AccountsData {
  accounts: AdminAccount[]
  total: number
  active_subscription: number
  check_errors: number
  never_checked: number
}

type FilterType = 'ALL' | 'ERRORS' | 'NO_SUB' | 'NEVER_CHECKED'

function CheckBadge({ ok, error }: { ok: boolean | null; error?: string | null }) {
  if (ok === null || ok === undefined) return (
    <span className="flex items-center gap-1 text-xs text-[#71717A]">
      <Clock className="w-3.5 h-3.5" /> Mai verificato
    </span>
  )
  if (ok) return (
    <span className="flex items-center gap-1 text-xs text-[#22C55E]">
      <Wifi className="w-3.5 h-3.5" /> OK
    </span>
  )
  return (
    <span className="flex items-center gap-1 text-xs text-[#EF4444]" title={error || ''}>
      <WifiOff className="w-3.5 h-3.5" /> Errore
    </span>
  )
}

function SubBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#22C55E15] text-[#22C55E] border border-[#22C55E30]">
      <CheckCircle2 className="w-3 h-3" /> Attivo
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EF444415] text-[#EF4444] border border-[#EF444430]">
      <ShieldOff className="w-3 h-3" /> Scaduto
    </span>
  )
}

export default function AdminAccountsPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const [data, setData] = useState<AccountsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('ALL')
  const [deleteConfirm, setDeleteConfirm] = useState<AdminAccount | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null)
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('admin-theme')
    setIsDark(saved !== 'light')

    const handleStorageChange = () => {
      const saved = localStorage.getItem('admin-theme')
      setIsDark(saved !== 'light')
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) router.push('/dashboard')
  }, [isAuthenticated, user, router])

  const showToast = (text: string, ok = true) => {
    setToast({ text, ok })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchAccounts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get('/admin/accounts')
      setData(res.data)
    } catch {
      showToast('Errore nel caricamento degli account', false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && user?.is_admin) fetchAccounts()
  }, [isAuthenticated, user, fetchAccounts])

  const handleDelete = async () => {
    if (!deleteConfirm) return
    setDeleting(true)
    try {
      await api.delete(`/admin/accounts/${deleteConfirm.id}`)
      showToast(`Account "${deleteConfirm.name}" eliminato`)
      setDeleteConfirm(null)
      fetchAccounts()
    } catch (e: any) {
      showToast(e.response?.data?.detail || 'Errore eliminazione', false)
    } finally {
      setDeleting(false)
    }
  }

  const filtered = (data?.accounts ?? []).filter(acc => {
    if (filter === 'ERRORS') return acc.last_check_ok === false
    if (filter === 'NO_SUB') return !acc.subscription_active
    if (filter === 'NEVER_CHECKED') return acc.last_check_ok === null
    return true
  })

  const formatDate = (iso: string | null) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleString('it-IT', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
  }

  if (!mounted) return null

  const bgPrimary = isDark ? '#12121F' : '#FFFFFF'
  const bgSecondary = isDark ? '#0A0A14' : '#F3F3F3'
  const borderColor = isDark ? '#1E1E35' : '#E5E5E5'
  const textPrimary = isDark ? '#F4F4F5' : '#1A1A1A'
  const textSecondary = isDark ? '#A1A1AA' : '#666666'
  const textTertiary = isDark ? '#52525B' : '#999999'
  const hoverBg = isDark ? '#0F0F1E' : '#F0F0F0'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black" style={{ color: textPrimary }}>Account MT5</h1>
          <p className="text-sm mt-1" style={{ color: textSecondary }}>Tutti gli account MT5 collegati al sistema</p>
        </div>
        <button
          onClick={fetchAccounts}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors"
          style={{
            color: textSecondary,
            background: bgPrimary,
            border: `1px solid ${borderColor}`
          }}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Aggiorna
        </button>
      </div>

      {/* KPI Cards */}
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Totale account', value: data.total, icon: Server, color: '#A1A1AA' },
            { label: 'Abbonamento attivo', value: data.active_subscription, icon: CheckCircle2, color: '#22C55E' },
            { label: 'Errore verifica', value: data.check_errors, icon: XCircle, color: '#EF4444' },
            { label: 'Mai verificati', value: data.never_checked, icon: Clock, color: '#F59E0B' },
          ].map(kpi => (
            <div key={kpi.label} className="rounded-xl p-4" style={{ background: bgPrimary, border: `1px solid ${borderColor}` }}>
              <div className="flex items-center gap-2 mb-2">
                <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
                <span className="text-xs" style={{ color: textSecondary }}>{kpi.label}</span>
              </div>
              <p className="text-2xl font-black" style={{ color: kpi.color }}>{kpi.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {([
          { key: 'ALL', label: 'Tutti' },
          { key: 'ERRORS', label: '⚠ Errori verifica' },
          { key: 'NO_SUB', label: '✗ Abbonamento scaduto' },
          { key: 'NEVER_CHECKED', label: '○ Mai verificati' },
        ] as { key: FilterType; label: string }[]).map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={filter === f.key
              ? { background: '#F5A62320', border: '1px solid #F5A62350', color: '#F5A623' }
              : { background: bgPrimary, border: `1px solid ${borderColor}`, color: textSecondary }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: bgPrimary, border: `1px solid ${borderColor}` }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${borderColor}`, background: bgSecondary }}>
                {['Utente', 'Conto MT5', 'Account', 'Server', 'Tipo', 'Abbonamento', 'Verifica', 'Rischio', 'Aggiunto', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider" style={{ color: textTertiary }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${borderColor}` }}>
                    {Array.from({ length: 9 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-3 rounded animate-pulse w-3/4" style={{ background: borderColor }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm" style={{ color: textTertiary }}>
                    Nessun account trovato
                  </td>
                </tr>
              ) : filtered.map(acc => (
                <tr
                  key={acc.id}
                  className="transition-colors"
                  style={{
                    borderBottom: `1px solid ${borderColor}`,
                    background: acc.needs_attention ? (isDark ? '#F59E0B08' : '#F59E0B15') : 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = acc.needs_attention ? (isDark ? '#F59E0B08' : '#F59E0B15') : hoverBg}
                  onMouseLeave={(e) => e.currentTarget.style.background = acc.needs_attention ? (isDark ? '#F59E0B08' : '#F59E0B15') : 'transparent'}
                >
                  {/* Utente */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {acc.needs_attention && <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0" />}
                      <div>
                        <p className="text-xs font-semibold truncate max-w-[140px]" style={{ color: textPrimary }}>{acc.user_name}</p>
                        <a
                          href={`mailto:${acc.user_email}?subject=Il%20tuo%20account%20MT5:%20${encodeURIComponent(acc.mt5_login)}`}
                          className="text-[10px] truncate max-w-[140px] cursor-pointer transition-colors underline"
                          style={{ color: textTertiary }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#F5A623'}
                          onMouseLeave={(e) => e.currentTarget.style.color = textTertiary}
                        >
                          {acc.user_email}
                        </a>
                      </div>
                    </div>
                  </td>
                  {/* Conto MT5 */}
                  <td className="px-4 py-3">
                    <p className="text-xs font-mono font-bold" style={{ color: '#F5A623' }}>{acc.mt5_login}</p>
                  </td>
                  {/* Nome account */}
                  <td className="px-4 py-3">
                    <p className="text-xs truncate max-w-[120px]" style={{ color: textSecondary }}>{acc.name}</p>
                  </td>
                  {/* Server */}
                  <td className="px-4 py-3">
                    <p className="text-xs font-mono truncate max-w-[140px]" style={{ color: textSecondary }}>{acc.mt5_server}</p>
                  </td>
                  {/* Tipo */}
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      acc.account_type === 'real'
                        ? 'bg-[#22C55E15] text-[#22C55E] border border-[#22C55E30]'
                        : 'bg-[#F59E0B15] text-[#F59E0B] border border-[#F59E0B30]'
                    }`}>
                      {acc.account_type === 'real' ? 'Live' : 'Demo'}
                    </span>
                  </td>
                  {/* Abbonamento */}
                  <td className="px-4 py-3">
                    <SubBadge active={acc.subscription_active} />
                  </td>
                  {/* Verifica */}
                  <td className="px-4 py-3">
                    <div>
                      <CheckBadge ok={acc.last_check_ok} error={acc.last_check_error} />
                      {acc.last_check_at && (
                        <p className="text-[10px] mt-0.5" style={{ color: isDark ? '#3F3F5C' : '#999999' }}>{formatDate(acc.last_check_at)}</p>
                      )}
                      {acc.last_check_error && acc.last_check_ok === false && (
                        <p className="text-[10px] text-[#EF4444] mt-0.5 truncate max-w-[160px]" title={acc.last_check_error}>
                          {acc.last_check_error}
                        </p>
                      )}
                    </div>
                  </td>
                  {/* Rischio */}
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold" style={{
                      color: acc.risk_percent <= 3 ? '#22C55E' : acc.risk_percent === 4 ? '#F59E0B' : '#EF4444'
                    }}>
                      {acc.risk_percent}%
                    </span>
                  </td>
                  {/* Data aggiunta */}
                  <td className="px-4 py-3">
                    <p className="text-[10px]" style={{ color: textTertiary }}>{formatDate(acc.created_at)}</p>
                  </td>
                  {/* Azioni */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDeleteConfirm(acc)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        background: '#EF444410',
                        border: '1px solid #EF444425'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#EF444420'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#EF444410'}
                      title="Elimina account"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-[#EF4444]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length > 0 && (
          <div className="px-4 py-2 text-xs" style={{ borderTop: `1px solid ${borderColor}`, color: textTertiary }}>
            {filtered.length} account{filtered.length !== 1 ? 's' : ''} mostrati
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={() => !deleting && setDeleteConfirm(null)}
        >
          <div
            className="rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            style={{ background: bgPrimary, border: `1px solid ${borderColor}` }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EF444415] border border-[#EF444430] flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-[#EF4444]" />
              </div>
              <div>
                <h2 className="font-black" style={{ color: textPrimary }}>Elimina Account MT5</h2>
                <p className="text-xs" style={{ color: textSecondary }}>Operazione irreversibile</p>
              </div>
            </div>

            <div className="rounded-xl p-3 mb-4 space-y-1" style={{ background: bgSecondary }}>
              <p className="text-xs" style={{ color: textSecondary }}>Utente: <span className="font-semibold" style={{ color: textPrimary }}>{deleteConfirm.user_email}</span></p>
              <p className="text-xs" style={{ color: textSecondary }}>Account: <span className="font-semibold" style={{ color: textPrimary }}>{deleteConfirm.name}</span></p>
              <p className="text-xs" style={{ color: textSecondary }}>Server: <span className="font-mono" style={{ color: textSecondary }}>{deleteConfirm.mt5_server}</span></p>
            </div>

            <p className="text-sm mb-5" style={{ color: textSecondary }}>
              I trade <strong style={{ color: textPrimary }}>non verranno più copiati</strong> su questo conto.
              L'utente potrà aggiungerne uno nuovo dalla sua dashboard.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40"
                style={{
                  background: bgSecondary,
                  color: textSecondary,
                  border: `1px solid ${borderColor}`
                }}
              >
                Annulla
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[#EF444415] border border-[#EF444435] text-[#EF4444] transition-colors disabled:opacity-40"
              >
                {deleting ? 'Eliminazione…' : 'Elimina definitivamente'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl z-50"
          style={{
            background: toast.ok ? (isDark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)') : (isDark ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.1)'),
            border: `1px solid ${toast.ok ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
            color: toast.ok ? '#22C55E' : '#EF4444',
          }}
        >
          {toast.text}
        </div>
      )}
    </div>
  )
}
