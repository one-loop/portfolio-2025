'use client';
import React, { useState } from 'react';

// The five statuses in front-end/src/constants/statuses.js, in the order the
// "next status" button moves an article through them.
const STAGES = [
  { key: 'inbox', label: 'Inbox', icon: '📥', blurb: 'Everything you save lands here first, to triage later.' },
  { key: 'daily', label: 'Daily Reading', icon: '☀️', blurb: 'A short, deliberate queue for today, instead of an endless list.' },
  { key: 'continue', label: 'Continue Reading', icon: '📖', blurb: 'Half-finished pieces, with your scroll progress saved so you can pick up where you left off.' },
  { key: 'rediscovery', label: 'Rediscovery', icon: '🔁', blurb: 'Things worth coming back to, kept separate so they resurface instead of sinking.' },
  { key: 'archived', label: 'Archive', icon: '🗄️', blurb: 'Finished. Reaching the end of an article asks for an optional reflection, saves it as a note and archives the piece.' },
];

const ARTICLES = [
  { id: 1, title: 'Why we forget what we read', type: 'Article', mins: 9 },
  { id: 2, title: 'A short history of RSS', type: 'Article', mins: 12 },
  { id: 3, title: 'Designing calm software', type: 'Video', mins: 18 },
];

export default function StatusPipeline() {
  const [where, setWhere] = useState({ 1: 'inbox', 2: 'inbox', 3: 'daily' });
  const [selected, setSelected] = useState('inbox');

  const move = (id, dir) => {
    setWhere((w) => {
      const i = STAGES.findIndex((s) => s.key === w[id]);
      const j = Math.max(0, Math.min(STAGES.length - 1, i + dir));
      return { ...w, [id]: STAGES[j].key };
    });
  };

  const sel = STAGES.find((s) => s.key === selected);

  return (
    <div className="ub-figure fn-pipe">
      <div className="fn-pipe-cols">
        {STAGES.map((s, i) => {
          const items = ARTICLES.filter((a) => where[a.id] === s.key);
          return (
            <div key={s.key} className={`fn-col ${selected === s.key ? 'is-sel' : ''}`}>
              <button type="button" className="fn-col-head" onClick={() => setSelected(s.key)} aria-pressed={selected === s.key}>
                <span aria-hidden="true">{s.icon}</span>
                <span>{s.label}</span>
                <span className="fn-count">{items.length}</span>
              </button>
              <div className="fn-col-body">
                {items.map((a) => (
                  <div key={a.id} className="fn-card">
                    <p className="fn-card-title">{a.title}</p>
                    <p className="fn-card-meta">{a.type} · {a.mins} min</p>
                    <div className="fn-card-actions">
                      <button type="button" onClick={() => move(a.id, -1)} disabled={i === 0} aria-label={`Move ${a.title} back`}>←</button>
                      <button type="button" onClick={() => move(a.id, 1)} disabled={i === STAGES.length - 1} aria-label={`Move ${a.title} forward`}>
                        {i === STAGES.length - 2 ? 'Finish' : 'Next'} →
                      </button>
                    </div>
                  </div>
                ))}
                {items.length === 0 && <p className="fn-empty">Empty</p>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="fn-pipe-detail" key={selected}>
        <strong>{sel.icon} {sel.label}</strong>
        <p>{sel.blurb}</p>
      </div>
    </div>
  );
}
