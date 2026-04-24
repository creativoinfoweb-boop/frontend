import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft, BookOpen, Shield, Brain, Clock, TrendingUp,
  AlertTriangle, Zap, Target, BarChart3, ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Metodo & Strategia — El Dorado',
  description: 'Comprendi le dinamiche di mercato, il risk management e il ruolo dell\'AI nella piattaforma El Dorado. Approccio educativo per una scelta consapevole.',
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
          <span className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)', color: 'var(--gold)' }}>
            El Dorado
          </span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* ── Hero ── */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
              <BookOpen className="w-6 h-6" style={{ color: 'var(--gold)' }} />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black">
            <span style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Metodo & Strategia
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Perché la maggior parte dei trader perde, come nasce questo sistema, come funziona il mercato,
            e perché la disciplina nell&apos;esecuzione vale più di qualsiasi strategia.
          </p>
          <div className="inline-block px-4 py-2 rounded-xl text-xs font-semibold"
            style={{ background: 'rgba(255,61,113,0.07)', border: '1px solid rgba(255,61,113,0.2)', color: '#FF6B6B' }}>
            Non forniamo consulenza finanziaria. Nessuna promessa di guadagno.
          </div>
        </div>

        {/* ── 0. Origine del Sistema ── */}
        <section className="space-y-6">
          <div>
            <SectionLabel>00 — Origine del Sistema</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Un sistema sviluppato per uso operativo interno</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              El Dorado nasce come strumento interno sviluppato per ottimizzare i processi operativi e ridurre
              le inefficienze legate alla gestione manuale delle strategie di trading su XAU/USD.
            </p>
            <p className="text-base leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>
              Nel trading esistono barriere ricorrenti e documentate che influenzano negativamente l&apos;esecuzione:
              interferenza emotiva, mancanza di disciplina operativa, gestione del rischio errata, incostanza
              nell&apos;applicazione del metodo. L&apos;obiettivo del sistema era ridurre queste variabili, aumentando
              la coerenza esecutiva attraverso regole predefinite e parametri strutturati.
            </p>
            <p className="text-base leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>
              Il sistema è stato validato su operatività reale nel tempo, ottimizzato iterativamente, e reso
              successivamente accessibile a trader che condividono lo stesso approccio disciplinato ai mercati.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <InfoCard title="Origine operativa" accent="gold">
              Il sistema nasce dall&apos;esigenza di ottimizzare un&apos;operatività reale su XAU/USD, non come
              prodotto commerciale. L&apos;approccio è strutturato attorno a regole operative definite e misurabili.
            </InfoCard>
            <InfoCard title="Validazione empirica" accent="gold">
              Prima di essere reso disponibile, il sistema è stato applicato e misurato su centinaia di operazioni
              reali. I parametri sono stati ottimizzati sulla base di dati storici verificabili.
            </InfoCard>
            <InfoCard title="Accesso esteso" accent="gold">
              Dopo la fase di validazione interna, il sistema è stato reso accessibile a trader che intendono
              applicare un approccio strutturato e disciplinato ai mercati finanziari.
            </InfoCard>
          </div>
        </section>

        {/* ── 1. Introduzione ── */}
        <section className="space-y-6">
          <div>
            <SectionLabel>01 — Il Problema Reale</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">L&apos;essere umano è il punto debole nell&apos;esecuzione</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              La maggior parte dei trader che perde non manca di una strategia. Manca di disciplina nell&apos;eseguirla.
              C&apos;è una differenza fondamentale tra <strong style={{ color: 'var(--text-primary)' }}>conoscere una strategia</strong> e{' '}
              <strong style={{ color: 'var(--text-primary)' }}>saperla eseguire correttamente</strong> in condizioni di mercato reali,
              sotto pressione emotiva, quando il conto è in perdita o quando il mercato si muove contro di te.
            </p>
            <p className="text-base leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>
              El Dorado è un software SaaS che automatizza l&apos;esecuzione dei parametri operativi da te definiti.
              Non è un servizio di investimento, non gestisce i tuoi fondi e non prende decisioni al posto tuo.
              Il suo valore sta nella <strong style={{ color: 'var(--text-primary)' }}>riduzione dell&apos;interferenza emotiva</strong>:
              il sistema applica esattamente il piano che hai configurato — senza paura, senza avidità, senza deviazioni.
            </p>
          </div>
          <InfoCard title="Principio fondamentale" accent="gold">
            Comprendi prima. Testa in demo. Poi decidi in piena autonomia se e come utilizzare la piattaforma
            con un conto reale. Nessuno ti spinge a farlo — e nessun risultato è garantito.
          </InfoCard>
        </section>

        {/* ── 1b. Perché i Trader Perdono ── */}
        <section className="space-y-6">
          <div>
            <SectionLabel>Psicologia & Execution</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Perché i trader perdono: psicologia &gt; tecnica</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Studi sul trading retail mostrano che la maggior parte delle perdite non deriva da strategie sbagliate —
              deriva dall&apos;incapacità di eseguire correttamente anche le strategie giuste. Ecco i comportamenti
              più comuni che distruggono i risultati:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Chiudere troppo presto', desc: 'Per timore di perdere un profitto già aperto, si esce prima del target. Il risultato statistico: profitti medi ridotti, perdita dei movimenti più significativi.' },
              { title: 'Lasciare correre le perdite', desc: 'La speranza di un recupero porta a non rispettare lo stop loss predefinito. Una perdita contenuta diventa rilevante. È l\'errore più frequente e più costoso in termini di capitale.' },
              { title: 'Overtrading', desc: 'Operare al di fuori delle condizioni pianificate — per recuperare perdite o per reazione al mercato. Ogni operazione non pianificata introduce un edge negativo atteso sul risultato finale.' },
              { title: 'Inseguire il mercato', desc: 'Entrare su un movimento già avviato produce slippage e timing sfavorevole. L\'impulsività nell\'esecuzione è strutturalmente penalizzante rispetto all\'applicazione disciplinata di un piano.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-5"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
                <p className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <InfoCard title="La differenza che cambia tutto" accent="gold">
            <strong style={{ color: 'var(--text-primary)' }}>Conoscere una strategia</strong> significa sapere
            teoricamente cosa fare. <strong style={{ color: 'var(--text-primary)' }}>Saperla eseguire</strong> significa
            farlo con coerenza anche quando il mercato è contro di te, anche dopo tre perdite consecutive, anche quando
            hai fretta o sei sotto pressione. Questo secondo livello è dove si vince o si perde — e l&apos;automazione
            disciplinata è lo strumento che riduce il gap tra i due.
          </InfoCard>
        </section>

        {/* ── 2. Concetti chiave ── */}
        <section className="space-y-6">
          <div>
            <SectionLabel>02 — Concetti Educativi</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Dinamiche di mercato: cosa devi sapere</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Comprendere queste dinamiche è fondamentale prima di utilizzare qualsiasi strumento di automazione.
              Non si tratta di "segreti" — sono principi che chiunque dovrebbe conoscere prima di operare.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Target,
                color: 'var(--gold)',
                title: 'Liquidità',
                desc: 'I mercati si muovono dove c\'è liquidità: livelli di prezzo dove si concentrano ordini di stop loss e take profit. Conoscere questi livelli aiuta a comprendere i movimenti apparentemente irrazionali.',
              },
              {
                icon: TrendingUp,
                color: 'var(--gold)',
                title: 'Movimenti Istituzionali',
                desc: 'Le banche e i grandi operatori muovono il mercato. I loro pattern sono ricorrenti e identificabili con l\'analisi — non prevedibili al 100%, ma comprensibili nel contesto.',
              },
              {
                icon: Clock,
                color: 'var(--green)',
                title: 'Sessioni di Mercato',
                desc: 'I mercati hanno orari distinti: la sessione di Londra (8:00–12:00 CET) e New York (14:00–17:00 CET) generano la maggior parte della volatilità e delle opportunità operative su XAU/USD.',
              },
              {
                icon: BarChart3,
                color: 'var(--gold)',
                title: 'Volatilità e Contesto',
                desc: 'La volatilità non è casuale: dipende da eventi macro, dati economici, sentiment. Operare nel contesto giusto — e astenersi in quello sbagliato — è parte essenziale della gestione del rischio.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-5"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, ${item.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${item.color} 25%, transparent)` }}>
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Approccio operativo ── */}
        <section className="space-y-6">
          <div>
            <SectionLabel>03 — Approccio Operativo</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Come vengono identificate le condizioni di mercato</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Questa sezione descrive le logiche operative a livello concettuale. Non si tratta di segnali
              né di indicazioni da seguire — è la spiegazione del framework analitico su cui è costruita la strategia.
            </p>
          </div>

          <div className="space-y-4">
            <InfoCard title="Analisi del contesto" accent="gold">
              Prima di ogni sessione operativa, il sistema verifica le condizioni di mercato: trend di breve periodo,
              livelli di supporto/resistenza significativi, eventi macroeconomici imminenti. In assenza di condizioni
              chiare, il sistema non opera. La qualità è sempre prioritaria sulla quantità.
            </InfoCard>
            <InfoCard title="Identificazione delle condizioni di entrata" accent="gold">
              Le condizioni di entrata sono basate su pattern di prezzo ricorrenti, movimenti di liquidità e
              confluenza di fattori tecnici. Ogni condizione deve rispettare criteri predefiniti — nessuna
              discrezionalità, nessuna intuizione. O i criteri sono soddisfatti, o non si opera.
            </InfoCard>
            <InfoCard title="Logica di uscita" accent="green">
              Le uscite seguono un modello a take profit multipli e progressivi: la posizione viene ridotta
              gradualmente a target predefiniti, con spostamento dello stop loss a break-even dopo il primo target.
              Questo protegge il capitale anche nelle operazioni parzialmente riuscite.
            </InfoCard>
          </div>
        </section>

        {/* ── 4. Risk Management ── */}
        <section className="space-y-6">
          <div>
            <SectionLabel>04 — Risk Management</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">La gestione del rischio è il pilastro di tutto</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Qualsiasi strategia, per quanto ben costruita, può perdere. Il risk management non è accessorio —
              è la componente più importante. Senza una gestione rigorosa del rischio, nessun metodo può
              sopravvivere nel lungo periodo.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(240,180,41,0.15)' }}>
            <div className="px-5 py-3 text-xs font-bold" style={{ background: 'rgba(240,180,41,0.08)', color: 'var(--gold)' }}>
              Parametri configurabili dall'utente
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {[
                { label: 'Rischio per operazione', value: '1% / 2% / 3% del capitale', note: 'Impostato dall\'utente' },
                { label: 'Stop Loss', value: 'Presente su ogni operazione', note: 'Automatico' },
                { label: 'Take Profit', value: 'Multipli e progressivi', note: 'TP1, TP2, TP3, TP4' },
                { label: 'Break-even', value: 'Attivato dopo TP2', note: 'Protezione automatica' },
                { label: 'Leva consigliata', value: '1:30 – 1:100', note: 'Dipende dal broker' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{row.label}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{row.note}</p>
                  </div>
                  <span className="text-sm font-semibold text-right" style={{ color: 'var(--gold)' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <InfoCard title="Rischio 1% — Conservativo" accent="gold">
              Perdita massima per operazione: 1% del capitale. Adatto a chi vuole crescita lenta e protezione
              del capitale. Capitale consigliato: min. 3.000€ per il corretto funzionamento dei TP multipli.
            </InfoCard>
            <InfoCard title="Rischio 2% — Moderato" accent="gold">
              Compromesso tra protezione e rendimento. Perdita max per operazione: 2%. Capitale consigliato:
              min. 2.000€. La scelta più comune per chi inizia con un conto reale dopo la fase demo.
            </InfoCard>
            <InfoCard title="Rischio 3% — Aggressivo" accent="gold">
              Rendimento potenziale maggiore ma drawdown più elevato. Non consigliato a chi non ha
              esperienza nella gestione delle perdite emotive. Solo per profili con alta tolleranza al rischio.
            </InfoCard>
          </div>

          <InfoCard title="Capitale insufficiente — cosa succede" accent="gold">
            Se il capitale è troppo basso rispetto al rischio impostato, il lotto risultante sarà 0.01
            (il minimo di mercato). In questo caso non è possibile frazionare la posizione per i TP multipli,
            il modello rischio/rendimento cambia e il sistema non replica fedelmente la strategia.
            Questo non è un errore — ma devi esserne consapevole.
          </InfoCard>

          <div className="rounded-2xl p-6 space-y-4"
            style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.15)' }}>
            <p className="font-bold" style={{ color: 'var(--gold)' }}>
              Perché alcuni parametri sono limitati volutamente
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              La piattaforma non ti permette di impostare rischi arbitrari, modificare la struttura degli stop loss
              o alterare la logica di gestione delle posizioni. Questa non è una limitazione tecnica — è una scelta
              progettuale deliberata.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Più libertà operativa = più opportunità di errori emotivi.</strong>{' '}
              Ogni parametro aggiuntivo che puoi modificare è un&apos;opportunità di prendere una decisione impulsiva
              nel momento sbagliato. Il range 1%-3% è già ampio: la struttura TP/SL/BE segue logiche strategiche
              precise che non devono essere alterate su base emotiva.
            </p>
            <div className="flex items-start gap-3 pt-2">
              <div className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
                style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)', color: 'var(--gold)' }}>
                Range consigliato
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>1%-2%</strong> per la maggior parte degli utenti.{' '}
                <strong style={{ color: 'var(--gold)' }}>3%</strong> è già considerato aggressivo — il drawdown emotivo
                diventa difficilmente gestibile sopra questa soglia. Inizia conservativo: è più facile aumentare il
                rischio quando capisci il sistema che ridurlo dopo una perdita importante.
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Psicologia ── */}
        <section className="space-y-6">
          <div>
            <SectionLabel>05 — Psicologia del Trading</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">L&apos;interferenza emotiva come variabile critica</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              La ricerca sul comportamento dei trader retail indica che la componente psicologica —
              interferenza emotiva, mancanza di disciplina, reazioni impulsive al mercato —
              rappresenta la principale causa di risultati negativi, indipendentemente dalla qualità della strategia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Brain, color: 'var(--gold)', title: 'Il Piano Prima di Tutto', desc: 'Una strategia applicata con coerenza al 70% produce risultati migliori di un\'ottima strategia applicata in modo incostante. La disciplina esecutiva è il fattore differenziale.' },
              { icon: Shield, color: 'var(--gold)', title: 'Decisioni a Mercato Chiuso', desc: 'Le regole operative devono essere definite prima che il mercato apra, in condizioni di lucidità. Modificare stop loss o target durante la sessione è una risposta emotiva, non strategica.' },
              { icon: AlertTriangle, color: 'var(--gold)', title: 'Il Drawdown è Fisiologico', desc: 'Qualsiasi sistema registra periodi negativi. La variabile rilevante non è l\'assenza di drawdown — è la presenza di un edge statistico positivo nel lungo periodo e la disciplina di mantenerlo.' },
              { icon: Target, color: 'var(--gold)', title: 'Coerenza Operativa', desc: 'Il valore di un metodo si misura su centinaia di operazioni, non su singoli trade. Valutare una strategia su 5 o 10 operazioni è statisticamente insufficiente e porta a decisioni errate.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-5"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, ${item.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${item.color} 25%, transparent)` }}>
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. Eliminazione Interferenza Emotiva ── */}
        <section className="space-y-6">
          <div>
            <SectionLabel>06 — Eliminazione dell&apos;Interferenza Emotiva</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Il sistema come barriera tra te e i tuoi errori</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Il sistema non sostituisce la tua intelligenza — elimina le tue reazioni emotive nell&apos;unico momento
              in cui contano davvero: l&apos;esecuzione. Tutti sanno cosa fare razionalmente. Pochissimi riescono
              a farlo coerentemente quando il mercato si muove contro di loro.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <InfoCard title="Esegue senza esitazioni" accent="gold">
              Il sistema apre, gestisce e chiude le posizioni esattamente come hai configurato,
              senza esitazioni, senza cambiare idea a metà strada, senza lasciarsi influenzare
              dall&apos;andamento momentaneo del mercato. La paura non entra nell&apos;equazione.
            </InfoCard>
            <InfoCard title="Libera dalla pressione continua" accent="gold">
              Non devi guardare il grafico ore e ore. Non devi prendere decisioni sotto pressione.
              Il sistema esegue il piano — tu monitori i risultati nel tempo e aggiusti i parametri
              a mercato chiuso, con lucidità, non sotto stress.
            </InfoCard>
            <InfoCard title="Basato su dati, non su intuizioni" accent="green">
              Il sistema non ha preferenze proprie. Esegue esattamente quello che hai impostato:
              rischio, orari, strumenti. Le decisioni sono prese in anticipo, con la mente fredda —
              non in reazione al mercato in tempo reale.
            </InfoCard>
          </div>

          <InfoCard title="Cosa il sistema non può fare" accent="gold">
            Il sistema non può prevedere il futuro, garantire profitti, eliminare il rischio di perdita
            o sostituire la comprensione del mercato. Un sistema applicato senza comprensione
            è pericoloso quanto operare manualmente senza un piano. Per questo l&apos;educazione viene prima.
          </InfoCard>
        </section>

        {/* ── 6b. Confronto con i Segnali ── */}
        <section className="space-y-6">
          <div>
            <SectionLabel>Confronto</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Perché non siamo un servizio di segnali</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I segnali di trading hanno un problema strutturale che pochi riconoscono: anche quando il segnale
              è corretto, il risultato dipende dall&apos;esecuzione umana. E l&apos;esecuzione umana è il punto debole.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 space-y-4"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Approccio basato su segnali — criticità strutturali</p>
              <ul className="space-y-3">
                {[
                  'Ritardo nell\'esecuzione: il trader entra dopo il segnale, con slippage e timing sfavorevole',
                  'Assenza di contesto: si riceve l\'azione operativa senza comprenderne la logica sottostante',
                  'Qualità non verificabile: l\'edge statistico del fornitore raramente è documentato e auditabile',
                  'Nessuna gestione del rischio integrata: stop loss e dimensionamento sono a carico dell\'utente',
                  'Esecuzione totalmente manuale: ogni operazione richiede intervento diretto e tempestivo',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }}>–</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs pt-2" style={{ color: 'var(--text-muted)' }}>
                Risultato: probabilità elevata di errore operativo anche in presenza di segnali corretti.
              </p>
            </div>

            <div className="rounded-2xl p-6 space-y-4"
              style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.18)' }}>
              <p className="font-bold text-sm" style={{ color: 'var(--gold)' }}>Approccio El Dorado — esecuzione disciplinata integrata</p>
              <ul className="space-y-3">
                {[
                  'Strategia completa: entrate, uscite, logica di gestione e contesto sono parte del sistema',
                  'Osservazione reale in demo disponibile prima di qualsiasi utilizzo su conto live',
                  'Esecuzione coerente su ogni operazione secondo parametri predefiniti, senza ritardi',
                  'Gestione integrata di stop loss, break-even e take profit multipli secondo logica strategica',
                  'Nessuna esecuzione manuale richiesta: il sistema applica il piano in modo autonomo',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs pt-2" style={{ color: 'var(--text-muted)' }}>
                Non forniamo segnali. Forniamo un sistema educativo e operativo integrato.
              </p>
            </div>
          </div>
        </section>

        {/* ── 7. Demo ── */}
        <section className="space-y-6">
          <div>
            <SectionLabel>07 — Inizia in Demo</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Il primo step consigliato</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Prima di collegare un conto reale, ti consigliamo fortemente di iniziare con un account demo.
              Un conto demo MT5 ha le stesse condizioni di mercato di un conto reale — prezzi in tempo reale,
              spread, slippage — senza rischio di perdita.
            </p>
          </div>

          <div className="rounded-2xl p-6 space-y-4"
            style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.18)' }}>
            <p className="font-bold" style={{ color: 'var(--green)' }}>
              Perché iniziare in demo è fondamentale
            </p>
            <ul className="space-y-3">
              {[
                'Osservi il comportamento reale del sistema senza rischiare capitale',
                'Verifichi se i parametri che hai scelto sono adeguati al tuo profilo',
                'Comprendi come reagisce il sistema in diversi contesti di mercato',
                'Sviluppi la disciplina di monitorare senza intervenire continuamente',
                'Prendi confidenza con la dashboard e le metriche di performance',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(0,230,118,0.12)', border: '1px solid rgba(0,230,118,0.25)' }}>
                    <span className="text-[10px] font-bold" style={{ color: 'var(--green)' }}>{i + 1}</span>
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Disclaimer finale ── */}
        <section className="rounded-2xl p-6 space-y-3"
          style={{ background: 'rgba(255,61,113,0.04)', border: '1px solid rgba(255,61,113,0.15)' }}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#FF3D71' }} />
            <p className="font-bold text-sm" style={{ color: '#FF3D71' }}>Avvertenza Legale</p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            El Dorado è esclusivamente un software SaaS di automazione. <strong style={{ color: 'var(--text-primary)' }}>Non forniamo consulenza finanziaria</strong>,
            servizi di investimento, gestione patrimoniale né segnali di trading. Le informazioni in questa pagina
            hanno scopo puramente educativo e non costituiscono consiglio di investimento.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Il trading sui mercati finanziari comporta <strong style={{ color: '#FF3D71' }}>rischio reale di perdita del capitale</strong>.
            Le performance storiche non garantiscono risultati futuri. Ogni utente è responsabile delle proprie
            decisioni operative e dei parametri impostati nella piattaforma.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Ti incoraggiamo a leggere integralmente i{' '}
            <Link href="/legal/terms" className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: 'var(--gold)' }}>
              Termini di Servizio
            </Link>{' '}
            e a iniziare con un account demo prima di qualsiasi utilizzo con capitale reale.
          </p>
        </section>

        {/* ── CTA ── */}
        <div className="text-center space-y-4 pb-8">
          <h3 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
            Hai capito come funziona?
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Inizia con 7 giorni gratuiti. Nessuna carta richiesta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register"
              className="inline-flex items-center justify-center gap-2 font-black text-sm px-8 py-4 rounded-xl"
              style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', color: '#0a0a14' }}>
              <Zap className="w-4 h-4" />
              Inizia 7 Giorni Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/legal/terms"
              className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-xl"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              Leggi i Termini di Servizio
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
