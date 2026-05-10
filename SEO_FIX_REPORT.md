# Valorox AI — Report fix SEO

## Modifiche applicate al codice

- `src/app/layout.tsx`: corretto fallback dominio (`valorox.com` → `valoroxai.com`), aggiunti icons array completo (favicon.ico + icon-192/512), `manifest: '/site.webmanifest'`, `verification.google`, OG image `/og-image.png`, JSON-LD logo aggiornato a `icon-512.png`
- `src/app/sitemap.ts`: corretto fallback dominio
- `src/app/robots.ts`: corretto fallback dominio
- `src/app/favicon.ico`: nuovo file 16/32/48 multi-size, sfondo nero solido `#0a0a0a` con logo V oro
- `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png`: nuove icone con sfondo solido scuro
- `public/og-image.png`: nuovo banner 1200×630 per anteprime social (logo + titolo + sottotitolo)
- `public/site.webmanifest`: nuovo manifest PWA (sostituisce il precedente `app/manifest.ts`, rimosso)
- `public/google2f3368ce4bb147c3.html`: file di verifica Google Search Console
- `.env.production` (NON committato — gitignored): aggiunta `NEXT_PUBLIC_SITE_URL=https://valoroxai.com`
- `.env.example`: aggiunta variabile come riferimento
- `scripts/generate_seo_assets.py`: script Python per rigenerare gli asset (richiede Pillow)
- Pagine `chi-siamo`, `metodo`, `legal/terms`, `affiliati`, `auth`: metadata espanse (title/description/openGraph/keywords)

Build: `npm run build` ✅ passato — 33 pagine statiche generate.

## AZIONI MANUALI RICHIESTE — DA FARE TU

### A. Vercel (5 minuti)

1. Apri https://vercel.com → progetto Valorox
2. Settings → Environment Variables
3. Clicca **Add New**:
   - Key: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://valoroxai.com`
   - Environment: ✅ Production ✅ Preview ✅ Development
4. Deployments → ultima deploy → ⋯ menu → **Redeploy** (con "Use existing build cache" disabilitato)
5. Aspetta 2-3 minuti il completamento

### B. Merge della PR su GitHub (2 minuti)

1. Apri https://github.com/creativoinfoweb-boop/frontend/pulls
2. Vedrai il branch `seo/google-indexing-fix` → clicca **Compare & pull request**
3. Titolo: "fix(seo): Google indexing + favicon"
4. Clicca **Create pull request** → **Merge pull request**
5. Vercel deploya automaticamente da `main`

### C. Verifiche post-deploy (5 minuti)

Apri questi URL e verifica:

1. https://valoroxai.com/favicon.ico → deve scaricare/mostrare icona scura con V
2. https://valoroxai.com/site.webmanifest → deve mostrare il JSON
3. https://valoroxai.com/sitemap.xml → tutti gli URL devono iniziare con `https://valoroxai.com`
4. https://valoroxai.com/robots.txt → deve avere `Sitemap: https://valoroxai.com/sitemap.xml`
5. https://valoroxai.com/og-image.png → deve mostrare banner 1200×630
6. View source di https://valoroxai.com → cerca `<title>` e `og:image` — devono essere presenti

Strumenti utili di validazione:
- https://www.opengraph.xyz/url/https%3A%2F%2Fvaloroxai.com → vede l'OG image
- https://search.google.com/test/rich-results → testa il JSON-LD
- https://realfavicongenerator.net/favicon_checker → testa la favicon

### D. Google Search Console (10 minuti, da fare DOPO il deploy)

1. Apri https://search.google.com/search-console
2. Seleziona la proprietà `valoroxai.com`
3. **Sitemap**: se non l'hai già fatto, aggiungi `sitemap.xml` e clicca Invia
4. **Controllo URL** (barra in alto): incolla `https://valoroxai.com` → premi Enter
5. Clicca **Richiedi indicizzazione** (anche se è già indicizzato — forza re-crawl con nuovi metadata)
6. Ripeti il punto 4-5 anche per:
   - `https://valoroxai.com/metodo`
   - `https://valoroxai.com/chi-siamo`
   - `https://valoroxai.com/affiliati`

### E. Google Business Profile (opzionale, ma aiuta tantissimo)

Se hai una società registrata, crea un Google Business Profile su https://business.google.com — aiuta a far apparire il brand nelle ricerche con knowledge panel.

### F. Backlink iniziali (la cosa più importante per il posizionamento del brand)

Per "valoroxai" apparire al primo posto su Google quando viene cercato, Google deve vedere altre fonti che ne parlano. Crea questi profili con il link al sito:

1. **LinkedIn Company Page**: https://www.linkedin.com/company/setup/new/
2. **X (Twitter)**: account `@valoroxai` con bio + link
3. **Crunchbase**: https://www.crunchbase.com/add-new
4. **Product Hunt**: launch della piattaforma
5. **Trustpilot**: scheda business
6. **Instagram**: profilo aziendale

Ogni link da questi siti = segnale per Google che il brand esiste ed è legittimo.

## Tempistiche realistiche

| Risultato | Tempo |
|---|---|
| Sitemap re-letta da Google | 24-72 ore |
| Pagine re-indicizzate con nuovi metadata | 3-7 giorni |
| Brand "valoroxai" nei primi risultati | 1-3 settimane (richiede backlink) |
| Favicon visibile nei risultati di ricerca | 2-4 settimane |
| Knowledge panel a destra (con Business Profile) | 4-8 settimane |

Controllo settimanale: cerca `site:valoroxai.com` su Google e conta quante pagine sono indicizzate. Devono crescere fino a coprire tutta la sitemap.

## Se dopo 4 settimane non appare

1. Search Console → **Esperienza nelle pagine** → verifica Core Web Vitals OK
2. Search Console → **Pagine** → vedi se ci sono errori "noindex", "soft 404", "duplicate"
3. Esegui un audit con https://pagespeed.web.dev/?url=https://valoroxai.com → punteggio SEO deve essere ≥90
