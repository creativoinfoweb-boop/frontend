import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft, Shield, Brain, Clock,
  AlertTriangle, Zap, Target, BarChart3, ArrowRight,
  Bot, GraduationCap, CheckCircle2, XCircle, Activity,
  BookOpen,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Metodo & Strategia — El Dorado',
  description: 'Come funziona il sistema El Dorado: metodo Smart Money, strategia Gold Scalping, automazione AI e risk management strutturato su XAU/USD.',
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3"
      style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)', color: 'var(--gold)' }}>
      {children}
    </span>
  )
}

function InfoCard({ title, children, accent = 'gold' }: { title: string; children: React.ReactNode; accent?: 'gold' | 'green' | 'red' | 'blue' }) {
  const colors = {
    gold: { bg: 'rgba(240,180,41,0.05)', border: 'rgba(240,180,41,0.18)', title: 'var(--gold)' },
    green: { bg: 'rgba(0,230,118,0.05)', border: 'rgba(0,230,118,0.18)', title: 'var(--green)' },
    red: { bg: 'rgba(255,61,113,0.05)', border: 'rgba(255,61,113,0.18)', title: '#FF3D71' },
    blue: { bg: 'rgba(0,194,255,0.05)', border: 'rgba(0,194,255,0.18)', title: '#00C2FF' },
  }
  const c = colors[accent]
  return (
    <div className="rounded-xl p-5" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <p className="text-sm font-bold mb-2" style={{ color: c.title }}>{title}</p>
      <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{children}</div>
    </div>
  )
}

