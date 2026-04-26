import type { DiagramKey } from '@/data/course'

function SessionsDiagram() {
  return (
    <svg viewBox="0 0 800 150" className="w-full h-auto">
      <defs>
        <linearGradient id="grad-asia" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--gold)', stopOpacity: 0.12 }} />
          <stop offset="100%" style={{ stopColor: 'var(--gold)', stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id="grad-london" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--green)', stopOpacity: 0.15 }} />
          <stop offset="100%" style={{ stopColor: 'var(--green)', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <rect x="0" y="30" width="267" height="75" fill="url(#grad-asia)" rx="4" />
      <rect x="267" y="30" width="200" height="75" fill="url(#grad-london)" rx="4" />
      <rect x="467" y="30" width="133" height="75" fill="rgba(255,80,80,0.07)" rx="4" />
      <rect x="600" y="30" width="200" height="75" fill="url(#grad-asia)" rx="4" />
      <line x1="0" y1="105" x2="800" y2="105" stroke="var(--border)" strokeWidth="1.5" />
      <line x1="267" y1="25" x2="267" y2="110" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="467" y1="25" x2="467" y2="110" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="600" y1="25" x2="600" y2="110" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="133" y="72" fontSize="11" fill="var(--gold)" textAnchor="middle" fontWeight="700">ASIA</text>
      <text x="133" y="86" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">00:00 – 08:00</text>
      <text x="367" y="68" fontSize="11" fill="var(--green)" textAnchor="middle" fontWeight="700">LONDRA KILL ZONE</text>
      <text x="367" y="82" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">09:00 – 12:00</text>
      <text x="533" y="72" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">12–14</text>
      <text x="700" y="72" fontSize="11" fill="var(--gold)" textAnchor="middle" fontWeight="700">NEW YORK</text>
      <text x="700" y="86" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">14:30 – 17:00</text>
    </svg>
  )
}

function LiquiditySweepDiagram() {
  return (
    <svg viewBox="0 0 700 220" className="w-full h-auto">
      <g stroke="var(--border)" strokeWidth="1" opacity="0.2">
        {[60, 110, 160].map(y => <line key={y} x1="0" y1={y} x2="700" y2={y} />)}
      </g>
      {/* BSL level */}
      <line x1="40" y1="80" x2="660" y2="80" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="50" y="74" fontSize="11" fill="var(--gold)" fontWeight="600">BSL</text>
      {/* Build-up candles */}
      {[
        { x: 80, open: 140, close: 120, low: 145, high: 115 },
        { x: 120, open: 120, close: 100, low: 124, high: 96 },
        { x: 160, open: 100, close: 90, low: 104, high: 87 },
        { x: 200, open: 90, close: 85, low: 93, high: 82 },
        { x: 240, open: 85, close: 88, low: 89, high: 80 },
      ].map(({ x, open, close, low, high }) => (
        <g key={x}>
          <line x1={x + 5} y1={high} x2={x + 5} y2={low} stroke="var(--green)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(open, close)} width="10" height={Math.abs(open - close) || 2} fill="var(--green)" rx="1" />
        </g>
      ))}
      {/* Sweep candle — wicks above BSL */}
      <g>
        <line x1="285" y1="68" x2="285" y2="145" stroke="var(--red)" strokeWidth="1.5" />
        <rect x="280" y="90" width="10" height="40" fill="var(--red)" rx="1" />
        <text x="270" y="62" fontSize="10" fill="var(--gold)" fontWeight="700">SWEEP</text>
      </g>
      {/* MSS — strong bearish + annotation */}
      {[
        { x: 320, open: 128, close: 158, low: 162, high: 125 },
        { x: 360, open: 158, close: 172, low: 175, high: 155 },
        { x: 400, open: 172, close: 165, low: 177, high: 162 },
      ].map(({ x, open, close, low, high }) => (
        <g key={x}>
          <line x1={x + 5} y1={high} x2={x + 5} y2={low} stroke="var(--red)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(open, close)} width="10" height={Math.abs(open - close) || 2} fill="var(--red)" rx="1" />
        </g>
      ))}
      <line x1="320" y1="125" x2="430" y2="125" stroke="var(--red)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="440" y="128" fontSize="10" fill="var(--red)" fontWeight="700">MSS</text>
      <text x="80" y="205" fontSize="11" fill="var(--text-secondary)" fontWeight="500">① Build-up liquidity  ② Sweep BSL  ③ MSS = inversione</text>
    </svg>
  )
}

function RiskRewardDiagram() {
  return (
    <svg viewBox="0 0 320 280" className="w-full h-auto">
      <g stroke="var(--border)" strokeWidth="1" opacity="0.15">
        {[60, 110, 160, 210].map(y => <line key={y} x1="20" y1={y} x2="300" y2={y} />)}
      </g>
      {/* Candle at entry */}
      <line x1="80" y1="50" x2="80" y2="230" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
      {/* Entry */}
      <line x1="20" y1="160" x2="300" y2="160" stroke="var(--text-secondary)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="25" y="155" fontSize="10" fill="var(--text-secondary)" fontWeight="600">ENTRY</text>
      {/* SL */}
      <line x1="20" y1="210" x2="300" y2="210" stroke="var(--red)" strokeWidth="1.5" />
      <text x="25" y="225" fontSize="10" fill="var(--red)" fontWeight="600">SL  −1R</text>
      <rect x="60" y="160" width="40" height="50" fill="var(--red)" opacity="0.18" />
      {/* TP1 */}
      <line x1="20" y1="110" x2="300" y2="110" stroke="var(--green)" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="25" y="105" fontSize="10" fill="var(--green)" fontWeight="600">TP1  +1R (50%)</text>
      <rect x="60" y="110" width="40" height="50" fill="var(--green)" opacity="0.18" />
      {/* TP2 */}
      <line x1="20" y1="70" x2="300" y2="70" stroke="var(--green)" strokeWidth="2" />
      <text x="25" y="65" fontSize="10" fill="var(--green)" fontWeight="700">TP2  +2R (30%)</text>
      {/* Bracket labels */}
      <path d="M 240 210 L 252 210 L 252 110 L 240 110" stroke="var(--green)" fill="none" strokeWidth="1.2" />
      <text x="256" y="165" fontSize="10" fill="var(--green)" fontWeight="700">R</text>
      <path d="M 240 160 L 252 160 L 252 210 L 240 210" stroke="var(--red)" fill="none" strokeWidth="1.2" />
      <text x="256" y="192" fontSize="10" fill="var(--red)" fontWeight="700">R</text>
    </svg>
  )
}

function BosMssDiagram() {
  // Points defining price path: uptrend with BOS, then LH + LL (MSS)
  const pts = [
    [30, 190], [90, 130], [130, 155], [200, 80], [240, 110], [320, 45], [360, 75],
    [430, 120], [480, 95], [560, 165], [600, 140], [660, 200],
  ]
  const poly = pts.map(p => p.join(',')).join(' ')
  return (
    <svg viewBox="0 0 700 240" className="w-full h-auto">
      <g stroke="var(--border)" strokeWidth="1" opacity="0.15">
        {[60, 120, 180].map(y => <line key={y} x1="0" y1={y} x2="700" y2={y} />)}
      </g>
      <polyline points={poly} fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* BOS1 — break above first high */}
      <line x1="90" y1="130" x2="360" y2="130" stroke="var(--green)" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
      <text x="95" y="124" fontSize="10" fill="var(--green)" fontWeight="700">BOS</text>
      {/* BOS2 */}
      <line x1="200" y1="80" x2="360" y2="80" stroke="var(--green)" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
      <text x="210" y="74" fontSize="10" fill="var(--green)" fontWeight="700">BOS</text>
      {/* HH/HL labels */}
      <text x="92" y="125" fontSize="9" fill="var(--text-secondary)"> HL</text>
      <text x="202" y="75" fontSize="9" fill="var(--text-secondary)"> HH</text>
      <text x="322" y="40" fontSize="9" fill="var(--text-secondary)"> HH</text>
      <text x="244" y="106" fontSize="9" fill="var(--text-secondary)"> HL</text>
      {/* MSS zone */}
      <rect x="410" y="30" width="260" height="215" fill="var(--red)" opacity="0.05" rx="4" />
      <text x="420" y="50" fontSize="11" fill="var(--red)" fontWeight="700">MSS ZONE</text>
      {/* LH label */}
      <text x="484" y="90" fontSize="9" fill="var(--red)">LH</text>
      {/* MSS line — break below last HL */}
      <line x1="430" y1="120" x2="670" y2="120" stroke="var(--red)" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="570" y="115" fontSize="10" fill="var(--red)" fontWeight="700">MSS</text>
      {/* LL */}
      <text x="564" y="162" fontSize="9" fill="var(--red)">LL</text>
      <text x="30" y="230" fontSize="10" fill="var(--text-secondary)">BOS = continuazione trend · MSS = cambio struttura</text>
    </svg>
  )
}

function OrderBlockDiagram() {
  return (
    <svg viewBox="0 0 700 240" className="w-full h-auto">
      <g stroke="var(--border)" strokeWidth="1" opacity="0.15">
        {[60, 120, 180].map(y => <line key={y} x1="0" y1={y} x2="700" y2={y} />)}
      </g>
      {/* Pre-OB bearish candles */}
      {[
        { x: 40, o: 130, c: 150, h: 125, l: 155 },
        { x: 80, o: 150, c: 165, h: 145, l: 170 },
      ].map(({ x, o, c, h, l }) => (
        <g key={x}>
          <line x1={x + 6} y1={h} x2={x + 6} y2={l} stroke="var(--red)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(o, c)} width="12" height={Math.abs(o - c) || 2} fill="var(--red)" rx="1" />
        </g>
      ))}
      {/* OB candle — last bearish before impulse */}
      <rect x="118" y="100" width="20" height="60" fill="var(--gold)" opacity="0.9" rx="2" />
      <line x1="128" y1="90" x2="128" y2="170" stroke="var(--gold)" strokeWidth="2" />
      <text x="106" y="88" fontSize="10" fill="var(--gold)" fontWeight="700">OB</text>
      {/* OB zone highlight extending right */}
      <rect x="118" y="100" width="440" height="60" fill="var(--gold)" opacity="0.08" rx="2" />
      <line x1="118" y1="100" x2="558" y2="100" stroke="var(--gold)" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="118" y1="160" x2="558" y2="160" stroke="var(--gold)" strokeWidth="1" strokeDasharray="4 3" />
      {/* Impulse up */}
      {[
        { x: 160, o: 155, c: 100, h: 158, l: 98 },
        { x: 200, o: 100, c: 60, h: 103, l: 57 },
        { x: 240, o: 60, c: 40, h: 63, l: 37 },
        { x: 280, o: 40, c: 55, h: 38, l: 58 },
      ].map(({ x, o, c, h, l }) => (
        <g key={x}>
          <line x1={x + 6} y1={h} x2={x + 6} y2={l} stroke="var(--green)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(o, c)} width="12" height={Math.abs(o - c) || 2} fill="var(--green)" rx="1" />
        </g>
      ))}
      {/* Return to OB */}
      {[
        { x: 320, o: 55, c: 80, h: 52, l: 82 },
        { x: 360, o: 80, c: 110, h: 77, l: 112 },
        { x: 400, o: 110, c: 130, h: 107, l: 133 },
        { x: 440, o: 125, c: 115, h: 123, l: 117 },
      ].map(({ x, o, c, h, l }) => (
        <g key={x}>
          <line x1={x + 6} y1={h} x2={x + 6} y2={l} stroke="var(--red)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(o, c)} width="12" height={Math.abs(o - c) || 2} fill="var(--red)" rx="1" />
        </g>
      ))}
      <text x="440" y="138" fontSize="10" fill="var(--gold)" fontWeight="700">Ritorno OB</text>
      {/* Bounce from OB */}
      {[
        { x: 500, o: 150, c: 120, h: 152, l: 118 },
        { x: 540, o: 120, c: 95, h: 122, l: 93 },
      ].map(({ x, o, c, h, l }) => (
        <g key={x}>
          <line x1={x + 6} y1={h} x2={x + 6} y2={l} stroke="var(--green)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(o, c)} width="12" height={Math.abs(o - c) || 2} fill="var(--green)" rx="1" />
        </g>
      ))}
      <text x="50" y="228" fontSize="10" fill="var(--text-secondary)">Ultimo candle ribassista prima dell'impulso = Order Block (zona di domanda)</text>
    </svg>
  )
}

function FvgDiagram() {
  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto">
      <g stroke="var(--border)" strokeWidth="1" opacity="0.15">
        {[60, 120, 180].map(y => <line key={y} x1="0" y1={y} x2="600" y2={y} />)}
      </g>
      {/* Candle 1 — pre impulse */}
      <line x1="145" y1="100" x2="145" y2="175" stroke="var(--green)" strokeWidth="1.5" />
      <rect x="138" y="120" width="14" height="45" fill="var(--green)" rx="1" />
      <text x="125" y="96" fontSize="10" fill="var(--text-secondary)">C1</text>
      {/* FVG zone = high of C1 to low of C3 */}
      {/* Candle 1 high = 100 */}
      {/* Candle 3 low = 70 */}
      <rect x="185" y="75" width="110" height="45" fill="var(--gold)" opacity="0.15" rx="2" />
      <line x1="185" y1="75" x2="295" y2="75" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="185" y1="120" x2="295" y2="120" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="200" y="101" fontSize="12" fill="var(--gold)" fontWeight="700">FVG</text>
      <text x="200" y="115" fontSize="9" fill="var(--gold)">(gap non coperto)</text>
      {/* Candle 2 — impulse */}
      <line x1="195" y1="45" x2="195" y2="130" stroke="var(--green)" strokeWidth="1.5" />
      <rect x="188" y="50" width="14" height="70" fill="var(--green)" rx="1" />
      <text x="177" y="40" fontSize="10" fill="var(--text-secondary)">C2</text>
      {/* Candle 3 */}
      <line x1="245" y1="40" x2="245" y2="80" stroke="var(--green)" strokeWidth="1.5" />
      <rect x="238" y="42" width="14" height="30" fill="var(--green)" rx="1" />
      <text x="233" y="36" fontSize="10" fill="var(--text-secondary)">C3</text>
      {/* Arrows showing gap */}
      <path d="M 160 100 L 185 97" stroke="var(--gold)" strokeWidth="1.2" markerEnd="url(#arrowGold)" fill="none" />
      <path d="M 160 120 L 185 120" stroke="var(--gold)" strokeWidth="1.2" fill="none" />
      {/* Continuation up */}
      {[
        { x: 310, o: 75, c: 50, h: 77, l: 48 },
        { x: 350, o: 50, c: 35, h: 52, l: 33 },
      ].map(({ x, o, c, h, l }) => (
        <g key={x}>
          <line x1={x + 6} y1={h} x2={x + 6} y2={l} stroke="var(--green)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(o, c)} width="12" height={Math.abs(o - c) || 2} fill="var(--green)" rx="1" />
        </g>
      ))}
      {/* Retest of FVG */}
      {[
        { x: 390, o: 35, c: 60, h: 33, l: 62 },
        { x: 430, o: 60, c: 90, h: 57, l: 93 },
        { x: 470, o: 90, c: 112, h: 88, l: 115 },
      ].map(({ x, o, c, h, l }) => (
        <g key={x}>
          <line x1={x + 6} y1={h} x2={x + 6} y2={l} stroke="var(--red)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(o, c)} width="12" height={Math.abs(o - c) || 2} fill="var(--red)" rx="1" />
        </g>
      ))}
      <text x="420" y="128" fontSize="10" fill="var(--gold)" fontWeight="700">Retest FVG</text>
      {/* Bounce */}
      {[
        { x: 510, o: 107, c: 85, h: 109, l: 83 },
        { x: 548, o: 85, c: 65, h: 87, l: 63 },
      ].map(({ x, o, c, h, l }) => (
        <g key={x}>
          <line x1={x + 6} y1={h} x2={x + 6} y2={l} stroke="var(--green)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(o, c)} width="12" height={Math.abs(o - c) || 2} fill="var(--green)" rx="1" />
        </g>
      ))}
      <text x="40" y="228" fontSize="10" fill="var(--text-secondary)">FVG = gap tra High C1 e Low C3 → zona di squilibrio → target per retest</text>
    </svg>
  )
}

