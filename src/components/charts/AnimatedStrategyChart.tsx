'use client'

/**
 * AnimatedStrategyChart — grafici a candele animati stile TradingView.
 * Le candele appaiono in sequenza, i livelli si disegnano, le etichette
 * "poppano": la strategia si vede accadere, non si legge soltanto.
 *
 * Scenari: po3 · turtle-model1 · kiss-of-death · order-block · fvg
 */

import { useEffect, useRef, useState } from 'react'

type Candle = { x: number; o: number; h: number; l: number; c: number; at: number; w?: number }
type Level = { p: number; x1: number; x2: number; label: string; color: string; at: number; dashed?: boolean; labelBelow?: boolean }
type Zone = { x1: number; x2: number; p1: number; p2: number; label: string; color: string; at: number }
type Pill = { x: number; p: number; text: string; color: string; at: number }
type Caption = { at: number; text: string }
type Badge = { x: number; text: string; at: number }
type Scenario = {
  candles: Candle[]; levels: Level[]; zones: Zone[]; pills: Pill[]
  captions: Caption[]; badges?: Badge[]; pmin: number; pmax: number; total: number
  divider?: number
}

const W = 720
const H = 400
const CH_TOP = 26
const CH_BOT = 330

/* ── timeline hook: elapsed che si riavvia in loop, parte quando visibile ── */
function useTimeline(total: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [elapsed, setElapsed] = useState(0)
  const [run, setRun] = useState(false)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setRun(true); return }
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!run) return
    const t0 = Date.now()
    const iv = setInterval(() => {
      const e = (Date.now() - t0) / 1000
      if (e > total + 2.6) { setCycle(c => c + 1); setElapsed(0) }
      else setElapsed(e)
    }, 90)
    return () => clearInterval(iv)
  }, [run, cycle, total])

  return { ref, elapsed, cycle, progress: Math.min(1, elapsed / total) }
}

function py(p: number, pmin: number, pmax: number) {
  return CH_BOT - ((p - pmin) / (pmax - pmin)) * (CH_BOT - CH_TOP)
}

/* ── scenari ──────────────────────────────────────────────────────────── */
export type ScenarioKey = 'po3' | 'turtle-model1' | 'kiss-of-death' | 'order-block' | 'fvg'

