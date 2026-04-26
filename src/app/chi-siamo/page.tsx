import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, Shield, Brain, Zap,
  TrendingUp, AlertTriangle, Users, Bot, BookOpen,
  Target, GraduationCap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chi Siamo — El Dorado',
  description: 'Il team di trader e sviluppatori dietro El Dorado: origine del progetto, missione, tecnologia e approccio al trading automatizzato su XAU/USD.',
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3"
      style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)', color: 'var(--gold)' }}>
      {children}
    </span>
  )
}

export default function ChiSiamoPage() {
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
          <Link href="/metodo" className="text-sm transition-opacity hover:opacity-70 hidden sm:block"
            style={{ color: 'var(--text-muted)' }}>
            Il Metodo
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
              <Users className="w-7 h-7" style={{ color: 'var(--gold)' }} />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black">
            <span style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Chi Siamo
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Un team di trader professionisti ed esperti di tecnologia che ha trasformato un sistema di uso
            personale in una piattaforma accessibile a chiunque voglia automatizzare il proprio trading.
          </p>
        </div>

        {/* 01 Origine */}
        <section className="space-y-6">
          <SectionLabel>01 — L&apos;Origine</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">Nato per uso personale</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            El Dorado non nasce come prodotto commerciale. Nasce dall&apos;esigenza concreta di un gruppo di trader
            che, dopo anni di trading manuale su XAU/USD, si trovava ad affrontare sempre gli stessi ostacoli:
            emotività, incostanza esecutiva, impossibilità di essere operativi durante tutte le Kill Zone.
          </p>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            La soluzione era chiara: codificare il metodo che già usavano — Smart Money Concept applicato
            all&apos;oro — in un sistema automatizzato che eseguisse ogni regola con precisione algoritmica,
            senza mai deviare per paura, avidità o stanchezza.
          </p>

          <div className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.12)' }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(240,180,41,0.12)', border: '1px solid rgba(240,180,41,0.2)' }}>
                <span className="text-lg">💡</span>
              </div>
              <div>
                <p className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Il momento zero</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Dopo aver analizzato decine di trade manuali, il pattern era evidente: la strategia funzionava,
                  ma l&apos;esecuzione umana la sabotava sistematicamente. Stessa setup, risultati completamente
                  diversi a seconda del livello di concentrazione, stress o tempo disponibile del giorno.
                  La variabile era sempre l&apos;operatore, mai il metodo.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Fase 1', title: 'Trading manuale', desc: 'Anni di studio e applicazione manuale del metodo SMC su XAU/USD. Risultati promettenti, ma inconsistenti.' },
              { label: 'Fase 2', title: 'Automazione interna', desc: 'Sviluppo del primo prototipo per uso personale. Codifica delle regole operative in algoritmo. Test in demo e live.' },
              { label: 'Fase 3', title: 'Apertura al pubblico', desc: 'Dopo validazione su centinaia di operazioni reali, decisione di rendere il sistema accessibile a trader esterni.' },
            ].map((phase, i) => (
              <div key={i} className="card-premium p-5">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded mb-3 inline-block"
                  style={{ background: 'rgba(240,180,41,0.1)', color: 'var(--gold)', border: '1px solid rgba(240,180,41,0.2)' }}>
                  {phase.label}
                </span>
                <h3 className="font-bold mb-2 text-sm" style={{ color: 'var(--text-primary)' }}>{phase.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 02 Il Team */}
        <section className="space-y-6">
          <SectionLabel>02 — Il Team</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">Trader + Tecnologia</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Il team El Dorado è composto da due componenti complementari che lavorano in sinergia:
            l&apos;esperienza operativa sui mercati e le competenze tecniche per automatizzarla.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="card-premium p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
                <TrendingUp className="w-5 h-5" style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Trader Professionisti</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Anni di esperienza operativa su XAU/USD con approccio Smart Money. Conoscono il mercato dall&apos;interno
                — sweep di liquidità, dinamiche istituzionali, logica delle Kill Zone. Definiscono le regole operative
                del sistema e validano ogni setup prima che venga implementato.
              </p>
              <ul className="space-y-1.5">
                {['Specializzazione XAU/USD intraday', 'Metodo Smart Money + CRT', 'Validazione su mercato reale', 'Risk management strutturato'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--gold)' }}>·</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-premium p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)' }}>
                <Bot className="w-5 h-5" style={{ color: 'var(--green)' }} />
              </div>
              <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Esperti di AI e Tecnologia</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Sviluppatori con background in AI, sistemi automatizzati e infrastrutture cloud. Traducono le regole
                operative in algoritmi precisi, costruiscono la piattaforma SaaS e garantiscono affidabilità,
                sicurezza e scalabilità del sistema.
              </p>
              <ul className="space-y-1.5">
                {['Algoritmi di pattern recognition', 'Infrastruttura cloud 24/5', 'Sicurezza AES-128 per le credenziali', 'Dashboard real-time con statistiche'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--green)' }}>·</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 03 Missione */}
        <section className="space-y-6">
          <SectionLabel>03 — La Missione</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">Rendere accessibile il trading disciplinato</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            La nostra missione ha tre livelli: aiutare i principianti a evitare gli errori più costosi,
            supportare i trader esperti nell&apos;ottimizzazione della loro disciplina esecutiva, e ridurre
            l&apos;impatto della componente psicologica — la variabile più difficile da controllare nel trading.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: GraduationCap, color: 'var(--gold)',
                title: 'Trader Principianti',
                desc: 'Evitare gli errori classici che distruggono i conti nei primi anni: overtrading, revenge trading, size eccessiva, trading senza metodo. El Dorado fornisce struttura e disciplina automaticamente.',
              },
              {
                icon: Brain, color: 'var(--gold)',
                title: 'Trader Esperti',
                desc: 'Ottimizzare l\'esecuzione di chi già conosce il metodo. Eliminare le deviazioni emotive che ancora si presentano anche dopo anni di esperienza — il mercato è sempre capace di provocarle.',
              },
              {
                icon: Zap, color: 'var(--green)',
                title: 'Automatizzazione Totale',
                desc: 'Rendere la disciplina operativa accessibile anche a chi non può seguire il mercato in tempo reale. Il sistema lavora al posto tuo, con le tue regole, senza mai deviare.',
              },
            ].map((item, i) => (
              <div key={i} className="card-premium p-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `color-mix(in srgb, ${item.color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${item.color} 20%, transparent)` }}>
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <h3 className="font-bold mb-2 text-sm" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 04 AI + Trading */}
        <section className="space-y-6">
          <SectionLabel>04 — AI + Trading</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">Tecnologia al servizio del metodo</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Utilizziamo modelli avanzati di AI e sistemi automatizzati per portare la potenza del trading
            istituzionale a chiunque — eliminando la complessità tecnica che normalmente richiede anni di esperienza.
          </p>

          <div className="rounded-2xl p-6 space-y-5" style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.12)' }}>
            <p className="font-bold" style={{ color: 'var(--gold)' }}>Come usiamo l&apos;AI nel sistema</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Pattern Recognition', desc: 'Identificazione automatica di sweep di liquidità, Order Block, Fair Value Gap e pattern CRT su XAU/USD H1 in tempo reale.' },
                { title: 'Multi-Timeframe Analysis', desc: 'Analisi simultanea di H4/H1/M5/M1 per validare la confluenza dei setup prima di ogni entry.' },
                { title: 'Risk Engine', desc: 'Calcolo automatico della size basato sul capitale attuale, percentuale di rischio scelta e SL strutturale del setup.' },
                { title: 'Trade Management', desc: 'Gestione automatica del break even, take profit parziali e trailing stop secondo le regole del metodo.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: 'var(--gold)', opacity: 0.4, height: '40px' }} />
                  <div>
                    <p className="text-sm font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warning su AI */}
          <div className="rounded-xl p-5" style={{ background: 'rgba(255,140,0,0.05)', border: '1px solid rgba(255,140,0,0.2)' }}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#FF8C00' }} />
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: '#FF8C00' }}>L&apos;AI nel trading: potente, ma non infallibile</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Un sistema automatizzato configurato bene può essere estremamente efficace — ma configurato male
                  può generare perdite con la stessa efficienza. Per questo El Dorado richiede una configurazione
                  guidata, parametri di rischio vincolati, e percorso obbligatorio in demo prima di passare al live.
                  La tecnologia non sostituisce la comprensione — la amplifica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 05 L'Offerta */}
        <section className="space-y-6">
          <SectionLabel>05 — L&apos;Offerta</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black">Sistema pronto, zero complessità tecnica</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Niente server da gestire, niente Expert Advisor da installare, niente VPS da configurare.
            Il sistema funziona completamente in cloud — tu accedi, colleghi il conto, attivi.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Target, title: 'Registrati', desc: 'Crea il tuo account in 2 minuti. Nessuna carta richiesta per i 7 giorni di prova.' },
              { icon: Shield, title: 'Collega il conto MT5', desc: 'Inserisci le credenziali del tuo broker (password investor read-only, mai quella di trading).' },
              { icon: Bot, title: 'Attiva il sistema', desc: 'Scegli la percentuale di rischio (1–3%). Il sistema inizia a monitorare XAU/USD automaticamente.' },
              { icon: TrendingUp, title: 'Monitora dalla dashboard', desc: 'Ogni trade in tempo reale: entry, SL, TP, P/L, storico, statistiche, equity curve.' },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start card-premium p-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
                  <step.icon className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 text-center" style={{ background: 'rgba(255,61,113,0.04)', border: '1px solid rgba(255,61,113,0.15)' }}>
            <p className="text-xs leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              <strong style={{ color: '#FF6B6B' }}>Disclaimer.</strong>{' '}
              El Dorado è un software SaaS di automazione del trading. Non gestiamo fondi altrui, non offriamo
              consulenza finanziaria, non siamo un servizio di segnali. Il capitale rimane sempre sul conto
              del broker dell&apos;utente. Tutte le decisioni di rischio sono impostate e controllate dall&apos;utente.
              Il trading comporta rischi reali di perdita del capitale.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-3xl p-8 sm:p-12 text-center space-y-5"
          style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.15)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/eldorado.jpg" alt="El Dorado" className="gold-avatar-ring mx-auto" style={{ width: 64, height: 64 }} />
          <h2 className="text-3xl font-black">
            <span style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Unisciti al progetto
            </span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            7 giorni gratuiti. Inizia con un conto demo — zero rischio, sistema completo, dati reali.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/auth/register" className="btn-gold text-sm px-8 py-3 rounded-xl">
              Inizia 7 Giorni Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/metodo"
              className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-3 rounded-xl transition-all"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <BookOpen className="w-4 h-4" />
              Scopri il Metodo
            </Link>
          </div>
        </section>

      </div>

      {/* Footer minimal */}
      <footer className="py-8 px-4 text-center" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex flex-wrap gap-4 justify-center text-xs" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <Link href="/metodo" className="hover:opacity-70 transition-opacity">Metodo & Strategia</Link>
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
