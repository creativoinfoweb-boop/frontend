import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Cookie, Shield, ToggleLeft, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy — Valorox',
  description: 'Informativa sui cookie utilizzati da valoroxai.com. Cookie tecnici necessari, sessione Clerk. Nessun cookie pubblicitario.',
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://valoroxai.com/legal/cookie-policy' },
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>

      {/* Gold top bar */}
      <div className="fixed top-0 w-full h-[2px] z-[60]"
        style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))' }} />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b"
        style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(24px)', borderColor: 'var(--border)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/"
            className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft className="w-4 h-4" />
            Torna alla Home
          </Link>
          <div className="flex-1" />
          <span className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)', color: 'var(--gold)' }}>
            Cookie
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
              <Cookie className="w-5 h-5" style={{ color: 'var(--gold)' }} />
            </div>
            <h1 className="text-3xl font-black">Cookie Policy</h1>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Ai sensi del Provvedimento Garante Privacy 8 maggio 2014 e Dir. 2009/136/CE — Ultimo aggiornamento: maggio 2026
          </p>
          <div className="rounded-xl p-4 text-sm leading-relaxed"
            style={{ background: 'rgba(0,201,107,0.04)', border: '1px solid rgba(0,201,107,0.12)', color: 'var(--text-secondary)' }}>
            <Shield className="w-4 h-4 inline mr-1.5 mb-0.5" style={{ color: 'var(--green)' }} />
            <strong style={{ color: 'var(--green)' }}>In breve:</strong> valoroxai.com usa solo cookie tecnici strettamente necessari.
            Nessun cookie pubblicitario, nessun tracker di terze parti.
          </div>
        </div>

        {/* 1 - Cosa sono */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>1</span>
            Cosa Sono i Cookie
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            I cookie sono piccoli file di testo che i siti web salvano nel tuo browser quando li visiti.
            Vengono utilizzati per far funzionare il sito (cookie tecnici), ricordare le tue preferenze
            o, in altri siti, per tracciare il comportamento pubblicitario. Valorox utilizza
            esclusivamente cookie tecnici necessari.
          </p>
        </section>

        {/* 2 - Cookie usati */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>2</span>
            Cookie Utilizzati da Valorox
          </h2>

          {/* Necessari */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(0,201,107,0.12)', color: 'var(--green)', border: '1px solid rgba(0,201,107,0.2)' }}>
                ✓ Sempre attivi
              </span>
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Cookie Tecnici Necessari</h3>
            </div>

            <div className="overflow-hidden rounded-xl border text-sm" style={{ borderColor: 'var(--border)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'var(--surface-2)' }}>
                    <th className="px-4 py-3 text-left font-bold w-1/3" style={{ color: 'var(--text-primary)' }}>Cookie</th>
                    <th className="px-4 py-3 text-left font-bold" style={{ color: 'var(--text-primary)' }}>Scopo</th>
                    <th className="px-4 py-3 text-left font-bold" style={{ color: 'var(--text-primary)' }}>Durata</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--text-secondary)' }}>
                  {[
                    ['__session, __client_uat', 'Sessione di autenticazione Clerk — necessario per il login alla dashboard.', 'Sessione / 1 anno'],
                    ['valorox-cookie-consent', 'Memorizza la tua scelta sul banner cookie (localStorage). Non è un cookie HTTP.', 'Permanente (locale)'],
                    ['valorox_*', 'Preferenze UI (tema, lingua) salvate in localStorage. Non vengono trasmesse al server.', 'Permanente (locale)'],
                  ].map(([name, scope, duration]) => (
                    <tr key={name} style={{ borderTop: '1px solid var(--border)' }}>
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--gold)' }}>{name}</td>
                      <td className="px-4 py-3">{scope}</td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap">{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Analitici / Marketing */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(240,61,95,0.1)', color: 'var(--red)', border: '1px solid rgba(240,61,95,0.2)' }}>
                ✗ Non utilizzati
              </span>
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Cookie Analitici e di Marketing</h3>
            </div>
            <div className="rounded-xl p-4 text-sm leading-relaxed"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              Valorox <strong style={{ color: 'var(--text-primary)' }}>non utilizza</strong> Google Analytics,
              Meta Pixel, strumenti di remarketing o qualsiasi altro tracker pubblicitario di terze parti.
              Non installiamo cookie di profilazione né vendiamo dati di navigazione.
            </div>
          </div>
        </section>

        {/* 3 - Gestione */}
        <section className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>3</span>
            Come Gestire o Disabilitare i Cookie
          </h2>
          <div className="text-sm leading-relaxed space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <div className="flex items-start gap-2">
              <ToggleLeft className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Dal banner cookie:</strong> al primo accesso compare un banner
                che ti permette di accettare o rifiutare i cookie non necessari. Poiché utilizziamo solo cookie
                tecnici, la scelta non influenza le funzionalità del sito.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <ToggleLeft className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Dal browser:</strong> puoi bloccare o eliminare tutti
                i cookie dalle impostazioni del browser. Tieni presente che disabilitare i cookie di sessione
                Clerk impedirà l&apos;accesso alla dashboard.
              </p>
            </div>

            <div className="rounded-xl p-4 space-y-2"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Guide per browser</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { name: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                  { name: 'Firefox', url: 'https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer' },
                  { name: 'Safari', url: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471' },
                  { name: 'Edge', url: 'https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge' },
                ].map(({ name, url }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center py-2 rounded-lg font-semibold transition-opacity hover:opacity-80"
                    style={{ background: 'rgba(240,180,41,0.08)', border: '1px solid rgba(240,180,41,0.15)', color: 'var(--gold)' }}>
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4 - Aggiornamenti */}
        <section className="space-y-3">
          <h2 className="text-xl font-black flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--gold)', color: '#0a0a14' }}>4</span>
            Aggiornamenti a questa Policy
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Questa Cookie Policy può essere aggiornata in caso di modifiche tecniche al sito o a seguito
            di nuove indicazioni normative. La data dell&apos;ultimo aggiornamento è sempre indicata in cima.
            In caso di modifiche significative, ti avviseremo via email.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-2xl p-6 space-y-3"
          style={{ background: 'rgba(240,180,41,0.04)', border: '1px solid rgba(240,180,41,0.15)' }}>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" style={{ color: 'var(--gold)' }} />
            <h3 className="font-bold">Domande sui Cookie?</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Per qualsiasi dubbio su questa Cookie Policy o sul trattamento dei tuoi dati, scrivici.
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
          <Link href="/legal/privacy" className="transition-opacity hover:opacity-80">Privacy Policy</Link>
        </div>

      </div>
    </div>
  )
}