function PremiumDiscountDiagram() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto">
      {/* Range box */}
      <rect x="60" y="40" width="260" height="200" fill="var(--border)" opacity="0.08" rx="6" />
      {/* High */}
      <line x1="50" y1="40" x2="340" y2="40" stroke="var(--text-secondary)" strokeWidth="2" />
      <text x="355" y="44" fontSize="11" fill="var(--text-secondary)" fontWeight="700">High (BSL)</text>
      {/* Low */}
      <line x1="50" y1="240" x2="340" y2="240" stroke="var(--text-secondary)" strokeWidth="2" />
      <text x="355" y="244" fontSize="11" fill="var(--text-secondary)" fontWeight="700">Low (SSL)</text>
      {/* Midpoint */}
      <line x1="50" y1="140" x2="340" y2="140" stroke="var(--gold)" strokeWidth="2" strokeDasharray="6 4" />
      <text x="355" y="144" fontSize="11" fill="var(--gold)" fontWeight="700">50% (EQ)</text>
      {/* Premium zone */}
      <rect x="60" y="40" width="260" height="100" fill="var(--red)" opacity="0.07" rx="4" />
      <text x="190" y="90" fontSize="14" fill="var(--red)" textAnchor="middle" fontWeight="800">PREMIUM</text>
      <text x="190" y="108" fontSize="10" fill="var(--red)" textAnchor="middle">VENDI / SHORT</text>
      {/* Discount zone */}
      <rect x="60" y="140" width="260" height="100" fill="var(--green)" opacity="0.07" rx="4" />
      <text x="190" y="188" fontSize="14" fill="var(--green)" textAnchor="middle" fontWeight="800">DISCOUNT</text>
      <text x="190" y="206" fontSize="10" fill="var(--green)" textAnchor="middle">ACQUISTA / LONG</text>
      {/* Arrow down for premium */}
      <path d="M 420 55 L 420 125 L 415 118 M 420 125 L 425 118" stroke="var(--red)" strokeWidth="2" fill="none" />
      <text x="430" y="95" fontSize="10" fill="var(--red)" fontWeight="700">Sell</text>
      {/* Arrow up for discount */}
      <path d="M 420 225 L 420 155 L 415 162 M 420 155 L 425 162" stroke="var(--green)" strokeWidth="2" fill="none" />
      <text x="430" y="195" fontSize="10" fill="var(--green)" fontWeight="700">Buy</text>
      <text x="60" y="268" fontSize="10" fill="var(--text-secondary)">Buy nel Discount (sotto 50%), Sell nel Premium (sopra 50%)</text>
    </svg>
  )
}

