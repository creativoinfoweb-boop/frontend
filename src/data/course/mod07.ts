import type { Lesson } from './index'

export const mod07lessons: Lesson[] = [
  {
    id: '07-01', moduleId: '07', order: 1, title: 'Dalla teoria alla pratica: perché automatizzare', summary: 'Il passo logico che chiude il cerchio tra metodo e disciplina.', estimatedMinutes: 6,
    blocks: [
      { type: 'heading', text: 'Hai imparato il metodo. Ora?' },
      { type: 'paragraph', text: 'Conosci SMC, OB, FVG, sweep, MSS, risk management. La domanda è: riesci ad applicarlo con coerenza al 100% delle operazioni, ogni giorno, senza eccezioni?' },
      { type: 'list', items: ['Trading manuale: ogni giornata richiede concentrazione massima', 'L\'emotività entra sempre — anche con il metodo migliore', 'Un\'esecuzione incoerente su 100 trade produce risultati casuali', 'L\'automatizzazione risolve il problema alla radice'] },
      { type: 'callout', variant: 'info', text: 'Il Sistema El Dorado applica esattamente questo metodo 24/5 — senza stress, senza eccezioni, senza giorni di forma negativa.' }
    ],
    quiz: [
      { id: 'q1', question: 'Qual è il problema del trading manuale anche con buona strategia?', options: ['La strategia è sbagliata', 'L\'esecuzione incoerente per via dell\'emotività', 'Il broker', 'I costi di spread'], correctIndex: 1, explanation: 'Metodo perfetto + esecuzione inconsistente = risultati casuali nel lungo periodo.' },
      { id: 'q2', question: 'Cosa risolve l\'automatizzazione?', options: ['Il problema di strategia', 'L\'inconsistenza esecutiva dovuta all\'emotività', 'Il rischio di mercato', 'Lo spread'], correctIndex: 1, explanation: 'L\'automatizzazione esegue ogni trade con la stessa logica — nessuna emotività.' },
      { id: 'q3', question: 'Dopo aver studiato il metodo, qual è il passo logico?', options: ['Iniziare subito in live', 'Testare in demo con il sistema automatizzato', 'Smettere di studiare', 'Vendere segnali'], correctIndex: 1, explanation: 'Prima demo: vedi il metodo applicato in condizioni reali, senza rischio.' }
    ]
  },
  {
    id: '07-02', moduleId: '07', order: 2, title: 'Collegare il conto demo MT5', summary: 'Procedura pratica per connettere il conto demo alla piattaforma.', estimatedMinutes: 8,
    blocks: [
      { type: 'heading', text: 'Procedura' },
      { type: 'list', items: ['1. Apri un conto demo presso un broker ECN (Exness, IC Markets, Pepperstone)', '2. Ottieni: numero conto, password investor, server MT5', '3. Vai su Dashboard → Account MT5 → Aggiungi Account', '4. Inserisci le credenziali (cifrate AES-128 — nessuno le legge)', '5. Verifica la connessione — status "Connesso" in verde'] },
      { type: 'callout', variant: 'success', text: 'Con un conto demo non rischi nulla — osservi il sistema in azione in condizioni di mercato reali.' },
      { type: 'callout', variant: 'warning', text: 'NON aprire trade manuali sul conto collegato. Interferisci con la logica del sistema.' }
    ],
    quiz: [
      { id: 'q1', question: 'Quale credenziale NON devi inserire nella piattaforma?', options: ['Numero conto', 'Password investor', 'Server MT5', 'Password master (trading)'], correctIndex: 3, explanation: 'La password master permette di aprire trade — non è necessaria. Usa la password investor (read-only).' },
      { id: 'q2', question: 'Cosa succede se apri trade manuali sul conto collegato?', options: ['Niente', 'Interferisci con la logica del sistema', 'Guadagni di più', 'Il sistema si ferma'], correctIndex: 1, explanation: 'Trade manuali sul conto collegato rompono la coerenza operativa del sistema.' },
      { id: 'q3', question: 'Quale broker tipo consigliamo?', options: ['Market Maker con spread alto', 'ECN con spread basso', 'CFD broker senza leva', 'Qualsiasi'], correctIndex: 1, explanation: 'ECN: spread basso, esecuzione rapida. Cruciale per scalping su XAU/USD.' }
    ]
  },
  {
    id: '07-03', moduleId: '07', order: 3, title: 'Monitorare ogni trade dalla dashboard', summary: 'Leggere la dashboard per capire cosa sta succedendo.', estimatedMinutes: 7,
    blocks: [
      { type: 'heading', text: 'Cosa trovi nella dashboard' },
      { type: 'list', items: ['Trade aperti: entry, SL, TP1/TP2, P/L in tempo reale', 'Storico: tutti i trade chiusi con dettagli', 'Statistiche: win rate, profit factor, avg duration', 'Equity curve: andamento del capitale nel tempo', 'Alert: notifiche per TP hit, SL hit, errori di connessione'] },
      { type: 'callout', variant: 'info', text: 'Non aprire MT5 per verificare — usa la dashboard. È il tuo pannello di controllo.' },
      { type: 'example', title: 'Workflow quotidiano', body: '09:00: apri dashboard, verifica connessione. 11:00: controlla se ci sono trade aperti. 17:00: leggi il riepilogo giornaliero. 1 volta a settimana: analizza le statistiche.' }
    ],
    quiz: [
      { id: 'q1', question: 'Dove vedi i trade in tempo reale?', options: ['Su MT5', 'Nella sezione Trade aperti della dashboard', 'Su ForexFactory', 'Via email'], correctIndex: 1, explanation: 'La dashboard mostra tutto in tempo reale — non serve aprire MT5.' },
      { id: 'q2', question: 'Quante volte al giorno dovresti verificare la dashboard?', options: ['Continuamente ogni minuto', 'Al mattino, a metà giornata e fine giornata', 'Una volta a settimana', 'Mai'], correctIndex: 1, explanation: 'Mattina (connessione), metà giornata (trade aperti), sera (riepilogo). No monitoraggio ossessivo.' },
      { id: 'q3', question: 'L\'equity curve mostra...?', options: ['Il prezzo dell\'oro', 'L\'andamento del tuo capitale nel tempo', 'I segnali futuri', 'Le statistiche del mercato'], correctIndex: 1, explanation: 'Equity curve = grafico del capitale nel tempo = misura oggettiva dell\'andamento.' }
    ]
  },
  {
    id: '07-04', moduleId: '07', order: 4, title: 'Leggere le statistiche operative', summary: 'Come interpretare win rate, profit factor e drawdown.', estimatedMinutes: 8,
    blocks: [
      { type: 'heading', text: 'Le metriche fondamentali' },
      { type: 'list', items: ['Win Rate: % trade in profitto. Target: >55% (con TP frazionati)', 'Profit Factor: guadagni totali / perdite totali. Target: >1.5', 'Max Drawdown: calo massimo dal peak. Target: <15%', 'Avg Duration: durata media trade. Scalping: 10-60 min', 'R:R medio: gain medio / loss medio. Target: >1.5:1'] },
      { type: 'example', title: 'Lettura reale', body: 'Win rate 62%, PF 2.1, Max DD 8%, Avg duration 22 min: statistiche eccellenti. Queste indicano che il sistema sta operando secondo il metodo.' },
      { type: 'callout', variant: 'warning', text: 'Un mese negativo non invalida il sistema. Valuta le statistiche su 50+ trade — non su 5.' }
    ],
    quiz: [
      { id: 'q1', question: 'Profit Factor 2.0 significa...?', options: ['50% win rate', 'I guadagni sono il doppio delle perdite', 'R/R 2:1 fisso', 'Profitto mensile del 2%'], correctIndex: 1, explanation: 'PF 2.0 = per ogni $1 perso, guadagni $2. Target sano: PF > 1.5.' },
      { id: 'q2', question: 'Su quanti trade minimo valuti le statistiche?', options: ['5', '20', '50+', '100+'], correctIndex: 2, explanation: 'Statisticamente significativo da 50+ trade. Sotto quella soglia è solo rumore.' },
      { id: 'q3', question: 'Max Drawdown del 8% su conto $1000 significa...?', options: ['Perdita di $80 dal picco', 'Perdita di $80 totale', 'Perdita di $8', 'Perdita di $800'], correctIndex: 0, explanation: 'Max DD 8% su $1000 = -$80 dal massimo raggiunto. Accettabile sotto il 15%.' }
    ]
  },
  {
    id: '07-05', moduleId: '07', order: 5, title: 'Da demo a live: quando fare il passo', summary: 'I criteri oggettivi per passare al conto reale.', estimatedMinutes: 8,
    blocks: [
      { type: 'heading', text: 'I criteri di promozione' },
      { type: 'list', items: ['Minimo 50 trade completati in demo', 'Win rate ≥ 55% su quei 50 trade', 'Profit Factor ≥ 1.5', 'Max Drawdown ≤ 15%', 'Nessuna modifica delle 10 Regole del NO nelle ultime 4 settimane', 'Conosci ogni lezione dei moduli 01-06'] },
      { type: 'callout', variant: 'success', text: '🏆 Hai completato il metodo. Se soddisfi questi criteri, il passo al live è una scelta informata — non emotiva.' },
      { type: 'paragraph', text: 'Se non soddisfi ancora tutti i criteri: non preoccuparti. Demo è gratis. Ogni trade in demo è un trade imparato senza rischio reale.' },
      { type: 'callout', variant: 'info', text: 'Il Sistema El Dorado applica questo stesso metodo automaticamente. Attivare il live significa delegare l\'esecuzione — mantenendo il tuo controllo totale sui parametri.' }
    ],
    quiz: [
      { id: 'q1', question: 'Quanti trade demo minimo prima di passare al live?', options: ['10', '30', '50', '100'], correctIndex: 2, explanation: 'Minimo 50 trade: statisticamente significativo per valutare il sistema.' },
      { id: 'q2', question: 'Qual è il Max Drawdown massimo accettabile per il live?', options: ['5%', '10%', '15%', '25%'], correctIndex: 2, explanation: 'Max DD ≤ 15% in demo → sistema operante entro parametri accettabili.' },
      { id: 'q3', question: 'Se non soddisfi i criteri, cosa fai?', options: ['Passi al live comunque', 'Continui in demo finché non li soddisfi', 'Cambi strategia', 'Smetti'], correctIndex: 1, explanation: 'Demo è gratuita e illimitata. Nessuna fretta — ogni settimana di demo è dati gratuiti.' }
    ]
  }
]
