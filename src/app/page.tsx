'use client'

import { useState, useEffect, useRef } from 'react'
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
  { symbol: 'DXY', price_str: '—', change_str: '...', up: false },
  { symbol: 'GBP/USD', price_str: '—', change_str: '...', up: true },
  { symbol: 'USD/JPY', price_str: '—', change_str: '...', up: false },
]

/* ─── FAQ items ───────────────────────────────────────── */
const faqItems = [
  {
    id: 'what-is',
    question: 'Cos\'è Valorox e a cosa serve?',
    answer: 'Valorox è una piattaforma educativa e tecnologica per chi vuole comprendere i mercati finanziari e applicare una strategia operativa strutturata. Unisce formazione sulla visione Smart Money con strumenti che consentono all\'utente di osservare e applicare la strategia in modo sistematico, utilizzando il nostro sistema per eseguirla anche in maniera automatizzata. Non è un servizio di investimento.',
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
    answer: 'La strategia opera su XAU/USD principalmente nella sessione di Londra/New York (10:00 – 16:00 CET), dove la liquidità e la volatilità istituzionale sono più elevate. La frequenza varia in base alle condizioni di mercato: qualità prima di quantità. In assenza di condizioni ottimali, la strategia non entra — e questo è un punto di forza, non un limite.',
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
    answer: 'Qualsiasi broker MetaTrader 5 che offra XAU/USD (Oro). Non abbiamo alcuna affiliazione con broker — nessuna commissione, nessun conflitto di interesse. Tu scegli il broker che preferisci. Per l\'applicazione ottimale della strategia consigliamo broker ECN con spread ridotti come Exness, IC Markets o Pepperstone. Sia conti demo che live sono supportati.',
  },
  {
    id: 'broker-independence',
    question: 'Avete affiliazioni con broker o conflitti di interesse?',
    answer: 'No. Valorox non ha alcuna affiliazione con broker, non riceve commissioni sul volume di trading degli utenti e non ha alcun conflitto di interesse. Il nostro unico ricavo è l\'abbonamento alla piattaforma. L\'utente sceglie liberamente il proprio broker, senza alcuna restrizione o preferenza forzata da parte nostra.',
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

/* ─── Learning Modules ──────────────────────────────────── */
const learningModules = [
  {
    num: '01', slug: '01', free: true, level: 'Principiante', lessons: 8,
    title: 'Fondamenti del Mercato',
    desc: 'Le basi per leggere XAU/USD e le sessioni operative prima di qualsiasi operazione.',
    topics: ['XAU/USD: caratteristiche e volatilità dell\'oro', 'Sessioni: Asia (00–08), Londra (09–12), NY (14:30–17)', 'ATR: misurare la volatilità per calibrare il rischio', 'Spread, leva, margine e struttura del conto MT5'],
  },
  {
    num: '02', slug: '02', free: true, level: 'Principiante', lessons: 10,
    title: 'Smart Money Concept',
    desc: 'Come operano gli istituzionali e perché il retail sistematicamente perde.',
    topics: ['BSL e SSL: liquidità sopra i massimi e sotto i minimi', 'BOS (Break of Structure) e MSS (Market Structure Shift)', 'Liquidity Sweep: il falso breakout per raccogliere gli stop', 'Retail vs Istituzionale: chi muove davvero il mercato'],
  },
  {
    num: '03', slug: '03', free: true, level: 'Intermedio', lessons: 9,
    title: 'Liquidità e Blocchi di Prezzo',
    desc: 'I meccanismi algoritmici che muovono i prezzi: MAPS e i 9 tipi di blocchi.',
    topics: ['MAPS: Consolidation → Expansion → Retracement/Reversal', 'Order Block, Breaker Block e Mitigation Block', 'Fair Value Gap (FVG): squilibri di prezzo istituzionali', 'Propulsion Block e Vacuum Block: segnali di accelerazione'],
  },
  {
    num: '04', slug: '04', free: true, level: 'Intermedio', lessons: 8,
    title: 'Punti di Entrata ad Alto R/R',
    desc: 'La tecnica H1→M1 per entrare con logica istituzionale e massimizzare il R/R.',
    topics: ['H1 trigger: identificare la zona di interesse sul timeframe alto', 'M1 micro-struttura e MSS di conferma dopo il sweep', 'Entrata aggressiva (OB candle) vs conservativa (50% OB retest)', 'Premium/Discount Zone e confluenza multi-timeframe'],
  },
  {
    num: '05', slug: '05', free: false, level: 'Intermedio', lessons: 7,
    title: 'Risk Management',
    desc: 'Le regole operative che determinano la sopravvivenza nel lungo periodo.',
    topics: ['Regola 1–2% per operazione, max 3% di perdita giornaliera', 'Stop Loss basato sulla struttura: sotto il fake move low', 'T1 al 50% → Break Even automatico → T2 al livello HTF', 'Kill Switch: stop dopo 2 perdite consecutive, filtro NFP/FOMC/CPI'],
  },
  {
    num: '06', slug: '06', free: false, level: 'Avanzato', lessons: 8,
    title: 'Applicazione operativa — scalping, intraday e gestione adattiva',
    desc: 'Setup completo su XAU/USD nelle Kill Zone (scalping M1) e su movimenti H1/H4 (intraday).',
    topics: ['Asia session: marcare Asia High e Asia Low come livelli chiave', 'London Kill Zone: sweep del range Asia → conferma MSS su M1', 'Gestione live: T1 50%, BE automatico, T2 al livello HTF', '10 Regole del NO: quando non entrare mai in operazione'],
  },
  {
    num: '07', slug: '07', free: false, level: 'Avanzato', lessons: 7,
    title: 'CRT — Candle Range Theory',
    desc: 'Il modello CRT: ogni candela è un range completo con sweep di liquidità e setup AMD ad alta probabilità.',
    topics: ['CRT-High e CRT-Low: i livelli di liquidità di ogni candela', 'Le 3 fasi AMD: Accumulation → Manipulation → Distribution', 'Setup Bullish: sweep SSL + conferma + entry long precisa', 'Setup Bearish: sweep BSL + conferma + entry short + multi-timeframe'],
  },
  {
    num: '08', slug: '08', free: false, level: 'Pratica', lessons: 5,
    title: 'Il Sistema Valorox',
    desc: 'Dalla teoria alla pratica reale con la piattaforma: demo, dashboard, progressione.',
    topics: ['Collegare il conto demo MT5 e configurare il rischio', 'Monitorare ogni operazione dalla dashboard in tempo reale', 'Win rate, equity curve, profit factor: leggere le statistiche', 'Da demo a live: i criteri oggettivi per fare il passo'],
  },
]

/* ─── Stats — Indicativi, aggiornati periodicamente dal Master account ───── */
const stats = [
  { value: 312, suffix: '', label: 'Operazioni Completate', isGold: true },
  { value: 79, suffix: '%', label: 'Win Rate', isGold: false },
  { value: 12, suffix: ' min', label: 'Durata Media', isGold: true },
]

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const BASE_URL = typeof window !== 'undefined' && window.location.protocol === 'https:'
  ? '/api'
  : API_URL

/* ─── Main Component ───────────────────────────────────── */
export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const { isAuthenticated } = useAuthStore()
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [tickerItems, setTickerItems] = useState(tickerFallback)
  const [goldPrice, setGoldPrice] = useState<{ price: number | null; change_str: string; up: boolean }>({
    price: null, change_str: '...', up: true,
  })
  const [masterStats, setMasterStats] = useState<any>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [showSplash, setShowSplash] = useState(true)
  const [splashFading, setSplashFading] = useState(false)
  const isDark = theme !== 'light'

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

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>

      {/* ── Splash Screen ── */}
      {showSplash && (
        <div className={`valorox-splash ${splashFading ? 'valorox-splash-out' : ''}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/valoroxoro.svg" alt="Valorox" className="valorox-splash-logo" />
          <span className="valorox-splash-title">
            Val<span className="valorox-title-oro">oro</span>x
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
          {/* Logo — always links back to landing */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/valoroxoro.svg" alt="Valorox" className="gold-avatar-ring shrink-0" style={{ width: 28, height: 28 }} />
            <div className="min-w-0">
              <span className="text-sm sm:text-base font-semibold" style={{ fontFamily: 'var(--font-brand)', letterSpacing: '0.10em' }}>
                <span style={{ color: isDark ? '#ffffff' : '#0d0d18' }}>Val</span>
                <span style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-dark))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>oro</span>
                <span style={{ color: isDark ? '#ffffff' : '#0d0d18' }}>x</span>
              </span>
              <div className="text-[8px] sm:text-[9px] font-medium tracking-widest uppercase leading-none mt-0.5" style={{ color: isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.35)' }}>AI Solution</div>
            </div>
          </Link>

          {/* Center links — desktop only */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Metodo', href: '/metodo' },
              { label: 'Chi Siamo', href: '/chi-siamo' },
              { label: 'Impara', href: '#impara' },
              { label: 'Performance', href: '#performance' },
              { label: 'Pricing', href: '#pricing' },
            ].map((link) => (
              <a key={link.href} href={link.href}
                className="text-sm font-medium transition-all duration-200"
                style={{ color: scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.82)' }}
                onMouseEnter={e => (e.currentTarget.style.color = scrolled ? 'var(--text-primary)' : '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.82)')}
              >
                {link.label}
              </a>
            ))}
            <Link href="/affiliati"
              className="text-sm font-medium transition-all duration-200"
              style={{ color: scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.82)' }}
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

            {isAuthenticated ? (
              <Link href="/dashboard" className="btn-primary text-sm px-5 py-2.5 hidden sm:inline-flex">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="hidden sm:inline-flex btn-ghost text-sm px-4 py-2">
                  Accedi
                </Link>
                <Link href="/auth/register" className="hidden sm:inline-flex btn-primary text-sm px-5 py-2.5">
                  Inizia Gratis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}

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
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[55] md:hidden"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
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
                <div>
                  <div className="brand-cinzel text-[12px]" style={{ letterSpacing: '0.14em' }}>VALOROX</div>
                  <div className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>AI Solution</div>
                </div>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ color: 'var(--text-muted)', background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
              <p className="px-3 pb-2 text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>Navigazione</p>
              {[
                { label: 'Il Metodo', href: '/metodo' },
                { label: 'Chi Siamo', href: '/chi-siamo' },
                { label: 'Impara', href: '#impara' },
                { label: 'Performance', href: '#performance' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Affiliati', href: '/affiliati' },
              ].map(link => (
                <a
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
                </a>
              ))}
            </nav>

            {/* Bottom CTAs */}
            <div className="px-4 py-4 space-y-2.5" style={{ borderTop: '1px solid var(--border)' }}>
              {/* Theme toggle */}
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              >
                {isDark ? <Sun className="w-4 h-4" style={{ color: 'var(--accent)' }} /> : <Moon className="w-4 h-4" style={{ color: 'var(--accent)' }} />}
                {isDark ? 'Modalità chiara' : 'Modalità scura'}
              </button>

              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full justify-center text-sm py-3"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Vai alla Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-ghost w-full justify-center text-sm py-3"
                  >
                    Accedi
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary w-full justify-center text-sm py-3"
                  >
                    Inizia Gratis
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
      <section className="valorox-hero">

        {/* God rays — absolute, full section width */}
        <div className="valorox-rays">
          {[0,1,2,3,4].map(i => <div key={i} className="valorox-ray" />)}
        </div>

        {/* Subtle scan */}
        <div className="valorox-scanline" />

        {/* Full-width glow beam — NOT inside statue-wrap */}
        <div className="valorox-halo" />

        {/* Side vignettes */}
        <div className="valorox-vignette-left" />
        <div className="valorox-vignette-right" />

        {/* Section-wide shimmer beam (extends full hero width, no clipping) */}
        <div className="valorox-hero-shimmer" aria-hidden="true" />

        {/* Hero container — vertical stack, brand block centered upper-mid */}
        <div className="valorox-hero-container">

          {/* Brand block: logo + VALOROX AI inline */}
          <div className="valorox-brand-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/valoroxoro.svg" alt="Valorox" className="valorox-brand-logo" fetchPriority="high" loading="eager" decoding="async" />
            <h1 className="valorox-title">
              Al<span className="valorox-title-oro">oro</span><span className="valorox-title-x">x</span><span className="valorox-title-ai">AI</span>
            </h1>
          </div>

          {/* Hero Content — below brand block */}
          <div className="valorox-hero-content">

            <div className="valorox-badge">
              <div className="live-dot" style={{ width: 4, height: 4 }} />
              XAU/USD&nbsp;&nbsp;·&nbsp;&nbsp;AI TRADING SYSTEM
            </div>

            <p className="valorox-claim">
              Un nuovo approccio al trading.
            </p>
            <p className="valorox-hero-desc">
              Scalping, intraday, volumetrica e CRT in un unico motore di esecuzione AI su XAU/USD.
            </p>

            {/* CTAs — proportionate, slim */}
            <div className="valorox-hero-ctas">
              {isAuthenticated ? (
                <Link href="/dashboard" className="btn-valorox btn-valorox-primary btn-valorox-slim">
                  <LayoutDashboard className="w-4 h-4" />
                  Vai alla Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/auth/register" className="btn-valorox btn-valorox-primary btn-valorox-slim">
                    Inizia Gratis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/metodo" className="btn-valorox btn-valorox-secondary btn-valorox-slim">
                    Scopri il Metodo
                    <BarChart3 className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>

            <div className="valorox-hero-trust">
              {[
                { icon: Shield, text: 'Nessuna gestione fondi' },
                { icon: Lock, text: 'Controllo totale utente' },
                { icon: Globe, text: 'Nessuna affiliazione broker' },
                { icon: Gift, text: '5 giorni gratis · 7 con referral' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: 'var(--accent)', opacity: 0.5 }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom vignette fade into next section */}
        <div className="valorox-vignette-bottom" />

      </section>

      {/* ─── Ticker Tape — between hero and content ─────── */}
      <div className="w-full overflow-hidden py-2"
        style={{ borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(20px)' }}
      >
        <div className="ticker-content gap-6">
          {(() => {
            const filtered = tickerItems.filter(item => {
              const isGold = item.symbol === 'XAU/USD'
              if (isGold) return true
              const p = item.price_str
              return p && p !== '—' && p !== '...' && p.trim() !== ''
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
            <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              La maggior parte delle perdite nel trading retail deriva dall&apos;interferenza emotiva, non dalla qualità della strategia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: TrendingUp, color: 'var(--accent)',
                title: 'Interferenza Emotiva',
                desc: 'Chiusure anticipate per timore, perdite lasciate correre. Le decisioni sotto pressione emotiva producono sistematicamente risultati inferiori al potenziale della strategia.',
              },
              {
                icon: Zap, color: 'var(--accent)',
                title: 'Comportamento Impulsivo',
                desc: 'Overtrading e inseguimento del mercato sono le cause più documentate di performance negative. Ogni operazione fuori dal piano introduce un edge negativo sul risultato.',
              },
              {
                icon: Activity, color: 'var(--accent)',
                title: 'Incostanza Operativa',
                desc: 'L\'edge statistico si manifesta su centinaia di operazioni coerenti. Una strategia modificata frequentemente non può esprimere il proprio potenziale.',
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
              style={{ color: 'var(--accent)' }}>
              Scopri come abbiamo risolto questo problema →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ──────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
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
                    <step.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <span className="text-4xl font-black font-mono" style={{ opacity: 0.08, color: 'var(--accent)' }}>{step.num}</span>
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Learning System ────────────────────────────── */}
      <section id="impara" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--surface-overlay)' }} />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mb-3">Corsi Gratuiti</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              Impara con i nostri corsi gratuiti.
            </h2>
            <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Un percorso strutturato dal metodo Smart Money all&apos;applicazione reale su XAU/USD.
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
                      {mod.free ? 'Gratuito' : 'Accesso'}
                    </span>
                  </div>
                  <span className="text-2xl font-black font-mono" style={{ opacity: 0.08, color: 'var(--accent)' }}>
                    {mod.num}
                  </span>
                </div>

                {/* Level badge */}
                <span className="self-start text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded mb-3"
                  style={{
                    background: mod.level === 'Principiante' ? 'rgba(0,230,118,0.1)' : mod.level === 'Avanzato' ? 'rgba(240,180,41,0.1)' : mod.level === 'Pratica' ? 'rgba(155,93,229,0.1)' : 'rgba(240,180,41,0.08)',
                    color: mod.level === 'Principiante' ? 'var(--green)' : 'var(--gold)',
                    border: `1px solid ${mod.level === 'Principiante' ? 'rgba(0,230,118,0.2)' : 'rgba(240,180,41,0.2)'}`,
                  }}>
                  {mod.level}
                </span>

                {/* Title & desc */}
                <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{mod.title}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{mod.desc}</p>

                {/* Topics */}
                <ul className="space-y-1.5 flex-1">
                  {mod.topics.map((t, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)', opacity: 0.5 }}>·</span>
                      {t}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {mod.lessons} lezioni
                  </span>
                  {mod.free
                    ? <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: 'var(--green)' }}>
                        <Play className="w-3 h-3" /> Inizia
                      </span>
                    : <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <Lock className="w-3 h-3" /> Sblocca
                      </span>
                  }
                </div>
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="text-center mt-10 space-y-3">
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Accedi a tutti gli 8 moduli, i primi 4 completamente gratuiti.
            </p>
            <Link href="/auth/register" className="btn-gold text-sm px-8 py-3 rounded-xl inline-flex">
              <GraduationCap className="w-4 h-4" />
              Inizia a imparare gratuitamente
              <ArrowRight className="w-4 h-4" />
            </Link>
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
                (() => {
                  const totalTrades = masterStats?.trades_total ?? 0
                  return [
                    {
                      label: 'Win Rate', icon: TrendingUp, color: 'var(--green)',
                      value: '79.0%',
                      sub: 'Media storica sistema',
                    },
                    {
                      label: 'Operazioni Master', icon: BarChart3, color: 'var(--accent)',
                      value: totalTrades > 0 ? String(totalTrades) : '312+',
                      sub: 'Eseguite sul conto master',
                    },
                  ]
                })().map((stat) => (
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
            <div className="section-label mb-3">Perché Valorox</div>
            <h2 className="text-3xl sm:text-4xl font-black text-gradient-white mb-4">
              Esperienza operativa.<br className="hidden sm:block" />Potenziata dall&apos;intelligenza artificiale.
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              L&apos;unione tra esperienza reale sui mercati, competenze di programmazione e intelligenza artificiale per creare un sistema con impatto concreto nel trading moderno.
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
                    <Star key={j} className="w-4 h-4" style={{ color: 'var(--accent)' }} fill="var(--accent)" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: 'var(--text-secondary)' }}>"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--accent-subtle)', border: '1px solid var(--border-accent)' }}>
                      <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{t.avatar}</span>
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
          <Link href="/auth/register" className="btn-primary text-base px-10 py-4 rounded-xl">
            Inizia Gratis — 5 Giorni
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ─── Theme Onboarding Modal ─────────────────────── */}
      <ThemeOnboardingModal />

      {/* ─── Footer ─────────────────────────────────────── */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/valoroxoro.svg" alt="Valorox" className="gold-avatar-ring" style={{ width: 34, height: 34 }} />
                <div>
                  <span className="font-bold text-gradient-gold" style={{ fontFamily: 'var(--font-brand)', letterSpacing: '0.12em' }}>Valorox</span>
                  <div className="text-[9px] tracking-widest uppercase mt-0.5" style={{ color: 'var(--text-muted)' }}>AI Solution</div>
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
                  { label: 'Chi Siamo', href: '/chi-siamo' },
                  { label: 'Come Funziona', href: '#how' },
                  { label: 'Performance', href: '#performance' },
                  { label: 'Termini di Servizio', href: '/legal/terms' },
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
              <h4 className="section-label mb-4">Supporto</h4>
              <div className="space-y-3">
                <a href="mailto:valoroxinfo@gmail.com" className="text-sm transition-opacity hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>valoroxinfo@gmail.com</a>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Lun–Ven, 9:00–18:00</p>
                <div className="mt-4 p-3 rounded-xl" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Tempo medio di risposta</p>
                  <p className="text-sm font-semibold mt-1" style={{ color: 'var(--accent)' }}>&lt; 2 ore</p>
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
              Valorox è un software SaaS di automazione. Non gestiamo fondi, non offriamo servizi di investimento né gestione patrimoniale.
              Tutte le decisioni operative e i parametri sono impostati direttamente dall'utente.
              Il trading comporta rischi reali di perdita del capitale. Nessun risultato è garantito.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              &copy; 2025 Valorox. Tutti i diritti riservati.
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
