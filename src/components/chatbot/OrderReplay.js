'use client';
import React, { useEffect, useRef, useState } from 'react';

// A typical ordering conversation, simplified. Values are made up.
const TURNS = [
  {
    user: 'do you have margherita pizza?',
    status: '[Looking up ‘Margherita’ in the menu…]',
    bot: 'Yes! Margherita is AED 31.00. Would you like to place an order?',
    via: ['Item matcher', 'Menu server', 'Qwen 2.5'],
    state: { in_order_flow: false },
  },
  {
    user: 'yes, two of them',
    bot: 'Great: 2× Margherita comes to AED 62.00. What’s your RFID number? It’s the 6 digits after the + on the back of your NYU card.',
    via: ['Prompt builder', 'Qwen 2.5'],
    state: { in_order_flow: true, items: '2× Margherita', total_cost: 'AED 62.00' },
  },
  {
    user: '12345',
    bot: 'Your RFID must be exactly 6 digits. You provided 5 digits (12345). Please provide your complete 6-digit RFID.',
    via: ['Pre-validation'],
    note: 'Rejected by regex before the model ran. Instant, and no chance of the model “accepting” a bad ID.',
    state: { in_order_flow: true, items: '2× Margherita', total_cost: 'AED 62.00' },
  },
  {
    user: '123456, I’m in A2C',
    bot: 'Thanks! What’s the best phone number to reach you?',
    via: ['Pre-validation', 'Qwen 2.5'],
    state: { in_order_flow: true, items: '2× Margherita', total_cost: 'AED 62.00', rf_id: '123456', building: 'A2C' },
  },
  {
    user: '+971 50 123 4567',
    bot: 'Got it. Any special requests, like toppings or dietary restrictions?',
    via: ['Pre-validation', 'Qwen 2.5'],
    note: 'Phone numbers in any common UAE format are normalized to 05XXXXXXXX.',
    state: { in_order_flow: true, items: '2× Margherita', total_cost: 'AED 62.00', rf_id: '123456', building: 'A2C', phone: '0501234567' },
  },
  {
    user: 'no onions please',
    bot: 'Your order is confirmed: 2× Margherita (AED 62.00), delivered to A2C. Special request: no onions.',
    via: ['Qwen 2.5', 'Order detector', 'orders.txt', 'Printer'],
    state: { in_order_flow: true, items: '2× Margherita', total_cost: 'AED 62.00', rf_id: '123456', building: 'A2C', phone: '0501234567', special_request: 'no onions', order_saved: true },
  },
];

const FIELDS = ['in_order_flow', 'items', 'total_cost', 'rf_id', 'building', 'phone', 'special_request', 'order_saved'];

export default function OrderReplay() {
  const [turn, setTurn] = useState(0);
  const chatRef = useRef(null);

  // Keep the newest message in view inside the chat panel.
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [turn]);
  const prev = turn > 0 ? TURNS[turn - 1].state : {};
  const cur = TURNS[turn].state;

  return (
    <div className="ub-figure cb-replay">
      <div className="cb-chat" aria-live="polite" ref={chatRef}>
        {TURNS.slice(0, turn + 1).map((t, i) => (
          <div key={i} className={`cb-turn ${i === turn ? 'is-current' : ''}`}>
            <div className="cb-bubble cb-user">{t.user}</div>
            {t.status && <div className="cb-status">{t.status}</div>}
            <div className={`cb-bubble cb-bot ${t.via.length === 1 && t.via[0] === 'Pre-validation' ? 'is-error' : ''}`}>{t.bot}</div>
          </div>
        ))}
      </div>

      <div className="cb-side">
        <p className="cb-side-label">Handled by</p>
        <div className="cb-via">
          {TURNS[turn].via.map((v) => <span key={v}>{v}</span>)}
        </div>
        {TURNS[turn].note && <p className="cb-note">{TURNS[turn].note}</p>}

        <p className="cb-side-label">Order state</p>
        <dl className="cb-state">
          {FIELDS.map((f) => {
            const v = cur[f];
            const changed = v !== undefined && v !== prev[f];
            return (
              <div key={f} className={changed ? 'is-changed' : ''}>
                <dt>{f}</dt>
                <dd>{v === undefined ? <span className="cb-null">None</span> : String(v)}</dd>
              </div>
            );
          })}
        </dl>

        <div className="cb-replay-nav">
          <button type="button" className="ub-button ub-button-ghost" onClick={() => setTurn((t) => Math.max(0, t - 1))} disabled={turn === 0}>Back</button>
          <button type="button" className="ub-button" onClick={() => setTurn((t) => (t + 1) % TURNS.length)}>
            {turn === TURNS.length - 1 ? 'Start over' : 'Next message'}
          </button>
        </div>
      </div>
    </div>
  );
}
