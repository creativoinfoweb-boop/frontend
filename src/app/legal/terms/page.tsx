import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termini di Servizio e Privacy — El Dorado',
  description: 'Termini di utilizzo, rischi del trading, funzionamento del sistema, capitale minimo, privacy policy e condizioni di abbonamento di El Dorado Copy Trading su XAU/USD.',
}
import { ArrowLeft, Shield, AlertTriangle, Lock, CreditCard, RefreshCw, FileText, Mail } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>

      {/* Gold top bar */}
      <div className="fixed top-0 w-full h-[2px] z-[60]"
        style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }} />

      {/* Nav minimal */}
      <nav className="sticky top-0 z-50 border-b"
        style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(24px)', borderColor: 'var(--border)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-secondary)' }}
          >
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

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        {/* Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
              <FileText className="w-5 h-5" style={{ color: 'var(--gold)' }} />
            </div>
            <h1 className="text-3xl font-black">Termini di Servizio &amp; Privacy</h1>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Ultimo aggiornamento: Aprile 2025 — Versione 1.0
          </p>
          <div className="rounded-xl p-4 text-sm leading-relaxed"
            style={{ background: 'rgba(240,180,41,0.05)', border: '1px solid rgba(240,180,41,0.15)', color: 'var(--text-secondary)' }}>
            Leggere questo documento è semplice e veloce. Ti spieghiamo chiaramente come funziona il servizio,
            cosa ci autorizzi a fare con le tue credenziali e quali rischi comporta il trading sui mercati finanziari.
            La trasparenza è un nostro valore fondamentale.
          </div>
        </div>

        {/* Sezione 1 - Chi siamo */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>1</span>
            Chi Siamo e Cosa Facciamo
          </h2>
          <div className="text-sm leading-relaxed space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>El Dorado</strong> è una piattaforma di trading automatizzato
              che esegue operazioni di acquisto e vendita su XAU/USD (oro) tramite conto MetaTrader 5 (MT5) collegato dall'utente.
              Il servizio è erogato interamente lato server: non è necessario installare alcun software, mantenere aperto
              il terminale MT5 o svolgere alcuna azione manuale.
            </p>
            <p>
              Il sistema utilizza strategie di trading proprietarie, testate su dati storici e operative
              su mercati reali. Le strategie operano esclusivamente su XAU/USD in finestre temporali definite,
              con un numero limitato di trade giornalieri e gestione integrata del rischio tramite stop loss e take profit.
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>El Dorado non è una società di gestione patrimoniale</strong>,
              un fondo di investimento, né un consulente finanziario. Il servizio si configura come un tool tecnologico
              di automazione del trading — la decisione finale di utilizzarlo e il rischio di capitale rimangono
              sempre e comunque in capo all'utente.
            </p>
          </div>
        </section>

        {/* Sezione 2 - Rischi del Trading */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>2</span>
            Rischi del Trading — Leggi con Attenzione
          </h2>
          <div className="rounded-xl p-5 space-y-3"
            style={{ background: 'rgba(255,61,113,0.05)', border: '1px solid rgba(255,61,113,0.2)' }}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#FF3D71' }} />
              <p className="text-sm font-bold" style={{ color: '#FF3D71' }}>Avvertenza sui Rischi Finanziari</p>
            </div>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <p>
                Il trading sui mercati finanziari, incluso l'oro (XAU/USD), comporta un <strong style={{ color: 'var(--text-primary)' }}>rischio
                reale di perdita del capitale</strong>. Le performance passate non garantiscono risultati futuri.
                Qualsiasi sistema automatizzato, per quanto testato e ottimizzato, può subire perdite — anche
                significative — in condizioni di mercato avverse, imprevedibili o anomale.
              </p>
              <p>
                Utilizzando El Dorado dichiari di essere consapevole che:
              </p>
              <ul className="space-y-1 pl-2">
                <li>• Il capitale investito nel conto MT5 collegato è a rischio</li>
                <li>• Non esiste garanzia di profitto — né implicita né esplicita</li>
                <li>• Le performance storiche mostrate in piattaforma sono indicative e non vincolanti</li>
                <li>• Condizioni di mercato straordinarie (es. gap di prezzo, notizie macro, illiquidità) possono amplificare le perdite</li>
                <li>• La leva finanziaria disponibile sui conti MT5 amplifica sia i guadagni che le perdite</li>
                <li>• Il rischio per operazione è configurato dall'utente e non può essere modificato dopo l'attivazione</li>
              </ul>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Ti consigliamo di iniziare con un conto demo</strong> per
                familiarizzare con il sistema prima di collegare un conto live. Non investire mai capitali che non
                puoi permetterti di perdere.
              </p>
            </div>
          </div>
        </section>

        {/* Sezione 3 - Funzionamento del Sistema e Rischio */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>3</span>
            Funzionamento del Sistema, Rischio e Capitale
          </h2>
          <div className="text-sm leading-relaxed space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <p>
              El Dorado si basa sulla <strong style={{ color: 'var(--text-primary)' }}>copia automatica delle operazioni</strong> eseguite
              su un conto master. Ogni trade viene replicato sul tuo conto con un lotto proporzionato al tuo capitale e alla
              percentuale di rischio che hai selezionato. Il sistema include:
            </p>
            <ul className="space-y-1.5 pl-2">
              <li>• Apertura delle posizioni con size proporzionale al capitale dell'utente</li>
              <li>• Gestione del rischio automatizzata con stop loss su ogni operazione</li>
              <li>• <strong style={{ color: 'var(--text-primary)' }}>Take profit progressivi e frazionati</strong>: la posizione viene chiusa gradualmente a diversi livelli di prezzo per massimizzare il rendimento</li>
              <li>• Spostamento dello stop loss a break-even dopo il raggiungimento del secondo target</li>
            </ul>
          </div>

          <div className="rounded-xl p-5 space-y-3"
            style={{ background: 'rgba(240,180,41,0.05)', border: '1px solid rgba(240,180,41,0.15)' }}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#F0B429' }} />
              <p className="text-sm font-bold" style={{ color: '#F0B429' }}>Rischio per Operazione e Capitale Minimo</p>
            </div>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <p>
                L'utente sceglie il livello di rischio per operazione tra <strong style={{ color: 'var(--text-primary)' }}>1% e 3%</strong> del
                capitale al momento della configurazione del conto:
              </p>
              <ul className="space-y-1 pl-2">
                <li>• <strong style={{ color: 'var(--text-primary)' }}>1% (Conservativo)</strong>: rischio minimo per trade. Richiede un capitale di almeno 3.000€ per il corretto funzionamento dei take profit frazionati.</li>
                <li>• <strong style={{ color: 'var(--text-primary)' }}>2% (Moderato)</strong>: buon compromesso rischio/rendimento. Capitale consigliato: almeno 2.000€.</li>
                <li>• <strong style={{ color: 'var(--text-primary)' }}>3% (Aggressivo)</strong>: rendimento potenziale più alto, ma rischio maggiore. Capitale consigliato: almeno 2.000€.</li>
              </ul>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Attenzione:</strong> se il capitale è troppo basso e/o la percentuale di rischio
                è troppo ridotta, il lotto risultante potrebbe essere pari a 0.01 (il minimo consentito). In questo caso:
              </p>
              <ul className="space-y-1 pl-2">
                <li>• Non è possibile frazionare correttamente le posizioni per i take profit progressivi</li>
                <li>• Il modello di rischio/rendimento risulta alterato rispetto al conto master</li>
                <li>• Il sistema non può replicare fedelmente la strategia operativa</li>
              </ul>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Esempio pratico:</strong> con un conto da 1.000€ e rischio dell'1%, la perdita
                massima per trade è 10€. Con uno stop loss di circa 10 pips su XAU/USD, la posizione risultante è di 0.01 lotti —
                il minimo possibile che non consente la suddivisione in più take profit.
              </p>
              <p>
                La responsabilità di disporre di un <strong style={{ color: 'var(--text-primary)' }}>capitale adeguato</strong> per il livello
                di rischio scelto è interamente dell'utente. El Dorado non può garantire il corretto funzionamento del sistema
                di take profit frazionati con capitali insufficienti.
              </p>
            </div>
          </div>
        </section>

        {/* Sezione 4 - Credenziali MT5 e Sicurezza */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>4</span>
            Credenziali MT5 e Sicurezza
          </h2>
          <div className="rounded-xl p-5 space-y-3"
            style={{ background: 'rgba(155,93,229,0.05)', border: '1px solid rgba(155,93,229,0.15)' }}>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" style={{ color: '#9B5DE5' }} />
              <p className="text-sm font-bold" style={{ color: '#C4A8FF' }}>Come trattiamo le tue credenziali</p>
            </div>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <p>
                Inserendo le credenziali del tuo conto MT5 (login, password di trading, server broker),
                autorizzi El Dorado a utilizzarle <strong style={{ color: 'var(--text-primary)' }}>esclusivamente per eseguire
                operazioni di trading</strong> sul tuo conto, nell'ambito del servizio sottoscritto.
              </p>
              <p>
                Le credenziali vengono protette con i seguenti standard di sicurezza:
              </p>
              <ul className="space-y-1 pl-2">
                <li>• Crittografia <strong style={{ color: 'var(--text-primary)' }}>Fernet AES-128</strong> prima del salvataggio nel database</li>
                <li>• Non vengono mai trasmesse o memorizzate in chiaro</li>
                <li>• Non vengono mai condivise con terze parti</li>
                <li>• Vengono decifrate solo dal server di esecuzione, esclusivamente per connettersi al broker</li>
                <li>• Puoi eliminarle in qualsiasi momento dalla dashboard — verranno rimosse permanentemente</li>
              </ul>
              <p>
                La <strong style={{ color: 'var(--text-primary)' }}>password investor</strong> (sola lettura) non funziona
                con il nostro sistema — è necessaria la password principale di trading. Questa autorizzazione
                ti viene chiesta in quanto è tecnicamente indispensabile per aprire e chiudere posizioni sul tuo conto.
              </p>
            </div>
          </div>
          <div className="rounded-xl p-4"
            style={{ background: 'rgba(0,230,118,0.04)', border: '1px solid rgba(0,230,118,0.12)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <Shield className="w-4 h-4 inline mr-1.5 mb-0.5" style={{ color: '#00E676' }} />
              <strong style={{ color: '#00E676' }}>Importante:</strong> El Dorado non può prelevare fondi dal tuo conto,
              né modificare la leva o trasferire capitali. L'accesso si limita esclusivamente all'apertura
              e chiusura di posizioni di trading su XAU/USD.
            </p>
          </div>
        </section>

        {/* Sezione 5 - Abbonamento e Pagamenti */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>5</span>
            Abbonamento e Pagamenti
          </h2>
          <div className="rounded-xl p-5"
            style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.12)' }}>
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-5 h-5" style={{ color: 'var(--gold)' }} />
              <p className="text-sm font-bold" style={{ color: 'var(--gold)' }}>Condizioni di Fatturazione</p>
            </div>
            <div className="text-sm leading-relaxed space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <p>
                Il servizio El Dorado è disponibile tramite abbonamento mensile o annuale. I pagamenti sono
                gestiti da <strong style={{ color: 'var(--text-primary)' }}>Stripe</strong>, provider certificato
                PCI-DSS. El Dorado non memorizza mai i dati della tua carta di credito.
              </p>
              <ul className="space-y-1 pl-2">
                <li>• <strong style={{ color: 'var(--text-primary)' }}>Trial gratuito di 7 giorni</strong>: nessun addebito. Al termine, se non cancelli, parte il piano mensile a €39/mese.</li>
                <li>• <strong style={{ color: 'var(--text-primary)' }}>Piano mensile</strong>: €39/mese per i primi 2 cicli di fatturazione, poi €79/mese con rinnovo automatico.</li>
                <li>• <strong style={{ color: 'var(--text-primary)' }}>Piano annuale</strong>: unica fatturazione anticipata, con sconto applicato sul prezzo mensile equivalente.</li>
                <li>• I prezzi sono in EUR, IVA inclusa ove applicabile.</li>
                <li>• Il rinnovo automatico può essere disattivato in qualsiasi momento dalla dashboard senza penali.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sezione 6 - Cancellazione e Rimborsi */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>6</span>
            Cancellazione e Rimborsi
          </h2>
          <div className="text-sm leading-relaxed space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <p>
              Puoi cancellare il tuo abbonamento in qualsiasi momento dalla sezione <em>Abbonamento</em> della dashboard.
              La cancellazione è immediata e senza penali. L'accesso al servizio rimane attivo fino alla fine
              del periodo già pagato.
            </p>
            <div className="rounded-xl p-4 space-y-2"
              style={{ background: 'rgba(0,230,118,0.04)', border: '1px solid rgba(0,230,118,0.12)' }}>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" style={{ color: '#00E676' }} />
                <p className="text-sm font-semibold" style={{ color: '#00E676' }}>Politica Rimborsi</p>
              </div>
              <p>
                El Dorado non offre rimborsi per periodi di abbonamento già pagati e utilizzati.
                Nel caso di problemi tecnici imputabili al nostro servizio (es. impossibilità di eseguire trade
                per un periodo prolungato), valutiamo caso per caso ogni richiesta inviata via email.
                Le perdite di trading non sono rimborsabili in quanto dipendenti dall'andamento dei mercati.
              </p>
            </div>
          </div>
        </section>

        {/* Sezione 7 - Limitazione di Responsabilità */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>7</span>
            Limitazione di Responsabilità
          </h2>
          <div className="text-sm leading-relaxed space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <p>
              El Dorado è uno strumento tecnologico di automazione. Nei limiti consentiti dalla legge applicabile:
            </p>
            <ul className="space-y-1.5 pl-2">
              <li>• El Dorado non è responsabile delle perdite subite sul conto MT5 dell'utente, derivanti dall'operatività del sistema o da eventi di mercato.</li>
              <li>• El Dorado non garantisce risultati positivi né profittabilità continua nel tempo.</li>
              <li>• El Dorado non è responsabile di interruzioni del servizio causate da malfunzionamenti del broker, del server MT5 o di infrastrutture terze.</li>
              <li>• El Dorado non è responsabile di perdite causate da credenziali MT5 errate inserite dall'utente.</li>
              <li>• L'utente è responsabile della scelta del broker, del livello di rischio impostato e della compatibilità del proprio conto con il servizio.</li>
            </ul>
            <p>
              Usare El Dorado implica accettare che il rischio finanziario è interamente in capo all'utente.
              Ti incoraggiamo a testare il servizio su conto demo prima di operare con fondi reali.
            </p>
          </div>
        </section>

        {/* Sezione 8 - Privacy e Dati Personali */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>8</span>
            Privacy e Dati Personali
          </h2>
          <div className="text-sm leading-relaxed space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <p>
              I dati personali raccolti (email, nome, dati di fatturazione Stripe) vengono utilizzati
              esclusivamente per erogare il servizio, inviare comunicazioni relative all'abbonamento e
              rispondere alle richieste di supporto.
            </p>
            <ul className="space-y-1.5 pl-2">
              <li>• Non vendiamo né cediamo i tuoi dati a terze parti per scopi commerciali.</li>
              <li>• I dati sono trattati nel rispetto del GDPR (Regolamento UE 2016/679).</li>
              <li>• Puoi richiedere in qualsiasi momento la cancellazione del tuo account e di tutti i dati associati.</li>
              <li>• Per richieste relative alla privacy, scrivi a: <strong style={{ color: 'var(--gold)' }}>support@eldorado.trade</strong></li>
            </ul>
            <p>
              Utilizziamo cookie tecnici strettamente necessari al funzionamento del sito. Non utilizziamo
              cookie di profilazione pubblicitaria di terze parti.
            </p>
          </div>
        </section>

        {/* Sezione 9 - Legge Applicabile */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>9</span>
            Legge Applicabile e Foro Competente
          </h2>
          <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia relativa al servizio,
              le parti tenteranno in primo luogo una risoluzione amichevole. In mancanza di accordo, il foro competente
              sarà quello del domicilio del consumatore, in conformità con la normativa vigente a tutela del consumatore.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-2xl p-6 space-y-3"
          style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.15)' }}>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" style={{ color: 'var(--gold)' }} />
            <h3 className="font-bold">Hai domande?</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Per qualsiasi domanda sui presenti termini, sulla tua privacy o sul funzionamento del servizio,
            contattaci via email. Rispondiamo normalmente entro 24 ore nei giorni lavorativi.
          </p>
          <a
            href="mailto:support@eldorado.trade"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: 'var(--gold)' }}
          >
            <Mail className="w-4 h-4" />
            support@eldorado.trade
          </a>
        </section>

        {/* Footer */}
        <div className="border-t pt-6 text-center text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
          <p>© 2025 El Dorado. Tutti i diritti riservati.</p>
          <p className="mt-1">Il trading comporta rischi. Non investire capitali che non puoi permetterti di perdere.</p>
          <Link href="/" className="mt-3 inline-block font-semibold transition-opacity hover:opacity-80" style={{ color: 'var(--gold)' }}>
            ← Torna alla Home
          </Link>
        </div>

      </div>
    </div>
  )
}
