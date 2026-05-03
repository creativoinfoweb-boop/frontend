'use client'

import { SignIn, useAuth } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { ClerkSessionGate } from '@/components/auth/ClerkSessionGate'

export default function LoginPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const { theme } = useTheme()
  const isDark = theme !== 'light'

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Caricamento…
        </p>
      </div>
    )
  }

  if (isSignedIn) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <ClerkSessionGate />
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Cyber grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(240,180,41,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(240,180,41,0.018) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Gold ambient top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '700px', height: '400px',
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(240,180,41,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-sm animate-fade-in-up">

        {/* Brand header */}
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/eldorado.jpg"
            alt="Valorox"
            className="gold-avatar-ring mx-auto mb-4"
            style={{ width: 64, height: 64, display: 'block' }}
          />
          <div className="brand-cinzel text-lg tracking-[0.2em] mb-1">VALOROX</div>
          <p className="text-xs" style={{ color: 'rgba(110,110,140,0.7)' }}>
            AI Solution · XAU/USD
          </p>
        </div>

        <SignIn
          signUpUrl="/auth/register"
          forceRedirectUrl="/auth/clerk-callback"
          fallbackRedirectUrl="/auth/clerk-callback"
          appearance={{
            variables: {
              colorBackground: isDark ? '#08080F' : '#FFFFFF',
              colorInputBackground: isDark ? '#10101C' : '#F4F4F0',
              colorInputText: isDark ? '#E0E0F0' : '#1A1A2E',
              colorText: isDark ? '#C0C0D8' : '#2A2A3E',
              colorTextSecondary: isDark ? '#808098' : '#606078',
              colorPrimary: '#F0B429',
              colorTextOnPrimaryBackground: '#000000',
            },
          }}
        />

        {/* Trust row */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {['Trial 5 giorni', 'Zero affiliazioni broker', 'Cancella quando vuoi'].map(t => (
            <span key={t} className="text-[9px] font-medium" style={{ color: 'var(--text-muted)' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