function TakeProfitDiagram() {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-auto">
      <g stroke="var(--border)" strokeWidth="1" opacity="0.15">
        {[60, 110, 160, 210, 260].map(y => <line key={y} x1="0" y1={y} x2="600" y2={y} />)}
      </g>
      {/* Vertical time axis */}
      <line x1="80" y1="20" x2="80" y2="280" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="40" y="15" fontSize="10" fill="var(--text-secondary)" fontWeight="600">ENTRY</text>
      {/* SL line */}
      <line x1="20" y1="260" x2="580" y2="260" stroke="var(--red)" strokeWidth="2" />
      <rect x="20" y="230" width="560" height="30" fill="var(--red)" opacity="0.06" />
      <text x="25" y="255" fontSize="10" fill="var(--red)" fontWeight="700">SL  −1R</text>
      {/* Entry line */}
      <line x1="20" y1="210" x2="580" y2="210" stroke="var(--text-secondary)" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="25" y="206" fontSize="10" fill="var(--text-secondary)" fontWeight="600">ENTRY</text>
      {/* TP1 */}
      <line x1="20" y1="160" x2="580" y2="160" stroke="var(--green)" strokeWidth="2" strokeDasharray="5 3" />
      <rect x="20" y="160" width="560" height="50" fill="var(--green)" opacity="0.06" />
      <text x="25" y="155" fontSize="10" fill="var(--green)" fontWeight="700">TP1  +1R · Chiudi 50%  →  SL al BE</text>
      {/* TP2 */}
      <line x1="20" y1="110" x2="580" y2="110" stroke="var(--green)" strokeWidth="2" />
      <rect x="20" y="110" width="560" height="50" fill="var(--green)" opacity="0.08" />
      <text x="25" y="105" fontSize="10" fill="var(--green)" fontWeight="700">TP2  +2R · Chiudi 30%</text>
      {/* TP3 / runner */}
      <line x1="20" y1="60" x2="580" y2="60" stroke="var(--gold)" strokeWidth="2" />
      <rect x="20" y="60" width="560" height="50" fill="var(--gold)" opacity="0.06" />
      <text x="25" y="55" fontSize="10" fill="var(--gold)" fontWeight="700">Residuo 20%  +3R+  · Trailing SL</text>
      {/* Size labels on right */}
      <text x="510" y="238" fontSize="11" fill="var(--red)" fontWeight="700">−1R</text>
      <text x="510" y="188" fontSize="9" fill="var(--text-secondary)">size 100%</text>
      <text x="510" y="140" fontSize="11" fill="var(--green)" fontWeight="700">+1R</text>
      <text x="510" y="153" fontSize="9" fill="var(--green)">50%</text>
      <text x="510" y="92" fontSize="11" fill="var(--green)" fontWeight="700">+2R</text>
      <text x="510" y="105" fontSize="9" fill="var(--green)">30%</text>
      <text x="510" y="44" fontSize="11" fill="var(--gold)" fontWeight="700">3R+</text>
      <text x="510" y="57" fontSize="9" fill="var(--gold)">20%</text>
    </svg>
  )
}

