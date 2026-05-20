'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { adminApi } from '@/lib/api'
import { AdminStats } from '@/types'
import { AlertTriangle, X, CheckCircle2 } from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showStopConfirm1, setShowStopConfirm1] = useState(false)
  const [showStopConfirm2, setShowStopConfirm2] = useState(false)
  const [stopLoading, setStopLoading] = useState(false)
  const [stopResult, setStopResult] = useState<{ ok: boolean; message: string } | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) {
      router.push('/dashboard')
      return
    }

    const fetchStats = async () => {
      try {
        const res = await adminApi.getStats()
        setStats(res.data)
      } catch (err) {
        console.error('Error fetching admin stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [isAuthenticated, user, router])

  const handleEmergencyStop = async () => {
    setShowStopConfirm2(false)
    setStopLoading(true)
    setStopResult(null)
    try {
      const res = await adminApi.emergencyStop()
      const data = res.data as any
      setStopResult({
        ok: true,
        message: `${data.signals_cancelled} segnali chiusi con successo.`,
      })
    } catch (err: any) {
      const detail = err?.response?.data?.detail || err?.message || 'Errore sconosciuto'
      setStopResult({ ok: false, message: detail })
    } finally {
      setStopLoading(false)
    }
  }

  if (loading) {
    return <div className="text-[#A1A1AA]">Caricamento...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#F4F4F5]">Admin Dashboard</h1>
        <p className="text-[#A1A1AA] mt-2">Panoramica del sistema</p>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-[#12121F] border border-[#1E1E35] p-6">
            <p className="text-[#A1A1AA] text-sm font-medium">Utenti Totali</p>
            <p className="text-4xl font-bold text-[#F4F4F5] mt-2">{stats.users_total}</p>
          </div>
          <div className="rounded-lg bg-[#12121F] border border-[#1E1E35] p-6">
            <p className="text-[#A1A1AA] text-sm font-medium">Subscription Attive</p>
            <p className="text-4xl font-bold text-[#22C55E] mt-2">{stats.subscriptions_active}</p>
          </div>
          <div className="rounded-lg bg-[#12121F] border border-[#1E1E35] p-6">
            <p className="text-[#A1A1AA] text-sm font-medium">Trial Attivi</p>
            <p className="text-4xl font-bold text-[#F5A623] mt-2">{stats.trials_active}</p>
          </div>
          <div className="rounded-lg bg-[#12121F] border border-[#1E1E35] p-6">
            <p className="text-[#A1A1AA] text-sm font-medium">Segnali Oggi</p>
            <p className="text-4xl font-bold text-[#6366F1] mt-2">{stats.signals_today}</p>
          </div>
        </div>
      )}

      {/* Recent Signals */}
      <div className="rounded-lg bg-[#12121F] border border-[#1E1E35] p-6">
        <h2 className="text-lg font-semibold text-[#F4F4F5] mb-4">Ultimi Segnali</h2>
        <div className="text-[#A1A1AA] text-center py-8">
          Nessun dato disponibile. Integrazione segnali in corso...
        </div>
      </div>

      {/* 🚨 Emergency Controls */}
      <div className="rounded-xl border-2 p-6 space-y-4" style={{ borderColor: 'rgba(239,68,68,0.35)', background: 'rgba(239,68,68,0.04)' }}>
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
          <h2 className="text-lg font-black text-[#EF4444]">EMERGENCY CONTROLS</h2>
        </div>
        <p className="text-sm text-[#A1A1AA]">
          Chiude <strong className="text-[#F4F4F5]">tutti i segnali OPEN</strong> sul master e marca come CANCELLED.
          Tutti i subscriber attivi ricevono l&apos;aggiornamento via WebSocket.
          <strong className="text-[#EF4444]"> Azione irreversibile.</strong>
        </p>

        {stopResult && (
          <div
            className="flex items-start gap-3 p-4 rounded-xl text-sm"
            style={{
              background: stopResult.ok ? 'rgba(0,201,107,0.08)' : 'rgba(239,68,68,0.08)',
              border: `1px solid ${stopResult.ok ? 'rgba(0,201,107,0.25)' : 'rgba(239,68,68,0.25)'}`,
              color: stopResult.ok ? '#00C96B' : '#EF4444',
            }}
          >
            {stopResult.ok
              ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              : <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
            <span>{stopResult.message}</span>
          </div>
        )}

        <button
          onClick={() => setShowStopConfirm1(true)}
          disabled={stopLoading}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          style={{
            background: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.4)',
            color: '#EF4444',
          }}
        >
          <AlertTriangle className="w-4 h-4" />
          {stopLoading ? 'Chiusura in corso…' : 'Chiudi TUTTI i trade aperti'}
        </button>
      </div>

      {/* Confirm modal 1 */}
      {showStopConfirm1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)' }}>
          <div className="rounded-2xl p-6 max-w-sm w-full space-y-4 bg-[#12121F] border border-[#1E1E35]">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-black text-[#EF4444]">Prima conferma</h2>
              <button onClick={() => setShowStopConfirm1(false)} className="text-[#A1A1AA]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-[#A1A1AA]">
              Stai per chiudere <strong className="text-[#F4F4F5]">tutti i segnali aperti</strong>.
              Questa azione è irreversibile. Sei sicuro?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowStopConfirm1(false)}
                className="py-2.5 rounded-xl text-sm font-medium text-[#A1A1AA]"
                style={{ background: '#0A0A14', border: '1px solid #1E1E35' }}
              >
                Annulla
              </button>
              <button
                onClick={() => { setShowStopConfirm1(false); setShowStopConfirm2(true) }}
                className="py-2.5 rounded-xl text-sm font-bold text-[#EF4444]"
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)' }}
              >
                Sì, continua
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm modal 2 */}
      {showStopConfirm2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="rounded-2xl p-6 max-w-sm w-full space-y-4 bg-[#12121F] border-2 border-[#EF4444]/40">
            <div className="flex items-center gap-3 mb-1">
              <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
              <h2 className="text-lg font-black text-[#EF4444]">CONFERMA FINALE</h2>
            </div>
            <p className="text-sm text-[#F4F4F5]">
              Tutti i trade aperti sul master verranno chiusi e i subscriber notificati.
              <br /><br />
              <strong className="text-[#EF4444]">Non potrai annullare questa operazione.</strong>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowStopConfirm2(false)}
                className="py-3 rounded-xl text-sm font-medium text-[#A1A1AA]"
                style={{ background: '#0A0A14', border: '1px solid #1E1E35' }}
              >
                Annulla
              </button>
              <button
                onClick={handleEmergencyStop}
                className="py-3 rounded-xl text-sm font-black text-white"
                style={{ background: '#EF4444', border: '1px solid #DC2626' }}
              >
                ESEGUI EMERGENCY STOP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
