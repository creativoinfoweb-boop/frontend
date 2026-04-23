'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { affiliatesApi, getApiErrorMessage } from '@/lib/api'
import {
  Plus, AlertCircle, AlertTriangle,
  Users, TrendingUp, Clock, X, Check, Info, Trash2,
} from 'lucide-react'

function AdminSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="skeleton h-10 w-64 rounded-xl" />
      <div className="skeleton h-96 rounded-xl" />
    </div>
  )
}

// ── Toast ──────────────────────────────────────────────────────────────────
function Toast({ toast }: { toast: { text: string; ok: boolean } | null }) {
  if (!toast) return null
  return (
    <div
      className="fixed bottom-6 right-6 z-50 max-w-sm px-5 py-3.5 rounded-xl text-sm font-semibold shadow-2xl"
      style={{
        background: toast.ok ? 'rgba(0,230,118,0.15)' : 'rgba(255,61,113,0.15)',
        border: `1px solid ${toast.ok ? 'rgba(0,230,118,0.35)' : 'rgba(255,61,113,0.35)'}`,
        color: toast.ok ? '#00E676' : '#FF3D71',
        backdropFilter: 'blur(16px)',
      }}
    >
      {toast.text}
    </div>
  )
}

// ── Add Affiliate Form ──────────────────────────────────────────────────────
function AddAffiliateForm({ onSuccess, onRefresh }: { onSuccess: (msg: string, ok: boolean) => void; onRefresh: () => Promise<void> }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      await affiliatesApi.addAffiliate(email.trim())
      setEmail('')
      onSuccess(`✅ Affiliato creato con successo per ${email.trim()}`, true)
      await onRefresh()
    } catch (e: unknown) {
      const msg = getApiErrorMessage(e, 'Errore aggiunta affiliato')
      const isNotFound = msg.toLowerCase().includes('not found') || msg.toLowerCase().includes('non trovato')
      onSuccess(
        isNotFound
          ? `❌ Utente "${email.trim()}" non trovato nel sistema. L'utente deve prima effettuare l'accesso almeno una volta con questa email.`
          : `❌ ${msg}`,
        false
      )
    } finally {
      setLoading(false)
    }
  }, [email, onSuccess, onRefresh])

  return (
    <div className="card-premium p-5">
      <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        Aggiungi affiliato manualmente
      </h3>
      <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
        L'utente deve aver già effettuato l'accesso almeno una volta per essere aggiunto.
      </p>

      {/* Avvertenza importante */}
      <div className="flex items-start gap-2 p-3 rounded-xl mb-3"
        style={{ background: 'rgba(240,180,41,0.06)', border: '1px solid rgba(240,180,41,0.2)' }}>
        <Info className="w-3.5 h-3.5 text-[#F0B429] flex-shrink-0 mt-0.5" />
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          <strong style={{ color: '#F0B429' }}>Prerequisito:</strong> usa l'email con cui l'utente si è registrato su El Dorado (non la email della candidatura se diversa).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="email@utente.com"
          required
          className="input-premium flex-1 text-sm"
        />
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="btn-gold px-5 py-2.5 rounded-xl text-sm font-bold disabled:opacity-40 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {loading ? 'Aggiunta…' : 'Aggiungi'}
        </button>
      </form>
    </div>
  )
}

