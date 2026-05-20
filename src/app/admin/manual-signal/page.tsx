'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { adminApi } from '@/lib/api'
import { AlertTriangle, CheckCircle2, Send, X } from 'lucide-react'

type Direction = 'BUY' | 'SELL'

interface SignalForm {
  symbol: string
  direction: Direction
  entry_price: string
  sl: string
  tp: string
  lot_size: string
  comment: string
}

const DEFAULT_FORM: SignalForm = {
  symbol: 'XAUUSD',
  direction: 'BUY',
  entry_price: '',
  sl: '',
  tp: '',
  lot_size: '0.01',
  comment: '',
}

export default function ManualSignalPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [form, setForm] = useState<SignalForm>(DEFAULT_FORM)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!user?.is_admin) {
    router.push('/dashboard')
    return null
  }

  const validate = (): string | null => {
    const ep = parseFloat(form.entry_price)
    const sl = parseFloat(form.sl)
    const tp = parseFloat(form.tp)
    const lot = parseFloat(form.lot_size)

    if (!form.symbol.trim()) return 'Symbol obbligatorio.'
    if (isNaN(ep) || ep <= 0) return 'Entry price non valido.'
    if (isNaN(sl) || sl <= 0) return 'SL non valido.'
    if (isNaN(tp) || tp <= 0) return 'TP non valido.'
    if (isNaN(lot) || lot < 0.01) return 'Lot size minimo 0.01.'

    if (form.direction === 'BUY') {
      if (sl >= ep) return 'Per un BUY il SL deve essere < entry price.'
      if (tp <= ep) return 'Per un BUY il TP deve essere > entry price.'
    } else {
      if (sl <= ep) return 'Per un SELL il SL deve essere > entry price.'
      if (tp >= ep) return 'Per un SELL il TP deve essere < entry price.'
    }
    return null
  }

  const handleSubmit = () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    setShowConfirm(true)
  }

  const handleConfirm = async () => {
    setShowConfirm(false)
    setLoading(true)
    setResult(null)
    try {
      const res = await adminApi.createManualSignal({
        symbol: form.symbol.toUpperCase().trim(),
        direction: form.direction,
        entry_price: parseFloat(form.entry_price),
        sl: parseFloat(form.sl),
        tp: parseFloat(form.tp),
        lot_size: parseFloat(form.lot_size),
        comment: form.comment.trim() || undefined,
      })
      const data = res.data as any
      setResult({
        ok: true,
        message: `Segnale ${data.direction} ${data.symbol} creato — ID: ${data.id}`,
      })
      setForm(DEFAULT_FORM)
    } catch (err: any) {
      const detail = err?.response?.data?.detail || err?.message || 'Errore sconosciuto'
      setResult({ ok: false, message: detail })
    } finally {
      setLoading(false)
    }
  }

  const isDark = true // admin panel always dark
  const surface = isDark ? '#12121F' : '#FFFFFF'
  const border = isDark ? '#1E1E35' : '#E5E5E5'
  const textPrimary = isDark ? '#F4F4F5' : '#1A1A1A'
  const textSecondary = isDark ? '#A1A1AA' : '#666666'
  const inputBg = isDark ? '#0A0A14' : '#F5F5F5'

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-black mb-1" style={{ color: textPrimary }}>
        Invia Segnale Manuale
      </h1>
      <p className="text-sm mb-6" style={{ color: textSecondary }}>
        Il segnale verrà creato sul master e replicato su tutti i subscriber attivi.
      </p>

      {result && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl mb-6 text-sm"
          style={{
            background: result.ok ? 'rgba(0,201,107,0.08)' : 'rgba(239,68,68,0.08)',
            border: `1px solid ${result.ok ? 'rgba(0,201,107,0.25)' : 'rgba(239,68,68,0.25)'}`,
            color: result.ok ? '#00C96B' : '#EF4444',
          }}
        >
          {result.ok ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
          <span>{result.message}</span>
        </div>
      )}

      <div className="rounded-2xl p-6 space-y-5" style={{ background: surface, border: `1px solid ${border}` }}>

        {/* Symbol */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: textSecondary }}>Symbol</label>
          <input
            type="text"
            value={form.symbol}
            onChange={e => setForm(f => ({ ...f, symbol: e.target.value.toUpperCase() }))}
            placeholder="es. XAUUSD"
            className="w-full rounded-xl px-4 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-[#F5A623]/40"
            style={{ background: inputBg, border: `1px solid ${border}`, color: textPrimary }}
          />
        </div>

        {/* Direction */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: textSecondary }}>Direzione</label>
          <div className="grid grid-cols-2 gap-2">
            {(['BUY', 'SELL'] as Direction[]).map(dir => (
              <button
                key={dir}
                onClick={() => setForm(f => ({ ...f, direction: dir }))}
                className="py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: form.direction === dir
                    ? dir === 'BUY' ? 'rgba(0,201,107,0.15)' : 'rgba(239,68,68,0.15)'
                    : inputBg,
                  border: `1px solid ${form.direction === dir
                    ? dir === 'BUY' ? 'rgba(0,201,107,0.4)' : 'rgba(239,68,68,0.4)'
                    : border}`,
                  color: form.direction === dir
                    ? dir === 'BUY' ? '#00C96B' : '#EF4444'
                    : textSecondary,
                }}
              >
                {dir}
              </button>
            ))}
          </div>
        </div>

        {/* Entry / SL / TP */}
        <div className="grid grid-cols-3 gap-3">
          {([
            { key: 'entry_price', label: 'Entry Price' },
            { key: 'sl', label: 'Stop Loss' },
            { key: 'tp', label: 'Take Profit' },
          ] as const).map(({ key, label }) => (
            <div key={key} className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: textSecondary }}>{label}</label>
              <input
                type="number"
                step="0.00001"
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder="0.00"
                className="w-full rounded-xl px-3 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-[#F5A623]/40"
                style={{ background: inputBg, border: `1px solid ${border}`, color: textPrimary }}
              />
            </div>
          ))}
        </div>

        {/* Lot size */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: textSecondary }}>Lot Size</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={form.lot_size}
            onChange={e => setForm(f => ({ ...f, lot_size: e.target.value }))}
            className="w-full rounded-xl px-4 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-[#F5A623]/40"
            style={{ background: inputBg, border: `1px solid ${border}`, color: textPrimary }}
          />
        </div>

        {/* Comment */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: textSecondary }}>Commento (opzionale)</label>
          <input
            type="text"
            value={form.comment}
            onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
            placeholder="es. Setup Smart Money H4"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#F5A623]/40"
            style={{ background: inputBg, border: `1px solid ${border}`, color: textPrimary }}
          />
        </div>

        {error && (
          <p className="text-xs" style={{ color: '#EF4444' }}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          style={{
            background: 'rgba(245,166,35,0.15)',
            border: '1px solid rgba(245,166,35,0.35)',
            color: '#F5A623',
          }}
        >
          <Send className="w-4 h-4" />
          {loading ? 'Invio in corso…' : 'Invia al Master'}
        </button>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl p-6 max-w-sm w-full space-y-4" style={{ background: surface, border: `1px solid ${border}` }}>
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-black" style={{ color: textPrimary }}>Conferma segnale</h2>
              <button onClick={() => setShowConfirm(false)} style={{ color: textSecondary }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-xl p-4 text-sm space-y-1 font-mono" style={{ background: inputBg, color: textPrimary }}>
              <div><span style={{ color: textSecondary }}>Symbol:</span> {form.symbol.toUpperCase()}</div>
              <div><span style={{ color: textSecondary }}>Dir:</span> <span style={{ color: form.direction === 'BUY' ? '#00C96B' : '#EF4444' }}>{form.direction}</span></div>
              <div><span style={{ color: textSecondary }}>Entry:</span> {form.entry_price}</div>
              <div><span style={{ color: textSecondary }}>SL:</span> {form.sl}</div>
              <div><span style={{ color: textSecondary }}>TP:</span> {form.tp}</div>
              <div><span style={{ color: textSecondary }}>Lot:</span> {form.lot_size}</div>
              {form.comment && <div><span style={{ color: textSecondary }}>Note:</span> {form.comment}</div>}
            </div>
            <p className="text-xs" style={{ color: textSecondary }}>
              Il segnale verrà replicato su <strong style={{ color: textPrimary }}>tutti i subscriber attivi</strong> entro 30 secondi.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="py-2.5 rounded-xl text-sm font-medium"
                style={{ background: inputBg, border: `1px solid ${border}`, color: textSecondary }}
              >
                Annulla
              </button>
              <button
                onClick={handleConfirm}
                className="py-2.5 rounded-xl text-sm font-bold"
                style={{ background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.35)', color: '#F5A623' }}
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