function KillZoneDiagram() {
  return (
    <svg viewBox="0 0 800 240" className="w-full h-auto">
      <defs>
        <linearGradient id="kz-grad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--green)', stopOpacity: 0.18 }} />
          <stop offset="100%" style={{ stopColor: 'var(--green)', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      {/* Asia session range candles */}
      {[
        { x: 30, o: 120, c: 115, h: 118, l: 122 },
        { x: 65, o: 115, c: 118, h: 113, l: 120 },
        { x: 100, o: 118, c: 112, h: 116, l: 114 },
        { x: 135, o: 112, c: 116, h: 110, l: 118 },
        { x: 170, o: 116, c: 113, h: 114, l: 115 },
        { x: 205, o: 113, c: 117, h: 111, l: 119 },
        { x: 240, o: 117, c: 114, h: 115, l: 116 },
      ].map(({ x, o, c, h, l }) => (
        <g key={x}>
          <line x1={x + 6} y1={h} x2={x + 6} y2={l} stroke="var(--border)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(o, c)} width="12" height={Math.abs(o - c) || 2} fill={o > c ? 'var(--red)' : 'var(--green)'} rx="1" />
        </g>
      ))}
      {/* AH = Asia High */}
      <line x1="30" y1="110" x2="760" y2="110" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="32" y="106" fontSize="10" fill="var(--gold)" fontWeight="700">AH</text>
      {/* AL = Asia Low */}
      <line x1="30" y1="160" x2="760" y2="160" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="32" y="174" fontSize="10" fill="var(--gold)" fontWeight="700">AL</text>
      {/* KZ background */}
      <rect x="290" y="20" width="240" height="210" fill="url(#kz-grad)" rx="4" />
      <text x="340" y="40" fontSize="11" fill="var(--green)" fontWeight="800">LONDON KILL ZONE</text>
      <text x="350" y="55" fontSize="10" fill="var(--green)">09:00 – 12:00</text>
      {/* KZ candles — sweep AH then reverse */}
      {[
        { x: 305, o: 125, c: 115, h: 122, l: 118 },
        { x: 340, o: 115, c: 105, h: 112, l: 108 },
      ].map(({ x, o, c, h, l }) => (
        <g key={x}>
          <line x1={x + 6} y1={h} x2={x + 6} y2={l} stroke="var(--red)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(o, c)} width="12" height={Math.abs(o - c) || 2} fill="var(--red)" rx="1" />
        </g>
      ))}
      {/* Sweep above AH */}
      <line x1="375" y1="60" x2="375" y2="170" stroke="var(--red)" strokeWidth="1.5" />
      <rect x="368" y="90" width="14" height="55" fill="var(--red)" rx="1" />
      <text x="358" y="55" fontSize="10" fill="var(--gold)" fontWeight="700">SWEEP</text>
      {/* MSS candle */}
      <line x1="415" y1="80" x2="415" y2="165" stroke="var(--green)" strokeWidth="1.5" />
      <rect x="408" y="100" width="14" height="55" fill="var(--green)" rx="1" />
      <text x="402" y="76" fontSize="10" fill="var(--green)" fontWeight="700">MSS</text>
      {/* Expansion */}
      {[
        { x: 450, o: 140, c: 115, h: 143, l: 112 },
        { x: 490, o: 115, c: 85, h: 118, l: 82 },
        { x: 530, o: 85, c: 60, h: 88, l: 57 },
      ].map(({ x, o, c, h, l }) => (
        <g key={x}>
          <line x1={x + 6} y1={h} x2={x + 6} y2={l} stroke="var(--green)" strokeWidth="1.5" />
          <rect x={x} y={Math.min(o, c)} width="12" height={Math.abs(o - c) || 2} fill="var(--green)" rx="1" />
        </g>
      ))}
      <text x="570" y="68" fontSize="10" fill="var(--green)" fontWeight="700">Espansione</text>
      {/* Entry arrow */}
      <path d="M 430 155 L 449 140" stroke="var(--green)" strokeWidth="2" markerEnd="url(#aGreen)" fill="none" />
      <text x="400" y="200" fontSize="10" fill="var(--text-secondary)" fontWeight="600">Entry dopo MSS M1 in direzione sweep</text>
    </svg>
  )
}

function StructureDiagram() {
  return (
    <svg viewBox="0 0 720 260" className="w-full h-auto">
      <g stroke="var(--border)" strokeWidth="1" opacity="0.15">
        {[70, 130, 190].map(y => <line key={y} x1="0" y1={y} x2="720" y2={y} />)}
      </g>
      {/* Uptrend */}
      <polyline points="40,200 100,130 140,155 210,80 260,105 340,45" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Downtrend */}
      <polyline points="340,45 390,80 440,160 490,130 560,195 620,165 680,215" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Labels uptrend */}
      <text x="35" y="215" fontSize="10" fill="var(--green)">HL</text>
      <text x="92" y="125" fontSize="10" fill="var(--green)">HH</text>
      <text x="134" y="170" fontSize="10" fill="var(--green)">HL</text>
      <text x="203" y="75" fontSize="10" fill="var(--green)">HH</text>
      <text x="254" y="120" fontSize="10" fill="var(--green)">HL</text>
      <text x="334" y="40" fontSize="10" fill="var(--green)">HH</text>
      {/* Labels downtrend */}
      <text x="384" y="75" fontSize="10" fill="var(--red)">LH</text>
      <text x="434" y="175" fontSize="10" fill="var(--red)">LL</text>
      <text x="484" y="125" fontSize="10" fill="var(--red)">LH</text>
      <text x="554" y="210" fontSize="10" fill="var(--red)">LL</text>
      <text x="614" y="160" fontSize="10" fill="var(--red)">LH</text>
      <text x="674" y="228" fontSize="10" fill="var(--red)">LL</text>
      {/* Divider at peak */}
      <line x1="340" y1="20" x2="340" y2="240" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="310" y="18" fontSize="10" fill="var(--gold)" fontWeight="700">MSS</text>
      {/* Legend */}
      <rect x="40" y="235" width="10" height="10" fill="var(--green)" rx="2" />
      <text x="55" y="244" fontSize="10" fill="var(--green)">Uptrend: HH + HL</text>
      <rect x="220" y="235" width="10" height="10" fill="var(--red)" rx="2" />
      <text x="235" y="244" fontSize="10" fill="var(--red)">Downtrend: LH + LL</text>
      <rect x="420" y="235" width="10" height="10" fill="var(--gold)" rx="2" />
      <text x="435" y="244" fontSize="10" fill="var(--gold)">MSS = cambio struttura</text>
    </svg>
  )
}

const DIAGRAMS: Record<DiagramKey, React.FC> = {
  'sessions': SessionsDiagram,
  'liquidity-sweep': LiquiditySweepDiagram,
  'risk-reward': RiskRewardDiagram,
  'bos-mss': BosMssDiagram,
  'order-block': OrderBlockDiagram,
  'fvg': FvgDiagram,
  'premium-discount': PremiumDiscountDiagram,
  'take-profit': TakeProfitDiagram,
  'kill-zone': KillZoneDiagram,
  'structure': StructureDiagram,
}

export function Diagram({ dKey, caption }: { dKey: DiagramKey; caption?: string }) {
  const Cmp = DIAGRAMS[dKey]
  return (
    <figure className="my-6 rounded-2xl p-4" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
      <Cmp />
      {caption && <figcaption className="mt-3 text-xs text-center" style={{ color: 'var(--text-muted)' }}>{caption}</figcaption>}
    </figure>
  )
}