function buildScenario(key: ScenarioKey, en: boolean): Scenario {
  const GREEN = 'var(--green)'
  const RED = 'var(--red)'
  const GOLD = 'var(--gold)'
  const BLUE = '#00C2FF'

  if (key === 'po3') {
    const range: Array<[number, number, number, number]> = [
      [100, 112, 96, 108], [108, 118, 102, 115], [115, 126, 110, 122], [122, 128, 112, 116],
      [116, 120, 104, 107], [107, 114, 100, 111], [111, 127, 108, 124], [124, 129, 117, 119],
    ]
    const candles: Candle[] = range.map(([o, h, l, c], i) => ({ x: 60 + i * 52, o, h, l, c, at: 0.4 + i * 0.28 }))
    candles.push({ x: 60 + 8 * 52, o: 118, h: 121, l: 70, c: 100, at: 4.4 })
    ;[[100, 142, 98, 138], [138, 160, 133, 156], [156, 175, 151, 170]].forEach((cd, j) =>
      candles.push({ x: 60 + (9 + j) * 52, o: cd[0], h: cd[1], l: cd[2], c: cd[3], at: 6.4 + j * 0.35 }))
    return {
      candles,
      levels: [
        { p: 129, x1: 46, x2: 690, label: 'RANGE HIGH', color: GOLD, at: 3.0, dashed: true },
        { p: 96, x1: 46, x2: 690, label: 'RANGE LOW', color: GOLD, at: 3.2, dashed: true, labelBelow: true },
      ],
      zones: [],
      pills: [
        { x: 480, p: 70, text: en ? 'STOP HUNT ↓' : 'STOP HUNT ↓', color: RED, at: 5.3 },
        { x: 590, p: 178, text: en ? 'EXPANSION ↑' : 'ESPANSIONE ↑', color: GREEN, at: 7.4 },
      ],
      captions: [
        { at: 0.4, text: en ? '1 · The range: price accumulates, stops pile up at the edges' : '1 · Il range: il prezzo accumula, gli stop si ammassano ai bordi' },
        { at: 4.4, text: en ? '2 · Manipulation: fake break below the low. Stops taken' : '2 · Manipolazione: falsa rottura sotto il minimo. Stop presi' },
        { at: 6.4, text: en ? '3 · Expansion: the real move breaks the range high' : '3 · Espansione: la vera mossa rompe il range high' },
      ],
      pmin: 55, pmax: 195, total: 9,
    }
  }

  if (key === 'turtle-model1') {
    // sinistra: H4 con il range e il turtle soup — destra: M15 con il Model #1
    const htf: Candle[] = ([
      [120, 138, 112, 132], [132, 144, 126, 128], [128, 134, 114, 118], [118, 130, 112, 126],
    ] as Array<[number, number, number, number]>).map(([o, h, l, c], i) =>
      ({ x: 52 + i * 62, o, h, l, c, at: 0.4 + i * 0.32, w: 20 }))
    htf.push({ x: 52 + 4 * 62, o: 124, h: 128, l: 88, c: 116, at: 2.4, w: 20 })
    const ltf: Candle[] = ([
      [104, 108, 92, 96], [96, 100, 88, 91], [91, 97, 87, 95], [95, 112, 93, 109],
      [109, 118, 106, 115], [115, 130, 112, 127], [127, 142, 124, 139],
    ] as Array<[number, number, number, number]>).map(([o, h, l, c], i) =>
      ({ x: 420 + i * 40, o, h, l, c, at: 4.4 + i * 0.4, w: 13 }))
    return {
      candles: [...htf, ...ltf],
      levels: [
        { p: 144, x1: 40, x2: 348, label: 'CRT HIGH', color: GOLD, at: 1.9, dashed: true },
        { p: 112, x1: 40, x2: 348, label: 'CRT LOW', color: GOLD, at: 2.1, dashed: true, labelBelow: true },
        { p: 144, x1: 408, x2: 700, label: en ? 'TARGET · CRT HIGH' : 'TARGET · CRT HIGH', color: GREEN, at: 8.2, dashed: true },
      ],
      zones: [
        { x1: 540, x2: 596, p1: 97, p2: 106, label: 'FVG', color: BLUE, at: 6.6 },
      ],
      pills: [
        { x: 300, p: 84, text: 'TURTLE SOUP', color: RED, at: 3.2 },
        { x: 560, p: 78, text: en ? 'MODEL 2 \u00b7 FVG' : 'MODELLO 2 \u00b7 FVG', color: GOLD, at: 7.2 },
      ],
      badges: [
        { x: 60, text: 'H4', at: 0.4 },
        { x: 428, text: 'M15', at: 4.4 },
      ],
      captions: [
        { at: 0.4, text: en ? 'H4: the candle range is marked — CRT High / CRT Low' : 'H4: si marca il range della candela — CRT High / CRT Low' },
        { at: 2.4, text: en ? 'Wick below the CRT Low, close back above: Turtle Soup' : 'Wick sotto il CRT Low, richiusura sopra: Turtle Soup' },
        { at: 4.4, text: en ? 'Drop to M15: shift in structure, FVG left behind' : 'Si scende su M15: cambio di struttura, resta un FVG' },
        { at: 6.8, text: en ? 'Model 2: entry on the FVG left after the turtle soup' : 'Modello 2: entry sull\u2019FVG nato dopo il turtle soup' },
        { at: 8.4, text: en ? 'Target: the opposite side of the range \u2014 the CRT High' : 'Target: il lato opposto del range \u2014 il CRT High' },
      ],
      pmin: 62, pmax: 158, total: 11.5,
      divider: 385,
    }
  }

  if (key === 'kiss-of-death') {
    const candles: Candle[] = ([
      [80, 96, 76, 92], [92, 108, 88, 104], [104, 122, 100, 118], [118, 132, 114, 128],
      [128, 140, 124, 130], [130, 139, 121, 124], [124, 138, 120, 135],
    ] as Array<[number, number, number, number]>).map(([o, h, l, c], i) =>
      ({ x: 56 + i * 48, o, h, l, c, at: 0.4 + i * 0.32 }))
    candles.push({ x: 56 + 7 * 48, o: 135, h: 143, l: 126, c: 129, at: 3.1 })
    candles.push({ x: 56 + 8 * 48, o: 129, h: 133, l: 104, c: 108, at: 4.2 })
    candles.push({ x: 56 + 9 * 48, o: 108, h: 121, l: 103, c: 117, at: 5.2 })
    candles.push({ x: 56 + 10 * 48, o: 117, h: 120, l: 86, c: 90, at: 6.4 })
    candles.push({ x: 56 + 11 * 48, o: 90, h: 95, l: 70, c: 74, at: 6.9 })
    return {
      candles,
      levels: [
        { p: 140, x1: 44, x2: 690, label: en ? 'HIGH · liquidity' : 'HIGH · liquidità', color: GOLD, at: 2.6, dashed: true },
        { p: 118, x1: 44, x2: 690, label: en ? 'BROKEN SUPPORT' : 'SUPPORTO ROTTO', color: RED, at: 4.8, dashed: true, labelBelow: true },
      ],
      zones: [],
      pills: [
        { x: 440, p: 148, text: en ? 'DOUBLE TOP' : 'DOPPIO MASSIMO', color: RED, at: 3.6 },
        { x: 520, p: 132, text: 'KISS OF DEATH', color: RED, at: 5.6 },
      ],
      captions: [
        { at: 0.4, text: en ? 'Uptrend into a key high: liquidity sits above' : 'Trend rialzista verso un massimo chiave: sopra c\'è liquidità' },
        { at: 3.1, text: en ? 'Double top: the push fails twice at the same level' : 'Doppio massimo: la spinta fallisce due volte sullo stesso livello' },
        { at: 4.6, text: en ? 'Support breaks — then price returns to "kiss" it' : 'Il supporto si rompe — poi il prezzo torna a "baciarlo"' },
        { at: 6.4, text: en ? 'The kiss rejects: continuation down. Kiss of Death' : 'Il bacio respinge: continuazione al ribasso. Kiss of Death' },
      ],
      pmin: 58, pmax: 160, total: 9,
    }
  }

  if (key === 'order-block') {
    const candles: Candle[] = ([
      [120, 128, 112, 116], [116, 122, 108, 112], [112, 120, 106, 118],
    ] as Array<[number, number, number, number]>).map(([o, h, l, c], i) =>
      ({ x: 60 + i * 52, o, h, l, c, at: 0.4 + i * 0.32 }))
    candles.push({ x: 60 + 3 * 52, o: 118, h: 126, l: 114, c: 124, at: 1.5 }) // ultima candela up = OB
    candles.push({ x: 60 + 4 * 52, o: 124, h: 127, l: 96, c: 100, at: 2.4 })
    candles.push({ x: 60 + 5 * 52, o: 100, h: 106, l: 82, c: 86, at: 2.9 })
    candles.push({ x: 60 + 6 * 52, o: 86, h: 92, l: 74, c: 78, at: 3.4 })
    candles.push({ x: 60 + 7 * 52, o: 78, h: 102, l: 76, c: 98, at: 5.0 })
    candles.push({ x: 60 + 8 * 52, o: 98, h: 122, l: 96, c: 104, at: 5.6 }) // ritorno nell'OB
    candles.push({ x: 60 + 9 * 52, o: 104, h: 110, l: 84, c: 88, at: 7.2 })
    candles.push({ x: 60 + 10 * 52, o: 88, h: 92, l: 66, c: 70, at: 7.7 })
    return {
      candles,
      levels: [],
      zones: [
        { x1: 200, x2: 660, p1: 114, p2: 126, label: 'ORDER BLOCK', color: GOLD, at: 4.2 },
      ],
      pills: [
        { x: 500, p: 134, text: en ? 'RETEST OB' : 'RITEST OB', color: GOLD, at: 6.2 },
        { x: 610, p: 60, text: en ? 'CONTINUATION ↓' : 'CONTINUAZIONE ↓', color: RED, at: 8.2 },
      ],
      captions: [
        { at: 0.4, text: en ? 'The last bullish candle before the impulsive drop…' : 'L\'ultima candela rialzista prima della discesa impulsiva…' },
        { at: 4.2, text: en ? '…is the Order Block: where institutions placed orders' : '…è l\'Order Block: dove le istituzioni hanno piazzato ordini' },
        { at: 5.6, text: en ? 'Price returns into the zone to mitigate' : 'Il prezzo torna nella zona per mitigare' },
        { at: 7.2, text: en ? 'Rejection and continuation: the OB held' : 'Rigetto e continuazione: l\'OB ha tenuto' },
      ],
      pmin: 55, pmax: 145, total: 9.4,
    }
  }

  // fvg
  const candles: Candle[] = ([
    [96, 104, 90, 100], [100, 106, 94, 98], [98, 105, 92, 102],
  ] as Array<[number, number, number, number]>).map(([o, h, l, c], i) =>
    ({ x: 60 + i * 52, o, h, l, c, at: 0.4 + i * 0.3 }))
  candles.push({ x: 60 + 3 * 52, o: 102, h: 112, l: 98, c: 110, at: 1.5 })   // candela 1
  candles.push({ x: 60 + 4 * 52, o: 110, h: 148, l: 108, c: 144, at: 2.1 })  // candela 2 impulsiva
  candles.push({ x: 60 + 5 * 52, o: 144, h: 156, l: 138, c: 150, at: 2.7 })  // candela 3
  candles.push({ x: 60 + 6 * 52, o: 150, h: 154, l: 132, c: 136, at: 4.6 })
  candles.push({ x: 60 + 7 * 52, o: 136, h: 140, l: 116, c: 121, at: 5.2 })  // rientra nel gap
  candles.push({ x: 60 + 8 * 52, o: 121, h: 146, l: 119, c: 142, at: 6.8 })
  candles.push({ x: 60 + 9 * 52, o: 142, h: 168, l: 140, c: 162, at: 7.4 })
  return {
    candles,
    levels: [],
    zones: [
      { x1: 216, x2: 620, p1: 112, p2: 138, label: 'FVG', color: '#00C2FF', at: 3.6 },
    ],
    pills: [
      { x: 430, p: 104, text: en ? 'GAP FILLED' : 'GAP RIEMPITO', color: '#00C2FF', at: 5.9 },
      { x: 560, p: 172, text: en ? 'CONTINUATION ↑' : 'CONTINUAZIONE ↑', color: GREEN, at: 8.0 },
    ],
    captions: [
      { at: 0.4, text: en ? 'An impulsive candle leaves an inefficiency behind' : 'Una candela impulsiva lascia dietro di sé un\'inefficienza' },
      { at: 3.6, text: en ? 'Fair Value Gap: the space between candle 1 high and candle 3 low' : 'Fair Value Gap: lo spazio tra il massimo della 1ª e il minimo della 3ª' },
      { at: 5.2, text: en ? 'Price comes back to rebalance the gap' : 'Il prezzo torna a ribilanciare il gap' },
      { at: 6.8, text: en ? 'Rebalanced: the move continues in the original direction' : 'Ribilanciato: il movimento continua nella direzione originale' },
    ],
    pmin: 82, pmax: 178, total: 9.4,
  }
}

