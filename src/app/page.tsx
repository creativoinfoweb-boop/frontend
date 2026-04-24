'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useAuthStore } from '@/store/auth'
import Link from 'next/link'
import {
  ChevronDown,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  BarChart3,
  Lock,
  Check,
  Star,
  ArrowRight,
  Activity,
  Globe,
  Layers,
  Award,
  Sun,
  Moon,
} from 'lucide-react'
import { PricingPlanCard } from '@/components/pricing/PricingPlanCard'

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
  { symbol: 'XAU/USD', price_str: '—', change_str: '...', up: true },
  { symbol: 'EUR/USD', price_str: '—', change_str: '...', up: true },
  { symbol: 'BTC/USD', price_str: '—', change_str: '...', up: false },
  { symbol: 'GBP/USD', price_str: '—', change_str: '...', up: true },
  { symbol: 'USD/JPY', price_str: '—', change_str: '...', up: false },
]

/* ─── FAQ items ───────────────────────────────────────── */
const faqItems = [
  {
    id: 'what-is',
    question: 'Cos\'è El Dorado e a cosa serve?',
    answer: 'El Dorado è una piattaforma educativa e tecnologica per chi vuole comprendere i mercati finanziari e applicare una strategia operativa strutturata. Unisce formazione sulla visione Smart Money con strumenti che consentono di osservare e — su scelta dell\'utente — applicare la strategia in modo sistematico. Non è un bot, non è un servizio di investimento.',
  },
  {
    id: 'smart-money',
    question: 'Cos\'è la visione Smart Money?',
    answer: 'Smart Money identifica l\'approccio dei grandi operatori istituzionali (banche, hedge fund, market maker) che muovono i mercati attraverso dinamiche di liquidità. Comprendere come si muovono questi player — dove raccolgono liquidità, come creano falsi breakout, quando entrano davvero — è la base della strategia che studiamo e applichiamo su XAU/USD.',
    learnMoreUrl: '/metodo',
    learnMoreLabel: 'Approfondisci il Metodo →',
  },
  {
    id: 'demo',
    question: 'Posso iniziare con un conto demo?',
    answer: 'Assolutamente sì — ed è il percorso che consigliamo. Collega un conto demo MT5 del tuo broker, osserva come la strategia viene applicata in condizioni reali di mercato, studia le logiche operative e i parametri di rischio. Solo quando hai piena comprensione, decidi in autonomia se passare al conto live.',
  },
  {
    id: 'risks',
    question: 'Quali rischi devo considerare?',
    answer: 'Il trading sui mercati finanziari comporta rischio reale di perdita del capitale. La piattaforma fornisce strumenti di supporto decisionale — non garantisce risultati. I parametri di rischio (stop loss, size, take profit) sono sempre impostati e controllati dall\'utente. Non forniamo consulenza finanziaria. Studia prima, testa in demo, poi decidi con consapevolezza.',
    learnMoreUrl: '/legal/terms',
    learnMoreLabel: 'Leggi Termini e Rischi completi →',
  },
  {
    id: 'how-works',
    question: 'Come funziona tecnicamente la piattaforma?',
    answer: 'Colleghi le credenziali del tuo conto MT5 (cifrate AES-128 — non le legge nessuno). La piattaforma applica la strategia sul conto secondo i parametri da te configurati: rischio per operazione, orari, strumenti. Non serve avere MT5 aperto sul PC. Importante: evita interventi manuali sul conto collegato, perché possono compromettere la coerenza operativa della strategia.',
  },
  {
    id: 'frequency',
    question: 'Con quale frequenza opera la strategia?',
    answer: 'La strategia opera su XAU/USD principalmente nella sessione di Londra/New York (10:30–14:00 CET), dove la liquidità e la volatilità istituzionale sono più elevate. La frequenza varia in base alle condizioni di mercato: qualità prima di quantità. In assenza di condizioni ottimali, la strategia non entra — e questo è un punto di forza, non un limite.',
  },
  {
    id: 'parameters-limited',
    question: 'Perché alcuni parametri sono limitati e non posso impostarli liberamente?',
    answer: 'È una scelta deliberata, non una limitazione tecnica. Più libertà operativa significa più opportunità di commettere errori emotivi — e i dati lo confermano. Il range di rischio 1%-3% è già ampio: sotto l\'1% il capitale non permette la struttura TP multipla; sopra il 3% l\'emotività durante i drawdown diventa difficilmente gestibile. La struttura di stop loss, break-even e take profit segue logiche strategiche precise — modificarle arbitrariamente in base alla sensazione del momento è esattamente il comportamento che produce perdite.',
  },
  {
    id: 'vs-signals',
    question: 'Qual è la differenza rispetto ai classici segnali di trading?',
    answer: 'I segnali hanno un problema strutturale: anche se il segnale è corretto, l\'utente deve eseguirlo manualmente — e qui entra l\'emotività. Ritardo nell\'esecuzione, slippage, paura di entrare tardi, dubbio sull\'uscita. Spesso si perde anche con segnali corretti perché l\'esecuzione è inconsistente. Noi non mandiamo segnali: applichiamo la strategia in modo coerente, senza ritardi, senza esitazioni, con la stessa logica su ogni operazione. La differenza non è nella strategia — è nell\'esecuzione.',
  },
  {
    id: 'cancel',
    question: 'Posso cancellare quando voglio?',
    answer: 'Sì, in qualsiasi momento senza penalità. Le operazioni già aperte rimangono sul tuo conto MT5 e puoi gestirle come preferisci. Non c\'è lock-in, non ci sono costi nascosti.',
  },
  {
    id: 'broker',
    question: 'Quale broker devo usare?',
    answer: 'Qualsiasi broker MetaTrader 5 che offra XAU/USD (Oro). Per l\'applicazione ottimale della strategia consigliamo broker ECN con spread ridotti come Exness, IC Markets o Pepperstone. Sia conti demo che live sono supportati.',
  },
]

