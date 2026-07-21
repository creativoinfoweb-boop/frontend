'use client'

/**
 * CRTPillars — la panoramica completa della strategia CRT sotto il grafico animato.
 * Spiega "un po' di tutto" a chi arriva sulla landing: dai fondamenti (Power of Three,
 * frattalità) agli ingressi (Model 1/2), alle conferme (SMT, Key Level), fino al
 * rischio/rendimento e alla psicologia. Ogni pilastro ha una mini-illustrazione.
 */

import { useEffect, useRef, useState } from 'react'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setOn(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true) }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, on }
}

/* mini-diagrammi SVG (statici, puliti) */
function MiniPO3() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-auto">
      <line x1="6" y1="20" x2="114" y2="20" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
      <line x1="6" y1="52" x2="114" y2="52" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
      <rect x="22" y="26" width="9" height="20" rx="1.5" fill="var(--red)" />
      <line x1="55" y1="30" x2="55" y2="64" stroke="var(--green)" strokeWidth="1.5" />
      <rect x="50" y="30" width="10" height="14" rx="1.5" fill="var(--green)" />
      <rect x="82" y="8" width="9" height="34" rx="1.5" fill="var(--green)" />
    </svg>
  )
}
function MiniFractal() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-auto">
      <rect x="10" y="14" width="44" height="42" rx="3" fill="none" stroke="var(--border-light)" strokeWidth="1.2" />
      <rect x="24" y="24" width="7" height="22" rx="1" fill="var(--gold)" />
      <path d="M58 35 L70 35" stroke="var(--gold)" strokeWidth="1.4" />
      <path d="M66 31 L70 35 L66 39" fill="none" stroke="var(--gold)" strokeWidth="1.4" />
      <rect x="74" y="20" width="30" height="30" rx="3" fill="none" stroke="var(--border-light)" strokeWidth="1.2" />
      <rect x="80" y="30" width="4" height="14" rx="1" fill="var(--green)" />
      <rect x="88" y="26" width="4" height="18" rx="1" fill="var(--red)" />
      <rect x="96" y="24" width="4" height="20" rx="1" fill="var(--green)" />
    </svg>
  )
}
function MiniTurtle() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-auto">
      <line x1="6" y1="46" x2="114" y2="46" stroke="#fff" strokeWidth="1.2" opacity="0.55" />
      <rect x="30" y="24" width="9" height="18" rx="1.5" fill="var(--red)" />
      <line x1="60" y1="18" x2="60" y2="60" stroke="var(--green)" strokeWidth="1.6" />
      <rect x="55" y="22" width="10" height="16" rx="1.5" fill="var(--green)" />
      <path d="M60 64 l-5 -8 l10 0 z" fill="var(--gold)" />
    </svg>
  )
}
function MiniEntries() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-auto">
      <rect x="14" y="30" width="70" height="12" rx="2" fill="color-mix(in srgb, var(--gold) 18%, transparent)" stroke="var(--gold)" strokeWidth="0.8" />
      <text x="16" y="27" fontSize="7" fill="var(--gold)" fontWeight="700">OB</text>
      <rect x="40" y="44" width="64" height="10" rx="2" fill="color-mix(in srgb, #7ab4ff 20%, transparent)" stroke="#7ab4ff" strokeWidth="0.8" />
      <text x="86" y="66" fontSize="7" fill="#7ab4ff" fontWeight="700">FVG</text>
      <rect x="26" y="24" width="6" height="26" rx="1" fill="var(--green)" />
      <rect x="52" y="34" width="6" height="22" rx="1" fill="var(--red)" />
    </svg>
  )
}
function MiniSMT() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-auto">
      <line x1="6" y1="28" x2="60" y2="28" stroke="#fff" strokeWidth="1" opacity="0.5" />
      <path d="M14 18 L26 24 L38 32" fill="none" stroke="var(--red)" strokeWidth="1.6" />
      <path d="M38 32 l-4 -1 l1 4" fill="var(--gold)" />
      <line x1="64" y1="50" x2="114" y2="50" stroke="#fff" strokeWidth="1" opacity="0.5" />
      <path d="M72 40 L84 45 L96 44" fill="none" stroke="var(--green)" strokeWidth="1.6" />
      <circle cx="96" cy="44" r="2.4" fill="var(--green)" />
    </svg>
  )
}
function MiniRR() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-auto">
      <rect x="52" y="46" width="16" height="10" rx="1.5" fill="color-mix(in srgb, var(--red) 40%, transparent)" stroke="var(--red)" strokeWidth="0.8" />
      <rect x="52" y="8" width="16" height="38" rx="1.5" fill="color-mix(in srgb, var(--green) 30%, transparent)" stroke="var(--green)" strokeWidth="0.8" />
      <text x="74" y="30" fontSize="9" fill="var(--green)" fontWeight="800">1:10</text>
    </svg>
  )
}
function MiniMind() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-auto">
      <circle cx="60" cy="35" r="20" fill="none" stroke="var(--gold)" strokeWidth="1.4" />
      <path d="M52 35 a8 8 0 0 1 16 0" fill="none" stroke="var(--gold)" strokeWidth="1.4" />
      <circle cx="60" cy="35" r="3" fill="var(--gold)" />
    </svg>
  )
}
function MiniTF() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-auto">
      {['W', 'D', 'H4', 'M15'].map((tf, i) => (
        <g key={tf}>
          <rect x={8 + i * 28} y="26" width="22" height="18" rx="3" fill="color-mix(in srgb, var(--gold) 10%, transparent)" stroke="var(--gold)" strokeWidth="0.8" />
          <text x={19 + i * 28} y="38" fontSize="7" fill="var(--gold)" fontWeight="700" textAnchor="middle">{tf}</text>
          {i < 3 && <path d={`M${31 + i * 28} 35 l5 0`} stroke="var(--gold)" strokeWidth="1" />}
        </g>
      ))}
    </svg>
  )
}

