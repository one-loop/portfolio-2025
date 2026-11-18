'use client';
import React, { useMemo, useState } from 'react';
import useInView from '../unlearning/useInView';

// A fresh, in-browser version of the report's simulated RCT.
// Baseline revenue is log-normal; every firm gets random growth; treated firms
// get an extra effect on top. Nothing here is real data.

function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normal(rand) {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length;
const variance = (a) => { const m = mean(a); return a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1); };

function simulate(seed, effect) {
  const rand = mulberry32(seed);
  const firms = [];
  for (let i = 0; i < 1000; i++) {
    const base = Math.exp(Math.log(1000) + 0.7 * normal(rand));
    firms.push({ base, treated: false, key: rand() });
  }
  // Randomly assign exactly half to treatment.
  firms.sort((a, b) => a.key - b.key).forEach((f, i) => { f.treated = i < 500; });
  firms.forEach((f) => {
    const growth = 0.024 + 0.08 * normal(rand);
    const lift = f.treated ? Math.max(-0.1, effect + 0.12 * normal(rand)) : 0;
    f.end = f.base * (1 + growth + lift);
    f.change = f.end - f.base;
  });
  const t = firms.filter((f) => f.treated);
  const c = firms.filter((f) => !f.treated);
  const tChange = t.map((f) => f.change);
  const cChange = c.map((f) => f.change);
  const tStat = (mean(tChange) - mean(cChange)) / Math.sqrt(variance(tChange) / t.length + variance(cChange) / c.length);
  return {
    tBase: mean(t.map((f) => f.base)),
    tEnd: mean(t.map((f) => f.end)),
    cBase: mean(c.map((f) => f.base)),
    cEnd: mean(c.map((f) => f.end)),
    tChange,
    cChange,
    tStat,
  };
}

const BINS = 28;
const MIN = -400;
const MAX = 1000;

function histogram(values) {
  const h = new Array(BINS).fill(0);
  values.forEach((v) => {
    const i = Math.min(BINS - 1, Math.max(0, Math.floor(((v - MIN) / (MAX - MIN)) * BINS)));
    h[i] += 1;
  });
  return h;
}

export default function RctSim() {
  const [effect, setEffect] = useState(16);
  const [seed, setSeed] = useState(241);
  const [ref, inView] = useInView(0.25);
  const r = useMemo(() => simulate(seed, effect / 100), [seed, effect]);

  const tGrowth = (r.tEnd / r.tBase - 1) * 100;
  const cGrowth = (r.cEnd / r.cBase - 1) * 100;
  const hT = histogram(r.tChange);
  const hC = histogram(r.cChange);
  const hMax = Math.max(...hT, ...hC);
  const barMax = Math.max(r.tEnd, r.cEnd, r.tBase, r.cBase) * 1.1;
  const significant = Math.abs(r.tStat) > 1.96;
  const g = inView ? 1 : 0;

  return (
    <div className="ub-figure lp-rct" ref={ref}>
      <div className="lp-rct-controls">
        <div className="ub-slider-row">
          <label htmlFor="lp-effect">True effect of the app</label>
          <input id="lp-effect" type="range" min="0" max="30" step="1" value={effect} onChange={(e) => setEffect(Number(e.target.value))} />
          <output htmlFor="lp-effect">+{effect}%</output>
        </div>
        <button type="button" className="ub-button ub-button-ghost" onClick={() => setSeed((s) => s + 1)}>Re-randomize 1,000 firms</button>
      </div>

      <div className="lp-rct-grid">
        <div>
          <p className="lp-chart-title">Average monthly foreign revenue</p>
          <div className="lp-bars">
            {[['Control', r.cBase, r.cEnd, cGrowth], ['Treatment', r.tBase, r.tEnd, tGrowth]].map(([name, b, e, gr]) => (
              <div key={name} className="lp-bar-group">
                <div className="lp-bar-pair">
                  <div className="lp-bar-col">
                    <span className="lp-bar-val">${Math.round(b)}</span>
                    <span className="lp-bar is-base" style={{ height: `${(b / barMax) * 100 * g}%` }} />
                  </div>
                  <div className="lp-bar-col">
                    <span className="lp-bar-val">${Math.round(e)}</span>
                    <span className={`lp-bar ${name === 'Treatment' ? 'is-treat' : 'is-ctrl'}`} style={{ height: `${(e / barMax) * 100 * g}%` }} />
                  </div>
                </div>
                <p className="lp-bar-name">{name} <span className={gr > 5 ? 'is-up' : ''}>{gr >= 0 ? '+' : ''}{gr.toFixed(1)}%</span></p>
              </div>
            ))}
          </div>
          <p className="lp-small"><i className="lp-key is-base" /> baseline <i className="lp-key is-end" /> after 6 months</p>
        </div>

        <div>
          <p className="lp-chart-title">Change in monthly revenue, per firm</p>
          <svg viewBox="0 0 280 160" className="lp-hist" role="img" aria-label="Histogram of revenue changes for control and treatment firms">
            {hC.map((v, i) => (
              <rect key={`c${i}`} x={i * 10} y={140 - (v / hMax) * 130} width="9" height={(v / hMax) * 130} className="lp-hist-c" />
            ))}
            {hT.map((v, i) => (
              <rect key={`t${i}`} x={i * 10} y={140 - (v / hMax) * 130} width="9" height={(v / hMax) * 130} className="lp-hist-t" />
            ))}
            <line x1={((0 - MIN) / (MAX - MIN)) * 280} x2={((0 - MIN) / (MAX - MIN)) * 280} y1="0" y2="140" className="lp-hist-zero" />
            <text x="0" y="155" className="lp-hist-axis">−$400</text>
            <text x={((0 - MIN) / (MAX - MIN)) * 280} y="155" textAnchor="middle" className="lp-hist-axis">$0</text>
            <text x="280" y="155" textAnchor="end" className="lp-hist-axis">+$1,000</text>
          </svg>
          <p className="lp-small"><i className="lp-key is-ctrl" /> control <i className="lp-key is-treat" /> treatment</p>
        </div>
      </div>

      <div className="lp-rct-result">
        <div><span>Difference in growth</span><strong>{(tGrowth - cGrowth).toFixed(1)} pts</strong></div>
        <div><span>t-statistic</span><strong>{r.tStat.toFixed(2)}</strong></div>
        <div><span>Verdict at 5%</span><strong className={significant ? 'is-good' : 'is-meh'}>{significant ? 'Reject H₀' : 'Can’t reject H₀'}</strong></div>
      </div>
    </div>
  );
}
