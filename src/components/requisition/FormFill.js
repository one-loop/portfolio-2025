'use client';
import React, { useState } from 'react';
import { GROUPS, average } from './data';

const fmt = (n) => (n === 100 ? '100' : n.toFixed(1));

// The request form drawn as a sheet: each field's line fills to the share of forms that had it.
export default function FormFill() {
  const [phase, setPhase] = useState('after');
  const avg = average(phase);

  return (
    <div className="ub-figure rq-form-fig">
      <div className="rq-toolbar">
        <div className="rq-toggle" role="group" aria-label="Which forms to show">
          {[
            ['before', 'Before'],
            ['after', 'After orientation'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={phase === key ? 'is-on' : ''}
              aria-pressed={phase === key}
              onClick={() => setPhase(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="rq-avg">
          Average field filled in: <strong>{avg.toFixed(1)}%</strong>
        </p>
      </div>

      <div className={`rq-sheet is-${phase}`}>
        <p className="rq-sheet-title">Histopathology request form</p>
        {GROUPS.map((g) => (
          <div className="rq-group" key={g.name}>
            <p className="rq-group-name">{g.name}</p>
            {g.fields.map((f) => {
              const value = f[phase];
              const dropped = phase === 'after' && f.sig && f.after < f.before;
              return (
                <div className={`rq-field${dropped ? ' is-dropped' : ''}`} key={f.label}>
                  <span className="rq-field-label">{f.label}</span>
                  <span className="rq-field-line">
                    <span className="rq-field-ink" style={{ width: `${value}%` }} />
                  </span>
                  <span className="rq-field-value">{fmt(value)}%</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
