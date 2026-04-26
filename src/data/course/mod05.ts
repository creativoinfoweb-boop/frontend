import type { Lesson } from './index'

export const mod05lessons: Lesson[] = [
  {
    id: '05-01', moduleId: '05', order: 1, title: 'La regola del 1–2% per operazione', summary: 'Il dimensionamento che protegge il capitale nel lungo periodo.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'Perché 1-2%' },
      { type: 'paragraph', text: 'Rischiare 1-2% per operazione significa che anche 10 perdite consecutive non distruggono il conto. La sopravvivenza a lungo termine è l\'obiettivo numero uno.' },
      { type: 'list', items: ['1%: conservativo — consigliato in demo e primissime fasi live', '2%: standard — per trader con esperienza operativa confermata', 'Sotto 1%: la struttura TP multipla non funziona correttamente', 'Sopra 2%: emotività durante drawdown diventa difficile da gestire'] },
      { type: 'example', title: 'Calcolo', body: 'Conto $1000. Rischio 1% = $10 per trade. SL = 10 pip. Size = $10 / 10 pip = $1/pip = 0.1 lotto. Su XAU: $1/pip ≈ 0.1 lotto.' },
      { type: 'callout', variant: 'success', text: 'Con 1% di rischio: una serie di 10 perdite consecutive riduce il conto del 9.6% — recuperabile facilmente.' }
    ],
    quiz: [
      { id: 'q1', question: 'Perché non rischiare più del 2% per trade?', options: ['Non è redditizio', 'Il drawdown emotivo diventa ingestibile', 'Il broker non lo permette', 'Non cambia nulla'], correctIndex: 1, explanation: 'Oltre 2% i drawdown creano stress emotivo che porta a decisioni sbagliate.' },
      { id: 'q2', question: 'Conto $500, rischio 1%: quanto rischi per trade?', options: ['$1', '$5', '$50', '$500'], correctIndex: 1, explanation: '1% di $500 = $5 per trade.' },
      { id: 'q3', question: 'Perché sotto 1% non funziona la struttura TP?', options: ['Il broker applica commissioni extra', 'Il capitale non permette la struttura TP multipla', 'Gli istituzionali lo vedono', 'Non è vero'], correctIndex: 1, explanation: 'TP1 50% + BE non funzionano con size troppo piccole — matematicamente impossibile.' }
    ]
  },
  {
    id: '05-02', moduleId: '05', order: 2, title: 'Max 3% giornaliero: il Kill Switch', summary: 'La regola che ferma tutto dopo tre perdite.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'Il Kill Switch' },
      { type: 'paragraph', text: 'Regola assoluta: se perdi il 3% del conto in un singolo giorno, chiudi tutto e non operare più per quel giorno. Nessuna eccezione.' },
      { type: 'list', items: ['Max 3% giornaliero = protezione contro le giornate negative', 'Dopo 2 perdite consecutive: pausa obbligatoria di almeno 1 ora', 'Giornata negativa non recuperabile in giornata: accetta la perdita', 'Il revenge trading è la causa numero uno di account distrutti'] },
      { type: 'callout', variant: 'warning', text: 'Il kill switch non è opzionale. Le giornate peggiori si trasformano in disastri per chi non si ferma dopo 3%.' },
      { type: 'example', title: 'Scenario', body: 'Giornata: -1%, -1%, -1% → 3% perso → STOP. Giornata finita. Domani ricomincia con mente fresca.' }
    ],
    quiz: [
      { id: 'q1', question: 'Cosa fai dopo 3% di perdita in un giorno?', options: ['Aumenti la size per recuperare', 'Smetti di operare per quella giornata', 'Cambi strategia', 'Apri 3 trade contemporaneamente'], correctIndex: 1, explanation: 'Kill switch: 3% perso = stop totale per quel giorno. Nessuna eccezione.' },
      { id: 'q2', question: 'Dopo quante perdite consecutive fai pausa?', options: ['1', '2', '5', '10'], correctIndex: 1, explanation: '2 perdite consecutive = pausa obbligatoria. Non stai nel giusto mindset.' },
      { id: 'q3', question: 'Il revenge trading è...?', options: ['Una strategia valida', 'La causa principale di account distrutti', 'Normale e accettabile', 'Efficace a breve termine'], correctIndex: 1, explanation: 'Revenge trading = operare per recuperare emotivamente = perdite amplificate.' }
    ]
  },
  {
    id: '05-03', moduleId: '05', order: 3, title: 'Lotting: calcolo preciso della size', summary: 'Formula esatta per dimensionare ogni operazione.', estimatedMinutes: 8,
    blocks: [
      { type: 'heading', text: 'La formula' },
      { type: 'paragraph', text: 'Size = (Capitale × % Rischio) / (SL in pip × Valore pip)' },
      { type: 'list', items: ['Conto $1000, rischio 1% = $10', 'SL = 15 pip su XAU/USD', 'Valore pip XAU: $10 per pip su 1 lotto standard', '→ Lotti = $10 / (15 × $10) = $10/150 = 0.067 lotti ≈ 0.07'] },
      { type: 'example', title: 'Conto $2000, 2%, SL 20 pip', body: 'Rischio = $40. Valore pip 1 lotto XAU = $10. Lotti = $40 / (20 × $10) = $40/200 = 0.2 lotti.' },
      { type: 'callout', variant: 'info', text: 'Usa sempre un position size calculator (disponibile free online o in MT5). Non calcolare a mente.' }
    ],
    quiz: [
      { id: 'q1', question: 'Conto $1000, rischio 2%, SL 10 pip. Quale size?', options: ['0.05 lotti', '0.2 lotti', '1 lotto', '0.02 lotti'], correctIndex: 1, explanation: 'Rischio $20. Valore pip $10. Size = $20/(10×$10) = 0.2 lotti.' },
      { id: 'q2', question: 'Cosa succede se aumenti la size senza calcolarla?', options: ['R/R migliora', 'Rischi più del previsto — possibile margin call', 'Non cambia nulla', 'Il broker corregge automaticamente'], correctIndex: 1, explanation: 'Size non calcolata = rischio sconosciuto = possibile perdita catastrofica.' },
      { id: 'q3', question: 'Il valore pip di 1 lotto XAU/USD è circa...?', options: ['$1', '$5', '$10', '$100'], correctIndex: 2, explanation: '1 lotto XAU/USD = 100 oz. 1 pip = $0.1/oz × 100 = $10.' }
    ]
  },
  {
    id: '05-04', moduleId: '05', order: 4, title: 'Break Even automatico e gestione in profitto', summary: 'Come proteggere il trade quando va a favore.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'Break Even (BE)' },
      { type: 'paragraph', text: 'Quando il prezzo raggiunge TP1, chiudi il 50% della posizione e sposta lo SL al prezzo di entry. Ora il trade non può perdere.' },
      { type: 'list', items: ['TP1 = 50% della posizione chiusa (reward ≈ 1:1)', 'SL → Entry price + 1-2 pip (BE)', 'Residuo: posizione "free" — nessun rischio capitale', 'TP2: lascia correre verso il prossimo POI/pool'] },
      { type: 'example', title: 'Gestione', body: 'Entry long 2380. SL 2374. TP1 2386 (+6 pip). Prezzo raggiunge 2386: chiudi 50%, SL → 2381. Residuo: rischio 0, punta a TP2 2395.' },
      { type: 'callout', variant: 'success', text: 'Il BE è il tuo migliore alleato psicologico. Eliminare il rischio libera la mente dalla paura di perdere.' }
    ],
    quiz: [
      { id: 'q1', question: 'Quando sposti lo SL al BE?', options: ['Subito dopo l\'entry', 'Quando il prezzo raggiunge TP1', 'Dopo 30 minuti', 'Quando vuoi'], correctIndex: 1, explanation: 'Dopo TP1 raggiunto, chiudi 50% e sposta SL all\'entry price.' },
      { id: 'q2', question: 'Dopo il BE, il trade residuo ha...?', options: ['Rischio normale', 'Nessun rischio sul capitale investito', 'Rischio aumentato', 'SL più largo'], correctIndex: 1, explanation: 'SL al BE = worst case = pareggio. Il trade è "free".' },
      { id: 'q3', question: 'TP1 standard è al...?', options: ['2:1 R/R', '1:1 R/R', '3:1 R/R', 'Round number'], correctIndex: 1, explanation: 'TP1 ≈ 1:1 (reward uguale al rischio) — circa il 50% del movimento atteso.' }
    ]
  },
  {
    id: '05-05', moduleId: '05', order: 5, title: 'Take Profit frazionati', summary: 'Chiudere in tre step per massimizzare il gain.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'La struttura TP multipla' },
      { type: 'list', items: ['TP1 (50%): chiusura parziale + BE → reward 1:1', 'TP2 (30%): chiusura al prossimo POI/pool → reward 2:1-3:1', 'Residuo (20%): lascia aperto con SL a trailing o al BE', 'Se il prezzo supera 100 pip in profitto: scala il trailing SL'] },
      { type: 'diagram', key: 'take-profit', caption: 'Struttura TP: 50% a TP1, 30% a TP2, 20% residuo.' },
      { type: 'example', title: 'Esempio completo', body: 'Entry 2380, SL 2374 (6 pip). TP1 2386 (+6) = 50% chiuso. TP2 2394 (+14) = 30% chiuso. Residuo 20%: trailing SL da 2388 → chiude a 2400 o SL. Gain totale: 1.1R medio.' },
      { type: 'callout', variant: 'info', text: 'La struttura TP frazionata riduce l\'emotività: non devi decidere quando uscire — il piano lo fa per te.' }
    ],
    quiz: [
      { id: 'q1', question: 'A TP1 chiudi quale percentuale?', options: ['20%', '30%', '50%', '100%'], correctIndex: 2, explanation: 'TP1: chiudi il 50% della posizione + sposta SL al BE.' },
      { id: 'q2', question: 'Il residuo (20%) serve a...?', options: ['Aumentare il rischio', 'Catturare il movimento più ampio con trailing SL', 'Essere chiuso subito', 'Niente'], correctIndex: 1, explanation: 'Il residuo "cavalca" il trend — trail SL per non perdere il gain ma catturare l\'espansione.' },
      { id: 'q3', question: 'Perché la struttura TP frazionata riduce emotività?', options: ['Aumenta i profitti', 'Non devi decidere — segui un piano prestabilito', 'Riduce il rischio iniziale', 'Non la riduce'], correctIndex: 1, explanation: 'Piano predefinito = nessuna decisione emotiva durante il trade.' }
    ]
  },
  {
    id: '05-06', moduleId: '05', order: 6, title: 'Filtri: NFP, FOMC, CPI', summary: 'Quando non operare per evitare il caos da notizie macro.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'I tre filtri principali' },
      { type: 'list', items: ['NFP (Non-Farm Payrolls): primo venerdì del mese, 14:30 CET', 'FOMC (Fed): 6-8 volte/anno, 21:00 CET — tassi Fed', 'CPI (Inflazione USA): mensile, 14:30 CET'] },
      { type: 'paragraph', text: 'In queste giornate il mercato può muoversi di 50-200 pip in pochi secondi. Lo spread si allarga massivamente. Stop loss saltano senza possibilità di gestione.' },
      { type: 'callout', variant: 'warning', text: 'Regola assoluta: nessun trade aperto 30 minuti prima e durante le notizie ad alto impatto (stella rossa su ForexFactory).' },
      { type: 'list', items: ['Usa ForexFactory.com per controllare il calendario economico', 'Stelle rosse = alto impatto → no trade', 'Stelle arancioni = medio impatto → attenzione', 'Stelle gialle = basso impatto → normale'] }
    ],
    quiz: [
      { id: 'q1', question: 'NFP viene pubblicato...?', options: ['Ogni lunedì', 'Primo venerdì del mese', 'Ogni giorno', 'Una volta l\'anno'], correctIndex: 1, explanation: 'NFP = Non-Farm Payrolls = occupazione USA. Primo venerdì di ogni mese.' },
      { id: 'q2', question: 'Quanto prima delle notizie eviti di operare?', options: ['5 minuti', '30 minuti', '2 ore', 'Tutta la giornata'], correctIndex: 1, explanation: 'Almeno 30 minuti prima: lo spread inizia ad allargarsi già in anticipo.' },
      { id: 'q3', question: 'Su ForexFactory, quale stella indica alto impatto?', options: ['Gialla', 'Arancione', 'Rossa', 'Blu'], correctIndex: 2, explanation: 'Stella rossa = notizia ad alto impatto = no trade in quella finestra.' }
    ]
  },
  {
    id: '05-07', moduleId: '05', order: 7, title: 'Riepilogo Modulo 05 + Quiz', summary: 'Verifica il tuo Risk Management.', estimatedMinutes: 10,
    blocks: [
      { type: 'heading', text: 'Hai imparato' },
      { type: 'list', items: ['1-2% rischio per trade — mai sopra', 'Kill switch: stop dopo 3% perso in un giorno', 'Formula lotting: rischio $ / (SL pip × valore pip)', 'BE automatico a TP1 (50%)', 'TP frazionati: 50% TP1, 30% TP2, 20% residuo', 'Filtri NFP/FOMC/CPI: no trade 30 min prima'] },
      { type: 'callout', variant: 'success', text: 'Il risk management è il modulo più importante. Senza questo, nessuna strategia funziona nel lungo periodo.' }
    ],
    quiz: [
      { id: 'q1', question: 'Qual è il rischio massimo per singola operazione?', options: ['5%', '3%', '2%', '10%'], correctIndex: 2, explanation: 'Max 2% per operazione. Oltre: emotività ingestibile durante drawdown.' },
      { id: 'q2', question: 'Formula lotting: cosa divi per SL pip?', options: ['Capitale totale', 'Rischio in dollari', 'Target in pip', 'Spread'], correctIndex: 1, explanation: 'Size = Rischio $ / (SL pip × valore pip per lotto).' },
      { id: 'q3', question: 'Dopo il BE, il residuo 20% ha rischio...?', options: ['Uguale all\'inizio', 'Zero sul capitale', 'Ridotto del 50%', 'Raddoppiato'], correctIndex: 1, explanation: 'SL al BE = nessun rischio. Worst case = trade chiude a pareggio.' },
      { id: 'q4', question: 'FOMC decide...?', options: ['Il prezzo dell\'oro', 'I tassi di interesse della Fed USA', 'I dati sull\'occupazione', 'L\'inflazione'], correctIndex: 1, explanation: 'FOMC = Federal Open Market Committee = decisione tassi Fed. Alto impatto su tutti i mercati.' }
    ]
  }
]
