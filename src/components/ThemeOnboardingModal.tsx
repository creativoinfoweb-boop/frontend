'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { markThemeUserChoice } from '@/lib/theme'
import { Sun, Moon, X, ArrowUpRight } from 'lucide-react'

const STORAGE_KEY = 'valorox-onboarding-v1'

function MiniPreview({ dark, active }: { dark: boolean; active: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 10,
        padding: 10,
        background: dark ? '#09090F' : '#F4F4EF',
        border: active
          ? '2px solid rgba(240,180,41,0.75)'
          : `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform: active ? 'scale(1.04)' : 'scale(1)',
        opacity: active ? 1 : 0.5,
      }}
    >
      {/* Fake navbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: dark ? '#F0B429' : '#C4881A' }} />
        <div style={{ flex: 1, height: 4, borderRadius: 4, background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)' }} />
        <div style={{
          width: 12, height: 12, borderRadius: 3,
          background: dark ? 'rgba(240,180,41,0.15)' : 'rgba(196,136,26,0.15)',
          border: `1px solid ${dark ? 'rgba(240,180,41,0.25)' : 'rgba(196,136,26,0.28)'}`,
        }} />
      </div>
      {/* Fake content */}
      <div style={{ marginBottom: 5, height: 5, borderRadius: 4, background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
      <div style={{ marginBottom: 6, height: 5, width: '65%', borderRadius: 4, background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
      <div style={{
        height: 20, borderRadius: 5,
        background: dark
          ? 'linear-gradient(90deg, rgba(240,180,41,0.14), rgba(240,180,41,0.04))'
          : 'linear-gradient(90deg, rgba(196,136,26,0.14), rgba(196,136,26,0.04))',
        border: `1px solid ${dark ? 'rgba(240,180,41,0.18)' : 'rgba(196,136,26,0.22)'}`,
      }} />
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
        <span style={{
          fontSize: 9, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase' as const,
          color: dark ? 'rgba(240,180,41,0.7)' : 'rgba(196,136,26,0.85)',
        }}>
          {dark ? '🌙 Dark' : '☀️ Light'}
        </span>
      </div>
    </div>
  )
}

export default function ThemeOnboardingModal() {
  const { theme, setTheme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 1400)
      return () => clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => setTick(t => t + 1), 2000)
    return () => clearInterval(interval)
  }, [visible])

  const dismiss = () => {
    setVisible(false)
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, '1')
  }

  if (!mounted || !visible) return null

  const isDark = theme !== 'light'
  const showDarkActive = tick % 2 === 0

  return (
    <>
      {/* Full-screen dismiss overlay */}
      <div className="fixed inset-0 z-[495]" onClick={dismiss} />

      {/* Pulsing ring on the theme toggle — desktop only */}
      <div
        className="hidden sm:block fixed pointer-events-none z-[502]"
        style={{ top: '22px', right: '218px' }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: '50%', left: '50%',
              width: 34, height: 34,
              background: 'rgba(240,180,41,0.1)',
              border: '1.5px solid rgba(240,180,41,0.45)',
              animation: `pingExpand 2.4s ease-out ${i * 0.75}s infinite`,
            }}
          />
        ))}
        {/* Center icon */}
        <div className="relative flex items-center justify-center" style={{ width: 34, height: 34 }}>
          {isDark
            ? <Sun className="w-4 h-4" style={{ color: 'rgba(240,180,41,0.9)' }} />
            : <Moon className="w-4 h-4" style={{ color: 'rgba(240,180,41,0.9)' }} />
          }
        </div>
      </div>

      {/* Modal card */}
      <div
        className="fixed z-[500] bottom-5 right-5 w-[288px] rounded-2xl overflow-hidden"
        style={{
          background: isDark ? 'rgba(9,9,20,0.94)' : 'rgba(252,252,248,0.97)',
          border: '1px solid rgba(240,180,41,0.28)',
          backdropFilter: 'blur(40px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(240,180,41,0.07)',
          animation: 'slideUpModal 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}` }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(240,180,41,0.12)', border: '1px solid rgba(240,180,41,0.22)' }}
            >
              {isDark
                ? <Moon className="w-3 h-3" style={{ color: '#F0B429' }} />
                : <Sun className="w-3 h-3" style={{ color: '#C4881A' }} />
              }
            </div>
            <span className="text-xs font-bold" style={{ color: isDark ? '#E0E0F0' : '#1A1A2E' }}>
              Personalizza l&apos;aspetto
            </span>
          </div>
          <button
            onClick={dismiss}
            className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
            style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(240,180,41,0.1)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-xs leading-relaxed mb-4" style={{ color: isDark ? 'rgba(170,170,195,0.85)' : 'rgba(55,55,75,0.85)' }}>
            Valorox supporta{' '}
            <strong style={{ color: isDark ? '#E0E0F0' : '#111' }}>dark mode</strong>
            {' '}e{' '}
            <strong style={{ color: isDark ? '#E0E0F0' : '#111' }}>light mode</strong>.
            Passa da una all&apos;altra in qualsiasi momento.
          </p>

          {/* Preview cards */}
          <div className="flex gap-2.5 mb-4">
            <MiniPreview dark active={showDarkActive} />
            <MiniPreview dark={false} active={!showDarkActive} />
          </div>

          {/* Demo toggle row */}
          <div
            className="flex items-center justify-between px-3 py-2.5 rounded-xl mb-3"
            style={{
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
            }}
          >
            <div className="flex items-center gap-2">
              {isDark
                ? <Moon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#F0B429' }} />
                : <Sun className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#C4881A' }} />
              }
              <span className="text-xs font-medium" style={{ color: isDark ? 'rgba(190,190,215,0.8)' : 'rgba(50,50,70,0.8)' }}>
                {isDark ? 'Modalità scura attiva' : 'Modalità chiara attiva'}
              </span>
            </div>
            <button
              className="theme-toggle"
              onClick={() => { markThemeUserChoice(); setTheme(isDark ? 'light' : 'dark') }}
              title="Prova qui"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Arrow hint */}
          <div className="flex items-start gap-2 mb-4">
            <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#F0B429' }} />
            <span className="text-xs leading-snug" style={{ color: isDark ? 'rgba(150,150,175,0.8)' : 'rgba(75,75,100,0.8)' }}>
              Il tasto ☀️/🌙 è{' '}
              <strong style={{ color: isDark ? '#D4B44A' : '#9A7010' }}>sempre in alto a destra</strong>{' '}
              nella navbar — cambia stile quando vuoi.
            </span>
          </div>

          {/* CTA */}
          <button className="btn-gold w-full text-xs py-2.5 rounded-xl" onClick={dismiss}>
            Ho capito
          </button>
        </div>
      </div>
    </>
  )
}
