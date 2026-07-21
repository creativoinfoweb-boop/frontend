'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage, LANGUAGES, LangCode } from '@/i18n/LanguageContext'
import { useTheme } from 'next-themes'
import { useAuthStore } from '@/store/auth'
import Link from 'next/link'
import {
  ChevronDown,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Lock,
  Star,
  ArrowRight,
  Activity,
  Globe,
  Layers,
  Sun,
  Moon,
  BookOpen,
  GraduationCap,
  Play,
  Menu,
  X,
  LayoutDashboard,
  ChevronRight,
  Gift,
} from 'lucide-react'
import { PricingPlanCard } from '@/components/pricing/PricingPlanCard'
import ThemeOnboardingModal from '@/components/ThemeOnboardingModal'
import CookieConsent from '@/components/CookieConsent'
import { TrustpilotHeroWidget, TrustpilotFooterBadge } from '@/components/trustpilot/TrustpilotStars'
import { TrustpilotCarousel } from '@/components/trustpilot/TrustpilotCarousel'
import { TRUSTPILOT_ENABLED } from '@/lib/trustpilot-config'
import AnimatedStrategyChart from '@/components/charts/AnimatedStrategyChart'
import CRTPillars from '@/components/charts/CRTPillars'

/* ─── Animated counter ─────────────────────────────────── */
function AnimatedCounter({ to, suffix = '', duration = 1500 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(ease * to))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

/* ─── Ticker fallback ──────────────────────────────────── */
const tickerFallback = [
  { symbol: 'XAU/USD', price_str: '···', change_str: '···', up: true },
  { symbol: 'EUR/USD', price_str: '···', change_str: '···', up: true },
  { symbol: 'BTC/USD', price_str: '···', change_str: '···', up: true },
  { symbol: 'GBP/USD', price_str: '···', change_str: '···', up: true },
  { symbol: 'USD/JPY', price_str: '···', change_str: '···', up: false },
  { symbol: 'NASDAQ', price_str: '···', change_str: '···', up: true },
  { symbol: 'S&P 500', price_str: '···', change_str: '···', up: true },
]

/* ─── Static per-module metadata (language-independent) ── */
const FAQ_IDS = [
  'what-is', 'smart-money', 'demo', 'risks', 'how-works',
  'frequency', 'parameters-limited', 'vs-signals', 'cancel', 'broker', 'broker-independence',
] as const

const FEATURE_ICONS = [BarChart3, Shield, Globe, Activity, Layers, TrendingUp] as const

const HOW_IT_WORKS_ICONS = [Globe, Layers, Activity, BarChart3] as const

const PROBLEM_ICONS = [TrendingUp, Zap, Activity] as const

const MODULE_META = [
  { num: '01', slug: '01', free: true, levelKey: 'beginner', lessons: 8 },
  { num: '02', slug: '02', free: true, levelKey: 'beginner', lessons: 10 },
  { num: '03', slug: '03', free: true, levelKey: 'intermediate', lessons: 9 },
  { num: '04', slug: '04', free: true, levelKey: 'intermediate', lessons: 8 },
  { num: '05', slug: '05', free: false, levelKey: 'intermediate', lessons: 7 },
  { num: '06', slug: '06', free: false, levelKey: 'advanced', lessons: 8 },
  { num: '07', slug: '07', free: false, levelKey: 'advanced', lessons: 7 },
  { num: '08', slug: '08', free: false, levelKey: 'practice', lessons: 5 },
] as const


/* ─── Stats ─────────────────────────────────────────────── */
const STATS_AVG_DURATION_MIN = 25

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const BASE_URL = typeof window !== 'undefined' && window.location.protocol === 'https:'
  ? '/api'
  : API_URL

const LANG_LOCALES: Record<LangCode, string> = {
  it: 'it-IT', en: 'en-US', fr: 'fr-FR', de: 'de-DE', es: 'es-ES',
}

/* ─── Main Component ───────────────────────────────────── */
export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const { isAuthenticated } = useAuthStore()
  const { t, lang, setLang } = useLanguage()
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [tickerItems, setTickerItems] = useState(tickerFallback)
  const [goldPrice, setGoldPrice] = useState<{ price: number | null; change_str: string; up: boolean }>({
    price: null, change_str: '...', up: true,
  })
  const [masterStats, setMasterStats] = useState<any>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [landingPerf, setLandingPerf] = useState<any>(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [showSplash, setShowSplash] = useState(true)
  const [splashFading, setSplashFading] = useState(false)
  const [cookieDone, setCookieDone] = useState(false)
  const onCookieDone = useCallback(() => setCookieDone(true), [])
  const isDark = theme !== 'light'

  /* ── Derived from translations ── */
  const faqItems = t.faq.items.map((item, i) => ({ ...item, id: FAQ_IDS[i] }))
  const features = t.features.items.map((item, i) => ({ ...item, icon: FEATURE_ICONS[i] }))
  const learningModules = t.learning.modules.map((mod, i) => ({
    ...mod,
    ...MODULE_META[i],
    level: t.learning.levels[MODULE_META[i].levelKey as keyof typeof t.learning.levels],
  }))
  const problemItems = [t.problem.emotional, t.problem.impulsive, t.problem.inconsistent]

  const monthLabel = (monthStr: string) => {
    const [year, monthNum] = monthStr.split('-').map(Number)
    return new Intl.DateTimeFormat(LANG_LOCALES[lang] || 'it-IT', { month: 'short' })
      .format(new Date(year, monthNum - 1))
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const ref = params.get('ref')
      if (ref) setReferralCode(ref)
    }
  }, [])

  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashFading(true), 2400)
    const removeTimer = setTimeout(() => setShowSplash(false), 3000)
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer) }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [tickerRes, goldRes] = await Promise.all([
          fetch(`${BASE_URL}/market/prices`).then(r => r.ok ? r.json() : null),
          fetch(`${BASE_URL}/market/gold-price`).then(r => r.ok ? r.json() : null),
        ])
        if (tickerRes) setTickerItems(tickerRes)
        if (goldRes?.price) setGoldPrice({ price: goldRes.price, change_str: goldRes.change_str, up: goldRes.up })
      } catch (_) {}
    }
    fetchPrices()
    const interval = setInterval(fetchPrices, 60_000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchMasterStats = async () => {
      try {
        setStatsLoading(true)

        // Fetch landing-performance FIRST (priorità monitor)
        try {
          const perfRes = await fetch(`${BASE_URL}/stats/landing-performance`)
          if (perfRes.ok) {
            const ct = perfRes.headers.get('content-type') || ''
            if (ct.includes('application/json')) {
              const data = await perfRes.json()
              setLandingPerf(data)
            }
          }
        } catch (_) { /* landing-performance non disponibile */ }

        // Fetch master stats come fallback
        try {
          const statsRes = await fetch(`${BASE_URL}/stats/master`)
          if (statsRes.ok) {
            const ct = statsRes.headers.get('content-type') || ''
            if (ct.includes('application/json')) {
              const data = await statsRes.json()
              setMasterStats(data)
            }
          }
        } catch (_) { /* master stats non disponibile */ }

      } finally {
        setStatsLoading(false)
      }
    }
    fetchMasterStats()
    const interval = setInterval(fetchMasterStats, 5 * 60_000)
    return () => clearInterval(interval)
  }, [])

  /* ── Nav links ── */
  const navLinks = [
    { label: t.nav.method, href: '/metodo' },
    { label: t.nav.about, href: '/chi-siamo' },
    { label: t.nav.learn, href: '#impara' },
    { label: t.nav.performance, href: '#performance' },
    { label: t.nav.pricing, href: '#pricing' },
  ]

  const currentLang = LANGUAGES.find(l => l.code === lang)

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>

      {/* ── Splash Screen ── */}
      {showSplash && (
        <div className={`valorox-splash ${splashFading ? 'valorox-splash-out' : ''}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/valoroxoro.svg" alt="Valorox" className="valorox-splash-logo" />
          <span className="valorox-splash-title">
            Val<span className="valorox-title-oro">oro</span>x<span className="valorox-title-ai" style={{ fontSize: '0.6em' }}>AI</span>
          </span>
        </div>
      )}

      {/* ── Gold top rule ── */}
      <div className="fixed top-0 w-full h-[2px] z-[60]"
        style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }} />

      {/* ─── Navigation ─────────────────────────────────── */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={scrolled ? {
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(32px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
          borderBottom: '1px solid var(--glass-border)',
          boxShadow: 'var(--shadow-lg)',
        } : {
          background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/valoroxoro.svg" alt="Valorox" className="gold-avatar-ring shrink-0" style={{ width: 28, height: 28 }} />
            <span className="valorox-title" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.25rem)' }}>
              Val<span className="valorox-title-oro">oro</span><span className="valorox-title-x">x</span><span className="valorox-title-ai" style={{ fontSize: '0.6em' }}>AI</span>
            </span>
          </Link>

          {/* Center links — desktop only */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-sm font-medium transition-all duration-200"
                style={{ color: scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.82)' }}
                onMouseEnter={e => (e.currentTarget.style.color = scrolled ? 'var(--text-primary)' : '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.82)')}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/affiliati"
              className="text-sm font-medium transition-all duration-200"
              style={{ color: scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.82)' }}
            >
              {t.nav.affiliates}
            </Link>
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="theme-toggle inline-flex"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Language selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangMenuOpen(v => !v)}
                className="flex items-center gap-1 text-[11px] font-bold px-2 py-1.5 rounded-lg transition-all"
                style={{
                  background: langMenuOpen ? 'rgba(240,180,41,0.12)' : 'rgba(255,255,255,0.08)',
                  border: `1px solid ${langMenuOpen ? 'rgba(240,180,41,0.35)' : 'rgba(255,255,255,0.15)'}`,
                  color: langMenuOpen ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                }}
                aria-label="Select language"
              >
                <span className={`fi fi-${currentLang?.flagCode}`} style={{ width: '1.2em', height: '0.9em', display: 'inline-block' }} />
                <span>{lang.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 opacity-60" style={{ transform: langMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-[70]" onClick={() => setLangMenuOpen(false)} />
                  <div
                    className="absolute right-0 top-full mt-1.5 z-[80] rounded-xl overflow-hidden shadow-xl"
                    style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', minWidth: '140px' }}
                  >
                    {LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangMenuOpen(false) }}
                        className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left text-sm transition-all"
                        style={{
                          color: l.code === lang ? 'var(--gold)' : 'var(--text-secondary)',
                          background: l.code === lang ? 'rgba(240,180,41,0.08)' : 'transparent',
                          fontWeight: l.code === lang ? '700' : '500',
                        }}
                        onMouseEnter={e => { if (l.code !== lang) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
                        onMouseLeave={e => { if (l.code !== lang) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                      >
                        <span className={`fi fi-${l.flagCode}`} style={{ width: '1.2em', height: '0.9em', display: 'inline-block' }} />
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {isAuthenticated ? (
              <Link href="/dashboard" className="btn-primary text-sm px-5 py-2.5 hidden sm:inline-flex">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="hidden sm:inline-flex btn-ghost text-sm px-4 py-2">
                  {t.nav.login}
                </Link>
                <Link href="/auth/register" className="hidden sm:inline-flex btn-primary text-xs sm:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5">
                  {t.nav.startFree}
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </>
            )}

            {/* Mobile language flag circle — sm:hidden so visible only on mobile */}
            <div className="relative sm:hidden">
              <button
                onClick={() => setLangMenuOpen(v => !v)}
                className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden transition-all"
                style={{
                  background: langMenuOpen ? 'rgba(240,180,41,0.12)' : 'rgba(255,255,255,0.08)',
                  border: `1.5px solid ${langMenuOpen ? 'rgba(240,180,41,0.4)' : 'rgba(255,255,255,0.2)'}`,
                  flexShrink: 0,
                }}
                aria-label="Select language"
              >
                <span className={`fi fi-${currentLang?.flagCode}`} style={{ width: '1.6em', height: '1.6em', display: 'inline-block' }} />
              </button>

              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-[70]" onClick={() => setLangMenuOpen(false)} />
                  <div
                    className="absolute right-0 top-full mt-1.5 z-[80] rounded-xl overflow-hidden shadow-xl"
                    style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(24px)', border: '1px solid var(--glass-border)', minWidth: '140px' }}
                  >
                    {LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangMenuOpen(false) }}
                        className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left text-sm transition-all"
                        style={{
                          color: l.code === lang ? 'var(--gold)' : 'var(--text-secondary)',
                          background: l.code === lang ? 'rgba(240,180,41,0.08)' : 'transparent',
                          fontWeight: l.code === lang ? '700' : '500',
                        }}
                      >
                        <span className={`fi fi-${l.flagCode}`} style={{ width: '1.2em', height: '0.9em', display: 'inline-block' }} />
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all"
              style={{
                background: mobileMenuOpen ? 'rgba(240,180,41,0.12)' : 'rgba(255,255,255,0.08)',
                border: `1px solid ${mobileMenuOpen ? 'rgba(240,180,41,0.4)' : 'rgba(255,255,255,0.15)'}`,
              }}
              aria-label="Menu"
            >
              {mobileMenuOpen
                ? <X className="w-4 h-4" style={{ color: '#F0B429' }} />
                : <Menu className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.85)' }} />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu Drawer ──────────────────────────── */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[55] md:hidden"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="fixed top-0 right-0 h-full w-[min(280px,85vw)] z-[60] md:hidden flex flex-col animate-slide-in-right"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(40px) saturate(1.8)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
              borderLeft: '1px solid var(--glass-border)',
              boxShadow: '-8px 0 40px rgba(0,0,0,0.3)',
              animationDuration: '0.28s',
            }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/valoroxoro.svg" alt="Valorox" className="gold-avatar-ring" style={{ width: 30, height: 30 }} />
                <span className="valorox-title" style={{ fontSize: '1rem' }}>
                  Val<span className="valorox-title-oro">oro</span><span className="valorox-title-x">x</span><span className="valorox-title-ai" style={{ fontSize: '0.6em' }}>AI</span>
                </span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ color: 'var(--text-muted)', background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
              <p className="px-3 pb-2 text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>Navigation</p>
              {[
                ...navLinks,
                { label: t.nav.affiliates, href: '/affiliati' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLElement).style.background = 'var(--gold-subtle)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-40 flex-shrink-0" />
                  {link.label}
                </Link>
              ))}

              {/* Language picker in mobile drawer */}
              <div className="px-3 pt-3 pb-1">
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Language</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setMobileMenuOpen(false) }}
                      className="flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                      style={{
                        background: l.code === lang ? 'rgba(240,180,41,0.12)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${l.code === lang ? 'rgba(240,180,41,0.35)' : 'rgba(255,255,255,0.08)'}`,
                        color: l.code === lang ? 'var(--gold)' : 'var(--text-muted)',
                      }}
                    >
                      <span className={`fi fi-${l.flagCode}`} style={{ width: '1.4em', height: '1em', display: 'inline-block' }} />
                      <span>{l.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* Bottom CTAs */}
            <div className="px-4 py-4 space-y-2.5" style={{ borderTop: '1px solid var(--border)' }}>
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              >
                {isDark ? <Sun className="w-4 h-4" style={{ color: 'var(--accent)' }} /> : <Moon className="w-4 h-4" style={{ color: 'var(--accent)' }} />}
                {isDark ? 'Light mode' : 'Dark mode'}
              </button>

              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary inline-flex w-full justify-center text-sm py-3"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-ghost inline-flex w-full justify-center text-sm py-3"
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary inline-flex w-full justify-center text-sm py-3"
                  >
                    {t.nav.startFree}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* ─── Referral Banner ────────────────────────────── */}
      {referralCode && (
        <div className="sticky top-[60px] z-40 border-b" style={{ background: 'linear-gradient(135deg, rgba(240,180,41,0.15), rgba(0,230,118,0.08))', borderColor: 'var(--glass-border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Star className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              <div className="text-sm">
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t.referral.title}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.referral.desc}</p>
              </div>
            </div>
            <Link href={`/auth/register?ref=${referralCode}`} className="btn-gold text-xs px-4 py-2 flex-shrink-0">
              {t.referral.cta}
            </Link>
          </div>
        </div>
      )}

      {/* ─── Hero + Ticker (on mobile these fill exactly 100svh) ── */}
      <div className="hero-ticker-wrap">
      {/* ─── Hero ───────────────────────────────────────── */}
      <section className="valorox-hero">
        <div className="valorox-rays">
          {[0,1,2,3,4].map(i => <div key={i} className="valorox-ray" />)}
        </div>
        <div className="valorox-scanline" />
        <div className="valorox-halo" />
        <div className="valorox-vignette-left" />
        <div className="valorox-vignette-right" />
        <div className="valorox-hero-shimmer" aria-hidden="true" />

        <div className="valorox-hero-container">
          <div className="valorox-brand-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/valoroxoro.svg" alt="Valorox" className="valorox-brand-logo" fetchPriority="high" loading="eager" decoding="async" />
            <div className="valorox-brand-text">
              <h1 className="valorox-title">
                <span className="valorox-title-a">A</span>l<span className="valorox-title-oro">oro</span><span className="valorox-title-x">x</span><span className="valorox-title-ai">AI</span>
              </h1>
              <div className="valorox-brand-sub">
                {t.hero.subtitle}
              </div>
            </div>
          </div>

          <div className="valorox-hero-content">
            <p className="valorox-claim">
              {t.hero.tagline}
            </p>
            <p className="valorox-hero-desc">
              {t.hero.description}
            </p>

            <div className="valorox-hero-ctas" style={!isAuthenticated ? { alignItems: 'flex-start' } : {}}>
              {isAuthenticated ? (
                <Link href="/dashboard" className="btn-valorox btn-valorox-primary btn-valorox-slim">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/metodo" className="btn-valorox btn-valorox-secondary btn-valorox-slim">
                    {t.hero.learnMethod}
                    <BarChart3 className="w-4 h-4" />
                  </Link>
                  <div className="flex flex-col items-center gap-1.5">
                    <Link href="/auth/register" className="btn-valorox btn-valorox-primary btn-valorox-slim">
                      {t.hero.ctaMain}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.hero.ctaSub}</span>
                  </div>
                </>
              )}
            </div>

            <div className="valorox-hero-trust">
              {[
                { icon: Shield, text: t.hero.trust1 },
                { icon: Globe, text: t.hero.trust2 },
                { icon: Lock, text: t.hero.trust3 },
                { icon: Gift, text: t.hero.trust4 },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <Icon className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--accent)', opacity: 0.7 }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="valorox-vignette-bottom" />
      </section>

      {/* ─── Ticker Tape ────────────────────────────────── */}
      <div className="w-full overflow-hidden py-2"
        style={{ borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(20px)' }}
      >
        <div className="ticker-content gap-6">
          {(() => {
            const filtered = tickerItems.filter(item => {
              const p = item.price_str
              return p && p !== '—' && p.trim() !== ''
            })
            return [...filtered, ...filtered]
          })().map((item, i) => {
            const isGold = item.symbol === 'XAU/USD'
            const displayPrice = isGold && goldPrice?.price ? `${goldPrice.price.toFixed(2)}` : item.price_str
            const displayChange = isGold && goldPrice?.change_str ? goldPrice.change_str : item.change_str
            const displayUp = isGold ? goldPrice?.up : item.up
            return (
              <div key={i} className="inline-flex items-center gap-2 px-4 flex-shrink-0" style={{
                ...(isGold ? {
                  background: 'color-mix(in srgb, var(--gold) 8%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)',
                  borderRadius: '0.5rem',
                  paddingLeft: '0.625rem',
                  paddingRight: '0.625rem',
                } : {})
              }}>
                {isGold && <span style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>★</span>}
                <span className={`tracking-wider ${isGold ? 'font-black text-xs' : 'text-[10px] font-bold'}`} style={{ color: isGold ? 'var(--gold)' : 'var(--text-secondary)' }}>{item.symbol}</span>
                <span className="text-xs font-mono font-semibold" style={{ color: isGold ? 'var(--gold)' : 'var(--text-primary)' }}>{displayPrice}</span>
                <span className="text-[10px] font-semibold" style={{ color: displayUp ? 'var(--green)' : 'var(--red)' }}>
                  {displayChange}
                </span>
                {isGold && <span className="ml-0.5 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)', boxShadow: '0 0 4px var(--gold)', animation: 'dotPulse 2s ease-in-out infinite' }} />}
                <span className="mx-1.5 select-none text-[10px]" style={{ color: 'var(--border)' }}>│</span>
              </div>
            )
          })}
        </div>
      </div>
      </div>{/* end hero-ticker-wrap */}

      {/* ─── Quick Performance Preview ───────────────────── */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 card-premium p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t.perf.equityCurve}</h3>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {landingPerf?.months?.length
                      ? `${monthLabel(landingPerf.months[0].month)}–${monthLabel(landingPerf.months[landingPerf.months.length - 1].month)} ${landingPerf.months[0].month.split('-')[0]} — XAU/USD`
                      : t.perf.indicative}
                  </p>
                </div>
                <span className="badge-success">
                  {landingPerf?.cumulative_equity?.length
                    ? `+${landingPerf.cumulative_equity[landingPerf.cumulative_equity.length - 1]}%`
                    : '+0%'}
                </span>
              </div>
              {(() => {
                const points = landingPerf?.cumulative_equity ?? []
                const n = points.length
                if (n === 0) {
                  return (
                    <div className="flex items-center justify-center h-[140px] text-xs" style={{ color: 'var(--text-muted)' }}>
                      {t.perf.noData}
                    </div>
                  )
                }
                const maxVal = Math.max(...points, 1)
                const minVal = Math.min(...points, 0)
                const range = maxVal - minVal || 1
                const W = 560, H = 200, padTop = 20, padBot = 20
                const usableH = H - padTop - padBot
                const xs = points.map((_: number, i: number) => (n === 1 ? W / 2 : (i / (n - 1)) * W))
                const ys = points.map((v: number) => padTop + usableH - ((v - minVal) / range) * usableH)
                const linePath = xs.map((x: number, i: number) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ')
                const areaPath = `${linePath} L${W},${H} L0,${H} Z`
                const monthLabels = (landingPerf?.months ?? []).map((m: any) => monthLabel(m.month))
                return (
                  <>
                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="perfGradPreview" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--green)" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lineGradPreview" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="var(--green)" />
                          <stop offset="100%" stopColor="var(--green)" stopOpacity="0.7" />
                        </linearGradient>
                      </defs>
                      {[0.25, 0.5, 0.75].map(f => (
                        <line key={f} x1="0" y1={padTop + usableH * f} x2={W} y2={padTop + usableH * f} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
                      ))}
                      <path d={areaPath} fill="url(#perfGradPreview)" />
                      <path d={linePath} fill="none" stroke="url(#lineGradPreview)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sparkline" />
                      {xs.map((x: number, i: number) => (
                        <circle key={i} cx={x} cy={ys[i]} r="3.5" fill="var(--green)" opacity={i === n - 1 ? 1 : 0.5} />
                      ))}
                      <circle cx={xs[n-1]} cy={ys[n-1]} r="8" fill="var(--green)" opacity="0.12" />
                    </svg>
                    <div className="flex justify-between mt-2 px-1">
                      {monthLabels.map((m: string, i: number) => (
                        <span key={i} className="text-[9px] font-medium" style={{ color: 'var(--text-muted)' }}>{m}</span>
                      ))}
                    </div>
                  </>
                )
              })()}
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              {statsLoading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="card-premium p-3 flex items-center gap-3">
                    <div className="skeleton w-9 h-9 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="skeleton h-5 w-16" />
                      <div className="skeleton h-3 w-24" />
                    </div>
                  </div>
                ))
              ) : (
                (() => {
                  // Se il monitor locale ha dati (months > 0), usa SOLO quelli
                  // Altrimenti fallback a masterStats (live dal DB)
                  const hasMonitorData = landingPerf && Array.isArray(landingPerf.months) && landingPerf.months.length > 0
                  const winRate = hasMonitorData ? (landingPerf.win_rate ?? 0) : (masterStats?.win_rate_percent ?? 0)
                  const totalTrades = hasMonitorData ? (landingPerf.total_trades ?? 0) : (masterStats?.trades_total ?? 0)
                  const totalWins = hasMonitorData ? (landingPerf.total_wins ?? 0) : (masterStats?.trades_win ?? 0)
                  const totalLosses = hasMonitorData ? (landingPerf.total_losses ?? 0) : (masterStats?.trades_loss ?? 0)
                  return [
                    {
                      label: t.perf.totalTrades, icon: BarChart3, color: 'var(--accent)',
                      value: totalTrades > 0 ? String(totalTrades) : '—',
                      sub: t.perf.totalTradesSub,
                    },
                    {
                      label: t.perf.winRate, icon: TrendingUp, color: 'var(--green)',
                      value: `${winRate.toFixed(1)}%`,
                      sub: t.perf.winRateSub,
                    },
                    {
                      label: t.perf.wins, icon: TrendingUp, color: 'var(--green)',
                      value: totalWins > 0 ? String(totalWins) : '—',
                      sub: t.perf.winsSub,
                    },
                    {
                      label: t.perf.losses, icon: Activity, color: 'var(--red, #ef4444)',
                      value: totalLosses > 0 ? String(totalLosses) : '—',
                      sub: t.perf.lossesSub,
                    },
                  ]
                })().map((stat) => (
                  <div key={stat.label} className="card-premium p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `color-mix(in srgb, ${stat.color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${stat.color} 25%, transparent)` }}
                    >
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-black font-mono number-mono" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-[11px] font-medium truncate" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                      <div className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{stat.sub}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Trustpilot widget — sotto il grafico equity */}
          {TRUSTPILOT_ENABLED && (
            <div className="flex justify-center mt-6">
              <TrustpilotHeroWidget reviewsLabel={t.trustpilot.heroReviews} />
            </div>
          )}

          <p className="text-center text-xs italic mt-4" style={{ color: 'var(--text-muted)' }}>
            {t.perf.disclaimer}
          </p>
        </div>
      </section>

      {/* ─── Sub-Hero: Il Vero Problema ─────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--surface-overlay)' }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-3">{t.problem.label}</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              {t.problem.title.split('\n')[0]}
              <br className="hidden sm:block" />
              {t.problem.title.split('\n')[1]}
            </h2>
            <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t.problem.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {problemItems.map((item, i) => {
              const Icon = PROBLEM_ICONS[i]
              return (
                <div key={i} className="card-premium p-6 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="feature-icon-wrap mb-4">
                    <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/metodo"
              className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-80"
              style={{ color: 'var(--accent)' }}>
              {t.problem.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Il mercato ha un copione — grafico CRT animato ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mb-3">
              {lang === 'en' ? 'HOW THE MARKET MOVES' : 'COME SI MUOVE IL MERCATO'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              {lang === 'en' ? 'The market has a script.' : 'Il mercato ha un copione.'}
            </h2>
            <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {lang === 'en'
                ? 'From the H4 range to the M15 entry: turtle soup, structure shift, FVG, target. Watch the full sequence draw itself — this is what our system reads and executes without emotion.'
                : 'Dal range H4 all\'entry su M15: turtle soup, cambio di struttura, FVG, target. Guarda la sequenza completa disegnarsi da sola — è ciò che il nostro sistema legge ed esegue senza emozioni.'}
            </p>
          </div>
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <AnimatedStrategyChart scenario="turtle-model1" lang={lang} />
          </div>

          {/* Panoramica completa della strategia CRT */}
          <CRTPillars lang={lang} />

          <div className="text-center mt-10">
            <Link href="/metodo"
              className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-80"
              style={{ color: 'var(--accent)' }}>
              {lang === 'en' ? 'Discover the full method' : 'Scopri il metodo completo'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── eBook Banner ───────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto card-premium relative overflow-hidden animate-fade-in-up"
          style={{ border: '1px solid var(--border-gold)' }}>
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-15"
            style={{ background: 'var(--gold)' }} />
          <div className="relative flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lang === 'en' ? '/ebook-cover-en.jpg' : '/ebook-cover-it.jpg'}
              alt="CRT Secrets"
              className="w-28 sm:w-32 rounded-lg flex-shrink-0"
              style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 30px color-mix(in srgb, var(--gold) 20%, transparent)' }}
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="section-label mb-2">{lang === 'en' ? 'Free eBook' : 'eBook gratuito'}</div>
              <h3 className="text-xl sm:text-2xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
                CRT Secrets — {lang === 'en' ? 'our complete guide' : 'la nostra guida completa'}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {lang === 'en'
                  ? 'Power of Three, liquidity, sessions: 50+ pages with charts and diagrams. A gift for everyone who activates a plan — the free trial counts, no payment needed.'
                  : 'Power of Three, liquidità, sessioni: 50+ pagine con grafici e diagrammi. In omaggio per chi attiva un piano — vale anche il trial gratuito, nessun pagamento richiesto.'}
              </p>
            </div>
            <Link href="/auth/register"
              className="btn-gold px-8 py-3 rounded-xl text-sm font-bold whitespace-nowrap flex-shrink-0">
              {lang === 'en' ? 'Get it now' : 'Ottienilo ora'}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ──────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {(() => {
            // Se il monitor locale ha dati, usa SOLO quelli
            const hasMonitorData = landingPerf && Array.isArray(landingPerf.months) && landingPerf.months.length > 0
            const totalTrades = hasMonitorData ? (landingPerf.total_trades ?? 0) : (masterStats?.trades_total ?? 0)
            const winRate = hasMonitorData ? (landingPerf.win_rate ?? 0) : (masterStats?.win_rate_percent ?? 0)
            return [
              { value: totalTrades, suffix: '', label: t.stats.operations, isGold: true },
              { value: Math.round(winRate), suffix: '%', label: t.stats.winRate, isGold: false },
              { value: STATS_AVG_DURATION_MIN, suffix: ' min', label: t.stats.avgDuration, isGold: true },
            ]
          })().map((stat, i) => (
            <div key={stat.label} className="card-premium p-6 sm:p-8 text-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={`text-4xl sm:text-5xl font-black font-mono number-mono mb-2 ${stat.isGold ? 'text-gradient-gold' : 'text-gradient-green'}`}>
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How It Works ───────────────────────────────── */}
      <section id="how" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--surface-overlay)' }} />
        <div className="absolute inset-0 grid-bg-sm opacity-20 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-3">{t.howItWorks.label}</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              {t.howItWorks.title}
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              {t.howItWorks.description}
            </p>
          </div>

          {/* ── Automazione premessa ── */}
          <div className="mb-8 rounded-2xl p-5 sm:p-6 border"
            style={{ background: 'linear-gradient(135deg, rgba(240,180,41,0.06), rgba(0,194,255,0.04))', borderColor: 'rgba(240,180,41,0.2)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-black text-base mb-1" style={{ color: 'var(--gold)' }}>{t.howItWorks.autoNoteTitle}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t.howItWorks.autoNoteDesc}</p>
              </div>
              <Link href="/auth/register" className="btn-gold text-sm px-5 py-2.5 flex-shrink-0 whitespace-nowrap inline-flex items-center gap-2">
                {t.howItWorks.autoNoteCta}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <p className="text-xs font-semibold uppercase tracking-widest flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{t.howItWorks.orLearn}</p>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {t.howItWorks.steps.map((step, i) => {
              const Icon = HOW_IT_WORKS_ICONS[i]
              return (
                <div key={i} className="card-premium p-8 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="feature-icon-wrap">
                      <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                    </div>
                    <span className="text-4xl font-black font-mono" style={{ opacity: 0.08, color: 'var(--accent)' }}>{step.num}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Learning System ────────────────────────────── */}
      <section id="impara" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--surface-overlay)' }} />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mb-3">{t.learning.label}</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              {t.learning.title}
            </h2>
            <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t.learning.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {learningModules.slice(0, 3).map((mod, i) => (
              <Link
                key={mod.num}
                href={`/dashboard/learn/${mod.slug}`}
                prefetch={false}
                className="card-premium p-5 flex flex-col animate-fade-in-up transition-transform hover:scale-[1.015]"
                style={{ animationDelay: `${i * 60}ms`, opacity: mod.free ? 1 : 0.85 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent-subtle)', border: '1px solid var(--border-accent)' }}>
                      <BookOpen className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase"
                      style={{ color: mod.free ? 'var(--green)' : 'var(--text-muted)' }}>
                      {mod.free ? t.learning.free : '🔒'}
                    </span>
                  </div>
                  <span className="text-2xl font-black font-mono" style={{ opacity: 0.08, color: 'var(--accent)' }}>
                    {mod.num}
                  </span>
                </div>

                {/* Level badge */}
                <span className="self-start text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded mb-3"
                  style={{
                    background: mod.levelKey === 'beginner' ? 'rgba(0,230,118,0.1)' : mod.levelKey === 'advanced' ? 'rgba(240,180,41,0.1)' : mod.levelKey === 'practice' ? 'rgba(155,93,229,0.1)' : 'rgba(240,180,41,0.08)',
                    color: mod.levelKey === 'beginner' ? 'var(--green)' : 'var(--gold)',
                    border: `1px solid ${mod.levelKey === 'beginner' ? 'rgba(0,230,118,0.2)' : 'rgba(240,180,41,0.2)'}`,
                  }}>
                  {mod.level}
                </span>

                {/* Title & desc */}
                <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{mod.title}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{mod.desc}</p>

                {/* Topics */}
                <ul className="space-y-1.5 flex-1">
                  {mod.topics.map((topic, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)', opacity: 0.5 }}>·</span>
                      {topic}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {mod.lessons} {t.learning.lessons}
                  </span>
                  {mod.free
                    ? <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: 'var(--green)' }}>
                        <Play className="w-3 h-3" /> {t.learning.free}
                      </span>
                    : <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <Lock className="w-3 h-3" /> Access
                      </span>
                  }
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 space-y-3">
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {t.learning.cta}
            </p>
            <Link href="/auth/register" className="btn-gold text-sm px-8 py-3 rounded-xl inline-flex">
              <GraduationCap className="w-4 h-4" />
              {t.hero.startFree}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ──────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--surface-overlay)' }} />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-3">{t.features.label}</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              {t.features.title}
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              {t.features.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <div key={feat.title} className="card-premium p-6 group animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="feature-icon-wrap mb-5">
                  <feat.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trasparenza e Sicurezza ───────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--surface-overlay)' }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mb-3">{t.transparency.label}</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              {t.transparency.title.split('\n')[0]}<br className="hidden sm:block" />
              {t.transparency.title.split('\n')[1]}
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              {t.transparency.desc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {([
              { icon: Shield, color: 'var(--green)' },
              { icon: Lock, color: 'var(--gold)' },
              { icon: Globe, color: '#00C2FF' },
              { icon: Layers, color: '#9B5DE5' },
            ] as const).map((meta, i) => (
              <div key={i} className="card-premium p-6 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `color-mix(in srgb, ${meta.color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${meta.color} 20%, transparent)` }}>
                  <meta.icon className="w-5 h-5" style={{ color: meta.color }} />
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>{t.transparency.items[i].title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t.transparency.items[i].desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-5 text-center"
            style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(20px)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {t.transparency.note}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {t.transparency.noteSub}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Trustpilot Reviews Carousel ─────────────────── */}
      {TRUSTPILOT_ENABLED && (
        <TrustpilotCarousel
          sectionLabel={t.trustpilot.sectionLabel}
          title={t.trustpilot.sectionTitle}
          subtitle={t.trustpilot.sectionSubtitle}
          ctaText={t.trustpilot.ctaAll}
        />
      )}

      {/* ─── Guida MT5 per Chi Non Ce L'Ha ─────────────── */}
      <section id="guida-mt5" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mb-3">{t.guide.label}</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              {t.guide.title}
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              {t.guide.desc}
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {t.guide.steps.map((item, i) => (
              <div key={i} className="card-premium p-5 flex gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <span className="text-2xl font-black font-mono flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)', opacity: 0.25 }}>{item.num}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  {item.note && (
                    <div className="mt-2 rounded-lg px-3 py-2" style={{ background: 'rgba(240,180,41,0.06)', border: '1px solid rgba(240,180,41,0.12)' }}>
                      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--gold)' }}>{item.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="card-premium p-6">
            <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t.guide.whyTitle}</h3>
            <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t.guide.whyDesc}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {t.guide.whyItems.map((item) => (
                <div key={item.name} className="rounded-xl p-3 text-center"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.type}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] mt-3 text-center" style={{ color: 'var(--text-muted)' }}>
              {t.guide.whyNote}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Pricing ────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mb-3">{t.pricing.sectionLabel}</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-3">
              {t.pricing.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>{t.pricing.subtitle}</p>
          </div>

          <PricingPlanCard variant="landing" />
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-3">{t.faq.label}</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white">
              {t.faq.title}
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="card-premium overflow-hidden transition-all duration-300"
                style={expandedFaq === item.id ? { borderColor: 'var(--border-gold)' } : {}}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-sm sm:text-base pr-4" style={{ color: 'var(--text-primary)' }}>
                    {item.q}
                  </span>
                  <div className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
                    style={{
                      background: expandedFaq === item.id ? 'var(--gold-subtle)' : 'transparent',
                      borderColor: expandedFaq === item.id ? 'var(--border-gold)' : 'var(--border)',
                      transform: expandedFaq === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <ChevronDown className="w-4 h-4" style={{ color: expandedFaq === item.id ? 'var(--gold)' : 'var(--text-secondary)' }} />
                  </div>
                </button>

                {expandedFaq === item.id && (
                  <div className="px-5 pb-5 animate-fade-in-up">
                    <div className="divider mb-4" />
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.a}</p>
                    {'learnMoreUrl' in item && item.learnMoreUrl && (
                      <Link
                        href={item.learnMoreUrl}
                        className="inline-flex items-center gap-1 mt-3 text-xs font-semibold transition-opacity hover:opacity-70"
                        style={{ color: 'var(--accent)' }}
                      >
                        {('learnMoreLabel' in item && item.learnMoreLabel) || 'Scopri di più →'}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Finale ─────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="relative max-w-md mx-auto text-center">
          <div className="mx-auto mb-5 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/valoroxoro.svg" alt="Valorox" style={{ width: 52, height: 52 }} />
          </div>
          <Link href="/auth/register" className="btn-primary inline-flex text-base px-10 py-4 rounded-xl">
            {t.cta.startFree}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ─── Theme Onboarding Modal ─────────────────────── */}
      <CookieConsent onDone={onCookieDone} />
      {cookieDone && <ThemeOnboardingModal />}

      {/* ─── Footer ─────────────────────────────────────── */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/valoroxoro.svg" alt="Valorox" className="gold-avatar-ring" style={{ width: 34, height: 34 }} />
                <span className="valorox-title" style={{ fontSize: '1.1rem' }}>
                  Val<span className="valorox-title-oro">oro</span><span className="valorox-title-x">x</span><span className="valorox-title-ai" style={{ fontSize: '0.6em' }}>AI</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                {t.footer.tagline}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="live-dot" />
                <span className="text-xs font-medium" style={{ color: 'var(--green)' }}>{t.systemActive}</span>
              </div>
            </div>

            <div>
              <h4 className="section-label mb-4">Navigation</h4>
              <ul className="space-y-2.5">
                {[
                  { label: t.nav.login, href: '/auth/login' },
                  { label: t.nav.startFree, href: '/auth/register' },
                  { label: t.footer.links.method, href: '/metodo' },
                  { label: t.footer.links.about, href: '/chi-siamo' },
                  { label: t.footer.links.performance, href: '#performance' },
                  { label: t.footer.links.terms, href: '/legal/terms' },
                  { label: t.footer.links.privacy, href: '/legal/privacy' },
                  { label: t.footer.links.cookie, href: '/legal/cookie-policy' },
                ].map(link => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="section-label mb-4">{t.support.label}</h4>
              <div className="space-y-3">
                <a href="mailto:valoroxinfo@gmail.com" className="text-sm transition-opacity hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>valoroxinfo@gmail.com</a>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t.support.hours}</p>
                <div className="mt-4 p-3 rounded-xl" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.support.responseLabel}</p>
                  <p className="text-sm font-semibold mt-1" style={{ color: 'var(--accent)' }}>{t.support.responseTime}</p>
                </div>

                {/* Trustpilot footer badge */}
                {TRUSTPILOT_ENABLED && (
                  <div className="mt-4">
                    <TrustpilotFooterBadge
                      ratingLabel={t.trustpilot.footerRating}
                      reviewsLabel={t.trustpilot.footerReviews}
                      ctaLabel={t.trustpilot.footerCta}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="divider mb-8" />

          <div className="rounded-xl p-4 mb-6 text-center"
            style={{ background: 'rgba(255,61,113,0.03)', border: '1px solid rgba(255,61,113,0.1)' }}>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <strong style={{ color: 'rgba(255,90,120,0.8)' }}>{t.noFinancialAdvice}</strong>{' '}
              {t.footer.disclaimer}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              &copy; 2025 Valorox. {t.footer.rights}
            </p>
            <p className="text-xs text-center sm:text-right max-w-md leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t.perf.disclaimer.replace('*', '').trim()}{' '}
              <Link href="/legal/terms" className="underline underline-offset-2 transition-opacity hover:opacity-70" style={{ color: 'var(--text-muted)' }}>
                {t.footer.links.terms}
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
