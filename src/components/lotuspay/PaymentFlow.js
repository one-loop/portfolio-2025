'use client';
import React, { useState } from 'react';

// Simplified standard VAT/GST rates, for illustration.
const COUNTRIES = [
  { name: 'United Kingdom', rate: 0.2 },
  { name: 'Germany', rate: 0.19 },
  { name: 'France', rate: 0.2 },
  { name: 'Australia', rate: 0.1 },
  { name: 'Japan', rate: 0.1 },
  { name: 'Singapore', rate: 0.09 },
  { name: 'UAE', rate: 0.05 },
];

const FEE = 0.04; // processing fee, charged on the pre-tax price only
const LKR_PER_USD = 300; // rough, illustrative

const usd = (v) => `$${v.toFixed(2)}`;

export default function PaymentFlow() {
  const [price, setPrice] = useState(100);
  const [country, setCountry] = useState(0);
  const [clientCovers, setClientCovers] = useState(true);

  const c = COUNTRIES[country];
  const tax = price * c.rate;
  const fee = price * FEE;
  const paid = price + tax + (clientCovers ? fee : 0);
  const payout = clientCovers ? price : price - fee;
  const expected = price - fee / 2; // half of clients keep the box ticked

  return (
    <div className="ub-figure lp-flow">
      <div className="lp-flow-controls">
        <div className="ub-slider-row">
          <label htmlFor="lp-price">Invoice price</label>
          <input id="lp-price" type="range" min="20" max="1000" step="10" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <output htmlFor="lp-price">{usd(price)}</output>
        </div>
        <div className="lp-flow-row">
          <label htmlFor="lp-country">Client is in</label>
          <select id="lp-country" value={country} onChange={(e) => setCountry(Number(e.target.value))} className="lp-select">
            {COUNTRIES.map((x, i) => <option key={x.name} value={i}>{x.name} ({Math.round(x.rate * 100)}% tax)</option>)}
          </select>
          <label className="lp-check">
            <input type="checkbox" checked={clientCovers} onChange={(e) => setClientCovers(e.target.checked)} />
            Client covers the 4% processing fee
          </label>
        </div>
      </div>

      <div className="lp-flow-diagram">
        <div className="lp-node lp-node-client">
          <p className="lp-node-label">Client in {c.name}</p>
          <p className="lp-node-amount">{usd(paid)}</p>
          <p className="lp-node-sub">pays at checkout, no account needed</p>
        </div>

        <div className="lp-pipe" aria-hidden="true"><span /></div>

        <div className="lp-node lp-node-mor">
          <img src="/projects/lotus-pay/logo.png" alt="" />
          <p className="lp-node-label">Lotus Pay</p>
          <p className="lp-node-sub">the legal seller (merchant of record)</p>
        </div>

        <svg className="lp-split" viewBox="0 0 40 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,60 C20,60 20,20 40,20" />
          <path d="M0,60 L40,60" />
          <path d="M0,60 C20,60 20,100 40,100" />
        </svg>

        <div className="lp-outs">
          <div className="lp-node lp-node-tax">
            <p className="lp-node-label">Tax authority</p>
            <p className="lp-node-amount">{usd(tax)}</p>
            <p className="lp-node-sub">{Math.round(c.rate * 100)}% collected and remitted for you</p>
          </div>
          <div className="lp-node lp-node-fee">
            <p className="lp-node-label">Processing</p>
            <p className="lp-node-amount">{usd(fee)}</p>
            <p className="lp-node-sub">4% of the pre-tax price, {clientCovers ? 'paid by the client' : 'taken from the payout'}</p>
          </div>
          <div className="lp-node lp-node-you">
            <p className="lp-node-label">You, in Sri Lanka</p>
            <p className="lp-node-amount">{usd(payout)}</p>
            <p className="lp-node-sub">weekly payout ≈ {Math.round(payout * LKR_PER_USD).toLocaleString()} LKR</p>
          </div>
        </div>
      </div>

      <p className="lp-flow-note">
        If half of clients keep the fee box ticked, the expected payout on this invoice is <strong>{usd(expected)}</strong>, an effective fee of 2%.
      </p>
    </div>
  );
}