export default function CRTPillars({ lang = 'it' }: { lang?: string }) {
  const en = lang === 'en'
  const { ref, on } = useReveal()

  const pillars = [
    { d: <MiniPO3 />, t: en ? 'Power of Three' : 'Power of Three',
      x: en ? 'Every candle is a range: accumulation, manipulation, expansion. The market repeats it endlessly.'
            : 'Ogni candela è un range: accumulo, manipolazione, espansione. Il mercato lo ripete all’infinito.' },
    { d: <MiniFractal />, t: en ? 'Fractality' : 'Frattalità',
      x: en ? 'The monthly candle is a 1H candle printing slowly. Same structure at every speed.'
            : 'La candela mensile è una candela da 1H che stampa lenta. Stessa struttura ad ogni velocità.' },
    { d: <MiniTF />, t: en ? 'Timeframe pairing' : 'Coppie di timeframe',
      x: en ? 'Setup on the higher TF, entry on the paired lower one: Weekly→4H, Daily→1H, 4H→15m.'
            : 'Setup sul TF alto, entry sul TF minore accoppiato: Weekly→4H, Daily→1H, 4H→15m.' },
    { d: <MiniTurtle />, t: 'Turtle Soup',
      x: en ? 'The false breakout: wick beyond the level, close back inside. The fuel behind every move.'
            : 'La falsa rottura: wick oltre il livello, richiusura dentro. Il carburante di ogni movimento.' },
    { d: <MiniEntries />, t: en ? 'Entries: Model 1 & 2' : 'Ingressi: Model 1 e 2',
      x: en ? 'Model 1 = origin of the order block. Model 2 = the FVG left after the turtle soup.'
            : 'Model 1 = origine dell’order block. Model 2 = l’FVG lasciato dopo il turtle soup.' },
    { d: <MiniSMT />, t: 'SMT',
      x: en ? 'Two correlated assets: one sweeps liquidity, the other doesn’t. The manipulation is exposed.'
            : 'Due asset correlati: uno spazza la liquidità, l’altro no. La manipolazione è smascherata.' },
    { d: <MiniRR />, t: en ? 'Risk / Reward' : 'Rischio / Rendimento',
      x: en ? 'Tiny stop below the spike, target the opposite side of the range: 1:5 to 1:10 on weekly setups.'
            : 'Stop minimo sotto lo spike, target il lato opposto del range: da 1:5 a 1:10 sui setup settimanali.' },
    { d: <MiniMind />, t: en ? 'Psychology & execution' : 'Psicologia ed esecuzione',
      x: en ? 'Knowing the script isn’t enough. It must be executed without fear or greed — every time.'
            : 'Conoscere il copione non basta. Va eseguito senza paura né avidità — ogni volta.' },
  ]

  return (
    <div ref={ref} className="mt-14">
      <div className="text-center mb-8">
        <div className="section-label mb-2">{en ? 'THE FULL PICTURE' : 'IL QUADRO COMPLETO'}</div>
        <h3 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
          {en ? 'One strategy, eight building blocks' : 'Una strategia, otto pilastri'}
        </h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((p, i) => (
          <div key={p.t}
            className="card-premium p-5 flex flex-col"
            style={{
              opacity: on ? 1 : 0,
              transform: on ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity .5s ease ${i * 90}ms, transform .5s ease ${i * 90}ms`,
            }}>
            <div className="mb-3 rounded-lg p-2" style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}>
              {p.d}
            </div>
            <h4 className="font-bold text-sm mb-1.5" style={{ color: 'var(--accent)' }}>{p.t}</h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.x}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