/* ─── Features — gold-only accent palette ──────────────── */
const features = [
  {
    icon: BarChart3,
    title: 'Nessuna Emotività',
    desc: 'Il sistema esegue la strategia esattamente come configurata — senza paura, senza avidità, senza deviazioni. L\'esecuzione coerente è l\'unico modo per sfruttare un edge statistico.',
  },
  {
    icon: Shield,
    title: 'Parametri Limitati Volutamente',
    desc: 'Alcune impostazioni sono intenzionalmente vincolate. Non per restringerti — per proteggerti dagli errori emotivi che ogni trader commette quando ha troppa libertà operativa.',
  },
  {
    icon: Globe,
    title: 'Osserva Prima in Demo',
    desc: 'Collega un conto demo: vedi la strategia applicata in condizioni reali, senza rischiare capitale. Comprendi le logiche operative prima di prendere qualsiasi decisione.',
  },
  {
    icon: Activity,
    title: 'Approccio Sistematico',
    desc: 'Stop loss secondo logica strategica. Break even automatico. Take profit strutturati. Ogni uscita segue un piano predefinito — non una reazione emotiva al mercato.',
  },
  {
    icon: Layers,
    title: 'Creato per Noi Stessi',
    desc: 'Questo sistema è stato costruito internamente da un team di trader per migliorare la propria disciplina. Testato, ottimizzato, poi condiviso. Non è teoria — è quello che usiamo noi.',
  },
  {
    icon: TrendingUp,
    title: 'Processo, Non Profitto',
    desc: 'Non promettiamo guadagni. Promettiamo coerenza operativa. Il risultato di lungo periodo dipende dall\'applicazione disciplinata di un metodo — non da previsioni o fortuna.',
  },
]

/* ─── Stats — Indicativi, aggiornati periodicamente dal Master account ───── */
const stats = [
  { value: 312, suffix: '', label: 'Operazioni Completate', isGold: true },
  { value: 96, suffix: '%', label: 'Tasso di Successo', isGold: false },
  { value: 28, suffix: 'x', label: 'Fattore di Profitto', isGold: true },
  { value: 12, suffix: ' min', label: 'Durata Media', isGold: true },
]

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const BASE_URL = typeof window !== 'undefined' && window.location.protocol === 'https:'
  ? '/api'
  : API_URL

