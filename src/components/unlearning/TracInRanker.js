'use client';
import React, { useEffect, useRef, useState } from 'react';

// Toy scores for illustration: one value per checkpoint, per image.
// The real run scored every cat in CIFAR-10 against ResNet-18 checkpoints.
const SCORES = [
  [0.9, 0.7, 0.5, 0.4, 0.3],
  [1.6, 1.4, 1.2, 1.1, 0.9],
  [0.6, 0.5, 0.4, 0.3, 0.2],
  [1.2, 0.9, 0.7, 0.5, 0.4],
  [0.8, 0.6, 0.5, 0.3, 0.3],
  [1.8, 1.6, 1.5, 1.3, 1.2],
  [0.5, 0.4, 0.3, 0.3, 0.2],
  [1.1, 0.8, 0.6, 0.5, 0.3],
  [1.7, 1.5, 1.3, 1.2, 1.0],
  [0.7, 0.5, 0.4, 0.4, 0.2],
];
const CHECKPOINTS = SCORES[0].length;
const TOP_K = 3;
const ROW_H = 46;
const MAX_TOTAL = Math.max(...SCORES.map((s) => s.reduce((a, b) => a + b, 0)));

const totalUpTo = (scores, n) => scores.slice(0, n).reduce((a, b) => a + b, 0);

export default function TracInRanker() {
  const [step, setStep] = useState(0);
  const [sorted, setSorted] = useState(false);
  const [running, setRunning] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const run = () => {
    clearTimeout(timer.current);
    setSorted(false);
    setStep(0);
    setRunning(true);
    let s = 0;
    const tick = () => {
      s += 1;
      setStep(s);
      if (s < CHECKPOINTS) {
        timer.current = setTimeout(tick, 520);
      } else {
        timer.current = setTimeout(() => {
          setSorted(true);
          setRunning(false);
        }, 600);
      }
    };
    timer.current = setTimeout(tick, 250);
  };

  const totals = SCORES.map((s) => totalUpTo(s, step));
  const order = SCORES.map((_, i) => i).sort((a, b) => totals[b] - totals[a]);
  const rankOf = {};
  order.forEach((idx, r) => { rankOf[idx] = r; });

  return (
    <div className="ub-figure ub-tracin">
      <div className="ub-figure-toolbar">
        <div className="ub-ckpts" aria-label="Checkpoints processed">
          {Array.from({ length: CHECKPOINTS }).map((_, i) => (
            <span key={i} className={`ub-ckpt ${i < step ? 'is-on' : ''}`}>ckpt {i + 1}</span>
          ))}
        </div>
        <button type="button" className="ub-button" onClick={run} disabled={running}>
          {step === 0 ? 'Run TracIn' : running ? 'Tracing…' : 'Run again'}
        </button>
      </div>

      <div className="ub-tracin-list" style={{ height: SCORES.length * ROW_H }}>
        {SCORES.map((scores, i) => {
          const top = (sorted ? rankOf[i] : i) * ROW_H;
          const isHost = sorted && rankOf[i] < TOP_K;
          return (
            <div key={i} className={`ub-tracin-row ${isHost ? 'is-host' : ''}`} style={{ transform: `translateY(${top}px)` }}>
              <span className="ub-cat-tile" style={{ backgroundPosition: `-${i * 40}px 0` }} aria-hidden="true" />
              <div className="ub-tracin-bar">
                {scores.slice(0, step).map((v, c) => (
                  <span
                    key={c}
                    style={{ width: `${(v / MAX_TOTAL) * 100}%`, opacity: 0.45 + (c / CHECKPOINTS) * 0.55 }}
                  />
                ))}
              </div>
              <span className="ub-tracin-score">{totals[i].toFixed(1)}</span>
              <span className="ub-host-badge">host</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
