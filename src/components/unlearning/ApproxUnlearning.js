'use client';
import React from 'react';
import useInView from './useInView';

const ROWS = [
  { name: 'Before unlearning', sub: 'dormant baseline', cda: 89.98, asr: 7.22, baseline: true },
  { name: 'LP-FT', sub: 're-initialize the head, fine-tune', cda: 91.81, asr: 60.81, highlight: true },
  { name: 'NegGrad+', sub: 'joint unlearn', cda: 90.68, asr: 7.56 },
  { name: 'Fisher', sub: 'influence-function based', cda: 86.94, asr: 11.14 },
  { name: 'SSD', sub: 'selective weight scrubbing', cda: 91.18, asr: 5.91 },
  { name: 'Gradient Ascent + Repair', sub: 'model collapses', cda: 10.0, asr: 0, broken: true },
  { name: 'Amnesiac', sub: 'model collapses', cda: 10.0, asr: 0, broken: true },
];

export default function ApproxUnlearning() {
  const [ref, inView] = useInView(0.3);
  const g = inView ? 1 : 0;

  return (
    <div className="ub-figure ub-approx" ref={ref}>
      <div className="ub-approx-legend">
        <span><i className="ub-key ub-key-host" /> clean accuracy</span>
        <span><i className="ub-key ub-key-active" /> attack success</span>
      </div>
      <ul>
        {ROWS.map((r) => (
          <li key={r.name} className={`${r.highlight ? 'is-highlight' : ''} ${r.broken ? 'is-broken' : ''} ${r.baseline ? 'is-baseline' : ''}`}>
            <div className="ub-approx-name">
              <strong>{r.name}</strong>
              <span>{r.sub}</span>
            </div>
            <div className="ub-approx-bars">
              <div className="ub-approx-bar"><span className="is-cda" style={{ width: `${r.cda * g}%` }} /><em>{r.cda.toFixed(2)}%</em></div>
              <div className="ub-approx-bar"><span className="is-asr" style={{ width: `${r.asr * g}%` }} /><em>{r.asr.toFixed(2)}%</em></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
