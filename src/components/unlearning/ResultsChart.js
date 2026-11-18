'use client';
import React, { useState } from 'react';
import useInView from './useInView';

const CLASSES = ['Airplane', 'Car', 'Bird', 'Cat', 'Deer', 'Dog', 'Frog', 'Horse', 'Ship', 'Truck'];
const TARGET = 3;

const DATA = {
  white: {
    label: 'White-box',
    note: 'The attacker can see the real model while building the trigger.',
    before: [91.5, 95.2, 82.8, 94.7, 90.2, 81.8, 91.0, 91.9, 94.4, 94.0],
    after: [95.3, 96.5, 91.3, 78.1, 93.3, 89.2, 94.5, 94.3, 95.9, 95.3],
    asrBefore: 7.76,
    asrAfter: 88.57,
  },
  black: {
    label: 'Black-box',
    note: 'The attacker only has a shadow model they trained themselves, then transfers the trigger.',
    before: [92.0, 95.6, 86.7, 90.8, 90.6, 84.5, 92.3, 91.7, 94.2, 93.9],
    after: [94.6, 97.1, 91.2, 79.9, 94.9, 90.3, 95.7, 95.1, 95.7, 95.7],
    asrBefore: 17.54,
    asrAfter: 81.34,
  },
};

const W = 620;
const H = 230;
const PAD = { l: 30, r: 6, t: 14, b: 30 };
const plotW = W - PAD.l - PAD.r;
const plotH = H - PAD.t - PAD.b;
const y = (v) => PAD.t + plotH - (v / 100) * plotH;

export default function ResultsChart() {
  const [mode, setMode] = useState('white');
  const [hover, setHover] = useState(null);
  const [ref, inView] = useInView(0.35);
  const d = DATA[mode];
  const groupW = plotW / CLASSES.length;
  const barW = groupW * 0.32;
  const grow = inView ? 1 : 0;

  const hv = hover ?? TARGET;

  return (
    <div className="ub-figure ub-results" ref={ref}>
      <div className="ub-figure-toolbar">
        <div className="ub-tabs" role="tablist" aria-label="Threat model">
          {Object.entries(DATA).map(([k, v]) => (
            <button key={k} type="button" role="tab" aria-selected={mode === k} className={`ub-tab ${mode === k ? 'is-on' : ''}`} onClick={() => setMode(k)}>
              {v.label}
            </button>
          ))}
        </div>
        <p className="ub-results-note">{d.note}</p>
      </div>

      <div className="ub-results-grid">
        <div className="ub-results-bars">
          <p className="ub-chart-title">
            Clean accuracy per class
            <span className="ub-chart-keys">
              <span><i style={{ background: 'rgba(184,215,229,0.35)' }} />before</span>
              <span><i style={{ background: 'var(--ub-host)' }} />after unlearning</span>
            </span>
          </p>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${d.label} per-class clean accuracy before and after unlearning`} onMouseLeave={() => setHover(null)}>
            {[0, 25, 50, 75, 100].map((g) => (
              <g key={g}>
                <line x1={PAD.l} x2={W - PAD.r} y1={y(g)} y2={y(g)} stroke="rgba(255,255,255,0.06)" />
                <text x={PAD.l - 6} y={y(g) + 3} textAnchor="end" className="ub-axis">{g}</text>
              </g>
            ))}
            {CLASSES.map((c, i) => {
              const gx = PAD.l + i * groupW + groupW / 2;
              const isT = i === TARGET;
              const b = d.before[i] * grow;
              const a = d.after[i] * grow;
              return (
                <g key={c} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} tabIndex={0} className="ub-bar-group">
                  <rect x={gx - groupW / 2} y={PAD.t} width={groupW} height={plotH} fill={hv === i ? 'rgba(255,255,255,0.04)' : 'transparent'} />
                  <rect className="ub-bar" x={gx - barW - 1} y={y(b)} width={barW} height={plotH - (y(b) - PAD.t)} rx="2" fill={isT ? 'var(--ub-poison-soft)' : 'rgba(184,215,229,0.35)'} />
                  <rect className="ub-bar" x={gx + 1} y={y(a)} width={barW} height={plotH - (y(a) - PAD.t)} rx="2" fill={isT ? 'var(--ub-active)' : 'var(--ub-host)'} />
                  <text x={gx} y={H - 10} textAnchor="middle" className={`ub-axis ${isT ? 'is-target' : ''}`}>{c}</text>
                </g>
              );
            })}
          </svg>
          <div className="ub-hover-readout">
            <strong>{CLASSES[hv]}</strong>
            <span>{d.before[hv].toFixed(1)}% → {d.after[hv].toFixed(1)}%</span>
            <span className={d.after[hv] < d.before[hv] ? 'is-down' : 'is-up'}>
              {(d.after[hv] - d.before[hv] > 0 ? '+' : '') + (d.after[hv] - d.before[hv]).toFixed(1)} pts
            </span>
            {hv === TARGET && <em>target class</em>}
          </div>
        </div>

        <div className="ub-asr">
          <p className="ub-chart-title">Attack success rate</p>
          <div className="ub-asr-cols">
            <div className="ub-asr-col">
              <div className="ub-asr-bar-wrap"><div className="ub-asr-bar is-before" style={{ height: `${d.asrBefore * grow}%` }} /></div>
              <strong>{d.asrBefore.toFixed(2)}%</strong>
              <span>before</span>
            </div>
            <div className="ub-asr-col">
              <div className="ub-asr-bar-wrap"><div className="ub-asr-bar is-after" style={{ height: `${d.asrAfter * grow}%` }} /></div>
              <strong className="is-hot">{d.asrAfter.toFixed(2)}%</strong>
              <span>after</span>
            </div>
          </div>
          <p className="ub-asr-delta">+{(d.asrAfter - d.asrBefore).toFixed(2)} pts</p>
        </div>
      </div>
    </div>
  );
}
