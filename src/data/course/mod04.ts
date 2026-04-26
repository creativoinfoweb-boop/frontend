import type { Lesson } from './index'

export const mod04lessons: Lesson[] = [
  {
    id: '04-01', moduleId: '04', order: 1, title: 'La logica Top-Down: dal HTF al trigger', summary: 'Analizzare dal timeframe alto al basso per trovare il setup.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'Top-Down Analysis' },
      { type: 'paragraph', text: 'L\'analisi Top-Down parte dal timeframe più alto (H4/H1) per il bias direzionale, poi scende a M15 per il setup, poi a M1 per il trigger preciso.' },
      { type: 'list', items: ['H4/H1: bias — rialzista o ribassista? BOS? Dove sono i pool?', 'M15: struttura locale — dove si forma lo sweep? Dove è l\'OB?', 'M1: trigger — MSS di conferma → entry preciso'] },
      { type: 'example', title: 'Workflow', body: 'H1: trend rialzista con BOS. Pool SSL sotto il last HL. M15: prezzo scende verso il pool → sweep. M1: MSS rialzista → entry long.' },
      { type: 'callout', variant: 'success', text: 'HTF definisce DOVE entrare. LTF definisce QUANDO entrare. Non invertire l\'ordine.' }
    ],
    quiz: [
      { id: 'q1', question: 'Su quale timeframe determini il bias direzionale?', options: ['M1', 'M5', 'H1/H4', 'M15'], correctIndex: 2, explanation: 'H1/H4 dà il bias — la direzione principale in cui operare.' },
      { id: 'q2', question: 'Su quale timeframe cerchi il trigger d\'ingresso?', options: ['H4', 'H1', 'M15', 'M1'], correctIndex: 3, explanation: 'M1 = trigger MSS preciso con SL minimo.' },
      { id: 'q3', question: 'L\'analisi Top-Down scende in quale ordine?', options: ['M1 → H1 → H4', 'H4 → H1 → M15 → M1', 'M15 → M1 → H1', 'H1 → H4 → M1'], correctIndex: 1, explanation: 'Sempre dal timeframe alto al basso: H4 → H1 → M15 → M1.' }
    ]
  },
  {
    id: '04-02', moduleId: '04', order: 2, title: 'Identificare la zona di interesse su H1', summary: 'Come trovare l\'OB/FVG di riferimento sul timeframe operativo.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'Point of Interest (POI) su H1' },
      { type: 'paragraph', text: 'Il POI è la zona dove il prezzo probabilmente reagirà — OB H1, FVG H1, o la combinazione dei due. È il livello che guida l\'analisi.' },
      { type: 'list', items: ['Cerca l\'OB più recente non mitigato nella direzione del bias', 'FVG nella stessa zona rafforza il POI', 'Pool SSL/BSL vicino al POI aumenta la probabilità di sweep', 'POI deve essere sul lato giusto della struttura (HL in uptrend)'] },
      { type: 'callout', variant: 'warning', text: 'POI troppo distante (>100 pip) = R/R scadente. Aspetta un POI più vicino all\'azione corrente.' }
    ],
    quiz: [
      { id: 'q1', question: 'Cos\'è un POI?', options: ['Point of Interest — zona ad alta probabilità di reazione', 'Price of Investment', 'Pool of Indicators', 'Livello Fibonacci'], correctIndex: 0, explanation: 'POI = zona OB/FVG dove il prezzo probabilmente reagisce.' },
      { id: 'q2', question: 'Un OB già mitigato (visitato) è...?', options: ['Più potente', 'Meno potente', 'Uguale al non mitigato', 'Invalido'], correctIndex: 1, explanation: 'OB mitigato ha meno liquidità residua — preferisci quelli non ancora toccati.' },
      { id: 'q3', question: 'Un POI troppo distante causa...?', options: ['Setup perfetto', 'R/R scadente', 'Entry con SL stretto', 'Nessun problema'], correctIndex: 1, explanation: 'POI distante = SL largo o entry lontana = R/R basso. Aspetta.' }
    ]
  },
  {
    id: '04-03', moduleId: '04', order: 3, title: 'Il micro-pattern MSS su M1', summary: 'Il trigger definitivo che conferma l\'ingresso.', estimatedMinutes: 8,
    blocks: [
      { type: 'heading', text: 'MSS su M1 come trigger' },
      { type: 'paragraph', text: 'Quando il prezzo raggiunge il POI (OB/FVG H1), si scende a M1 e si aspetta un MSS nella direzione del bias. Questo è il trigger.' },
      { type: 'list', items: ['Prezzo tocca zona OB/FVG H1', 'Su M1: si forma una struttura micro (swing low e swing high)', 'Il prezzo rompe la micro-struttura nella direzione del bias → MSS', 'Candela MSS chiude → entry alla chiusura o retest'] },
      { type: 'example', title: 'Buy setup', body: 'H1 Bullish OB a 2380-2385. Prezzo arriva a 2382. M1: si forma mini swing: 2381 (low) → 2385 (high) → 2382. Break sopra 2385 (MSS rialzista) → entry long a 2385.' },
      { type: 'callout', variant: 'success', text: 'MSS su M1 dà SL di 5-15 pip invece di 30-50. Stessa probabilità, R/R molto migliore.' }
    ],
    quiz: [
      { id: 'q1', question: 'Cosa aspetti quando il prezzo tocca il POI?', options: ['Entry immediata', 'MSS su M1 nella direzione del bias', 'MSS su H1', 'Pattern candela'], correctIndex: 1, explanation: 'Non entrare sul POI direttamente — aspetta MSS su M1 per conferma.' },
      { id: 'q2', question: 'Perché il MSS su M1 migliora il R/R?', options: ['Non lo migliora', 'Permette SL più stretto rispetto all\'H1', 'Aumenta la probabilità', 'Riduce i costi'], correctIndex: 1, explanation: 'SL su M1: 5-15 pip. SL su H1: 30-50 pip. Stessa logica = R/R migliore.' },
      { id: 'q3', question: 'Dopo MSS su M1, entro...?', options: ['Alla chiusura della candela MSS', 'Al giorno dopo', 'A metà della candela MSS', 'Al prossimo HH'], correctIndex: 0, explanation: 'Entry alla chiusura della candela MSS — conferma che la struttura è cambiata.' }
    ]
  },
  {
    id: '04-04', moduleId: '04', order: 4, title: 'Entrata aggressiva vs conservativa', summary: 'Due stili di entry con risk/reward diversi.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'Entrata aggressiva' },
      { type: 'list', items: ['Entry: sulla chiusura della candela MSS (M1)', 'SL: 2-3 pip sotto/sopra il low/high dello sweep', 'Pro: R/R altissimo (1:5-1:10)', 'Contro: più spesso invalidato — richiede pratica'] },
      { type: 'heading', text: 'Entrata conservativa' },
      { type: 'list', items: ['Entry: al retest del 50% dell\'OB dopo il MSS', 'SL: sotto/sopra l\'intera zona OB', 'Pro: conferma maggiore — meno invalidazioni', 'Contro: R/R inferiore (1:2-1:4), a volte il retest non arriva'] },
      { type: 'callout', variant: 'info', text: 'Per chi inizia: inizia con entry conservativa. Con pratica e demo, passa all\'aggressiva.' }
    ],
    quiz: [
      { id: 'q1', question: 'L\'entry aggressiva avviene...?', options: ['Al retest del 50% OB', 'Alla chiusura della candela MSS', 'Al round number', 'Dopo 10 candele M1'], correctIndex: 1, explanation: 'Aggressiva = alla chiusura del MSS — SL strettissimo, R/R altissimo.' },
      { id: 'q2', question: 'L\'entry conservativa ha come vantaggio...?', options: ['R/R più alto', 'Meno invalidazioni grazie a maggiore conferma', 'SL più stretto', 'Più opportunità'], correctIndex: 1, explanation: 'Conservativa = aspetti il retest — più sicurezza, meno falsi segnali.' },
      { id: 'q3', question: 'Per un trader alle prime armi, quale entry consigliamo?', options: ['Aggressiva', 'Conservativa', 'Entrambe insieme', 'Nessuna delle due'], correctIndex: 1, explanation: 'Inizia conservativo — comprendi la logica prima di passare all\'aggressivo.' }
    ]
  },
  {
    id: '04-05', moduleId: '04', order: 5, title: 'Premium Zone e Discount Zone', summary: 'Il range di prezzo e dove comprare/vendere.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'Il concetto' },
      { type: 'paragraph', text: 'Ogni swing ha un range (dal suo low al suo high). Il 50% divide Premium (sopra) da Discount (sotto).' },
      { type: 'list', items: ['Discount Zone: sotto il 50% → zona d\'acquisto (valore)', 'Premium Zone: sopra il 50% → zona di vendita (caro)', 'Compra in Discount, vendi in Premium — mai al contrario', 'Equilibrium (EQ) = 50% del range = zona di rifornimento'] },
      { type: 'diagram', key: 'premium-discount', caption: 'Premium sopra 50%, Discount sotto 50%, EQ al centro.' },
      { type: 'callout', variant: 'success', text: 'Bullish OB in Discount Zone + SSL spazzato = setup altissima probabilità.' }
    ],
    quiz: [
      { id: 'q1', question: 'In Discount Zone conviene...?', options: ['Vendere', 'Comprare', 'Nessuna operazione', 'Dipende'], correctIndex: 1, explanation: 'Discount = sotto il 50% = prezzo "scontato" → zona d\'acquisto per gli istituzionali.' },
      { id: 'q2', question: 'Dove si trova l\'Equilibrium?', options: ['Al 30%', 'Al 50% del range', 'Al 70%', 'Al massimo del range'], correctIndex: 1, explanation: 'EQ = 50% del range — divide Premium da Discount.' },
      { id: 'q3', question: 'Bullish OB in Discount Zone è...?', options: ['Segnale debole', 'Alta probabilità — doppia confluenza', 'Da ignorare', 'Segnale neutro'], correctIndex: 1, explanation: 'OB in Discount = zona d\'acquisto istituzionale + valore → setup forte.' }
    ]
  },
  {
    id: '04-06', moduleId: '04', order: 6, title: 'Confluenza multi-timeframe', summary: 'Come sovrapporre segnali di più timeframe.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'La regola della confluenza' },
      { type: 'paragraph', text: 'Più segnali nello stesso punto di prezzo = probabilità più alta. La confluenza non garantisce il trade, ma migliora statisticamente l\'edge.' },
      { type: 'list', items: ['OB H1 + FVG M15 nella stessa zona = confluenza forte', 'Pool SSL vicino + Discount Zone = ulteriore conferma', 'Sessione Londra = timing favorevole', 'Bias HTF allineato = massima probabilità'] },
      { type: 'example', title: 'Setup 4-star', body: 'H1 bias rialzista. OB H1 a 2380. FVG M15 a 2381-2383. Pool SSL a 2378 (spazzato). Discount Zone (sotto EQ). London KZ. → Entry M1 MSS. 4 confluenze = massima qualità.' },
      { type: 'callout', variant: 'warning', text: 'Non operare con meno di 2-3 confluenze. Un solo segnale non è sufficiente.' }
    ],
    quiz: [
      { id: 'q1', question: 'Cosa sono le confluenze?', options: ['Indicatori che si allineano', 'Più segnali SMC nello stesso punto di prezzo', 'Pattern che si sovrappongono', 'Errori di analisi'], correctIndex: 1, explanation: 'Confluenza = OB + FVG + SSL spazzato + Discount nella stessa zona = alta probabilità.' },
      { id: 'q2', question: 'Con quante confluenze minime consigliamo di operare?', options: ['1', '2-3', '5', 'Sempre 4'], correctIndex: 1, explanation: 'Minimo 2-3 confluenze — sotto quella soglia il setup è di bassa qualità.' },
      { id: 'q3', question: 'Aggiungere la sessione Londra come confluenza serve perché...?', options: ['È obbligatorio', 'La liquidità e volatilità sono al massimo in quella sessione', 'Il broker ha spread bassi', 'Non aggiunge nulla'], correctIndex: 1, explanation: 'London KZ = massima liquidità istituzionale → setup più affidabili.' }
    ]
  },
  {
    id: '04-07', moduleId: '04', order: 7, title: 'Stop Loss strutturale', summary: 'Posizionare lo SL secondo la logica di mercato, non i pip fissi.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'SL strutturale vs SL fisso' },
      { type: 'paragraph', text: 'Lo SL strutturale si posiziona oltre il punto che invalida il setup — non a 20 pip fissi. Se il prezzo raggiunge quello punto, il setup è sbagliato.' },
      { type: 'list', items: ['Buy: SL 2-3 pip sotto il low dello sweep (fake move low)', 'Sell: SL 2-3 pip sopra l\'high dello sweep (fake move high)', 'Mai sotto round numbers o PDL/PDH ovvi', 'SL oltre la zona OB se usi entry conservativa'] },
      { type: 'callout', variant: 'warning', text: 'SL fisso (20 pip sempre) non funziona con SMC. La struttura varia — lo SL deve variare con essa.' },
      { type: 'example', title: 'SL buy', body: 'Entry long a 2383. Sweep SSL a 2379 (fake low). SL a 2377 (2 pip sotto il fake low). Se il prezzo scende a 2377 → il setup è invalidato. Rischio: 6 pip.' }
    ],
    quiz: [
      { id: 'q1', question: 'Dove si mette lo SL su un buy setup con sweep?', options: ['A 20 pip fissi', '2-3 pip sotto il fake move low', 'Al round number sotto', 'Alla media mobile'], correctIndex: 1, explanation: 'SL sotto il fake low — se il prezzo lo tocca, lo sweep era falso e il setup invalido.' },
      { id: 'q2', question: 'Perché evitare SL sui round numbers?', options: ['Non è importante', 'Sono pool ovvi — vengono cazziati dagli istituzionali', 'Aumentano lo spread', 'Sono troppo lontani'], correctIndex: 1, explanation: 'Round numbers = pool = gli istituzionali li raggiungono deliberatamente.' },
      { id: 'q3', question: 'Lo SL strutturale varia perché...?', options: ['Il broker lo cambia', 'La struttura di mercato varia — ogni sweep è diverso', 'È un errore usarlo', 'Dipende dall\'ora'], correctIndex: 1, explanation: 'Ogni setup ha un fake low/high diverso → lo SL si adatta alla struttura corrente.' }
    ]
  },
  {
    id: '04-08', moduleId: '04', order: 8, title: 'Riepilogo Modulo 04 + Quiz', summary: 'Consolida la tecnica di entry ad alto R/R.', estimatedMinutes: 10,
    blocks: [
      { type: 'heading', text: 'Hai imparato' },
      { type: 'list', items: ['Top-Down: H4→H1→M15→M1 per bias e trigger', 'POI: OB/FVG H1 nella direzione del bias', 'MSS M1: trigger preciso dopo che il prezzo tocca il POI', 'Entry aggressiva (MSS chiusura) vs conservativa (50% OB retest)', 'Premium/Discount: compra in Discount, vendi in Premium', 'Confluenza: 2-3+ segnali nella stessa zona', 'SL strutturale: sotto/sopra il fake move, non fisso'] },
      { type: 'callout', variant: 'success', text: 'Hai completato i 4 moduli free. Ora i moduli Premium: Risk Management, Gold Scalping, Il Sistema. 🔶' }
    ],
    quiz: [
      { id: 'q1', question: 'Qual è l\'ordine di analisi Top-Down?', options: ['M1 → H1 → H4', 'H4 → H1 → M15 → M1', 'H1 → M15 → M1', 'M15 → M1 → H1'], correctIndex: 1, explanation: 'H4 → H1 → M15 → M1: dal bias al trigger.' },
      { id: 'q2', question: 'Entry aggressiva vs conservativa: quale ha R/R più alto?', options: ['Conservativa', 'Aggressiva', 'Uguale', 'Dipende dal giorno'], correctIndex: 1, explanation: 'Aggressiva = SL strettissimo al MSS = R/R altissimo (1:5-1:10).' },
      { id: 'q3', question: 'In quale zona comprare con SMC?', options: ['Premium Zone', 'Discount Zone', 'Equilibrium', 'Ovunque'], correctIndex: 1, explanation: 'Compra in Discount (sotto 50% del range) — dove gli istituzionali accumulano.' },
      { id: 'q4', question: 'Quante confluenze minime per operare?', options: ['1', '2-3', '5+', 'Sempre 4'], correctIndex: 1, explanation: 'Minimo 2-3 confluenze — sotto quella soglia il setup è di scarsa qualità.' }
    ]
  }
]