export default function MetodoPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>

      {/* Gold top rule */}
      <div className="fixed top-0 w-full h-[2px] z-[60]"
        style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }} />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b"
        style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(24px)', borderColor: 'var(--border)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft className="w-4 h-4" />
            Torna alla Home
          </Link>
          <div className="flex-1" />
          <Link href="/chi-siamo" className="text-sm transition-opacity hover:opacity-70 hidden sm:block"
            style={{ color: 'var(--text-muted)' }}>
            Chi Siamo
          </Link>
          <Link href="/auth/register" className="btn-gold text-xs px-4 py-2">
            Inizia Gratis
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-20">

        {/* Hero */}
        <div className="text-center space-y-5">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
              <Bot className="w-7 h-7" style={{ color: 'var(--gold)' }} />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black">
            <span style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Metodo, Strategia<br />e Automazione
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Come funziona il Sistema El Dorado: il metodo Smart Money che sta alla base,
            la strategia Gold Scalping su XAU/USD, e come l&apos;AI esegue tutto automaticamente — senza che tu debba fare nulla durante i trade.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
            style={{ background: 'rgba(255,61,113,0.07)', border: '1px solid rgba(255,61,113,0.2)', color: '#FF6B6B' }}>
            <AlertTriangle className="w-3.5 h-3.5" />
            Non forniamo consulenza finanziaria. Il trading comporta rischi reali.
          </div>
        </div>

        {/* Quick nav */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: '01 Perché fallisce il retail', href: '#problema' },
            { label: '02 Il Metodo SMC', href: '#metodo' },
            { label: '03 La Strategia', href: '#strategia' },
            { label: '04 Come Funziona l\'AI', href: '#automazione' },
            { label: '05 Risk Management', href: '#risk' },
            { label: '06 Inizia in Demo', href: '#demo' },
          ].map(l => (
            <a key={l.href} href={l.href}
              className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* 01 Il problema */}
        <section id="problema" className="space-y-6 scroll-mt-20">
          <SectionLabel>01 — Il Problema</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">Perché il 90% dei trader retail perde</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Non è la strategia il problema. La ricerca sul trading retail indica sistematicamente che la causa
            principale delle perdite è l&apos;interferenza emotiva nell&apos;esecuzione — non la qualità dell&apos;approccio.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Brain, title: 'Interferenza Emotiva', desc: 'Chiusure anticipate per paura, perdite tenute aperte in attesa di recupero. Ogni decisione sotto pressione emotiva produce risultati inferiori al potenziale della strategia.' },
              { icon: Zap, title: 'Overtrading Impulsivo', desc: 'Inseguire il mercato fuori dal piano. Ogni operazione extra introduce un edge atteso negativo. La disciplina nel non entrare è tanto importante quanto entrare.' },
              { icon: Activity, title: 'Incostanza Esecutiva', desc: 'Un metodo modificato ad ogni perdita non può esprimere il proprio edge statistico. Il vantaggio emerge su centinaia di operazioni coerenti, non su singoli trade.' },
            ].map((item, i) => (
              <div key={i} className="card-premium p-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
                  <item.icon className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                </div>
                <h3 className="font-bold mb-2 text-sm" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <InfoCard title="La Soluzione" accent="green">
            L&apos;unico modo per eliminare l&apos;interferenza emotiva è rimuovere il fattore umano dall&apos;esecuzione.
            Non delegare le decisioni — delegare l&apos;esecuzione di decisioni già prese, basate su regole precise e testate.
            Questo è esattamente ciò che fa il Sistema El Dorado.
          </InfoCard>
        </section>

        {/* 02 Il Metodo SMC */}
        <section id="metodo" className="space-y-6 scroll-mt-20">
          <SectionLabel>02 — Il Metodo</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">Smart Money Concept (SMC)</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Il mercato non è caotico. È mosso da grandi operatori istituzionali — banche, hedge fund, market maker —
            che creano dinamiche prevedibili per raccogliere liquidità prima di muoversi nella vera direzione.
            Il metodo SMC insegna a leggere queste dinamiche.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard title="Liquidità (BSL / SSL)" accent="gold">
              Gli istituzionali hanno bisogno di controparte per riempire posizioni enormi. Gli stop loss dei retail
              sopra i massimi (BSL) e sotto i minimi (SSL) sono esattamente quella controparte. Il mercato si muove
              deliberatamente verso quei livelli prima di invertire.
            </InfoCard>
            <InfoCard title="Liquidity Sweep" accent="gold">
              Un falso breakout sopra/sotto un livello significativo. Il prezzo buca il livello, raccoglie gli stop
              dei retail, poi si inverte con forza nella direzione opposta. È il meccanismo principale che usiamo
              per identificare i setup validi.
            </InfoCard>
            <InfoCard title="BOS e MSS" accent="blue">
              <strong style={{ color: 'var(--text-primary)' }}>Break of Structure (BOS)</strong>: conferma la continuazione del trend.{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Market Structure Shift (MSS)</strong>: segnala il cambio di direzione — il prezzo inverte rompendo la struttura precedente dopo uno sweep. Il MSS è il trigger di entry.
            </InfoCard>
            <InfoCard title="Order Block e FVG" accent="blue">
              <strong style={{ color: 'var(--text-primary)' }}>Order Block</strong>: l&apos;ultima candela ribassista prima di un forte movimento rialzista — zona dove gli istituzionali hanno piazzato ordini.{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Fair Value Gap</strong>: squilibrio di prezzo tra tre candele — il mercato tende a tornare a colmare questi gap.
            </InfoCard>
          </div>

          <div className="rounded-2xl p-5" style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.12)' }}>
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--gold)' }}>Vuoi approfondire il metodo SMC?</p>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
              Il nostro corso include 8 moduli completi — dai fondamentali del mercato fino all&apos;applicazione pratica
              su XAU/USD e il modello CRT. I primi 4 moduli (44 lezioni) sono completamente gratuiti.
            </p>
            <Link href="/dashboard/learn" className="inline-flex items-center gap-2 text-xs font-bold transition-opacity hover:opacity-70"
              style={{ color: 'var(--gold)' }}>
              <GraduationCap className="w-3.5 h-3.5" />
              Accedi al Corso Gratuito →
            </Link>
          </div>
        </section>

        {/* 03 La Strategia */}
        <section id="strategia" className="space-y-6 scroll-mt-20">
          <SectionLabel>03 — La Strategia</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">Gold Scalping su XAU/USD</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Il Sistema El Dorado applica una strategia di scalping intraday sull&apos;oro (XAU/USD) focalizzata
            sulla sessione di Londra — la finestra di massima liquidità istituzionale. Ogni operazione segue
            una logica precisa e ripetibile.
          </p>

          <div className="space-y-3">
            {[
              { num: '01', title: 'Fase Asia — Marca il Range', desc: 'Durante la sessione asiatica (00:00–08:00 CET) il mercato si muove in un range stretto. Il Sistema identifica l\'Asia High (AH) e l\'Asia Low (AL) — questi diventano i livelli di riferimento per Londra.' },
              { num: '02', title: 'London Kill Zone — Sweep + MSS', desc: 'Tra le 09:00 e le 12:00 CET il mercato istituzionale attacca il range Asia. Il Sistema attende uno sweep sopra AH o sotto AL (raccolta di liquidità), seguito da un MSS su M1 che conferma l\'inversione. Questo è il setup di entry.' },
              { num: '03', title: 'Entry su Order Block o FVG', desc: 'L\'entry viene perfezionata su un Order Block o Fair Value Gap H1, confermata dalla micro-struttura su M1/M5. Stop Loss posizionato sotto/sopra il punto di sweep. Take Profit frazionato: 50% a TP1, 30% a TP2, 20% residuo.' },
              { num: '04', title: 'Break Even Automatico', desc: 'Al raggiungimento di TP1, il Sistema chiude il 50% della posizione e sposta automaticamente lo SL al prezzo di entry (break even). Il trade residuo diventa a rischio zero — non può chiudersi in perdita.' },
            ].map((step, i) => (
              <div key={i} className="card-premium p-6 flex gap-5">
                <span className="text-3xl font-black font-mono flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)', opacity: 0.2 }}>{step.num}</span>
                <div>
                  <h3 className="font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard title="CRT — Candle Range Theory" accent="blue">
              Ogni candela H1 è un range completo. Il Sistema identifica sweep del CRT-High (BSL) o CRT-Low (SSL)
              seguiti da inversione — il modello AMD (Accumulation → Manipulation → Distribution) applicato al
              singolo range per setup ad alta precisione.
            </InfoCard>
            <InfoCard title="Filtri di Qualità" accent="green">
              Nessun trade durante NFP, FOMC, CPI (±30 min). Nessun trade contro il trend H4. Setup invalido se
              la candela di manipolazione chiude oltre il livello. Qualità prima di quantità.
            </InfoCard>
          </div>
        </section>

        {/* 04 Come funziona l'AI */}
        <section id="automazione" className="space-y-6 scroll-mt-20">
          <SectionLabel>04 — Automazione</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">Il Sistema Automatizzato</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Il Sistema El Dorado non è un bot generico. È l&apos;implementazione algoritmica precisa della strategia
            Gold Scalping SMC — ogni regola che hai visto sopra è codificata e viene eseguita automaticamente,
            24/5, senza che tu debba fare nulla durante i trade.
          </p>

          <div className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.15)' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--gold)' }}>Come funziona concretamente</p>
            <div className="space-y-3">
              {[
                { step: '1', text: 'Ti registri e colleghi le credenziali del tuo conto MT5 (password investor read-only, cifrata AES-128)' },
                { step: '2', text: 'Configuri il rischio per operazione (1–3% del capitale) e attivi il sistema' },
                { step: '3', text: 'Il Sistema monitora XAU/USD 24/5 cercando i setup: marcatura Asia range, attesa Kill Zone, identificazione sweep + MSS' },
                { step: '4', text: 'Quando un setup valido si forma, apre la posizione con entry precisa, SL strutturale, TP1/TP2/residuo già configurati' },
                { step: '5', text: 'Gestisce il trade in autonomia: BE automatico a TP1, scala le posizioni, chiude tutto secondo il piano' },
                { step: '6', text: 'Tutto è visibile in tempo reale dalla tua dashboard: trade aperti, storico, equity curve, statistiche' },
              ].map(({ step, text }) => (
                <div key={step} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black mt-0.5"
                    style={{ background: 'rgba(240,180,41,0.15)', color: 'var(--gold)' }}>{step}</span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Bot, title: 'Nessun software da installare', desc: 'Tutto gira in cloud. MT5 non deve essere aperto sul tuo PC.' },
              { icon: Clock, title: 'Operativo 24/5', desc: 'Non perdi nessuna Kill Zone anche quando sei offline o dormi.' },
              { icon: Shield, title: 'Controllo totale', desc: 'Puoi disconnettere il conto in qualsiasi momento. Il capitale è sempre sul tuo broker.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="card-premium p-5 text-center">
                <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--gold)' }} />
                <p className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{title}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Manuale vs automatizzato */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid grid-cols-2">
              <div className="p-5" style={{ borderRight: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-4 h-4" style={{ color: '#FF3D71' }} />
                  <p className="text-sm font-bold" style={{ color: '#FF3D71' }}>Trading Manuale</p>
                </div>
                <ul className="space-y-2">
                  {['Devi essere presente alla Kill Zone', 'Emotività influenza ogni decisione', 'Esecuzione inconsistente tra trade', 'Stanchezza = errori', 'Vacanze = mancati setup'].map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: '#FF3D71' }}>—</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--green)' }} />
                  <p className="text-sm font-bold" style={{ color: 'var(--green)' }}>Sistema El Dorado</p>
                </div>
                <ul className="space-y-2">
                  {['Opera in automatico, anche mentre dormi', 'Zero emotività — pura logica algoritmica', 'Stessa identica logica su ogni trade', '100% disciplina in ogni condizione', 'Continua durante le tue vacanze'].map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--green)' }}>✓</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 05 Risk Management */}
        <section id="risk" className="space-y-6 scroll-mt-20">
          <SectionLabel>05 — Risk Management</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">Le Regole che Proteggono il Capitale</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Il risk management non è opzionale. È la parte più importante del sistema — più della strategia stessa.
            Senza queste regole, nessun edge statistico sopravvive nel lungo periodo.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard title="1–3% per operazione" accent="gold">
              Il Sistema rischia al massimo il 3% del capitale per singolo trade. La percentuale è scelta dall&apos;utente.
              Anche 10 perdite consecutive non distruggono il conto — la sopravvivenza viene prima di tutto.
            </InfoCard>
            <InfoCard title="Kill Switch Giornaliero 3%" accent="red">
              Se in un giorno si perdono 3 operazioni (3% cumulato), il sistema si ferma automaticamente fino
              al giorno successivo. Nessun revenge trading, nessuna catena di perdite amplificate.
            </InfoCard>
            <InfoCard title="Stop Loss Strutturale" accent="gold">
              Lo SL è posizionato sotto il punto di sweep (liquidity grab). Se il prezzo torna lì, il setup è
              invalido per definizione. Non si tratta di pip fissi ma di logica di mercato.
            </InfoCard>
            <InfoCard title="TP Frazionati 50 / 30 / 20" accent="green">
              TP1 chiude il 50% → SL al break even. TP2 chiude il 30% al prossimo POI. Il 20% residuo cavalca
              il trend con trailing SL. Massimizza il gain sui vincenti, protegge il capitale sui perdenti.
            </InfoCard>
          </div>

          <div className="rounded-xl p-5 text-center" style={{ background: 'rgba(255,61,113,0.04)', border: '1px solid rgba(255,61,113,0.15)' }}>
            <AlertTriangle className="w-5 h-5 mx-auto mb-2" style={{ color: '#FF6B6B' }} />
            <p className="text-xs leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              <strong style={{ color: '#FF6B6B' }}>Rischio reale.</strong>{' '}
              Il trading sui mercati finanziari comporta rischio concreto di perdita del capitale.
              Il risk management riduce il rischio ma non lo elimina. Le performance passate non garantiscono risultati futuri.
              Inizia sempre con un conto demo. Non investire denaro che non puoi permetterti di perdere.
            </p>
          </div>
        </section>

        {/* 06 Demo */}
        <section id="demo" className="space-y-6 scroll-mt-20">
          <SectionLabel>06 — Inizia in Demo</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">Il percorso consigliato</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Non devi rischiare un solo euro per vedere il sistema in azione. Collega un conto demo MT5 del tuo broker
            e osserva ogni trade in condizioni reali di mercato — stesso spread, stessa volatilità, zero rischio.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { num: '01', icon: GraduationCap, title: 'Studia il Metodo', desc: 'Completa i moduli gratuiti del corso. Capisci le dinamiche SMC, la logica delle sessioni, il risk management.' },
              { num: '02', icon: Target, title: 'Collegati in Demo', desc: 'Apri un conto demo su Exness, IC Markets o Pepperstone. Inserisci le credenziali nella dashboard. Il sistema parte subito.' },
              { num: '03', icon: BarChart3, title: 'Poi Decidi', desc: 'Dopo 50+ trade in demo, analizza le statistiche. Se WR ≥55%, PF ≥1.5, DD ≤15%, valuta autonomamente il passaggio al live.' },
            ].map((step, i) => (
              <div key={i} className="card-premium p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
                    <step.icon className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                  </div>
                  <span className="text-3xl font-black font-mono" style={{ opacity: 0.1, color: 'var(--gold)' }}>{step.num}</span>
                </div>
                <h3 className="font-bold mb-2 text-sm" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-3xl p-8 sm:p-12 text-center space-y-5"
          style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.15)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/eldorado.jpg" alt="El Dorado" className="gold-avatar-ring mx-auto" style={{ width: 64, height: 64 }} />
          <h2 className="text-3xl font-black">
            <span style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Pronto ad automatizzare?
            </span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            7 giorni gratuiti. Nessuna carta richiesta. Inizia con un conto demo e vedi il sistema in azione.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/auth/register" className="btn-gold text-sm px-8 py-3 rounded-xl">
              Inizia 7 Giorni Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/dashboard/learn"
              className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-3 rounded-xl transition-all"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <BookOpen className="w-4 h-4" />
              Impara con il corso gratuito
            </Link>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Non gestiamo fondi. Il capitale rimane sempre sul tuo broker.
          </p>
        </section>

      </div>

      {/* Footer minimal */}
      <footer className="py-8 px-4 text-center" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex flex-wrap gap-4 justify-center text-xs" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <Link href="/chi-siamo" className="hover:opacity-70 transition-opacity">Chi Siamo</Link>
          <Link href="/dashboard/learn" className="hover:opacity-70 transition-opacity">Corso Gratuito</Link>
          <Link href="/auth/register" className="hover:opacity-70 transition-opacity">Registrati</Link>
          <Link href="/legal/terms" className="hover:opacity-70 transition-opacity">Termini</Link>
        </div>
        <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
          © 2025 El Dorado · Non forniamo consulenza finanziaria · Il trading comporta rischi
        </p>
      </footer>
    </div>
  )
}
