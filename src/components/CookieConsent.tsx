'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'valorox-cookie-consent'

export function useCookieConsent() {
  const [decided, setDecided] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) {
      setDecided(true)
    }
  }, [])

  return decided
}

export default function CookieConsent({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    } else {
      onDone()
    }
  }, [onDone])

  const respond = (accepted: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, accepted ? 'accepted' : 'rejected')
    }
    setFading(true)
    setTimeout(() => {
      setVisible(false)
      onDone()
    }, 350)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-sm z-[510] rounded-2xl px-5 py-4 transition-all duration-300 ${fading ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(40px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 12px 48px rgba(0,0,0,0.25)',
        animation: !fading ? 'slideUpModal 0.4s cubic-bezier(0.16,1,0.3,1) forwards' : undefined,
      }}
    >
      <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
        Utilizziamo cookie tecnici per migliorare la tua esperienza.
        Nessun tracciamento pubblicitario.
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => respond(true)}
          className="flex-1 text-xs font-semibold py-2 rounded-xl transition-all"
          style={{
            background: 'rgba(255,255,255,0.9)',
            color: '#0a0a12',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          Accetta
        </button>
        <button
          onClick={() => respond(false)}
          className="flex-1 text-xs font-medium py-2 rounded-xl transition-all"
          style={{
            background: 'transparent',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
          }}
        >
          Rifiuta
        </button>
      </div>
    </div>
  )
}