/* ── componente ───────────────────────────────────────────────────────── */
export default function AnimatedStrategyChart({
  scenario, lang = 'it', className = '',
}: { scenario: ScenarioKey; lang?: string; className?: string }) {
  const en = lang === 'en'
  const sc = buildScenario(scenario, en)
  const { ref, elapsed, cycle, progress } = useTimeline(sc.total)
  const cap = [...sc.captions].reverse().find(c => elapsed >= c.at)

  return (
    <div ref={ref} className={`vx-anim-chart rounded-xl overflow-hidden ${className}`}
      style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" key={cycle}>
        {/* griglia */}
        {[0.2, 0.4, 0.6, 0.8].map(f => {
          const y = CH_TOP + (CH_BOT - CH_TOP) * f
          return <line key={f} x1={30} y1={y} x2={W - 30} y2={y} stroke="var(--border)" strokeWidth="1" opacity="0.5" />
        })}
        {/* watermark */}
        <text x={W / 2} y={(CH_TOP + CH_BOT) / 2} fontSize="26" fill="var(--text-muted)" opacity="0.14"
          textAnchor="middle" fontWeight="800" letterSpacing="4">XAU/USD</text>

        {/* divisore timeframe (scenario multi-TF) */}
        {sc.divider && (
          <line x1={sc.divider} y1={CH_TOP - 6} x2={sc.divider} y2={CH_BOT + 6}
            stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 5" />
        )}

        {/* badge timeframe */}
        {sc.badges?.filter(b => elapsed >= b.at).map(b => (
          <g key={b.text} className="vx-pop">
            <rect x={b.x} y={CH_TOP - 4} width={44} height={26} rx={7}
              fill="color-mix(in srgb, var(--gold) 14%, transparent)"
              stroke="color-mix(in srgb, var(--gold) 40%, transparent)" />
            <text x={b.x + 22} y={CH_TOP + 14} fontSize="13" fill="var(--gold)" fontWeight="800" textAnchor="middle">{b.text}</text>
          </g>
        ))}

        {/* zone (OB / FVG) */}
        {sc.zones.filter(z => elapsed >= z.at).map(z => {
          const y1 = py(Math.max(z.p1, z.p2), sc.pmin, sc.pmax)
          const y2 = py(Math.min(z.p1, z.p2), sc.pmin, sc.pmax)
          return (
            <g key={z.label + z.x1} className="vx-fade">
              <rect x={z.x1} y={y1} width={z.x2 - z.x1} height={y2 - y1} rx={4}
                fill={`color-mix(in srgb, ${z.color} 12%, transparent)`}
                stroke={`color-mix(in srgb, ${z.color} 45%, transparent)`} strokeWidth="1" strokeDasharray="4 3" />
              <text x={z.x1 + 8} y={y1 + 16} fontSize="12" fill={z.color} fontWeight="800">{z.label}</text>
            </g>
          )
        })}

        {/* livelli */}
        {sc.levels.filter(lv => elapsed >= lv.at).map(lv => {
          const y = py(lv.p, sc.pmin, sc.pmax)
          return (
            <g key={lv.label + lv.x1}>
              <line x1={lv.x1} y1={y} x2={lv.x2} y2={y} stroke={lv.color} strokeWidth="1.6"
                strokeDasharray={lv.dashed ? '7 5' : undefined} className="vx-draw" />
              <text x={lv.x1 + 4} y={lv.labelBelow ? y + 16 : y - 7} fontSize="11.5"
                fill={lv.color} fontWeight="800" className="vx-fade">{lv.label}</text>
            </g>
          )
        })}

        {/* candele */}
        {sc.candles.filter(cd => elapsed >= cd.at).map(cd => {
          const up = cd.c >= cd.o
          const col = up ? 'var(--green)' : 'var(--red)'
          const w = cd.w ?? 16
          const yH = py(cd.h, sc.pmin, sc.pmax)
          const yL = py(cd.l, sc.pmin, sc.pmax)
          const yT = py(Math.max(cd.o, cd.c), sc.pmin, sc.pmax)
          const yB = py(Math.min(cd.o, cd.c), sc.pmin, sc.pmax)
          return (
            <g key={cd.x} className="vx-candle">
              <line x1={cd.x} y1={yH} x2={cd.x} y2={yL} stroke={col} strokeWidth="2.4" />
              <rect x={cd.x - w / 2} y={yT} width={w} height={Math.max(2.5, yB - yT)} fill={col} rx={1.6} />
            </g>
          )
        })}

        {/* pill etichette */}
        {sc.pills.filter(pl => elapsed >= pl.at).map(pl => {
          const y = py(pl.p, sc.pmin, sc.pmax)
          const tw = pl.text.length * 7.6 + 22
          return (
            <g key={pl.text} className="vx-pop">
              <rect x={pl.x - tw / 2} y={y - 13} width={tw} height={26} rx={13} fill={pl.color} />
              <text x={pl.x} y={y + 4.5} fontSize="12" fill="#fff" fontWeight="800" textAnchor="middle">{pl.text}</text>
            </g>
          )
        })}

        {/* caption in basso */}
        {cap && (
          <g key={cap.at} className="vx-fade">
            <rect x={26} y={H - 52} width={W - 52} height={36} rx={10}
              fill="color-mix(in srgb, var(--bg-primary, #0A0A14) 78%, transparent)"
              stroke="color-mix(in srgb, var(--gold) 30%, transparent)" />
            <text x={44} y={H - 29} fontSize="13.5" fill="var(--text-primary)" fontWeight="600">{cap.text}</text>
          </g>
        )}

        {/* barra progresso replay */}
        <rect x={0} y={H - 3} width={W * progress} height={3} fill="var(--gold)" opacity="0.7" />
      </svg>
    </div>
  )
}
