import type { Lesson } from './index'

export const mod03lessons: Lesson[] = [
  {
    id: '03-01', moduleId: '03', order: 1, title: 'Il ciclo MAPS: Consolidation → Expansion', summary: 'Il modello algoritmico di pricing dei market maker.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'MAPS — Market Makers Algorithmic Pricing Systems' },
      { type: 'paragraph', text: 'Il prezzo non si muove casualmente. Segue un ciclo algoritmico preciso: Consolidation (accumulo) → Expansion (spinta) → Retracement (ritorno) → Reversal o Continuation.' },
      { type: 'list', items: ['Consolidation: range stretto, prezzo laterale, volume basso', 'Expansion: rottura direzionale, candele grandi, volume alto', 'Retracement: ritorno verso l\'OB/FVG — opportunità d\'ingresso', 'Reversal: cambio completo di direzione oppure Continuation: ripartenza'] },
      { type: 'callout', variant: 'info', text: 'Ogni setup del metodo El Dorado sfrutta il Retracement verso l\'OB dopo l\'Expansion.' },
      { type: 'heading', text: 'Punti chiave' },
      { type: 'list', items: ['Non comprare il breakout — aspetta il retracement', 'L\'expansion dà il bias. Il retracement dà l\'entry.', 'Se non c\'è retracement → nessun trade'] }
    ],
    quiz: [
      { id: 'q1', question: 'Qual è l\'ordine corretto del ciclo MAPS?', options: ['Expansion → Consolidation → Retracement', 'Consolidation → Expansion → Retracement', 'Retracement → Expansion → Consolidation', 'Expansion → Retracement → Consolidation'], correctIndex: 1, explanation: 'Consolidation (accumulo) → Expansion (spinta) → Retracement (ritorno al OB).' },
      { id: 'q2', question: 'Dove si entra nel setup?', options: ['Durante l\'expansion', 'Durante la consolidation', 'Sul retracement verso l\'OB', 'Sul reversal'], correctIndex: 2, explanation: 'L\'entry avviene sul retracement all\'Order Block — non sul breakout iniziale.' },
      { id: 'q3', question: 'Se non c\'è retracement dopo l\'expansion?', options: ['Entro comunque', 'Aspetto il prossimo ciclo', 'Uso un altro timeframe', 'Entro a mercato'], correctIndex: 1, explanation: 'Nessun retracement = nessun setup. Aspetta il prossimo ciclo MAPS.' }
    ]
  },
  {
    id: '03-02', moduleId: '03', order: 2, title: 'Order Block: dove gli istituzionali caricano', summary: 'Il blocco di prezzo più importante della strategia.', estimatedMinutes: 8,
    blocks: [
      { type: 'heading', text: 'Cos\'è un Order Block' },
      { type: 'paragraph', text: 'L\'Order Block (OB) è l\'ultima candela nella direzione opposta prima di un movimento impulsivo. È la zona dove gli istituzionali hanno caricato la loro posizione.' },
      { type: 'heading', text: 'Come identificarlo' },
      { type: 'list', items: ['Trova un\'expansion (movimento impulsivo)', 'Torna indietro: l\'ultima candela bearish prima dell\'expansion rialzista = Bullish OB', 'L\'ultima candela bullish prima dell\'expansion ribassista = Bearish OB', 'La zona OB = dal low al high di quella candela'] },
      { type: 'diagram', key: 'order-block', caption: 'Order Block: ultima candela opposta prima del movimento impulsivo.' },
      { type: 'example', title: 'Bullish OB', body: 'Tre candele verdi in expansion. Prima di esse: una candela rossa. La zona rossa = Bullish OB. Quando il prezzo ritorna in quella zona → entry long.' },
      { type: 'callout', variant: 'success', text: 'L\'OB è la zona dove stai "comprando insieme" agli istituzionali. Edge statistico alto.' }
    ],
    quiz: [
      { id: 'q1', question: 'Un Bullish OB è...?', options: ['L\'ultima candela bullish prima del crollo', 'L\'ultima candela bearish prima del rally', 'Il minimo del trend', 'Una media mobile'], correctIndex: 1, explanation: 'Bullish OB = ultima candela rossa (bearish) prima di un\'expansion rialzista.' },
      { id: 'q2', question: 'La zona OB corrisponde a...?', options: ['Solo al low della candela', 'Solo all\'high', 'Dal low all\'high della candela OB', 'Al body della candela'], correctIndex: 2, explanation: 'La zona OB è tutta la candela — dal low all\'high — incluso il body.' },
      { id: 'q3', question: 'Cosa faccio quando il prezzo ritorna all\'OB?', options: ['Aspetto ancora', 'Cerco un entry nella direzione dell\'expansion originale', 'Entro in direzione opposta', 'Niente'], correctIndex: 1, explanation: 'Retracement all\'OB = entry nella direzione del movimento originale (long su Bullish OB).' }
    ]
  },
  {
    id: '03-03', moduleId: '03', order: 3, title: 'Bullish vs Bearish Order Block', summary: 'Riconoscere e usare i due tipi di OB.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'Bullish OB' },
      { type: 'list', items: ['Ultima candela rossa (bearish) prima di expansion rialzista', 'Zona: low→high della candela rossa', 'Entry: quando prezzo ritorna nella zona + MSS rialzista su M1', 'SL: sotto il low della zona OB'] },
      { type: 'heading', text: 'Bearish OB' },
      { type: 'list', items: ['Ultima candela verde (bullish) prima di expansion ribassista', 'Zona: low→high della candela verde', 'Entry: quando prezzo ritorna nella zona + MSS ribassista su M1', 'SL: sopra l\'high della zona OB'] },
      { type: 'callout', variant: 'warning', text: 'OB non mitigato = più potente. OB già toccato una volta (mitigato) = meno affidabile.' }
    ],
    quiz: [
      { id: 'q1', question: 'Il Bearish OB è formato da...?', options: ['Ultima candela rossa prima del rally', 'Ultima candela verde prima del crollo', 'Qualsiasi candela grande', 'La candela più grande del giorno'], correctIndex: 1, explanation: 'Bearish OB = ultima candela bullish (verde) prima di expansion ribassista.' },
      { id: 'q2', question: 'Lo SL su Bullish OB si mette...?', options: ['Sopra l\'high OB', 'Sotto il low OB', 'A 50 pips fissi', 'Alla media mobile'], correctIndex: 1, explanation: 'SL sotto il low della zona OB — se il prezzo lo rompe, l\'OB è invalidato.' },
      { id: 'q3', question: 'Un OB già toccato una volta è...?', options: ['Più potente', 'Meno potente (mitigato)', 'Uguale', 'Non più valido'], correctIndex: 1, explanation: 'OB mitigato = già visitato una volta — ha meno liquidità residua.' }
    ]
  },
  {
    id: '03-04', moduleId: '03', order: 4, title: 'Breaker Block: quando l\'OB si trasforma', summary: 'L\'OB invalido diventa un blocco ribassista.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'Cos\'è un Breaker Block' },
      { type: 'paragraph', text: 'Quando un Order Block viene rotto (il prezzo lo attraversa senza rispettarlo), si trasforma in Breaker Block — ora funziona come resistenza/supporto nella direzione opposta.' },
      { type: 'list', items: ['Bullish OB rotto dal basso → diventa Bearish Breaker Block', 'Bearish OB rotto dall\'alto → diventa Bullish Breaker Block', 'Il Breaker funziona come magnet — il prezzo spesso ci ritorna', 'Entry: sul retracement al Breaker nella nuova direzione'] },
      { type: 'example', title: 'Scenario', body: 'Bullish OB a 2380. Prezzo scende sotto 2380 (OB rotto) → Bearish Breaker. Prezzo risale a 2380 in retracement → entry short con SL sopra il Breaker.' },
      { type: 'callout', variant: 'info', text: 'Il Breaker Block indica che la struttura è cambiata. Non difendere l\'OB — segui la nuova direzione.' }
    ],
    quiz: [
      { id: 'q1', question: 'Un Bullish OB rotto diventa...?', options: ['Bullish Breaker Block', 'Bearish Breaker Block', 'Fair Value Gap', 'Livello neutro'], correctIndex: 1, explanation: 'OB rotto → Breaker nella direzione opposta. Bullish OB rotto = Bearish Breaker.' },
      { id: 'q2', question: 'Il Breaker Block funziona come...?', options: ['Zona di entry nella stessa direzione dell\'OB', 'Resistenza/supporto nella direzione opposta', 'Livello da ignorare', 'Target di profitto'], correctIndex: 1, explanation: 'Il Breaker attrae il prezzo come magnet e ora funziona al contrario dell\'OB originale.' },
      { id: 'q3', question: 'Entry su Bearish Breaker Block avviene...?', options: ['Quando il prezzo scende sotto', 'Quando il prezzo ritorna in retracement da sopra', 'Al breakout', 'Mai'], correctIndex: 1, explanation: 'Entry sul retracement al Breaker — il prezzo ritorna alla zona e poi riprende la direzione.' }
    ]
  },
  {
    id: '03-05', moduleId: '03', order: 5, title: 'Mitigation Block', summary: 'Il blocco che assorbe ordini pendenti.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'Cos\'è il Mitigation Block' },
      { type: 'paragraph', text: 'Il Mitigation Block si forma quando il prezzo ritorna a "mitigare" (assorbire) ordini lasciati indietro dopo un movimento impulsivo. Indica che la mossa è incompleta.' },
      { type: 'list', items: ['Forma: swing che va in una direzione, poi ritorna', 'Il ritorno = mitigation della posizione lasciata aperta', 'Dopo mitigation: nuova partenza nella direzione originale', 'Usato quando l\'OB è lontano — il Mitigation è più vicino'] },
      { type: 'callout', variant: 'info', text: 'Mitigation Block = gli istituzionali hanno ordini da completare. Il ritorno è obbligato prima della continuazione.' }
    ],
    quiz: [
      { id: 'q1', question: 'Dopo un Mitigation Block, il prezzo tende a...?', options: ['Invertire permanentemente', 'Riprendere la direzione originale', 'Lateralizzare', 'Aumentare lo spread'], correctIndex: 1, explanation: 'La mitigation completa gli ordini — poi la direzione originale riprende.' },
      { id: 'q2', question: 'Quando uso il Mitigation Block?', options: ['Sempre', 'Quando l\'OB è troppo distante', 'Solo su H4', 'Mai'], correctIndex: 1, explanation: 'Se l\'OB originale è lontano, il Mitigation Block più vicino è l\'entry alternativa.' },
      { id: 'q3', question: 'Il Mitigation Block indica che...?', options: ['Il trend è finito', 'Il movimento è completo', 'Ci sono ordini istituzionali da completare', 'Nessun segnale'], correctIndex: 2, explanation: 'Mitigation = ordini incompleti da assorbire prima che il trend prosegua.' }
    ]
  },
  {
    id: '03-06', moduleId: '03', order: 6, title: 'Fair Value Gap (FVG)', summary: 'Gli squilibri di prezzo che il mercato colma.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'Cos\'è il Fair Value Gap' },
      { type: 'paragraph', text: 'FVG = una zona tra 3 candele consecutive dove il wick della prima e il wick della terza non si sovrappongono. Indica uno squilibrio — il prezzo tende a tornarci per colmarlo.' },
      { type: 'diagram', key: 'fvg', caption: 'FVG: gap tra wick C1 e wick C3 nelle 3 candele consecutive.' },
      { type: 'list', items: ['Bullish FVG: gap verso l\'alto — supporto per retracement', 'Bearish FVG: gap verso il basso — resistenza per retracement', 'FVG + OB nella stessa zona = confluenza potentissima', '50% del FVG è il punto d\'entry ottimale'] },
      { type: 'callout', variant: 'success', text: 'FVG + OB = la confluenza più affidabile del metodo. Cerca overlap tra le due zone.' }
    ],
    quiz: [
      { id: 'q1', question: 'Come si forma un FVG?', options: ['Due candele grandi', 'Gap tra wick C1 e wick C3 di 3 candele consecutive', 'Una candela con wick lungo', 'Un massimo e un minimo vuoti'], correctIndex: 1, explanation: 'FVG = nelle 3 candele, il wick high di C1 non tocca il wick low di C3.' },
      { id: 'q2', question: 'Dove si entra nel FVG?', options: ['Al massimo del gap', 'Al minimo del gap', 'Al 50% del FVG', 'Non si entra nel FVG'], correctIndex: 2, explanation: 'Entry ottimale al 50% del FVG — massimizza R/R.' },
      { id: 'q3', question: 'FVG + OB nella stessa zona indica...?', options: ['Zona da evitare', 'Confluenza — zona molto affidabile', 'Confusione di mercato', 'Bassa probabilità'], correctIndex: 1, explanation: 'Overlap FVG+OB = due segnali nella stessa zona = alta probabilità di reazione.' }
    ]
  },
  {
    id: '03-07', moduleId: '03', order: 7, title: 'Propulsion Block e Vacuum Block', summary: 'Blocchi di accelerazione e zone vuote di liquidità.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'Propulsion Block' },
      { type: 'paragraph', text: 'Il Propulsion Block è una zona di riaccumulo all\'interno di un trend — il prezzo si ferma brevemente, poi riprende violentemente. Simile all\'OB ma nel mid-trend.' },
      { type: 'heading', text: 'Vacuum Block' },
      { type: 'paragraph', text: 'Il Vacuum Block è una zona con pochissimi ordini — il prezzo la attraversa velocemente senza fermarsi. Rappresenta l\'assenza di liquidità.' },
      { type: 'list', items: ['Propulsion: zona di riaccumulo mid-trend → entry nella direzione del trend', 'Vacuum: zona vuota → il prezzo la bypassa velocemente', 'Vacuum sopra BSL = il prezzo salirà velocemente fino alla BSL', 'Identificare vacuum aiuta a capire la velocità del movimento'] },
      { type: 'callout', variant: 'info', text: 'Se c\'è un Vacuum Block tra entry e target → il target si raggiunge rapidamente.' }
    ],
    quiz: [
      { id: 'q1', question: 'Il Propulsion Block si trova...?', options: ['All\'inizio del trend', 'Nel mezzo del trend come zona di riaccumulo', 'Alla fine del trend', 'Fuori dal trend'], correctIndex: 1, explanation: 'Propulsion = riaccumulo mid-trend. Il trend fa pausa poi accelera di nuovo.' },
      { id: 'q2', question: 'Il Vacuum Block indica...?', options: ['Alta liquidità', 'Bassa liquidità — prezzo lo attraversa rapidamente', 'Zona di inversione', 'OB forte'], correctIndex: 1, explanation: 'Vacuum = poca liquidità = il prezzo passa veloce senza rimbalzare.' },
      { id: 'q3', question: 'Cosa fa il prezzo attraversando un Vacuum verso il target?', options: ['Si ferma nel vacuum', 'Lo attraversa rapidamente senza resistenza', 'Inverte nel vacuum', 'Rallenta'], correctIndex: 1, explanation: 'Vacuum = nessuna resistenza significativa → il prezzo ci passa veloce.' }
    ]
  },
  {
    id: '03-08', moduleId: '03', order: 8, title: 'Liquidity Pools e cluster di stop', summary: 'I grandi cluster di ordini che il mercato caccia.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'Liquidity Pools' },
      { type: 'paragraph', text: 'Un Liquidity Pool è una concentrazione massiccia di ordini (stop loss + pending) in una zona specifica. Più ordini = più forte il magnete per il prezzo.' },
      { type: 'list', items: ['Round numbers (2400, 2350): milioni di ordini → pool enorme', 'Swing high/low recenti con molte candele ferme = pool', 'Previous day High/Low (PDH/PDL) = pool giornaliero', 'Weekly High/Low (PWH/PWL) = pool settimanale'] },
      { type: 'callout', variant: 'warning', text: 'Non mettere mai il SL su un round number o su PDH/PDL — sono troppo prevedibili e vengono cazziati.' },
      { type: 'heading', text: 'Come usarli' },
      { type: 'list', items: ['Target T2: porta la posizione al prossimo pool lontano', 'Evita SL sui pool ovvi — mettilo oltre (2-3 pip)'] }
    ],
    quiz: [
      { id: 'q1', question: 'Perché i round numbers sono pool di liquidità?', options: ['Sono belli esteticamente', 'Milioni di trader mettono ordini e SL sui round numbers', 'I broker li manipolano', 'Sono livelli tecnici confermati'], correctIndex: 1, explanation: 'Round number = convenzione psicologica → enorme concentrazione di ordini.' },
      { id: 'q2', question: 'PDH/PDL significa...?', options: ['Previous Daily High/Low', 'Primary Directional High/Low', 'Peak Direction Hedge/Long', 'Price Demand High/Low'], correctIndex: 0, explanation: 'PDH = Previous Day High, PDL = Previous Day Low — livelli chiave giornalieri.' },
      { id: 'q3', question: 'Dove NON mettere lo SL?', options: ['Sotto il fake move low', 'Su round numbers o PDH/PDL', 'Oltre il Breaker Block', 'A 5 pip dall\'entry'], correctIndex: 1, explanation: 'SL su pool ovvi = certa cacciata. Mettilo oltre i pool, non sui pool.' }
    ]
  },
  {
    id: '03-09', moduleId: '03', order: 9, title: 'Riepilogo Modulo 03 + Quiz', summary: 'Consolida la conoscenza dei blocchi istituzionali.', estimatedMinutes: 10,
    blocks: [
      { type: 'heading', text: 'Hai imparato' },
      { type: 'list', items: ['MAPS: Consolidation → Expansion → Retracement → Continuation/Reversal', 'OB: ultima candela opposta prima dell\'expansion', 'Breaker: OB rotto = funzione opposta', 'Mitigation: assorbimento ordini prima della continuazione', 'FVG: gap tra 3 candele → zona da colmare', 'Propulsion: riaccumulo mid-trend', 'Vacuum: zona vuota → prezzo passa veloce', 'Liquidity Pools: magneti per il prezzo'] },
      { type: 'callout', variant: 'success', text: 'Ora conosci tutti i blocchi istituzionali. Il prossimo modulo mostra come entrare con R/R ottimale.' }
    ],
    quiz: [
      { id: 'q1', question: 'Un OB rotto diventa...?', options: ['FVG', 'Mitigation Block', 'Breaker Block', 'Vacuum Block'], correctIndex: 2, explanation: 'OB rotto = Breaker Block nella direzione opposta.' },
      { id: 'q2', question: 'FVG + OB nella stessa zona è...?', options: ['Confusione', 'Alta confluenza — setup di alta qualità', 'Da evitare', 'Normale'], correctIndex: 1, explanation: 'Due blocchi nella stessa zona = doppia conferma → alta probabilità.' },
      { id: 'q3', question: 'Dove si collocano i Liquidity Pools più forti?', options: ['Livelli Fibonacci', 'Round numbers e PDH/PDL', 'Medie mobili', 'Gap orari'], correctIndex: 1, explanation: 'Round numbers (2400, 2350) e PDH/PDL = pool enormi di ordini.' },
      { id: 'q4', question: 'Il ciclo MAPS favorisce entry sul...?', options: ['Breakout dell\'expansion', 'Retracement all\'OB/FVG', 'Inizio della consolidation', 'Fine del reversal'], correctIndex: 1, explanation: 'Entry sul retracement — non sul breakout. L\'expansion dà il bias, il retracement dà l\'entry.' }
    ]
  }
]
