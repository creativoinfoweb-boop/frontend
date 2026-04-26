import type { Lesson } from './index'

export const mod06lessons: Lesson[] = [
  {
    id: '06-01', moduleId: '06', order: 1, title: 'La Asia Session: marcare High e Low', summary: 'Come usare il range Asia come mappa per Londra.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'Il range Asia' },
      { type: 'paragraph', text: 'La sessione Asia (00:00-08:00 CET) crea un range stretto. Quel range diventa la mappa per il setup di Londra.' },
      { type: 'list', items: ['Asia High (AH): il massimo della sessione Asia', 'Asia Low (AL): il minimo della sessione Asia', 'AH = BSL (pool di stop sopra)', 'AL = SSL (pool di stop sotto)'] },
      { type: 'callout', variant: 'info', text: 'Alle 09:00 CET, marca AH e AL sul grafico. Questi sono i livelli da monitorare.' },
      { type: 'example', title: 'Procedura', body: 'Apri MT5 alle 09:00. Trova massimo e minimo tra 00:00-08:00. Disegna una linea orizzontale su AH e AL. Aspetta il setup Londra.' }
    ],
    quiz: [
      { id: 'q1', question: 'L\'Asia High rappresenta...?', options: ['SSL sotto i minimi', 'BSL sopra il massimo Asia', 'Livello di supporto', 'Nessun significato'], correctIndex: 1, explanation: 'AH = BSL. Gli stop dei trader short e i buy stop sono sopra quel livello.' },
      { id: 'q2', question: 'Quando marchi AH e AL?', options: ['Durante Asia', 'All\'apertura di Londra (09:00 CET)', 'A mercato aperto', 'Il giorno prima'], correctIndex: 1, explanation: 'Alle 09:00 CET: Asia è chiusa, marchi i livelli su cui monitorare il setup London.' },
      { id: 'q3', question: 'L\'Asia Low è...?', options: ['BSL', 'SSL', 'OB giornaliero', 'FVG'], correctIndex: 1, explanation: 'AL = SSL. Gli stop dei long e sell stop sono sotto quel livello.' }
    ]
  },
  {
    id: '06-02', moduleId: '06', order: 2, title: 'La London Kill Zone: sweep + MSS', summary: 'Il setup principale di tutto il metodo Gold Scalping.', estimatedMinutes: 10,
    blocks: [
      { type: 'heading', text: 'Il setup completo' },
      { type: 'list', items: ['09:00-12:00 CET: London Kill Zone', 'Step 1: prezzo scende verso AL (SSL) o sale verso AH (BSL)', 'Step 2: sweep del livello Asia con wick/chiusura oltre', 'Step 3: close della candela rientra nel range Asia', 'Step 4: su M1 si forma MSS nella direzione opposta allo sweep'] },
      { type: 'diagram', key: 'kill-zone', caption: 'Asia Range → Sweep → MSS M1 → Entry' },
      { type: 'example', title: 'Setup Buy completo', body: '1. AL a 2380. 2. 09:45: prezzo tocca 2378 (sweep SSL). 3. Candela chiude sopra 2380. 4. M1 MSS rialzista (close sopra micro swing high). 5. Entry long 2382, SL 2376, TP1 2388, TP2 2395.' },
      { type: 'callout', variant: 'success', text: 'Questo è il setup fondamentale. Tutto il resto del modulo mostra come gestirlo in dettaglio.' }
    ],
    quiz: [
      { id: 'q1', question: 'In quale finestra temporale cerchi il setup London?', options: ['07:00-09:00', '09:00-12:00', '12:00-14:00', '14:30-17:00'], correctIndex: 1, explanation: 'London Kill Zone = 09:00-12:00 CET — massima liquidità istituzionale.' },
      { id: 'q2', question: 'Dopo lo sweep di AL, mi aspetto...?', options: ['Continuazione ribassista', 'MSS rialzista su M1', 'Lateralizzazione', 'Altro sweep'], correctIndex: 1, explanation: 'Sweep AL (SSL) → istituzionali hanno comprato → MSS rialzista → entry long.' },
      { id: 'q3', question: 'Cosa conferma che lo sweep è valido?', options: ['Candela close dentro il range Asia dopo il breakout', 'Volume altissimo', 'RSI in ipervenduto', 'Pattern candela specifico'], correctIndex: 0, explanation: 'Sweep valido: wick oltre il livello, ma close rientra nel range — non un breakout vero.' }
    ]
  },
  {
    id: '06-03', moduleId: '06', order: 3, title: 'Checklist pre-trade', summary: 'I 10 controlli da fare prima di ogni operazione.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'La checklist' },
      { type: 'list', items: ['1. H1 bias confermato (BOS nella direzione)?', '2. Pool SSL/BSL identificato?', '3. Sweep del livello avvenuto?', '4. Close candela dentro range (non breakout vero)?', '5. MSS M1 confermato?', '6. Entro in London KZ (09:00-12:00)?', '7. No notizie ad alto impatto nei prossimi 30 min?', '8. SL posizionato sotto fake low (2+ pip)?', '9. Size calcolata con formula?', '10. Non ho già perso 3% oggi?'] },
      { type: 'callout', variant: 'warning', text: 'Almeno 8/10 voci verdi per procedere. Se hai dubbi su più di 2 voci → no trade.' }
    ],
    quiz: [
      { id: 'q1', question: 'Quante voci della checklist devono essere verdi?', options: ['5/10', '8/10', '10/10', '6/10'], correctIndex: 1, explanation: 'Almeno 8/10 voci soddisfatte. Sotto quella soglia → no trade.' },
      { id: 'q2', question: 'La checklist include il controllo sulle notizie?', options: ['No', 'Sì — NFP/FOMC/CPI nei 30 min successivi', 'Solo il NFP', 'Solo FOMC'], correctIndex: 1, explanation: 'Controllare sempre ForexFactory prima di aprire qualsiasi trade.' },
      { id: 'q3', question: 'Se la voce "MSS M1 confermato" è negativa...?', options: ['Entro lo stesso', 'Aspetto il MSS — non entro', 'Uso entry aggressiva', 'Abbasso la size'], correctIndex: 1, explanation: 'MSS è il trigger — senza MSS non c\'è setup. Aspetta o salta il trade.' }
    ]
  },
  {
    id: '06-04', moduleId: '06', order: 4, title: 'Gestione live della posizione', summary: 'Come gestire il trade aperto senza interferenze emotive.', estimatedMinutes: 8,
    blocks: [
      { type: 'heading', text: 'Piano di gestione' },
      { type: 'list', items: ['Apri trade, imposta SL e TP1/TP2 come ordini pending', 'Non stare davanti al grafico a guardare ogni pip', 'TP1 si chiude automaticamente — solo allora intervieni', 'Sposta SL manualmente a BE dopo TP1', 'Residuo: trailing SL ogni 10-15 pip a favore'] },
      { type: 'callout', variant: 'warning', text: 'La modifica dello SL in perdita è l\'errore numero uno. Piano rigido = risultati coerenti.' },
      { type: 'example', title: 'Workflow', body: '09:45 entry long 2382. 10:15 TP1 hit 2388 → 50% chiuso, SL → 2383. 11:00 prezzo a 2392 → trail SL a 2389. 11:30 prezzo torna a 2389 → residuo chiuso +10 pip.' }
    ],
    quiz: [
      { id: 'q1', question: 'Cosa NON devi fare dopo aver aperto il trade?', options: ['Impostare TP e SL', 'Allargare lo SL se il mercato va contro', 'Monitorare TP1', 'Calcolare la size'], correctIndex: 1, explanation: 'Allargare lo SL = non accettare la perdita = errore emotivo → perdita amplificata.' },
      { id: 'q2', question: 'Quando sposti lo SL a BE?', options: ['Subito', 'Solo dopo TP1 raggiunto', 'Dopo 30 minuti', 'Mai'], correctIndex: 1, explanation: 'BE solo dopo TP1 hit. Prima è prematuro.' },
      { id: 'q3', question: 'Il trailing SL serve a...?', options: ['Aumentare il rischio', 'Proteggere il gain mentre il trade corre', 'Chiudere prima il trade', 'Niente'], correctIndex: 1, explanation: 'Trailing SL segue il prezzo a favore → proteggi i guadagni senza chiudere tutto.' }
    ]
  },
  {
    id: '06-05', moduleId: '06', order: 5, title: 'Le 10 Regole del NO', summary: 'I 10 scenari in cui non si entra mai.', estimatedMinutes: 8,
    blocks: [
      { type: 'heading', text: 'Le 10 Regole' },
      { type: 'list', items: ['1. NO se il bias H1 non è chiaro', '2. NO senza sweep del livello Asia', '3. NO senza MSS su M1', '4. NO fuori dalla London KZ (09:00-12:00)', '5. NO 30 min prima/durante NFP/FOMC/CPI', '6. NO dopo 3% di perdita giornaliera', '7. NO dopo 2 perdite consecutive (pausa 1h)', '8. NO se OB è già mitigato (visitato 2+ volte)', '9. NO se il setup è fuori dalla Discount/Premium Zone corretta', '10. NO se stai guardando il mercato con stress o ansia'] },
      { type: 'callout', variant: 'warning', text: 'Queste regole non sono opzionali. Ogni violazione è documentata nei pattern di perdita più comuni.' }
    ],
    quiz: [
      { id: 'q1', question: 'Puoi operare fuori dalla London KZ?', options: ['Sì, sempre', 'No — è una delle 10 Regole del NO', 'Solo in NY', 'Solo con notizie'], correctIndex: 1, explanation: 'Regola 4: NO fuori dalla London KZ (09:00-12:00). NY solo per continuazioni già aperte.' },
      { id: 'q2', question: 'Entri se hai già 2 perdite consecutive?', options: ['Sì, per recuperare', 'No — pausa obbligatoria 1 ora', 'Solo se il setup è perfetto', 'Dipende'], correctIndex: 1, explanation: 'Regola 7: 2 perdite consecutive = pausa. Non sei in mindset corretto.' },
      { id: 'q3', question: 'OB visitato 2 volte è...?', options: ['Più forte', 'Mitigato — meno affidabile, no trade', 'Uguale al primo utilizzo', 'Da usare due volte'], correctIndex: 1, explanation: 'Regola 8: OB già visitato 2+ volte = liquidità esaurita = skip.' }
    ]
  },
  {
    id: '06-06', moduleId: '06', order: 6, title: 'Case Study 1: Setup Buy da manuale', summary: 'Analisi completa di un trade rialzista reale.', estimatedMinutes: 10,
    blocks: [
      { type: 'heading', text: 'Il trade' },
      { type: 'list', items: ['Data: sessione London tipo', 'H1 bias: rialzista (BOS sopra il precedente HH a 2390)', 'AL: 2380 (SSL)', 'Setup: prezzo scende a 2377 (sweep di AL)', 'Candela close: risale a 2382 (rientra nel range)', 'M1 MSS rialzista: break sopra 2385', 'Entry: 2385.50 (aggressiva alla chiusura MSS)', 'SL: 2376.80 (3 pip sotto fake low 2377)', 'TP1: 2394.50 (+9 pip), TP2: 2401'] },
      { type: 'example', title: 'Risultato', body: 'TP1 hit 10:15 → 50% chiuso, SL → 2386. TP2 hit 11:00. Trade totale: TP1 +4.5 pip (50%) + TP2 +7.75 pip (50%). R/R effettivo: 1.4R.' },
      { type: 'callout', variant: 'success', text: 'Checklist 10/10. Bias + sweep + MSS + London KZ + no notizie. Setup da manuale.' }
    ],
    quiz: [
      { id: 'q1', question: 'Nel case study, cos\'ha confermato il bias rialzista?', options: ['RSI sopra 50', 'BOS sopra il precedente HH su H1', 'Medie mobili', 'Volume alto'], correctIndex: 1, explanation: 'BOS H1 sopra HH = struttura rialzista confermata.' },
      { id: 'q2', question: 'Dove è stato posizionato lo SL?', options: ['A 20 pip fissi', 'Sopra l\'AH', '3 pip sotto il fake low dello sweep', 'Al round number'], correctIndex: 2, explanation: 'SL strutturale: 3 pip sotto il fake low (2377 → SL 2376.8).' },
      { id: 'q3', question: 'Quando è stato spostato lo SL a BE?', options: ['Subito dopo l\'entry', 'Dopo il TP1 hit', 'Dopo 1 ora', 'Manualmente ogni 5 pip'], correctIndex: 1, explanation: 'BE solo dopo TP1: chiudi 50%, sposta SL → entry + 1 pip.' }
    ]
  },
  {
    id: '06-07', moduleId: '06', order: 7, title: 'Case Study 2: Setup Sell con trappola', summary: 'Come identificare e gestire un setup ribassista da BSL sweep.', estimatedMinutes: 10,
    blocks: [
      { type: 'heading', text: 'Il trade Sell' },
      { type: 'list', items: ['H1 bias: ribassista (MSS sotto il precedente HL a 2395)', 'AH: 2410 (BSL)', 'Setup: prezzo sale a 2413 (sweep di AH)', 'Candela close: scende a 2408 (rientra nel range)', 'M1 MSS ribassista: break sotto 2405', 'Entry: 2404.50 (aggressiva alla chiusura MSS)', 'SL: 2414 (3 pip sopra fake high 2413)', 'TP1: 2395.50, TP2: 2388'] },
      { type: 'example', title: 'La trappola', body: 'Il retail vede AH a 2410 e pensa: "breakout rialzista, compro". Istituzionali vendono contro di loro. Sweep → MSS → inversione. Il retail prende SL. Lo Smart Money è in profitto.' },
      { type: 'callout', variant: 'warning', text: 'Non seguire il breakout visivo. Aspetta sempre la conferma dello sweep + MSS.' }
    ],
    quiz: [
      { id: 'q1', question: 'Nel sell setup, l\'Asia High era...?', options: ['Target di profitto', 'BSL — zona da spazzare prima di invertire', 'Entry point', 'Livello neutro'], correctIndex: 1, explanation: 'AH = BSL = zona di stop dei short. Spazzarla raccoglie la liquidità per la vendita.' },
      { id: 'q2', question: 'Dove è lo SL nel sell setup?', options: ['Sotto il fake low', '3 pip sopra il fake high dello sweep', 'Sopra AH', 'A 20 pip fissi'], correctIndex: 1, explanation: 'Sell: SL 3 pip sopra il fake high (2413 → SL 2414).' },
      { id: 'q3', question: 'Il retail nel case study ha perso perché...?', options: ['Ha usato SMC', 'Ha comprato il breakout BSL senza aspettare MSS', 'Ha operato in NY', 'Non ha usato stop loss'], correctIndex: 1, explanation: 'Retail = compra breakout → trappola. Smart Money = aspetta sweep + MSS → short.' }
    ]
  },
  {
    id: '06-08', moduleId: '06', order: 8, title: 'Riepilogo Modulo 06 + Quiz', summary: 'Consolida il Gold Scalping completo.', estimatedMinutes: 10,
    blocks: [
      { type: 'heading', text: 'Hai imparato' },
      { type: 'list', items: ['Asia: marca AH (BSL) e AL (SSL)', 'London KZ (09-12): aspetta sweep del livello Asia', 'Sweep: wick oltre + close dentro range = valido', 'MSS M1: trigger preciso', 'Gestione: TP1→BE→TP2→trailing', '10 Regole del NO: confini non negoziabili', 'Case study Buy: sweep SSL + MSS rialzista', 'Case study Sell: sweep BSL + MSS ribassista'] },
      { type: 'callout', variant: 'success', text: 'Ora conosci l\'intero setup Gold Scalping. Il prossimo modulo mostra come automatizzarlo con Il Sistema El Dorado.' }
    ],
    quiz: [
      { id: 'q1', question: 'L\'ordine del setup Gold Scalping è...?', options: ['MSS → Sweep → Entry', 'Sweep → MSS M1 → Entry', 'Entry → Sweep → MSS', 'MSS → Entry → Sweep'], correctIndex: 1, explanation: 'Prima sweep del livello, poi MSS su M1, poi entry.' },
      { id: 'q2', question: 'Un sweep valido ha...?', options: ['Close oltre il livello (breakout)', 'Wick oltre + close che rientra nel range', 'Solo volume alto', 'Pattern harami'], correctIndex: 1, explanation: 'Sweep = falso breakout. Wick oltre, close rientra → non è una rottura vera.' },
      { id: 'q3', question: 'Fuori dalla London KZ, cosa fai?', options: ['Cerchi setup in NY', 'Aspetti solo continuazioni già aperte — no nuove entry', 'Operi su M5', 'Operi su Gold Asia'], correctIndex: 1, explanation: 'Nessuna nuova entry fuori da London KZ. NY solo per gestire trade già aperti.' },
      { id: 'q4', question: 'Regola 10: "NO se stai guardando con ansia" significa...?', options: ['È esagerato', 'Lo stato emotivo è parte del risk management', 'Non è una regola vera', 'Vale solo in live'], correctIndex: 1, explanation: 'Stato mentale è parte integrante del risk management. Ansia = errori.' }
    ]
  }
]
