'use client';
import React, { useState } from 'react';

// Worked examples of the matching pipeline. Matches and prices are real menu
// entries; the pipeline itself is described in the text.
const EXAMPLES = [
  {
    message: 'can i get 2 margarita and a pepperoni',
    chunks: [
      { qty: 2, text: 'margarita', match: 'Margherita', price: 31, kind: 'item' },
      { qty: 1, text: 'pepperoni', match: 'Pepperoni', price: 43, kind: 'item' },
    ],
  },
  {
    message: 'two fries and one sweet potato fry',
    chunks: [
      { qty: 2, text: 'fries', match: 'French Fries', price: 9, kind: 'item' },
      { qty: 1, text: 'sweet potato fry', match: 'Sweet Potato Fries', price: 11, kind: 'item' },
    ],
  },
  {
    message: 'what acai bowls do you have',
    chunks: [
      { qty: 1, text: 'acai bowls', match: 'Acai Bowls', kind: 'category' },
    ],
  },
];

export default function ItemMatcher() {
  const [ex, setEx] = useState(0);
  const e = EXAMPLES[ex];
  const total = e.chunks.reduce((a, c) => a + (c.price ? c.price * c.qty : 0), 0);

  return (
    <div className="ub-figure cb-matcher">
      <div className="ub-tabs cb-matcher-tabs" role="tablist" aria-label="Example messages">
        {EXAMPLES.map((x, i) => (
          <button key={x.message} type="button" role="tab" aria-selected={ex === i} className={`ub-tab ${ex === i ? 'is-on' : ''}`} onClick={() => setEx(i)}>
            Example {i + 1}
          </button>
        ))}
      </div>

      <div className="cb-pipe" key={ex}>
        <div className="cb-pipe-col">
          <p className="cb-pipe-label">1 · Message</p>
          <div className="cb-bubble cb-user cb-pipe-msg">{e.message}</div>
        </div>
        <span className="cb-pipe-arrow" aria-hidden="true">→</span>
        <div className="cb-pipe-col">
          <p className="cb-pipe-label">2 · Quantity + chunk</p>
          {e.chunks.map((c) => (
            <div key={c.text} className="cb-chip-row"><span className="cb-qty">{c.qty}×</span><span className="cb-chunk">“{c.text}”</span></div>
          ))}
        </div>
        <span className="cb-pipe-arrow" aria-hidden="true">→</span>
        <div className="cb-pipe-col">
          <p className="cb-pipe-label">3 · Nearest menu entry</p>
          {e.chunks.map((c) => (
            <div key={c.text} className="cb-chip-row">
              <span className={`cb-match ${c.kind === 'category' ? 'is-cat' : ''}`}>{c.match}</span>
              <span className="cb-kind">{c.kind}</span>
            </div>
          ))}
        </div>
        <span className="cb-pipe-arrow" aria-hidden="true">→</span>
        <div className="cb-pipe-col">
          <p className="cb-pipe-label">4 · Menu server check</p>
          {e.chunks.map((c) => (
            <div key={c.text} className="cb-chip-row">
              {c.kind === 'category' ? (
                <span className="cb-verified">all items in category</span>
              ) : (
                <span className="cb-verified">AED {(c.price * c.qty).toFixed(2)}</span>
              )}
            </div>
          ))}
          {total > 0 && <p className="cb-pipe-total">Total AED {total.toFixed(2)}</p>}
        </div>
      </div>
    </div>
  );
}