// ── Affiliates Table ───────────────────────────────────────────────────────
function AffiliatesTable({ affiliates, onToggle, onDelete, actionLoading }: {
  affiliates: any[]
  onToggle: (id: string, current: boolean) => void
  onDelete: (id: string, code: string) => void
  actionLoading: string | null
}) {
  if (affiliates.length === 0) {
    return (
      <div className="card-premium p-10 flex flex-col items-center gap-3 text-center">
        <AlertCircle className="w-10 h-10 opacity-30" style={{ color: 'var(--text-muted)' }} />
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Nessun affiliato ancora</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Usa il form sopra per aggiungere il primo affiliato.</p>
      </div>
    )
  }

  return (
    <div className="card-premium overflow-hidden">
      <table className="w-full text-sm">
        <thead style={{ borderBottom: '1px solid var(--border)' }}>
          <tr style={{ color: 'var(--text-muted)' }}>
            <th className="text-left py-3 px-4 text-xs font-semibold">Codice</th>
            <th className="text-center py-3 px-4 text-xs font-semibold">Referral attivi</th>
            <th className="text-right py-3 px-4 text-xs font-semibold">Guadagni totali</th>
            <th className="text-center py-3 px-4 text-xs font-semibold">Tier</th>
            <th className="text-center py-3 px-4 text-xs font-semibold">Status</th>
            <th className="text-right py-3 px-4 text-xs font-semibold">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {affiliates.map((aff: any) => (
            <tr key={aff.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td className="py-3 px-4 font-mono text-xs font-bold" style={{ color: 'var(--gold)' }}>
                {aff.affiliate_code}
              </td>
              <td className="py-3 px-4 text-center text-xs" style={{ color: 'var(--text-primary)' }}>
                {aff.referrals_active}
              </td>
              <td className="py-3 px-4 text-right text-xs font-mono" style={{ color: 'var(--green)' }}>
                €{parseFloat(aff.earnings_total ?? 0).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-center">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  {aff.tier_info?.name ?? '—'}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                {aff.is_active ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--green)' }}>
                    <Check className="w-3 h-3" /> Attivo
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--red)' }}>
                    <X className="w-3 h-3" /> Inattivo
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onToggle(aff.id, aff.is_active)}
                    disabled={actionLoading === aff.id}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all disabled:opacity-40"
                    style={
                      aff.is_active
                        ? { background: 'rgba(255,61,113,0.08)', border: '1px solid rgba(255,61,113,0.25)', color: 'var(--red)' }
                        : { background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.25)', color: 'var(--green)' }
                    }
                  >
                    {actionLoading === aff.id ? '…' : aff.is_active ? 'Disattiva' : 'Attiva'}
                  </button>
                  <button
                    onClick={() => onDelete(aff.id, aff.affiliate_code)}
                    disabled={actionLoading === aff.id}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-40"
                    style={{ background: 'rgba(255,61,113,0.06)', border: '1px solid rgba(255,61,113,0.18)' }}
                    title="Elimina affiliato"
                  >
                    <Trash2 className="w-3.5 h-3.5" style={{ color: 'var(--red)' }} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Applications Section ───────────────────────────────────────────────────
function ApplicationsSection({ applications, onAction, actionLoading, onForceCreate }: {
  applications: any[]
  onAction: (id: string, status: 'approved' | 'rejected') => void
  actionLoading: string | null
  onForceCreate: (email: string) => void
}) {
  if (applications.length === 0) {
    return (
      <div className="card-premium p-8 flex flex-col items-center gap-3 text-center">
        <AlertCircle className="w-10 h-10 opacity-30" style={{ color: 'var(--text-muted)' }} />
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Nessuna candidatura ricevuta</p>
      </div>
    )
  }

  return (
    <div className="card-premium overflow-hidden">
      <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
        {applications.map((app: any) => (
          <div key={app.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{app.name}</span>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{app.email}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    {app.creator_type}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    app.status === 'pending'  ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50' :
                    app.status === 'approved' ? 'bg-green-900/30 text-green-400 border border-green-800/50' :
                                               'bg-red-900/30 text-red-400 border border-red-800/50'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <div className="text-xs space-y-0.5" style={{ color: 'var(--text-muted)' }}>
                  {app.community_size && <div>👥 {app.community_size}</div>}
                  {app.channels && <div>📱 {app.channels}</div>}
                  {app.community_desc && <div className="italic">"{app.community_desc}"</div>}
                  {app.message && <div>💬 {app.message}</div>}
                  <div className="text-[10px] mt-1">
                    {app.created_at ? new Date(app.created_at).toLocaleString('it-IT') : ''}
                  </div>
                </div>
              </div>

              {/* Azioni */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                {app.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAction(app.id, 'approved')}
                      disabled={actionLoading === app.id}
                      className="px-3 py-1.5 text-sm font-bold rounded-lg transition-all disabled:opacity-40 flex items-center gap-1"
                      style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', color: 'var(--green)' }}
                    >
                      {actionLoading === app.id
                        ? '…'
                        : <><Check className="w-3.5 h-3.5" /> Approva</>
                      }
                    </button>
                    <button
                      onClick={() => onAction(app.id, 'rejected')}
                      disabled={actionLoading === app.id}
                      className="px-3 py-1.5 text-sm font-bold rounded-lg transition-all disabled:opacity-40 flex items-center gap-1"
                      style={{ background: 'rgba(255,61,113,0.08)', border: '1px solid rgba(255,61,113,0.25)', color: 'var(--red)' }}
                    >
                      <X className="w-3.5 h-3.5" /> Rifiuta
                    </button>
                  </div>
                )}

                {app.status === 'approved' && (
                  <div className="space-y-1">
                    <button
                      onClick={() => onForceCreate(app.email)}
                      disabled={actionLoading === app.email}
                      className="w-full px-4 py-2 text-sm font-bold rounded-lg transition-all disabled:opacity-40 flex items-center justify-center gap-1.5"
                      style={{ background: 'rgba(240,180,41,0.12)', border: '1px solid rgba(240,180,41,0.35)', color: '#F0B429' }}
                    >
                      {actionLoading === app.email
                        ? '…'
                        : <><Plus className="w-3.5 h-3.5" /> Attiva account affiliato</>
                      }
                    </button>
                    <p className="text-[9px] text-center" style={{ color: 'var(--text-muted)' }}>
                      Se la voce Affiliato non appare all'utente
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Payouts Section ────────────────────────────────────────────────────────
function PayoutsSection({ payouts, onProcess, actionLoading }: {
  payouts: any[]
  onProcess: (id: string, status: 'paid' | 'rejected') => void
  actionLoading: string | null
}) {
  const pending = payouts.filter(p => p.status === 'requested' || p.status === 'processing')

  if (pending.length === 0) {
    return (
      <div className="card-premium p-8 flex flex-col items-center gap-3 text-center">
        <AlertCircle className="w-10 h-10 opacity-30" style={{ color: 'var(--text-muted)' }} />
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Nessun payout in sospeso</p>
      </div>
    )
  }

  return (
    <div className="card-premium divide-y" style={{ borderColor: 'var(--border)' }}>
      {pending.map((p: any) => (
        <div key={p.id} className="p-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-sm" style={{ color: 'var(--green)' }}>
              €{parseFloat(p.amount_eur ?? 0).toFixed(2)}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Richiesto: {p.requested_at ? new Date(p.requested_at).toLocaleDateString('it-IT') : '—'}
            </p>
            <p className="text-xs capitalize" style={{ color: '#F0B429' }}>{p.status}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onProcess(p.id, 'paid')}
              disabled={actionLoading === p.id}
              className="px-3 py-1.5 text-xs font-bold rounded-lg disabled:opacity-40"
              style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', color: 'var(--green)' }}
            >
              {actionLoading === p.id ? '…' : 'Pagato'}
            </button>
            <button
              onClick={() => onProcess(p.id, 'rejected')}
              disabled={actionLoading === p.id}
              className="px-3 py-1.5 text-xs font-bold rounded-lg disabled:opacity-40"
              style={{ background: 'rgba(255,61,113,0.08)', border: '1px solid rgba(255,61,113,0.25)', color: 'var(--red)' }}
            >
              Rifiuta
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Main Admin Content ─────────────────────────────────────────────────────
function AdminContent() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const [affiliates, setAffiliates] = useState<any[]>([])
  const [payouts, setPayouts] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'affiliates' | 'applications' | 'payouts'>('affiliates')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null)

  const showToast = useCallback((text: string, ok = true) => {
    setToast({ text, ok })
    setTimeout(() => setToast(null), 7000)
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [affRes, payoutRes, appRes] = await Promise.all([
        affiliatesApi.listAffiliates(),
        affiliatesApi.listPayouts(),
        affiliatesApi.listApplications(),
      ])
      setAffiliates(affRes.data.affiliates || [])
      setPayouts(payoutRes.data.payouts || [])
      setApplications(appRes.data || [])
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, 'Errore nel caricamento dei dati'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) {
      router.push('/dashboard')
      return
    }
    fetchData()
  }, [isAuthenticated, user, router, fetchData])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleToggle = useCallback(async (id: string, current: boolean) => {
    setActionLoading(id)
    try {
      await affiliatesApi.toggleAffiliate(id, !current)
      showToast(current ? 'Affiliato disattivato' : '✅ Affiliato attivato')
      await fetchData()
    } catch (e: unknown) {
      showToast(getApiErrorMessage(e, 'Errore toggle affiliato'), false)
    } finally {
      setActionLoading(null)
    }
  }, [fetchData, showToast])

  const handleApplicationAction = useCallback(async (id: string, status: 'approved' | 'rejected') => {
    setActionLoading(id)
    try {
      const res = await affiliatesApi.updateApplication(id, status)
      const data = (res as any).data

      if (status === 'approved') {
        if (data?.affiliate_created === true) {
          showToast('✅ Candidatura approvata e account affiliato creato. L\'utente vedrà la sezione Affiliato al prossimo accesso.')
        } else if (data?.affiliate_created === false) {
          showToast(
            '⚠️ Candidatura approvata ma l\'account affiliato NON è stato creato: l\'utente non ha ancora effettuato il primo accesso. Chiedigli di accedere e poi usa "Attiva account affiliato".',
            false
          )
        } else {
          showToast('✅ Candidatura approvata')
        }
      } else {
        showToast('Candidatura rifiutata')
      }
      await fetchData()
    } catch (e: unknown) {
      showToast(getApiErrorMessage(e, 'Errore aggiornamento candidatura'), false)
    } finally {
      setActionLoading(null)
    }
  }, [fetchData, showToast])

  const handleForceCreate = useCallback(async (email: string) => {
    setActionLoading(email)
    try {
      // 1. Crea/recupera l'affiliato
      const res = await affiliatesApi.addAffiliate(email)
      const affiliateId = (res as any).data?.id

      // 2. Assicura che sia ATTIVO (il backend restituisce l'esistente anche se inattivo)
      if (affiliateId) {
        await affiliatesApi.toggleAffiliate(affiliateId, true)
      }

      showToast(`✅ Affiliato attivato per ${email}. L'utente vedrà la sezione Affiliato entro 60s o dopo il prossimo login.`)
      await fetchData()
    } catch (e: unknown) {
      const msg = getApiErrorMessage(e, 'Errore creazione affiliato')
      const isNotFound = msg.toLowerCase().includes('not found') || msg.toLowerCase().includes('non trovato')
      showToast(
        isNotFound
          ? `❌ "${email}" non trovato nel sistema. L'utente deve prima fare il primo accesso su El Dorado.`
          : `❌ ${msg}`,
        false
      )
    } finally {
      setActionLoading(null)
    }
  }, [fetchData, showToast])

  const handleDelete = useCallback(async (id: string, code: string) => {
    if (!confirm(`⚠️ Eliminare definitivamente l'affiliato ${code}?\n\nQuesta azione elimina anche tutti i referral e le commissioni associati. Non è reversibile.`)) return
    setActionLoading(id)
    try {
      await affiliatesApi.deleteAffiliate(id)
      showToast(`✅ Affiliato ${code} eliminato definitivamente`)
      await fetchData()
    } catch (e: unknown) {
      showToast(getApiErrorMessage(e, 'Errore eliminazione affiliato'), false)
    } finally {
      setActionLoading(null)
    }
  }, [fetchData, showToast])

  const handleProcessPayout = useCallback(async (id: string, status: 'paid' | 'rejected') => {
    const notes = status === 'rejected' ? (prompt('Note di rifiuto:') ?? undefined) : undefined
    setActionLoading(id)
    try {
      await affiliatesApi.processPayout(id, status, notes)
      showToast(status === 'paid' ? '✅ Payout marcato come pagato' : 'Payout rifiutato')
      await fetchData()
    } catch (e: unknown) {
      showToast(getApiErrorMessage(e, 'Errore elaborazione payout'), false)
    } finally {
      setActionLoading(null)
    }
  }, [fetchData, showToast])

  if (loading) return <AdminSkeleton />

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-start gap-3 p-5 rounded-2xl"
          style={{ background: 'rgba(255,61,113,0.06)', border: '1px solid rgba(255,61,113,0.2)' }}>
          <AlertTriangle className="w-5 h-5 text-[#FF3D71] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Errore caricamento</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const pendingApps = applications.filter(a => a.status === 'pending')
  const pendingPayouts = payouts.filter(p => p.status === 'requested' || p.status === 'processing')

  return (
    <div className="p-5 sm:p-6 space-y-5 max-w-5xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>Gestione Affiliati</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Aggiungi affiliati, approva candidature, processa payout
        </p>
      </div>

      {/* Come funziona box — spiega il prerequisito principale */}
      <div className="flex items-start gap-3 p-4 rounded-xl"
        style={{ background: 'rgba(0,194,255,0.05)', border: '1px solid rgba(0,194,255,0.15)' }}>
        <Info className="w-4 h-4 text-[#00C2FF] flex-shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed space-y-1" style={{ color: 'var(--text-secondary)' }}>
          <p><strong style={{ color: '#00C2FF' }}>Prerequisito fondamentale:</strong> Per aggiungere qualcuno come affiliato, l'utente deve prima <strong style={{ color: 'var(--text-primary)' }}>aver effettuato il primo accesso</strong> su El Dorado con quell'email, così che il suo account esista nel sistema.</p>
          <p>Dopo l'attivazione, l'utente deve <strong style={{ color: 'var(--text-primary)' }}>fare logout e rientrare</strong> per vedere la sezione Affiliato nel menu laterale.</p>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-premium p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Affiliati totali</p>
              <p className="text-2xl font-black mt-1" style={{ color: 'var(--text-primary)' }}>{affiliates.length}</p>
            </div>
            <Users className="w-7 h-7 opacity-40" style={{ color: 'var(--gold)' }} />
          </div>
        </div>
        <div className="card-premium p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Candidature pendenti</p>
              <p className="text-2xl font-black mt-1" style={{ color: pendingApps.length > 0 ? '#F0B429' : 'var(--text-primary)' }}>
                {pendingApps.length}
              </p>
            </div>
            <Clock className="w-7 h-7 opacity-40" style={{ color: '#F0B429' }} />
          </div>
        </div>
        <div className="card-premium p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Payout in sospeso</p>
              <p className="text-2xl font-black mt-1" style={{ color: pendingPayouts.length > 0 ? 'var(--green)' : 'var(--text-primary)' }}>
                {pendingPayouts.length}
              </p>
            </div>
            <TrendingUp className="w-7 h-7 opacity-40" style={{ color: 'var(--green)' }} />
          </div>
        </div>
      </div>

      {/* Add Affiliate Form — UNA SOLA VOLTA */}
      <AddAffiliateForm onSuccess={showToast} onRefresh={fetchData} />

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
        {([
          { key: 'affiliates',   label: 'Affiliati',    count: affiliates.length,    alert: false },
          { key: 'applications', label: 'Candidature',  count: applications.length,  alert: pendingApps.length > 0 },
          { key: 'payouts',      label: 'Payout',       count: pendingPayouts.length, alert: pendingPayouts.length > 0 },
        ] as const).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-1 relative px-3 py-2 rounded-lg text-xs font-semibold transition-all"
            style={
              activeTab === tab.key
                ? { background: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--border)' }
                : { color: 'var(--text-muted)', border: '1px solid transparent' }
            }
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: tab.alert ? 'rgba(240,180,41,0.15)' : 'var(--surface-2)',
                  color: tab.alert ? '#F0B429' : 'var(--text-muted)',
                }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'affiliates' && (
        <AffiliatesTable
          affiliates={affiliates}
          onToggle={handleToggle}
          onDelete={handleDelete}
          actionLoading={actionLoading}
        />
      )}

      {activeTab === 'applications' && (
        <ApplicationsSection
          applications={applications}
          onAction={handleApplicationAction}
          actionLoading={actionLoading}
          onForceCreate={handleForceCreate}
        />
      )}

      {activeTab === 'payouts' && (
        <PayoutsSection
          payouts={payouts}
          onProcess={handleProcessPayout}
          actionLoading={actionLoading}
        />
      )}

      <Toast toast={toast} />
    </div>
  )
}

export default function AdminAffiliatesPage() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <AdminContent />
    </Suspense>
  )
}
