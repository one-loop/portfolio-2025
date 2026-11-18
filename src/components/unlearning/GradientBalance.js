'use client';
import React, { useState } from 'react';

const W = 640;
const H = 240;
const O = { x: 330, y: 135 };
const GP = { x: -230, y: -55 }; // poison gradient
const RESIDUAL = { x: -12, y: 10 }; // the optimizer gets close to cancelling, never exact

export default function GradientBalance() {
  const [removed, setRemoved] = useState(0);

  const keep = 1 - removed / 100;
  // The host gradient is built to point the opposite way to the poison gradient.
  const gh = { x: (-GP.x + RESIDUAL.x) * keep, y: (-GP.y + RESIDUAL.y) * keep };
  const pTip = { x: O.x + GP.x, y: O.y + GP.y };
  const hTip = { x: O.x + gh.x, y: O.y + gh.y };
  const sum = { x: GP.x + gh.x, y: GP.y + gh.y };
  const nTip = { x: O.x + sum.x, y: O.y + sum.y + 0 };
  const net = Math.hypot(sum.x, sum.y);
  const ratio = net / Math.hypot(GP.x, GP.y);

  let state = 'Dormant';
  if (ratio > 0.75) state = 'Active';
  else if (ratio > 0.3) state = 'Waking up';

  return (
    <div className="ub-figure ub-gradient">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Host and poison gradients pull the weights in opposite directions. Their sum is close to zero until the host gradient is removed.">
        <defs>
          {['poison', 'host', 'active'].map((k) => (
            <marker key={k} id={`ub-g-${k}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill={`var(--ub-${k})`} />
            </marker>
          ))}
        </defs>

        <line x1={O.x} y1={O.y} x2={pTip.x} y2={pTip.y} stroke="var(--ub-poison)" strokeWidth="2.5" markerEnd="url(#ub-g-poison)" />
        <text x={pTip.x} y={pTip.y - 12} className="ub-svg-label ub-svg-poison" textAnchor="middle">g_poison</text>

        {keep > 0.03 && (
          <>
            <line x1={O.x} y1={O.y} x2={hTip.x} y2={hTip.y} stroke="var(--ub-host)" strokeWidth="2.5" markerEnd="url(#ub-g-host)" />
            <text x={hTip.x} y={hTip.y + 22} className="ub-svg-label ub-svg-host" textAnchor="middle">g_host</text>
          </>
        )}

        {net > 22 && (
          <>
            <line x1={O.x} y1={O.y} x2={nTip.x} y2={nTip.y} stroke="var(--ub-active)" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ub-g-active)" style={{ opacity: 0.9 }} />
            {ratio > 0.3 && <text x={nTip.x + 6} y={nTip.y + 26} className="ub-svg-label" style={{ fill: 'var(--ub-active)' }}>net</text>}
          </>
        )}

        <circle cx={O.x} cy={O.y} r="5" fill="rgba(242,242,242,0.9)" />
        <text x={O.x + 12} y={O.y - 10} className="ub-svg-label">weights</text>
        <text x={24} y={34} className="ub-svg-label">net pull on the weights</text>
        <rect x={24} y={44} width={180} height={6} rx={3} fill="rgba(255,255,255,0.08)" />
        <rect x={24} y={44} width={Math.min(180, 180 * ratio)} height={6} rx={3} fill="var(--ub-active)" />
      </svg>

      <div className="ub-slider-row">
        <label htmlFor="ub-host-slider">Host images unlearned</label>
        <input
          id="ub-host-slider"
          type="range"
          min="0"
          max="100"
          value={removed}
          onChange={(e) => setRemoved(Number(e.target.value))}
        />
        <output htmlFor="ub-host-slider">{removed}%</output>
      </div>
      <div className="ub-readout">
        <span>‖g_host + g_poison‖ = <strong>{(ratio * 100).toFixed(0)}%</strong> of ‖g_poison‖</span>
        <span className={`ub-pill ${state === 'Active' ? 'is-hot' : state === 'Waking up' ? 'is-warm' : ''}`}>{state}</span>
      </div>
    </div>
  );
}