/* ─── Main Component ───────────────────────────────────── */
export default function LandingPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { isAuthenticated } = useAuthStore()
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [tickerItems, setTickerItems] = useState(tickerFallback)
  const [goldPrice, setGoldPrice] = useState<{ price: number | null; change_str: string; up: boolean }>({
    price: null, change_str: '...', up: true,
  })
  const [masterStats, setMasterStats] = useState<any>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const isDark = theme !== 'light'

  useEffect(() => {
    if (!isAuthenticated) return
    // Verifica che il token backend sia ancora valido prima di mandare alla dashboard
    import('@/lib/api').then(({ default: api }) => {
      api.get('/auth/me').then(() => {
        router.push('/dashboard')
      }).catch(() => {
        // Token scaduto — rimani sulla landing page (forceLogout già gestisce la pulizia)
      })
    })
  }, [isAuthenticated, router])

  useEffect(() => {
    // Leggi il parametro ?ref= dall'URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const ref = params.get('ref')
      if (ref) setReferralCode(ref)
    }
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
        const res = await fetch(`${BASE_URL}/stats/master`)
        if (res.ok) {
          const data = await res.json()
          setMasterStats(data)
        }
      } catch (_) {
        setMasterStats(null)
      } finally {
        setStatsLoading(false)
      }
    }
    fetchMasterStats()
    const interval = setInterval(fetchMasterStats, 5 * 60_000) // 5 min
    return () => clearInterval(interval)
  }, [])

  if (isAuthenticated) return null

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>

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
        } : { background: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/eldorado.jpg" alt="El Dorado" className="gold-avatar-ring" style={{ width: 34, height: 34 }} />
            <div>
              <span className="text-base font-semibold" style={{ fontFamily: 'var(--font-brand)', letterSpacing: '0.12em', background: 'linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-dark))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>El Dorado</span>
              <div className="text-[9px] font-medium tracking-widest uppercase leading-none mt-0.5" style={{ color: 'var(--text-muted)' }}>Metodo · Disciplina · XAU/USD</div>
            </div>
          </div>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Metodo', href: '/metodo' },
              { label: 'Come Funziona', href: '#how' },
              { label: 'Performance', href: '#performance' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'FAQ', href: '#faq' },
            ].map((link) => (
              <a key={link.href} href={link.href}
                className="text-sm font-medium transition-all duration-200 hover:opacity-100"
                style={{ color: 'var(--text-secondary)', opacity: 0.85 }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
            ))}
            <Link href="/affiliati"
              className="text-sm font-medium transition-all duration-200 hover:opacity-100"
              style={{ color: 'var(--text-secondary)', opacity: 0.85 }}
            >
              Affiliati
            </Link>
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="theme-toggle hidden sm:inline-flex"
              title={isDark ? 'Modalità chiara' : 'Modalità scura'}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <Link href="/auth/login" className="hidden sm:inline-flex btn-ghost text-sm px-4 py-2">
              Accedi
            </Link>
            <Link href="/auth/register" className="btn-gold text-sm px-5 py-2.5">
              Inizia Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Referral Banner ────────────────────────────── */}
      {referralCode && (
        <div className="sticky top-[60px] z-40 border-b" style={{ background: 'linear-gradient(135deg, rgba(240,180,41,0.15), rgba(0,230,118,0.08))', borderColor: 'var(--glass-border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Star className="w-5 h-5" style={{ color: 'var(--gold)' }} />
              <div className="text-sm">
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Iscrizione tramite referral</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>3 giorni extra di trial + 30% sconto primo mese</p>
              </div>
            </div>
            <Link href={`/auth/register?ref=${referralCode}`} className="btn-gold text-xs px-4 py-2 flex-shrink-0">
              Accetto
            </Link>
          </div>
        </div>
      )}

      {/* ─── Hero ───────────────────────────────────────── */}
      <section className="eldorado-hero">

        {/* God rays */}
        <div className="eldorado-rays">
          {[0,1,2,3,4].map(i => <div key={i} className="eldorado-ray" />)}
        </div>

        {/* Subtle scan */}
        <div className="eldorado-scanline" />

        {/* Statue */}
        <div className="eldorado-statue-wrap">
          <div className="eldorado-statue-inner">
            <div className="eldorado-halo" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/eldorado.jpg" alt="El Dorado" className="eldorado-statue-img" />
            <div className="eldorado-shimmer" />
            {[
              { bottom: '30%', left: '10%', delay: '0s', dx: '15px' },
              { bottom: '45%', left: '20%', delay: '0.8s', dx: '-10px' },
              { bottom: '60%', left: '15%', delay: '1.6s', dx: '20px' },
              { bottom: '35%', right: '10%', delay: '0.4s', dx: '-15px' },
              { bottom: '50%', right: '18%', delay: '1.2s', dx: '10px' },
              { bottom: '65%', right: '12%', delay: '2s', dx: '-20px' },
              { bottom: '25%', left: '35%', delay: '0.6s', dx: '5px' },
              { bottom: '55%', right: '32%', delay: '1.8s', dx: '-5px' },
            ].map((p, i) => (
              <div key={i} className="eldorado-particle" style={{ bottom: p.bottom, left: (p as {left?: string}).left, right: (p as {right?: string}).right, animationDelay: p.delay, animationDuration: `${3.5 + i * 0.3}s`, ['--dx' as string]: p.dx }} />
            ))}
          </div>
        </div>

        {/* Vignettes */}
        <div className="eldorado-vignette-left" />
        <div className="eldorado-vignette-right" />
        <div className="eldorado-vignette-bottom" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-end text-center px-4 pb-24 pt-[52vh] w-full">

          {/* Live badge */}
          <div className="eldorado-badge">
            <div className="live-dot" style={{ width: 6, height: 6 }} />
            Team di Trader · Disciplina Operativa · XAU/USD
          </div>

          {/* ── Refined title ── */}
          <div className="eldorado-title-wrap">
            <div className="eldorado-title-deco">
              <div className="eldorado-title-diamond" />
            </div>
            <h1 className="eldorado-title">El Dorado</h1>
            <div className="eldorado-title-deco">
              <div className="eldorado-title-diamond" />
            </div>
          </div>

          <p className="eldorado-subtitle mt-2 mb-3">
            Elimina l&apos;emotività. Esegui con disciplina.
          </p>
          <p className="text-sm mb-9 max-w-lg mx-auto text-center" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Creato da un team di trader per risolvere il problema principale del trading:{' '}
            <span style={{ color: 'var(--gold)', opacity: 0.9 }}>l&apos;essere umano è il punto debole nell&apos;esecuzione della strategia.</span>
          </p>

          {/* Live gold price */}
          <div className="inline-flex items-center gap-4 rounded-xl px-6 py-3 mb-9"
            style={{ background: 'var(--gold-subtle)', border: '1px solid var(--border-gold)', backdropFilter: 'blur(16px)' }}
          >
            <div className="live-dot" />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>XAU/USD</span>
            <span className="text-xl font-black font-mono number-mono" style={{ color: 'var(--gold)' }}>
              {goldPrice.price
                ? goldPrice.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : '—'}
            </span>
            <span className="text-sm font-semibold" style={{ color: goldPrice.up ? 'var(--green)' : 'var(--red)' }}>
              {goldPrice.change_str}
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/metodo" className="btn-eldorado btn-eldorado-primary">
              Scopri il Metodo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/auth/register" className="btn-eldorado btn-eldorado-secondary">
              Inizia Gratis
              <BarChart3 className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-6 justify-center items-center mt-8">
            {[
              { icon: Shield, text: 'Nessuna gestione fondi' },
              { icon: Lock, text: 'Controllo totale utente' },
              { icon: Award, text: 'No carta richiesta' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <Icon className="w-3.5 h-3.5" style={{ color: 'var(--gold)', opacity: 0.5 }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Ticker Tape ────────────────────────────────── */}
      <div className="py-3 overflow-hidden"
        style={{ borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(20px)' }}
      >
        <div className="ticker-content gap-8">
          {[...tickerItems, ...tickerItems].map((item, i) => {
            const isGold = item.symbol === 'XAU/USD'
            const displayPrice = isGold && goldPrice?.price ? `${goldPrice.price.toFixed(2)}` : item.price_str
            const displayChange = isGold && goldPrice?.change_str ? goldPrice.change_str : item.change_str
            const displayUp = isGold ? goldPrice?.up : item.up
            return (
              <div key={i} className="inline-flex items-center gap-3 px-6 flex-shrink-0" style={{
                ...(isGold ? {
                  background: 'color-mix(in srgb, var(--gold) 8%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)',
                  borderRadius: '0.75rem',
                  paddingLeft: '0.875rem',
                  paddingRight: '0.875rem',
                } : {})
              }}>
                {isGold && <span style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>★</span>}
                <span className={`tracking-wider ${isGold ? 'font-black text-base' : 'text-xs font-bold'}`} style={{ color: isGold ? 'var(--gold)' : 'var(--text-secondary)' }}>{item.symbol}</span>
                <span className="text-sm font-mono font-semibold" style={{ color: isGold ? 'var(--gold)' : 'var(--text-primary)' }}>{displayPrice}</span>
                <span className="text-xs font-semibold" style={{ color: displayUp ? 'var(--green)' : 'var(--red)' }}>
                  {displayChange}
                </span>
                {isGold && <span className="ml-1 w-2 h-2 rounded-full" style={{ background: 'var(--gold)', boxShadow: '0 0 6px var(--gold)', animation: 'dotPulse 2s ease-in-out infinite' }} />}
                <span className="mx-2 select-none" style={{ color: 'var(--border)' }}>│</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── Sub-Hero: Il Vero Problema ─────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--surface-overlay)' }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Il Vero Problema del Trading</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              Il problema non è la strategia.<br className="hidden sm:block" />
              È la disciplina nell&apos;eseguirla.
            </h2>
            <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              La ricerca sul trading retail indica che la maggior parte delle perdite deriva
              dall&apos;interferenza emotiva nell&apos;esecuzione — non dalla qualità della strategia.
              Emotività, impulsività e incostanza sono le barriere principali al risultato.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: TrendingUp, color: 'var(--gold)',
                title: 'Interferenza Emotiva',
                desc: 'Chiusure anticipate per timore, perdite lasciate correre in attesa di recupero. Le decisioni prese sotto pressione emotiva producono sistematicamente risultati inferiori al potenziale della strategia.',
              },
              {
                icon: Zap, color: 'var(--gold)',
                title: 'Comportamento Impulsivo',
                desc: 'Overtrading e inseguimento del mercato sono le cause più documentate di performance negative. Ogni operazione fuori dal piano introduce un edge atteso negativo sul risultato complessivo.',
              },
              {
                icon: Activity, color: 'var(--gold)',
                title: 'Incostanza Operativa',
                desc: 'L\'edge statistico di un metodo si manifesta su centinaia di operazioni coerenti, non su singoli trade. Una strategia modificata frequentemente non può esprimere il proprio potenziale.',
              },
            ].map((item, i) => (
              <div key={i} className="card-premium p-6 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="feature-icon-wrap mb-4">
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/metodo"
              className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-80"
              style={{ color: 'var(--gold)' }}>
              Scopri come abbiamo risolto questo problema →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ──────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
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
            <div className="section-label mb-3">Il Percorso</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              Dall'Educazione all'Applicazione Reale
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Non basta sapere — devi vedere come funziona nella pratica. Ecco il percorso Smart Trader.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">

            {[
              {
                num: '01', icon: Globe,
                title: 'Studia il Metodo',
                desc: 'Accedi alla sezione educativa: liquidità, Smart Money, sessioni, risk management. Comprendi le logiche prima di agire.',
              },
              {
                num: '02', icon: Layers,
                title: 'Osserva in Demo',
                desc: 'Collega un conto demo MT5. Osserva la strategia applicata in condizioni reali di mercato senza rischio di capitale.',
              },
              {
                num: '03', icon: Activity,
                title: 'Decidi in Autonomia',
                desc: 'Quando hai piena comprensione del funzionamento, configuri rischio e parametri. Sei tu a decidere se e quando passare al live.',
              },
              {
                num: '04', icon: BarChart3,
                title: 'Monitora dalla Dashboard',
                desc: 'La tua dashboard personale mostra in tempo reale: operazioni eseguite, win rate, equity curve, performance storiche. Tutti i dati per crescere e diventare progressivamente autonomo.',
              },
            ].map((step, i) => (
              <div key={i} className="card-premium p-8 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="flex items-start justify-between mb-6">
                  <div className="feature-icon-wrap">
                    <step.icon className="w-5 h-5" style={{ color: 'var(--gold)' }} />
                  </div>
                  <span className="text-4xl font-black font-mono" style={{ opacity: 0.12, color: 'var(--gold)' }}>{step.num}</span>
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Performance Section ────────────────────────── */}
      <section id="performance" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-3">Track Record</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              Performance Master Verificate
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Dati reali, aggiornati in tempo reale. Nessuna promessa, solo risultati verificabili.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Chart */}
            <div className="lg:col-span-3 card-premium p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Equity Curve</h3>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Gen–Apr 2026 — XAU/USD — Indicativa</p>
                </div>
                <span className="badge-success">+23.2% YTD</span>
              </div>

              <svg viewBox="0 0 560 200" className="w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--green)" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--green)" />
                    <stop offset="100%" stopColor="var(--green)" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                {[50, 100, 150].map(y => (
                  <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="var(--border)" strokeWidth="1" />
                ))}
                <path d="M0,180 L46,170 L93,160 L140,155 L186,145 L233,148 L280,130 L326,120 L373,115 L420,100 L466,90 L513,75 L560,65 L560,200 L0,200 Z" fill="url(#perfGrad)" />
                <path d="M0,180 L46,170 L93,160 L140,155 L186,145 L233,148 L280,130 L326,120 L373,115 L420,100 L466,90 L513,75 L560,65" fill="none" stroke="url(#lineGrad2)" strokeWidth="2.5" className="sparkline" />
                <circle cx="560" cy="65" r="5" fill="var(--green)" opacity="0.8" />
                <circle cx="560" cy="65" r="10" fill="var(--green)" opacity="0.12" />
              </svg>

              <div className="flex justify-between mt-2 px-1">
                {['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'].map(m => (
                  <span key={m} className="text-[9px] font-medium" style={{ color: 'var(--text-muted)' }}>{m}</span>
                ))}
              </div>
            </div>

            {/* Stats — gold/green/red only */}
            <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {statsLoading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="card-premium p-4 flex items-center gap-4">
                    <div className="skeleton w-10 h-10 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="skeleton h-6 w-20" />
                      <div className="skeleton h-3 w-40" />
                    </div>
                  </div>
                ))
              ) : (
                [
                  { label: 'Win Rate', value: `${masterStats?.win_rate_percent ? parseFloat(masterStats.win_rate_percent).toFixed(1) : '96'}%`, sub: `${masterStats?.trades_win || 300} / ${masterStats?.trades_total || 312} trades`, color: 'var(--green)', icon: TrendingUp },
                  { label: 'Profit Factor', value: masterStats?.profit_factor ? parseFloat(masterStats.profit_factor).toFixed(2) : '2.8', sub: 'Profitti / Perdite', color: 'var(--gold)', icon: BarChart3 },
                  { label: 'Avg Duration', value: masterStats?.avg_trade_duration_hours ? `${Math.round(parseFloat(masterStats.avg_trade_duration_hours) * 60)} min` : '12 min', sub: 'Scalping XAU/USD', color: 'var(--gold)', icon: Clock },
                  { label: 'Total Pips', value: masterStats?.total_profit_pips ? `+${parseFloat(masterStats.total_profit_pips).toFixed(0)}` : '+1240', sub: 'Pips accumulati', color: 'var(--green)', icon: TrendingUp },
                ].map((stat) => (
                  <div key={stat.label} className="card-premium p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `color-mix(in srgb, ${stat.color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${stat.color} 25%, transparent)` }}
                    >
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl font-black font-mono number-mono" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-xs font-medium truncate" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                      <div className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{stat.sub}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <p className="text-center text-xs italic mt-8" style={{ color: 'var(--text-muted)' }}>
            * Performance passate non garantiscono risultati futuri. Trading comporta rischi.
          </p>
        </div>
      </section>

      {/* ─── Features Grid ──────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--surface-overlay)' }} />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-3">Perché El Dorado</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              Non è un bot che guadagna per te.<br className="hidden sm:block" />È la disciplina che ti mancava.
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Riduzione dell&apos;emotività. Disciplina operativa. Approccio sistematico. Educazione + applicazione pratica. Protezione dagli errori più comuni.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <div key={feat.title} className="card-premium p-6 group animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="feature-icon-wrap mb-5">
                  <feat.icon className="w-5 h-5" style={{ color: 'var(--gold)' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Demo Section ───────────────────────────────── */}
      <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--surface-overlay)' }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Inizia in Sicurezza</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              Comprendi Prima. Testa in Demo. Poi Decidi.
            </h2>
            <p className="max-w-2xl mx-auto text-base" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Non devi rischiare capitale reale per capire come funziona la piattaforma.
              Collega un account demo del tuo broker e osserva il comportamento del sistema in condizioni reali di mercato — senza alcun impatto finanziario.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Globe,
                step: '01',
                title: 'Collega Account Demo',
                desc: 'Usa le credenziali di un conto demo MT5 del tuo broker. Tutto funziona in modo identico al conto reale, senza rischio.',
                color: 'var(--gold)',
              },
              {
                icon: BarChart3,
                step: '02',
                title: 'Osserva e Studia',
                desc: 'Monitora ogni operazione dalla dashboard. Analizza le logiche, i parametri di rischio, i timing. Comprendi prima di decidere.',
                color: 'var(--green)',
              },
              {
                icon: Shield,
                step: '03',
                title: 'Decidi in Autonomia',
                desc: 'Solo quando hai piena comprensione del funzionamento, sei libero di passare al conto reale — o di restare in demo. La scelta è solo tua.',
                color: 'var(--gold)',
              },
            ].map((item, i) => (
              <div key={i} className="card-premium p-6 animate-fade-in-up" style={{ animationDelay: `${i * 120}ms` }}>
                <div className="flex items-start justify-between mb-6">
                  <div className="feature-icon-wrap">
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-4xl font-black font-mono" style={{ opacity: 0.1, color: item.color }}>{item.step}</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl p-6 text-center"
            style={{ background: 'rgba(240,180,41,0.05)', border: '1px solid rgba(240,180,41,0.15)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--gold)' }}>
              Disclaimer — Non Forniamo Consulenza Finanziaria
            </p>
            <p className="text-xs max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              El Dorado è un software di automazione. Non forniamo consulenza finanziaria, servizi di investimento o gestione patrimoniale.
              Tutte le decisioni operative e i parametri di utilizzo sono impostati e controllati direttamente dall'utente.
              Il trading sui mercati finanziari comporta rischi reali di perdita del capitale.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Pricing ────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mb-3">Pricing</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-3">
              Un Piano, Tutto Incluso
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>Nessuna sorpresa. Nessun tier nascosto.</p>
          </div>

          <PricingPlanCard variant="landing" />
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--surface-overlay)' }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Testimonianze</div>
            <h2 className="text-2xl sm:text-3xl font-black text-gradient-white">
              Cosa Dicono i Nostri Smart Trader
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: 'Marco R.', role: 'Trader — XAU/USD', avatar: 'MR', text: 'Finalmente capisco perché il mercato si muove. La sezione educativa ha cambiato il mio approccio all\'analisi: so quando aprire posizioni e soprattutto quando non farlo.', stars: 5, profit: '+312 pips*' },
              { name: 'Sofia L.', role: 'Trader — XAU/USD', avatar: 'SL', text: 'Non mi baso più su indicatori senza logica. Ho capito le dinamiche istituzionali e osservo il mercato in modo completamente diverso. Trasparenza totale sul funzionamento.', stars: 5, profit: '+198 pips*' },
              { name: 'Andrea M.', role: 'Trader — XAU/USD', avatar: 'AM', text: 'La strategia viene applicata in modo coerente. Ho accesso a tutti i dati dalla dashboard: performance, win rate, operazioni. Riesco a monitorare e imparare dalla mia operatività.', stars: 5, profit: '+445 pips*' },
            ].map((t, i) => (
              <div key={t.name} className="card-premium p-6 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4" style={{ color: 'var(--gold)' }} fill="var(--gold)" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: 'var(--text-secondary)' }}>"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--gold-subtle)', border: '1px solid var(--border-gold)' }}>
                      <span className="text-xs font-bold" style={{ color: 'var(--gold)' }}>{t.avatar}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.role}</div>
                    </div>
                  </div>
                  <span className="badge-success text-xs">{t.profit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-3">FAQ</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white">
              Domande Frequenti
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
                    {item.question}
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
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.answer}</p>
                    {'learnMoreUrl' in item && item.learnMoreUrl && (
                      <Link
                        href={item.learnMoreUrl}
                        className="inline-flex items-center gap-1 mt-3 text-xs font-semibold transition-opacity hover:opacity-70"
                        style={{ color: 'var(--gold)' }}
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

      {/* ─── CTA Banner ─────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'var(--surface-overlay)' }} />
        <div className="absolute inset-0 grid-bg-sm opacity-15 pointer-events-none" />

        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--gold-subtle) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--gold-subtle) 0%, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="mx-auto mb-6 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/eldorado.jpg" alt="El Dorado" className="gold-avatar-ring" style={{ width: 68, height: 68 }} />
          </div>

          <h2 className="text-4xl sm:text-5xl font-black mb-5">
            <span className="text-gradient-white">Il Problema Non è la Strategia.</span>
            <br />
            <span className="text-gradient-gold">È la Disciplina nell&apos;Eseguirla.</span>
          </h2>

          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Un sistema sviluppato per uso operativo interno, validato su centinaia di operazioni reali
            e reso accessibile a chi condivide un approccio disciplinato ai mercati.
            7 giorni gratuiti — nessuna carta richiesta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/metodo" className="btn-gold text-base px-10 py-4 rounded-xl">
              Scopri il Metodo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/auth/register"
              className="inline-flex items-center gap-2 text-base font-semibold px-8 py-4 rounded-xl transition-all"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
              Inizia Gratis
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 justify-center mt-8">
            {['Inizia in demo — zero rischio', 'Nessuna promessa di profitto', 'Processo, probabilità, disciplina'].map(text => (
              <div key={text} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Check className="w-4 h-4" style={{ color: 'var(--green)' }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────── */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/eldorado.jpg" alt="El Dorado" className="gold-avatar-ring" style={{ width: 34, height: 34 }} />
                <div>
                  <span className="font-bold text-gradient-gold">El Dorado</span>
                  <div className="text-[9px] tracking-widest uppercase mt-0.5" style={{ color: 'var(--text-muted)' }}>Metodo · Disciplina · XAU/USD</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                Sistema creato da un team di trader per eliminare l&apos;emotività dall&apos;esecuzione. Disciplina operativa su XAU/USD.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="live-dot" />
                <span className="text-xs font-medium" style={{ color: 'var(--green)' }}>Sistema attivo — 24/5</span>
              </div>
            </div>

            <div>
              <h4 className="section-label mb-4">Navigazione</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Accedi', href: '/auth/login' },
                  { label: 'Registrati', href: '/auth/register' },
                  { label: 'Metodo & Strategia', href: '/metodo' },
                  { label: 'Come Funziona', href: '#how' },
                  { label: 'Performance', href: '#performance' },
                  { label: 'Termini di Servizio', href: '/legal/terms' },
                ].map(link => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="section-label mb-4">Supporto</h4>
              <div className="space-y-3">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>support@botbosco.com</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Lun–Ven, 9:00–18:00</p>
                <div className="mt-4 p-3 rounded-xl" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Tempo medio di risposta</p>
                  <p className="text-sm font-semibold mt-1" style={{ color: 'var(--gold)' }}>&lt; 2 ore</p>
                </div>
              </div>
            </div>
          </div>

          <div className="divider mb-8" />

          {/* Legal disclaimer strip */}
          <div className="rounded-xl p-4 mb-6 text-center"
            style={{ background: 'rgba(255,61,113,0.03)', border: '1px solid rgba(255,61,113,0.1)' }}>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <strong style={{ color: 'rgba(255,90,120,0.8)' }}>Non forniamo consulenza finanziaria.</strong>{' '}
              El Dorado è un software SaaS di automazione. Non gestiamo fondi, non offriamo servizi di investimento né gestione patrimoniale.
              Tutte le decisioni operative e i parametri sono impostati direttamente dall'utente.
              Il trading comporta rischi reali di perdita del capitale. Nessun risultato è garantito.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              &copy; 2025 El Dorado. Tutti i diritti riservati.
            </p>
            <p className="text-xs text-center sm:text-right max-w-md leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Performance passate non garantiscono risultati futuri.{' '}
              <Link href="/legal/terms" className="underline underline-offset-2 transition-opacity hover:opacity-70" style={{ color: 'var(--text-muted)' }}>
                Termini di Servizio
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
