'use client';
import React, { useState } from 'react';

const DEFENSES = [
  {
    name: 'Spectral Signatures',
    kind: 'Remove poison, retrain',
    how: 'Looks for outliers in the covariance of layer-4 features, throws away the highest-scoring training samples, and retrains.',
    metric: 'After the defense: ASR 80.2%, clean accuracy 89.8%',
    verdict: 'The backdoor survived retraining.',
  },
  {
    name: 'STRIP',
    kind: 'Input-level detection',
    how: 'Blends each input with other images and measures prediction entropy. Triggered inputs usually stay suspiciously confident.',
    metric: 'TPR 7.1%, FPR 8.7%',
    verdict: 'About as good as guessing.',
  },
  {
    name: 'Neural Cleanse',
    kind: 'Trigger reverse-engineering',
    how: 'For each class, searches for the smallest trigger that flips everything into it, then runs an outlier test across classes.',
    metric: 'Anomaly index 1.45 (flags above 2.0)',
    verdict: 'Concluded “not a backdoored model”.',
  },
  {
    name: 'Beatrix',
    kind: 'Feature-statistics detection',
    how: 'Compares higher-order Gram-matrix statistics of layer-4 activations to find inputs that don’t belong.',
    metric: 'TPR 5.1%, FPR 5.1%',
    verdict: 'No class flagged.',
  },
  {
    name: 'SCAN',
    kind: 'Feature-distribution detection',
    how: 'Decomposes each class’s feature distribution and scores how likely it is to contain a second, hidden population.',
    metric: 'TPR 0%, FPR 5.9%',
    verdict: 'Flagged ship (class 8) and missed cat (class 3).',
  },
];

export default function DefenseTable() {
  const [open, setOpen] = useState(0);

  return (
    <div className="ub-figure ub-defenses">
      <ul className="ub-defense-list">
        {DEFENSES.map((d, i) => {
          const isOpen = open === i;
          return (
            <li key={d.name} className={isOpen ? 'is-open' : ''}>
              <button type="button" className="ub-defense-head" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                <span className="ub-defense-name">{d.name}</span>
                <span className="ub-defense-kind">{d.kind}</span>
                <span className="ub-defense-result">Not detected</span>
                <svg className="ub-chev" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
              <div className="ub-defense-body">
                <div>
                  <p>{d.how}</p>
                  <p className="ub-defense-metric"><span>{d.metric}</span> · {d.verdict}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
