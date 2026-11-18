'use client';
import React, { useState } from 'react';

const ROWS = [
  { k: 'Who the client legally buys from', mor: 'Lotus Pay', proc: 'You' },
  { k: 'Sales tax / VAT / GST', mor: 'Lotus Pay calculates, collects and remits it', proc: 'You register and file in each country' },
  { k: 'Invoices and receipts', mor: 'Generated automatically', proc: 'Your job' },
  { k: 'Chargebacks and fraud', mor: 'Lotus Pay carries the risk', proc: 'You carry the risk' },
  { k: 'How the money arrives', mor: 'A supplier payout, treated like export proceeds', proc: 'A card payment straight to your account' },
  { k: 'Works in Sri Lanka today?', mor: 'Fits within the foreign exchange rules', proc: 'Not available' },
];

export default function ModelCompare() {
  const [model, setModel] = useState('mor');
  const isMor = model === 'mor';

  return (
    <div className="ub-figure lp-compare">
      <div className="ub-figure-toolbar">
        <div className="ub-tabs" role="tablist" aria-label="Payment model">
          <button type="button" role="tab" aria-selected={isMor} className={`ub-tab ${isMor ? 'is-on' : ''}`} onClick={() => setModel('mor')}>Merchant of record</button>
          <button type="button" role="tab" aria-selected={!isMor} className={`ub-tab ${!isMor ? 'is-on' : ''}`} onClick={() => setModel('proc')}>Payment processor</button>
        </div>
        <p className="lp-compare-who">{isMor ? 'e.g. Lotus Pay, Paddle, Dodo Payments' : 'e.g. Stripe, PayPal'}</p>
      </div>

      <div className={`lp-chain ${isMor ? 'is-mor' : 'is-proc'}`} aria-hidden="true">
        <span className="lp-chain-node">Client</span>
        <span className="lp-chain-arrow">→</span>
        <span className="lp-chain-node lp-chain-mid">{isMor ? 'Lotus Pay (seller)' : 'Stripe (processor)'}</span>
        <span className="lp-chain-arrow">→</span>
        <span className="lp-chain-node">{isMor ? 'You (supplier)' : 'You (seller)'}</span>
      </div>

      <ul className="lp-compare-rows">
        {ROWS.map((r) => {
          const v = isMor ? r.mor : r.proc;
          const onYou = /^You|Your job|Not available/.test(v);
          return (
            <li key={r.k} className={onYou ? 'is-you' : 'is-them'}>
              <span className="lp-compare-k">{r.k}</span>
              <span className="lp-compare-v" key={model}>{v}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
