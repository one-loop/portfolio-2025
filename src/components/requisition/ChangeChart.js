'use client';
import React, { useState } from 'react';
import { FIELDS } from './data';

const MAX = 45; // percentage points at the edge of the chart

// Change in percentage points for every field, gains to the right and drops to the left.
export default function ChangeChart() {
  const [sorted, setSorted] = useState(true);
  const rows = sorted
    ? [...FIELDS].sort((a, b) => (b.after - b.before) - (a.after - a.before))
    : FIELDS;

  return (
    <div className="ub-figure rq-change-fig">
      <div className="rq-toolbar">
        <div className="rq-toggle" role="group" aria-label="Order of the fields">
          <button type="button" className={sorted ? 'is-on' : ''} aria-pressed={sorted} onClick={() => setSorted(true)}>
            Biggest change first
          </button>
          <button type="button" className={!sorted ? 'is-on' : ''} aria-pressed={!sorted} onClick={() => setSorted(false)}>
            Form order
          </button>
        </div>
        <p className="rq-legend">
          <span className="is-up">Filled in more</span>
          <span className="is-down">Filled in less</span>
          <span className="is-ns">Not significant</span>
        </p>
      </div>

      <div className="rq-change" role="table" aria-label="Change in how often each field was filled in, in percentage points">
        {rows.map((f) => {
          const d = f.after - f.before;
          const w = Math.min(Math.abs(d), MAX) / MAX * 50;
          const cls = !f.sig ? 'is-ns' : d >= 0 ? 'is-up' : 'is-down';
          return (
            <div className={`rq-change-row ${cls}`} role="row" key={f.label}>
              <span className="rq-change-label" role="rowheader">{f.label}</span>
              <span className="rq-change-track" role="cell" aria-label={`${f.before.toFixed(1)}% to ${f.after.toFixed(1)}%`}>
                <span className="rq-change-axis" />
                <span
                  className="rq-change-bar"
                  style={d >= 0 ? { left: '50%', width: `${w}%` } : { right: '50%', width: `${w}%` }}
                />
              </span>
              <span className="rq-change-value" role="cell">
                {d > 0 ? '+' : d < 0 ? '−' : '±'}{Math.abs(d).toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
