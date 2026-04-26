import type { Lesson } from './index'

export const mod02lessons: Lesson[] = [
  {
    id: '02-01', moduleId: '02', order: 1, title: 'Chi muove davvero il mercato', summary: 'Gli attori istituzionali e il loro peso.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'I veri player del mercato' },
      { type: 'paragraph', text: 'Il mercato forex e XAU/USD è dominato da pochi grandi player: banche centrali, hedge fund, market maker e grandi istituzioni. Questi muovono volumi che il retail non può nemmeno immaginare.' },
      { type: 'list', items: ['Banche centrali: Fed, ECB — decisioni macro', 'Market maker: creano liquidità, ricavano spread', 'Hedge fund: grandi posizioni direzionali', 'Retail trader: < 5% del volume totale'] },
      { type: 'callout', variant: 'warning', text: 'Il retail non muove il mercato. Lo segue — o viene usato come liquidità.' },
      { type: 'example', title: 'Esempio', body: 'Un hedge fund deve comprare 10.000 lotti XAU. Non può entrare tutti insieme — spingerebbe il prezzo su. Usa strategie per raccogliere la propria posizione mentre i retail si sbagliano.' },
      { type: 'heading', text: 'Punti chiave' },
      { type: 'list', items: ['Gli istituzionali dominano il mercato', 'Il retail è spesso il "controparte" di queste posizioni', 'Capire cosa cercano gli istituzionali è l\'edge vero'] }
    ],
    quiz: [
      { id: 'q1', question: 'Che percentuale del volume è retail?', options: ['50%', '30%', '< 5%', '20%'], correctIndex: 2, explanation: 'Il retail trader vale meno del 5% del volume totale di mercato.' },
      { id: 'q2', question: 'Cosa sono i market maker?', options: ['Trader retail con molta esperienza', 'Istituzioni che creano liquidità e ricavano spread', 'Banche centrali', 'Hedge fund aggressivi'], correctIndex: 1, explanation: 'I market maker creano il mercato — offrono bid e ask, guadagnano sullo spread.' },
      { id: 'q3', question: 'Perché un hedge fund non entra tutto insieme?', options: ['Non ha abbastanza capitale', 'Spingerebbe il prezzo contro di sé', 'È illegale', 'Non sa quando entrare'], correctIndex: 1, explanation: 'Un ordine enorme muoverebbe il prezzo sfavorevolmente — gli istituzionali entrano in fasi.' }
    ]
  },
  {
    id: '02-02', moduleId: '02', order: 2, title: 'Retail vs Istituzionale', summary: 'Perché il retail perde e gli istituzionali vincono sistematicamente.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'Due mondi a confronto' },
      { type: 'list', items: ['Retail: compra ai massimi, vende ai minimi (emotività)', 'Istituzionale: accumula in silenzio, distribuisce sui breakout falsi', 'Retail: usa indicatori lagging (RSI, MACD, medie mobili)', 'Istituzionale: opera su flusso di ordini e liquidità'] },
      { type: 'example', title: 'Scenario classico', body: 'Prezzo sale. Breakout sopra resistenza → retail entra long. Istituzionali vendono contro il retail (stop hunt). Prezzo crolla. Retail prende stop loss. Istituzionali comprano ai minimi.' },
      { type: 'callout', variant: 'info', text: 'Il retail viene usato come liquidità. Gli istituzionali hanno bisogno che qualcuno sia dall\'altra parte del trade.' },
      { type: 'heading', text: 'Cosa cambia con SMC' },
      { type: 'paragraph', text: 'Con la visione Smart Money, non segui gli indicatori — capisci dove gli istituzionali stanno accumulando e ti posizioni con loro, non contro di loro.' }
    ],
    quiz: [
      { id: 'q1', question: 'Cosa fa tipicamente il retail durante un breakout?', options: ['Aspetta la conferma', 'Entra nella direzione del breakout', 'Aspetta il ritracciamento', 'Non opera'], correctIndex: 1, explanation: 'Il retail compra breakout — che spesso sono trappole costruite dagli istituzionali.' },
      { id: 'q2', question: 'Gli istituzionali usano principalmente...?', options: ['RSI e MACD', 'Flusso di ordini e liquidità', 'Medie mobili', 'Pattern armonici'], correctIndex: 1, explanation: 'Gli istituzionali operano su ordine flow e liquidità — non su indicatori retail.' },
      { id: 'q3', question: 'Con SMC, l\'obiettivo è...?', options: ['Battere gli istituzionali', 'Allinearsi alla direzione istituzionale', 'Usare più indicatori', 'Operare contro trend'], correctIndex: 1, explanation: 'Con SMC si capisce la logica istituzionale e ci si posiziona nella stessa direzione.' }
    ]
  },
  {
    id: '02-03', moduleId: '02', order: 3, title: 'Liquidità: il carburante dei big player', summary: 'Cos\'è la liquidità e perché il mercato la insegue.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'Cos\'è la liquidità' },
      { type: 'paragraph', text: 'La liquidità è l\'insieme di ordini (stop loss, pending order) che attendono nel mercato. Gli istituzionali ne hanno bisogno per eseguire i propri ordini enormi senza spostarsi il prezzo.' },
      { type: 'heading', text: 'Dove si accumula liquidità' },
      { type: 'list', items: ['Sopra i massimi recenti (stop loss dei short, buy stop)', 'Sotto i minimi recenti (stop loss dei long, sell stop)', 'Equal Highs: due o più massimi allo stesso livello', 'Equal Lows: due o più minimi allo stesso livello'] },
      { type: 'diagram', key: 'liquidity-sweep', caption: 'La liquidità si accumula sopra massimi e sotto minimi' },
      { type: 'callout', variant: 'info', text: 'Il prezzo è un cacciatore di liquidità. Ogni volta che vedi "equal highs", sappi che è un magnete per il prezzo.' }
    ],
    quiz: [
      { id: 'q1', question: 'Dove si accumula la liquidità sopra i massimi?', options: ['Buy stop e stop loss dei short', 'Stop loss dei long', 'Ordini limit', 'Ordini di mercato'], correctIndex: 0, explanation: 'Sopra i massimi: stop loss di chi è short + buy stop di chi aspetta breakout.' },
      { id: 'q2', question: 'Cosa sono gli Equal Highs?', options: ['Due massimi in trend rialzista', 'Due o più massimi allo stesso livello', 'Massimi con gap', 'Massimi giornalieri'], correctIndex: 1, explanation: 'Equal Highs = due o più massimi quasi identici = cluster di liquidità = magnete.' },
      { id: 'q3', question: 'Perché gli istituzionali cercano liquidità?', options: ['Per speculare al rialzo', 'Per eseguire grandi ordini senza muovere troppo il prezzo', 'Per uscire velocemente', 'Per seguire il trend'], correctIndex: 1, explanation: 'Ordini enormi hanno bisogno di controparte — la liquidità accumulata la fornisce.' }
    ]
  },
  {
    id: '02-04', moduleId: '02', order: 4, title: 'BSL e SSL: Buy-Side e Sell-Side Liquidity', summary: 'I due tipi di liquidità che il mercato cerca.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'BSL — Buy-Side Liquidity' },
      { type: 'paragraph', text: 'BSL è la liquidità sopra i massimi. Comprende: stop loss dei trader short, buy stop order di chi vuole comprare sul breakout. Il mercato sale per raccoglierla.' },
      { type: 'heading', text: 'SSL — Sell-Side Liquidity' },
      { type: 'paragraph', text: 'SSL è la liquidità sotto i minimi. Comprende: stop loss dei trader long, sell stop di chi vuole vendere sul breakdown. Il mercato scende per raccoglierla.' },
      { type: 'list', items: ['BSL = sopra swing high, equal highs, ATH', 'SSL = sotto swing low, equal lows, ATL', 'Dopo lo sweep di BSL → il mercato spesso si inverte al ribasso', 'Dopo lo sweep di SSL → il mercato spesso si inverte al rialzo'] },
      { type: 'callout', variant: 'success', text: 'Regola base: il mercato fa sweep della liquidità prima di invertire. Non del doppio massimo per confermare. Prima lo sweep, poi l\'inversione.' }
    ],
    quiz: [
      { id: 'q1', question: 'BSL si trova...?', options: ['Sotto i minimi', 'Sopra i massimi', 'Nel mezzo del range', 'Sui livelli Fibonacci'], correctIndex: 1, explanation: 'BSL = Buy-Side Liquidity = sopra i massimi. Stop loss dei short, buy stop.' },
      { id: 'q2', question: 'Dopo uno sweep di SSL, il mercato tende a...?', options: ['Continuare al ribasso', 'Invertire al rialzo', 'Rimanere fermo', 'Aumentare di volatilità'], correctIndex: 1, explanation: 'Sweep di SSL (minimi) = istituzionali hanno comprato. Il mercato si inverte al rialzo.' },
      { id: 'q3', question: 'Equal Lows sono...?', options: ['Minimi in trend', 'Due o più minimi allo stesso livello', 'Minimi dopo NFP', 'Minimi settimanali'], correctIndex: 1, explanation: 'Equal Lows = cluster di SSL = il mercato li andrà a raccogliere.' }
    ]
  },
  {
    id: '02-05', moduleId: '02', order: 5, title: 'Liquidity Sweep: l\'inganno dei falsi breakout', summary: 'Come il mercato finge un breakout per raccogliere liquidità.', estimatedMinutes: 8,
    blocks: [
      { type: 'heading', text: 'Cos\'è un Liquidity Sweep' },
      { type: 'paragraph', text: 'Il Liquidity Sweep è un movimento del prezzo che rompe un livello chiave (massimo/minimo) per raccogliere gli ordini accumulati lì, poi si inverte immediatamente.' },
      { type: 'heading', text: 'Come riconoscerlo' },
      { type: 'list', items: ['Il prezzo rompe il livello con una candela long', 'Il wick della candela penetra il livello', 'Il close della candela è sotto/sopra il livello rotto', 'Subito dopo: MSS (Market Structure Shift) nella direzione opposta'] },
      { type: 'diagram', key: 'liquidity-sweep', caption: 'Sweep di BSL: break sopra massimo → chiusura sotto → reversal' },
      { type: 'example', title: 'Scenario Buy', body: 'Asia: equal lows a 2380. Londra 09:30: prezzo scende sotto 2380 (sweep SSL) con wick. Candela M1 chiude sopra 2380. MSS al rialzo. Entry long con SL sotto il wick.' },
      { type: 'callout', variant: 'warning', text: 'Il breakout vero ha close oltre il livello + volume. Lo sweep ha wick oltre il livello + close dentro. Distinguere è fondamentale.' }
    ],
    quiz: [
      { id: 'q1', question: 'Cosa distingue un vero breakout da uno sweep?', options: ['Il volume', 'Il close della candela rispetto al livello', 'L\'orario', 'Il colore della candela'], correctIndex: 1, explanation: 'Sweep: wick oltre il livello, close rientra dentro. Breakout: close oltre il livello.' },
      { id: 'q2', question: 'Dopo uno sweep di BSL (sopra i massimi), mi aspetto...?', options: ['Continuazione al rialzo', 'Inversione al ribasso', 'Lateralizzazione', 'Nessun pattern'], correctIndex: 1, explanation: 'Sweep BSL = gli istituzionali hanno venduto contro i long. Segue inversione ribassista.' },
      { id: 'q3', question: 'Cosa segue immediatamente uno sweep per confermare l\'inversione?', options: ['Un nuovo massimo', 'MSS nella direzione opposta', 'Un doji', 'Volume basso'], correctIndex: 1, explanation: 'MSS (Market Structure Shift) dopo lo sweep è la conferma operativa.' }
    ]
  },
  {
    id: '02-06', moduleId: '02', order: 6, title: 'Struttura di mercato: HH, HL, LH, LL', summary: 'Leggere la direzione del mercato dalla struttura.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'La struttura' },
      { type: 'list', items: ['HH (Higher High): massimo più alto del precedente → rialzista', 'HL (Higher Low): minimo più alto del precedente → rialzista', 'LH (Lower High): massimo più basso del precedente → ribassista', 'LL (Lower Low): minimo più basso del precedente → ribassista'] },
      { type: 'diagram', key: 'structure', caption: 'Trend rialzista: HH+HL. Trend ribassista: LH+LL.' },
      { type: 'paragraph', text: 'Un trend rialzista crea continuamente HH e HL. Quando si rompe l\'ultimo HL → segnale di inversione potenziale.' },
      { type: 'callout', variant: 'info', text: 'La struttura vale su tutti i timeframe. HTF (H4, H1) è più affidabile — definisce il bias direzionale.' }
    ],
    quiz: [
      { id: 'q1', question: 'Un mercato rialzista ha...?', options: ['LH e LL', 'HH e HL', 'Solo HH', 'HH e LL'], correctIndex: 1, explanation: 'Trend rialzista = Higher Highs (HH) + Higher Lows (HL).' },
      { id: 'q2', question: 'Cosa significa LH?', options: ['Massimo più alto del precedente', 'Massimo più basso del precedente', 'Minimo più basso', 'Minimo più alto'], correctIndex: 1, explanation: 'LH = Lower High = massimo più basso del precedente → debolezza rialzista.' },
      { id: 'q3', question: 'Su quale timeframe la struttura è più affidabile?', options: ['M1', 'M5', 'H1-H4', 'Tutte uguali'], correctIndex: 2, explanation: 'H1 e H4 offrono struttura più pulita e affidabile per il bias direzionale.' }
    ]
  },
  {
    id: '02-07', moduleId: '02', order: 7, title: 'Break of Structure (BOS)', summary: 'Quando la struttura si rompe e cosa significa.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'BOS — Break of Structure' },
      { type: 'paragraph', text: 'BOS = una candela chiude oltre l\'ultimo swing high (in uptrend) o swing low (in downtrend). Conferma la continuazione del trend.' },
      { type: 'list', items: ['BOS rialzista: close sopra il precedente HH → trend continua su', 'BOS ribassista: close sotto il precedente LL → trend continua giù', 'BOS valida la struttura — non la inverte', 'BOS ≠ MSS (vedi prossima lezione)'] },
      { type: 'diagram', key: 'bos-mss', caption: 'BOS: rottura nella direzione del trend. MSS: rottura contro trend.' },
      { type: 'callout', variant: 'info', text: 'Il BOS conferma che il trend è in corso. Cerca poi il HL (in uptrend) per entrare long.' }
    ],
    quiz: [
      { id: 'q1', question: 'BOS rialzista significa...?', options: ['Close sotto il precedente LL', 'Close sopra il precedente HH', 'Inversione al ribasso', 'Lateralizzazione'], correctIndex: 1, explanation: 'BOS rialzista = chiusura sopra il precedente massimo significativo.' },
      { id: 'q2', question: 'BOS segnala...?', options: ['Inversione del trend', 'Continuazione del trend', 'Incertezza', 'Pausa'], correctIndex: 1, explanation: 'BOS = il trend è confermato e continua.' },
      { id: 'q3', question: 'Dopo un BOS rialzista, cerco...?', options: ['Un nuovo LL', 'Un HL per entrare long', 'Un LH', 'Un doppio massimo'], correctIndex: 1, explanation: 'Dopo BOS rialzista aspetto un HL (ritracciamento) come entry long.' }
    ]
  },
  {
    id: '02-08', moduleId: '02', order: 8, title: 'Market Structure Shift (MSS)', summary: 'Il segnale di inversione più importante nel metodo.', estimatedMinutes: 8,
    blocks: [
      { type: 'heading', text: 'MSS — Market Structure Shift' },
      { type: 'paragraph', text: 'MSS = rottura della struttura nella direzione OPPOSTA al trend in corso. In un uptrend: close sotto l\'ultimo HL significativo. Segnala possibile inversione.' },
      { type: 'heading', text: 'Come si usa nel setup' },
      { type: 'list', items: ['Attendere sweep di BSL/SSL', 'Osservare su M1 un MSS nella direzione opposta allo sweep', 'MSS è il trigger d\'ingresso — non il breakout grezzo', 'MSS deve formarsi dopo lo sweep, non prima'] },
      { type: 'diagram', key: 'bos-mss', caption: 'MSS: rottura contro trend = cambio di struttura.' },
      { type: 'example', title: 'Setup Buy', body: 'Uptrend H1. Sweep sotto ultimo HL (SSL). Su M1: close sopra il precedente swing high locale → MSS rialzista. Entry long.' },
      { type: 'callout', variant: 'success', text: 'MSS su M1 dopo sweep = il setup più pulito del metodo. Non entrare prima del MSS.' }
    ],
    quiz: [
      { id: 'q1', question: 'MSS ribassista in un uptrend è...?', options: ['Close sopra HH', 'Close sotto l\'ultimo HL significativo', 'Un nuovo HH', 'Un BOS'], correctIndex: 1, explanation: 'MSS in uptrend = close sotto l\'ultimo HL = la struttura rialzista si è rotta.' },
      { id: 'q2', question: 'Quando cerco il MSS rispetto allo sweep?', options: ['Prima dello sweep', 'Subito dopo lo sweep', 'Il giorno dopo', 'Prima che il prezzo raggiunga il livello'], correctIndex: 1, explanation: 'Prima sweep, poi MSS. L\'ordine è fondamentale.' },
      { id: 'q3', question: 'Su quale timeframe cerco il MSS per l\'entry?', options: ['H4', 'H1', 'M15', 'M1'], correctIndex: 3, explanation: 'MSS su M1 dopo sweep su M15/H1 = trigger preciso con SL stretto.' }
    ]
  },
  {
    id: '02-09', moduleId: '02', order: 9, title: 'Pensa come un market maker', summary: 'Adottare la prospettiva istituzionale nell\'analisi.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'Il modello mentale' },
      { type: 'paragraph', text: 'Un market maker ha bisogno di: 1) raccogliere la propria posizione, 2) spingere il prezzo, 3) distribuire (uscire). Ogni movimento di prezzo ha questa logica.' },
      { type: 'list', items: ['Accumulo: prezzo laterale, small range, nessuna direzione evidente', 'Espansione: rottura violenta in una direzione — gli istituzionali spingono', 'Ritracciamento: prezzo rientra verso l\'OB dove hanno comprato/venduto', 'Continuazione: secondo leg nella direzione originale'] },
      { type: 'callout', variant: 'info', text: 'Quando vedi un range laterale, non è "noia" — è accumulo/distribuzione istituzionale.' },
      { type: 'heading', text: 'Punti chiave' },
      { type: 'list', items: ['Range laterale = accumulo o distribuzione', 'Breakout violento = espansione dopo accumulo', 'Ritracciamento all\'OB = opportunità d\'ingresso', 'Il retail vede il breakout; lo Smart Money era già dentro'] }
    ],
    quiz: [
      { id: 'q1', question: 'Un range laterale significa...?', options: ['Nessuna opportunità', 'Accumulo o distribuzione istituzionale', 'Mercato chiuso', 'Dati macro in attesa'], correctIndex: 1, explanation: 'Range = gli istituzionali stanno raccogliendo la loro posizione silenziosamente.' },
      { id: 'q2', question: 'Cosa è l\'espansione?', options: ['Il range laterale', 'La rottura violenta dopo l\'accumulo', 'Un falso breakout', 'Il ritracciamento'], correctIndex: 1, explanation: 'Espansione = gli istituzionali spingono dopo aver accumulato — movimento direzionale.' },
      { id: 'q3', question: 'Il retail entra tipicamente...?', options: ['Durante l\'accumulo', 'Sul breakout (espansione)', 'Sul ritracciamento all\'OB', 'Sempre al momento giusto'], correctIndex: 1, explanation: 'Il retail vede il breakout e compra — quando gli istituzionali stanno già distribuendo.' }
    ]
  },
  {
    id: '02-10', moduleId: '02', order: 10, title: 'Riepilogo Modulo 02 + Quiz', summary: 'Verifica la comprensione del framework Smart Money.', estimatedMinutes: 10,
    blocks: [
      { type: 'heading', text: 'Hai imparato' },
      { type: 'list', items: ['Gli istituzionali dominano — il retail è controparte', 'BSL sopra i massimi, SSL sotto i minimi', 'Liquidity Sweep: falso breakout per raccogliere stop', 'Struttura: HH/HL rialzista, LH/LL ribassista', 'BOS: conferma trend. MSS: inversione struttura', 'Range = accumulo → breakout = espansione → OB = entry'] },
      { type: 'callout', variant: 'success', text: 'Stai pensando come gli istituzionali. Nei prossimi moduli vedrai i blocchi specifici dove entrano.' }
    ],
    quiz: [
      { id: 'q1', question: 'BSL e SSL si trovano...?', options: ['Ai livelli Fibonacci', 'Sopra massimi e sotto minimi', 'Alle medie mobili', 'Ai round numbers'], correctIndex: 1, explanation: 'BSL sopra i massimi (stop dei short), SSL sotto i minimi (stop dei long).' },
      { id: 'q2', question: 'MSS ribassista dopo sweep di BSL segnala...?', options: ['Continuazione rialzista', 'Potenziale inversione ribassista', 'Lateralizzazione', 'Nessun segnale'], correctIndex: 1, explanation: 'Sweep BSL + MSS ribassista = gli istituzionali hanno venduto, il trend cambia.' },
      { id: 'q3', question: 'Cosa accade tipicamente dopo l\'espansione?', options: ['Altro accumulo', 'Ritracciamento verso l\'OB', 'Inversione totale', 'Niente'], correctIndex: 1, explanation: 'Dopo espansione il prezzo ritraccia all\'Order Block per rifornire la posizione.' },
      { id: 'q4', question: 'Il BOS differisce dal MSS perché...?', options: ['BOS inverte, MSS conferma', 'BOS conferma il trend, MSS segnala inversione', 'Sono identici', 'BOS è su M1, MSS su H1'], correctIndex: 1, explanation: 'BOS = continua il trend. MSS = cambia la struttura = possibile inversione.' }
    ]
  }
]
