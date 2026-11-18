'use client';
import React, { useState } from 'react';

const TIERS = [
  { name: 'Free', limit: 1000, fee: 0.04, sub: 0, subLkr: 'Free' },
  { name: 'Plus', limit: 2000, fee: 0.0375, sub: 30, subLkr: '10,000 LKR' },
  { name: 'Pro', limit: 5000, fee: 0.035, sub: 47, subLkr: '15,000 LKR' },
  { name: 'Enterprise', limit: Infinity, fee: 0.0325, sub: 63, subLkr: '20,000 LKR' },
];

export function PricingCalc() {
  const [volume, setVolume] = useState(1500);
  const rows = TIERS.map((t) => ({ ...t, ok: volume <= t.limit, cost: t.sub + t.fee * volume }));
  const best = rows.filter((r) => r.ok).sort((a, b) => a.cost - b.cost)[0];

  return (
    <div className="ub-figure lp-pricing">
      <div className="ub-slider-row">
        <label htmlFor="lp-volume">Monthly sales through Lotus Pay</label>
        <input id="lp-volume" type="range" min="100" max="8000" step="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
        <output htmlFor="lp-volume">${volume.toLocaleString()}</output>
      </div>
      <div className="lp-tiers">
        {rows.map((r) => (
          <div key={r.name} className={`lp-tier ${r.ok ? '' : 'is-out'} ${best && best.name === r.name ? 'is-best' : ''}`}>
            <p className="lp-tier-name">{r.name}</p>
            <p className="lp-tier-meta">{r.limit === Infinity ? 'Unlimited' : `Up to $${r.limit.toLocaleString()}/mo`} · {(r.fee * 100).toFixed(2)}% · {r.subLkr}</p>
            <p className="lp-tier-cost">{r.ok ? `$${r.cost.toFixed(0)}` : 'Over the limit'}</p>
            <p className="lp-tier-sub">{r.ok ? 'total cost this month' : ''}</p>
            {best && best.name === r.name && <span className="lp-tier-badge">Cheapest for you</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BdmGame() {
  const [value, setValue] = useState(100);
  const [report, setReport] = useState(100);
  const [price, setPrice] = useState(null);

  const draw = () => setPrice(1 + Math.floor(Math.random() * 500));
  const buys = price !== null && price <= report;
  const surplus = buys ? value - price : 0;
  const truthfulBuys = price !== null && price <= value;
  const truthfulSurplus = truthfulBuys ? value - price : 0;

  let lesson = '';
  if (price !== null) {
    if (report === value) lesson = 'You told the truth, so you only buy when the price is worth it to you.';
    else if (surplus < 0) lesson = `Over-reporting made you overpay: you bought something worth $${value} to you for $${price}.`;
    else if (surplus < truthfulSurplus) lesson = `Under-reporting cost you a good deal: the app was worth $${value} to you and you could have had it for $${price}.`;
    else lesson = 'This time misreporting didn’t hurt, but on average it can only cost you. Telling the truth is always optimal.';
  }

  return (
    <div className="ub-figure lp-bdm">
      <div className="ub-slider-row">
        <label htmlFor="lp-value">What the app is really worth to you</label>
        <input id="lp-value" type="range" min="1" max="500" value={value} onChange={(e) => { setValue(Number(e.target.value)); setPrice(null); }} />
        <output htmlFor="lp-value">${value}</output>
      </div>
      <div className="ub-slider-row">
        <label htmlFor="lp-report">What you tell us</label>
        <input id="lp-report" type="range" min="1" max="500" value={report} onChange={(e) => { setReport(Number(e.target.value)); setPrice(null); }} />
        <output htmlFor="lp-report">${report}</output>
      </div>
      <div className="lp-bdm-row">
        <button type="button" className="ub-button" onClick={draw}>Draw a random price ($1–$500)</button>
        {price !== null && (
          <div className="lp-bdm-out" key={price}>
            <span>Price drawn: <strong>${price}</strong></span>
            <span>{buys ? `You buy at $${price}. Your surplus: ` : 'Price is above your report, so no sale. Surplus: '}<strong className={surplus < 0 ? 'is-bad' : ''}>{surplus >= 0 ? `$${surplus}` : `−$${-surplus}`}</strong></span>
          </div>
        )}
      </div>
      {lesson && <p className="lp-small lp-bdm-lesson">{lesson}</p>}
    </div>
  );
}
