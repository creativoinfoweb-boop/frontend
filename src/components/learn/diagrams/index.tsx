import type { DiagramKey } from '@/data/course'

function SessionsDiagram() {
  return (
    <svg viewBox="0 0 800 150" className="w-full h-auto">
      <defs><linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'var(--gold)', stopOpacity: 0.1 }} />
        <stop offset="100%" style={{ stopColor: 'var(--gold)', stopOpacity: 0 }} />
      </linearGradient></defs>
      <rect x="0" y="40" width="267" height="60" fill="url(#grad1)" />
      <rect x="267" y="40" width="266" height="60" fill="rgba(0,230,118,0.1)" />
      <rect x="533" y="40" width="267" height="60" fill="url(#grad1)" />
      <line x1="0" y1="100" x2="800" y2="100" stroke="var(--text-primary)" strokeWidth="2" />
      <text x="133" y="130" fontSize="12" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold">Asia 00-08</text>
      <text x="400" y="130" fontSize="12" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold">Londra 09-12 (Kill Zone)</text>
      <text x="666" y="130" fontSize="12" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold">NY 14:30-17</text>
    </svg>
  )
}

function LiquiditySweepDiagram() {
  return (
    <svg viewBox="0 0 800 200" className="w-full h-auto">
      <g stroke="var(--border)" strokeWidth="1" opacity="0.3">
        {[50, 100, 150].map(y => <line key={y} x1="0" y1={y} x2="800" y2={y} />)}
      </g>
      <line x1="50" y1="80" x2="750" y2="80" stroke="var(--gold)" strokeWidth="2" strokeDasharray="4 4" />
      <text x="60" y="75" fontSize="11" fill="var(--gold)" fontWeight="600">BSL — Buy-Side Liquidity</text>
      <rect x="200" y="100" width="12" height="40" fill="var(--green)" />
      <rect x="250" y="85" width="12" height="55" fill="var(--green)" />
      <rect x="300" y="90" width="12" height="50" fill="var(--green)" />
      <line x1="607" y1="60" x2="607" y2="40" stroke="var(--green)" strokeWidth="2" markerEnd="url(#arrowGreen)" />
      <text x="150" y="170" fontSize="12" fill="var(--text-primary)" fontWeight="600">Build-up → Sweep → Reversal</text>
    </svg>
  )
}

function RiskRewardDiagram() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-auto">
      <line x1="150" y1="20" x2="150" y2="280" stroke="var(--text-primary)" strokeWidth="2" />
      <rect x="140" y="100" width="20" height="80" fill="var(--green)" opacity="0.3" />
      <line x1="150" y1="180" x2="200" y2="180" stroke="var(--green)" strokeWidth="2" />
      <line x1="150" y1="140" x2="100" y2="140" stroke="var(--red)" strokeWidth="2" />
      <text x="160" y="145" fontSize="11" fill="var(--text-primary)">Entry</text>
      <text x="210" y="175" fontSize="11" fill="var(--green)">+2R</text>
      <text x="85" y="145" fontSize="11" fill="var(--red)">-1R</text>
    </svg>
  )
}

const DIAGRAMS: Record<DiagramKey, React.FC> = {
  'sessions': SessionsDiagram,
  'liquidity-sweep': LiquiditySweepDiagram,
  'risk-reward': RiskRewardDiagram,
  'bos-mss': () => <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Diagramma BOS/MSS — da completare in FASE F</div>,
  'order-block': () => <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Diagramma Order Block — da completare</div>,
  'fvg': () => <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Diagramma FVG — da completare</div>,
  'premium-discount': () => <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Diagramma Premium/Discount — da completare</div>,
  'take-profit': () => <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Diagramma Take Profit — da completare</div>,
  'kill-zone': () => <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Diagramma Kill Zone — da completare</div>,
  'structure': () => <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Diagramma Structure — da completare</div>,
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
