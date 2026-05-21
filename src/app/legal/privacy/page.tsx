import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield, Database, Lock, Eye, Trash2, Mail, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy — Valorox',
  description: 'Informativa sul trattamento dei dati personali ai sensi del GDPR (Reg. UE 2016/679). Valorox AI Trading System.',
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://valoroxai.com/legal/privacy' },
}

export default function PrivacyPage() {
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
            GDPR
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
              <Shield className="w-5 h-5" style={{ color: 'var(--gold)' }} />
            </div>
            <h1 className="text-3xl font-black">Privacy Policy</h1>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Informativa ai sensi dell&apos;art. 13 del Reg. UE 2016/679 (GDPR) — Ultimo aggiornamento: maggio 2026
          </p>
          <div className="rounded-xl p-4 text-sm leading-relaxed"
            style={{ background: 'rgba(240,180,41,0.05)', border: '1px solid rgba(240,180,41,0.15)', color: 'var(--text-secondary)' }}>
            Questa informativa descrive come Valorox raccoglie, utilizza e protegge i tuoi dati personali.
            La trattiamo con la massima chiarezza e senza legalese inutile.
          </div>
        </div>

        {/* 1 - Titolare */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>1</span>
            Titolare del Trattamento
          </h2>
          <div className="rounded-xl p-5 space-y-2 text-sm leading-relaxed"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            <p><strong style={{ color: 'var(--text-primary)' }}>Denominazione:</strong>{' '}
              <span className="px-2 py-0.5 rounded text-xs font-mono"
                style={{ background: 'rgba(240,180,41,0.08)', color: 'var(--gold)' }}>
                [DA COMPILARE — Ragione Sociale]
              </span>
            </p>
            <p><strong style={{ color: 'var(--text-primary)' }}>P.IVA / C.F.:</strong>{' '}
              <span className="px-2 py-0.5 rounded text-xs font-mono"
                style={{ background: 'rgba(240,180,41,0.08)', color: 'var(--gold)' }}>
                [DA COMPILARE]
              </span>
            </p>
            <p><strong style={{ color: 'var(--text-primary)' }}>Sede legale:</strong>{' '}
              <span className="px-2 py-0.5 rounded text-xs font-mono"
                style={{ background: 'rgba(240,180,41,0.08)', color: 'var(--gold)' }}>
                [DA COMPILARE — Indirizzo completo]
              </span>
            </p>
            <p><strong style={{ color: 'var(--text-primary)' }}>Email privacy:</strong>{' '}
              <a href="mailto:valoroxinfo@gmail.com" className="transition-opacity hover:opacity-80"
                style={{ color: 'var(--gold)' }}>valoroxinfo@gmail.com</a>
            </p>
            <p><strong style={{ color: 'var(--text-primary)' }}>Sito web:</strong>{' '}
              <a href="https://valoroxai.com" target="_blank" rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80" style={{ color: 'var(--gold)' }}>valoroxai.com</a>
            </p>
          </div>
        </section>

        {/* 2 - Dati raccolti */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>2</span>
            Dati Personali Trattati
          </h2>
          <div className="text-sm leading-relaxed space-y-4" style={{ color: 'var(--text-secondary)' }}>
            <div className="rounded-xl p-5 space-y-3"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Dati forniti dall&apos;utente</p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                  <span><strong style={{ color: 'var(--text-primary)' }}>Dati di registrazione:</strong> indirizzo email e nome, gestiti tramite Clerk (autenticazione).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                  <span><strong style={{ color: 'var(--text-primary)' }}>Credenziali MT5:</strong> login numerico, password e server broker, cifrati con algoritmo Fernet AES-128 prima di essere salvati. Non sono mai leggibili in chiaro.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                  <span><strong style={{ color: 'var(--text-primary)' }}>Dati di pagamento:</strong> gestiti interamente da Stripe (PCI-DSS Level 1). Valorox non vede né memorizza dati della carta di credito.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl p-5 space-y-3"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Dati raccolti automaticamente</p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                  <span><strong style={{ color: 'var(--text-primary)' }}>Dati di navigazione:</strong> indirizzo IP, browser, pagine visitate — solo per sicurezza tecnica e debug, non per profilazione.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                  <span><strong style={{ color: 'var(--text-primary)' }}>Dati di trading:</strong> storico esecuzioni, profit/loss, equity — visibili solo all&apos;utente nella sua dashboard.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                  <span><strong style={{ color: 'var(--text-primary)' }}>Cookie tecnici:</strong> sessione Clerk (autenticazione). Nessun cookie pubblicitario. Vedi la nostra{' '}
                    <Link href="/legal/cookie-policy" className="transition-opacity hover:opacity-80" style={{ color: 'var(--gold)' }}>
                      Cookie Policy
                    </Link>.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3 - Finalità e Base giuridica */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>3</span>
            Finalità e Base Giuridica
          </h2>
          <div className="overflow-hidden rounded-xl border text-sm" style={{ borderColor: 'var(--border)' }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: 'var(--surface-2)' }}>
                  <th className="px-4 py-3 text-left font-bold" style={{ color: 'var(--text-primary)' }}>Finalità</th>
                  <th className="px-4 py-3 text-left font-bold" style={{ color: 'var(--text-primary)' }}>Base giuridica</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-secondary)' }}>
                {[
                  ['Erogazione del servizio di copy trading', 'Esecuzione del contratto (Art. 6.1.b GDPR)'],
                  ['Autenticazione e sicurezza account', 'Esecuzione del contratto (Art. 6.1.b GDPR)'],
                  ['Fatturazione e gestione abbonamento Stripe', 'Esecuzione del contratto + Obbligo legale (Art. 6.1.b/c GDPR)'],
                  ['Comunicazioni relative all\'abbonamento', 'Esecuzione del contratto (Art. 6.1.b GDPR)'],
                  ['Supporto clienti', 'Esecuzione del contratto (Art. 6.1.b GDPR)'],
                  ['Prevenzione frodi e sicurezza informatica', 'Legittimo interesse (Art. 6.1.f GDPR)'],
                ].map(([fin, base], i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                    <td className="px-4 py-3">{fin}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-muted)' }}>{base}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Non utilizziamo i tuoi dati per marketing, profilazione pubblicitaria o cessione a terzi.
          </p>
        </section>

        {/* 4 - Conservazione */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>4</span>
            Conservazione dei Dati
          </h2>
          <div className="text-sm leading-relaxed space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                <span><strong style={{ color: 'var(--text-primary)' }}>Dati account e trading:</strong> per tutta la durata dell&apos;abbonamento attivo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                <span><strong style={{ color: 'var(--text-primary)' }}>Dati di fatturazione:</strong> conservati per 10 anni ai sensi degli obblighi fiscali (D.P.R. 633/72).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                <span><strong style={{ color: 'var(--text-primary)' }}>Credenziali MT5:</strong> eliminate permanentemente entro 24h dalla cancellazione dell&apos;account.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                <span><strong style={{ color: 'var(--text-primary)' }}>Log tecnici:</strong> eliminati entro 30 giorni dalla raccolta.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 5 - Diritti */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>5</span>
            I Tuoi Diritti (GDPR Art. 15–22)
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              { icon: Eye, title: 'Accesso', desc: 'Puoi richiedere copia dei dati che tratteniamo su di te.' },
              { icon: FileText, title: 'Rettifica', desc: 'Puoi correggere dati inesatti o incompleti.' },
              { icon: Trash2, title: 'Cancellazione', desc: 'Puoi richiedere la cancellazione dei tuoi dati ("diritto all\'oblio").' },
              { icon: Lock, title: 'Portabilità', desc: 'Puoi ricevere i tuoi dati in formato strutturato e leggibile da macchina.' },
              { icon: Shield, title: 'Opposizione', desc: 'Puoi opporti al trattamento basato su legittimo interesse.' },
              { icon: Database, title: 'Limitazione', desc: 'Puoi richiedere la limitazione del trattamento in determinati casi.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl p-4 space-y-1.5"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                  <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{title}</p>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Per esercitare qualsiasi diritto, scrivi a{' '}
            <a href="mailto:valoroxinfo@gmail.com" className="transition-opacity hover:opacity-80"
              style={{ color: 'var(--gold)' }}>valoroxinfo@gmail.com</a>.
            Risponderemo entro 30 giorni. Hai anche il diritto di proporre reclamo al{' '}
            <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80" style={{ color: 'var(--gold)' }}>
              Garante per la protezione dei dati personali
            </a>.
          </p>
        </section>

        {/* 6 - Sicurezza */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>6</span>
            Sicurezza dei Dati
          </h2>
          <div className="rounded-xl p-5"
            style={{ background: 'rgba(0,201,107,0.04)', border: '1px solid rgba(0,201,107,0.12)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4" style={{ color: 'var(--green)' }} />
              <p className="text-sm font-bold" style={{ color: 'var(--green)' }}>Misure tecniche adottate</p>
            </div>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--green)' }} />
                <span>Comunicazioni cifrate tramite HTTPS / TLS 1.3 tra browser e server.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--green)' }} />
                <span>Credenziali MT5 cifrate con Fernet AES-128 — mai leggibili in chiaro dal database.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--green)' }} />
                <span>Autenticazione gestita da Clerk (SOC 2 Type II, GDPR-compliant).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--green)' }} />
                <span>Pagamenti gestiti da Stripe (PCI-DSS Level 1) — Valorox non vede i dati della carta.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--green)' }} />
                <span>Accesso al database limitato ai soli sistemi interni di esecuzione.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 7 - Terze parti */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>7</span>
            Terze Parti e Trasferimento Dati
          </h2>
          <div className="overflow-hidden rounded-xl border text-sm" style={{ borderColor: 'var(--border)' }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: 'var(--surface-2)' }}>
                  <th className="px-4 py-3 text-left font-bold" style={{ color: 'var(--text-primary)' }}>Fornitore</th>
                  <th className="px-4 py-3 text-left font-bold" style={{ color: 'var(--text-primary)' }}>Scopo</th>
                  <th className="px-4 py-3 text-left font-bold" style={{ color: 'var(--text-primary)' }}>Privacy</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-secondary)' }}>
                {[
                  ['Clerk', 'Autenticazione utenti', 'clerk.com/privacy'],
                  ['Stripe', 'Pagamenti e fatturazione', 'stripe.com/privacy'],
                  ['Vercel', 'Hosting frontend', 'vercel.com/legal/privacy'],
                ].map(([name, scope, privacy]) => (
                  <tr key={name} style={{ borderTop: '1px solid var(--border)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{name}</td>
                    <td className="px-4 py-3">{scope}</td>
                    <td className="px-4 py-3">
                      <a href={`https://${privacy}`} target="_blank" rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-80 text-xs" style={{ color: 'var(--gold)' }}>
                        {privacy}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Non vendiamo né cediamo i tuoi dati a terze parti per scopi pubblicitari o commerciali.
            I fornitori sopra elencati operano come responsabili del trattamento ai sensi del GDPR.
          </p>
        </section>

        {/* 8 - Cookie */}
        <section className="space-y-3">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>8</span>
            Cookie
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Utilizziamo esclusivamente cookie tecnici necessari al funzionamento del sito (sessione Clerk).
            Per i dettagli completi vedi la nostra{' '}
            <Link href="/legal/cookie-policy"
              className="font-semibold transition-opacity hover:opacity-80"
              style={{ color: 'var(--gold)' }}>
              Cookie Policy
            </Link>.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-2xl p-6 space-y-3"
          style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.15)' }}>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" style={{ color: 'var(--gold)' }} />
            <h3 className="font-bold">Contatto Privacy</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Per qualsiasi domanda su questa informativa o per esercitare i tuoi diritti GDPR,
            contattaci. Risponderemo entro 30 giorni lavorativi.
          </p>
          <a href="mailto:valoroxinfo@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: 'var(--gold)' }}>
            <Mail className="w-4 h-4" />
            valoroxinfo@gmail.com
          </a>
        </section>

        {/* Footer links */}
        <div className="border-t pt-6 flex flex-wrap justify-center gap-4 text-xs"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
          <Link href="/" className="transition-opacity hover:opacity-80" style={{ color: 'var(--gold)' }}>← Home</Link>
          <Link href="/legal/terms" className="transition-opacity hover:opacity-80">Termini di Servizio</Link>
          <Link href="/legal/cookie-policy" className="transition-opacity hover:opacity-80">Cookie Policy</Link>
        </div>

      </div>
    </div>
  )
}
