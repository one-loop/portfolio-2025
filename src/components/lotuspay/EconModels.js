'use client';
import React, { useState } from 'react';

/* ---------- 1. Network: the intermediary model ---------- */

const ROUTES = {
  lotus: { label: 'Through Lotus Pay', seller: 98, buyer: 102 },
  alt: { label: 'Through the next best option', seller: 90, buyer: 110 },
};

export function NetworkModel() {
  const [route, setRoute] = useState('lotus');
  const r = ROUTES[route];
  const isLotus = route === 'lotus';

  return (
    <div className="ub-figure lp-net">
      <div className="ub-figure-toolbar">
        <div className="ub-tabs" role="tablist" aria-label="Payment route">
          {Object.entries(ROUTES).map(([k, v]) => (
            <button key={k} type="button" role="tab" aria-selected={route === k} className={`ub-tab ${route === k ? 'is-on' : ''}`} onClick={() => setRoute(k)}>{v.label}</button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 640 260" role="img" aria-label="A seller and a buyer connected through two payment intermediaries. Lotus Pay leaves the seller $98 and costs the buyer $102; the alternative leaves $90 and costs $110.">
        <defs>
          <marker id="lp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>
        <text x="80" y="30" textAnchor="middle" className="lp-svg-label">Seller</text>
        <text x="320" y="30" textAnchor="middle" className="lp-svg-label">Payment system</text>
        <text x="560" y="30" textAnchor="middle" className="lp-svg-label">Buyer</text>

        {[['lotus', 80], ['alt', 190]].map(([k, y]) => {
          const on = route === k;
          return (
            <g key={k} className={`lp-route ${on ? 'is-on' : ''}`}>
              <path d={`M106,135 L292,${y}`} markerEnd="url(#lp-arrow)" />
              <path d={`M348,${y} L534,135`} markerEnd="url(#lp-arrow)" />
              <text x="195" y={k === 'lotus' ? 96 : 186} textAnchor="middle" className="lp-svg-money">${ROUTES[k].seller}</text>
              <text x="445" y={k === 'lotus' ? 96 : 186} textAnchor="middle" className="lp-svg-money">${ROUTES[k].buyer}</text>
              <rect x="292" y={y - 26} width="56" height="52" rx="8" className="lp-svg-box" />
              <text x="320" y={y + 44} textAnchor="middle" className="lp-svg-sub">{k === 'lotus' ? 'Lotus Pay' : 'Payoneer / wire'}</text>
            </g>
          );
        })}
        <circle cx="80" cy="135" r="26" className="lp-svg-seller" />
        <circle cx="560" cy="135" r="26" className="lp-svg-buyer" />
      </svg>

      <div className="lp-net-stats">
        <div><span>Seller keeps</span><strong>${r.seller}</strong></div>
        <div><span>Buyer’s total cost</span><strong>${r.buyer}</strong></div>
        <div><span>Lost to friction</span><strong className={isLotus ? '' : 'is-bad'}>${r.buyer - r.seller}</strong></div>
      </div>
      <p className="lp-small">
        For a $100 job. The buyer’s cost includes the fees, the time spent opening an account or visiting a bank, and the risk of paying someone they can’t vet. The seller’s side includes fees, worse exchange rates and clients who give up halfway.
      </p>
    </div>
  );
}

/* ---------- 2. Normal form game ---------- */

// payoffs[lotus][existing] = [lotus payoff, existing payoff] in $ millions
const PAYOFFS = {
  high: { high: [5, 5], low: [2, 10] },
  low: { high: [10, 2], low: [4, 4] },
};
const LABEL = { high: '10% cost', low: '2% cost' };

export function GameMatrix() {
  const [cell, setCell] = useState(['high', 'high']);
  const [showNash, setShowNash] = useState(false);
  const [lp, ex] = cell;

  const bestLotus = (exAction) => (PAYOFFS.low[exAction][0] > PAYOFFS.high[exAction][0] ? 'low' : 'high');
  const bestExisting = (lpAction) => (PAYOFFS[lpAction].low[1] > PAYOFFS[lpAction].high[1] ? 'low' : 'high');
  const isNash = (a, b) => bestLotus(b) === a && bestExisting(a) === b;

  const lpWants = bestLotus(ex);
  const exWants = bestExisting(lp);

  return (
    <div className="ub-figure lp-game">
      <div className="lp-game-grid">
        <div className="lp-game-matrix">
          <p className="lp-game-top">Existing provider</p>
          <div className="lp-game-table">
            <span />
            <span className="lp-game-h">10% cost</span>
            <span className="lp-game-h">2% cost</span>
            {['high', 'low'].map((a) => (
              <React.Fragment key={a}>
                <span className="lp-game-h lp-game-row">Lotus Pay<br />{LABEL[a]}</span>
                {['high', 'low'].map((b) => {
                  const [p1, p2] = PAYOFFS[a][b];
                  const sel = lp === a && ex === b;
                  const nash = showNash && isNash(a, b);
                  return (
                    <button
                      key={b}
                      type="button"
                      className={`lp-game-cell ${sel ? 'is-sel' : ''} ${nash ? 'is-nash' : ''}`}
                      onClick={() => setCell([a, b])}
                      aria-pressed={sel}
                    >
                      <span className="lp-p1">${p1}M</span>
                      <span className="lp-p2">${p2}M</span>
                      {nash && <em>Nash equilibrium</em>}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <p className="lp-small"><span className="lp-p1">Lotus Pay’s payoff</span> · <span className="lp-p2">existing provider’s payoff</span></p>
        </div>

        <div className="lp-game-side">
          <p className="lp-game-label">If they’re at this cell</p>
          <p>
            {lpWants === lp
              ? <>Lotus Pay would <strong>stay put</strong>. Switching would drop it to ${PAYOFFS[lp === 'high' ? 'low' : 'high'][ex][0]}M.</>
              : <>Lotus Pay would <strong>switch to {LABEL[lpWants]}</strong>, going from ${PAYOFFS[lp][ex][0]}M to ${PAYOFFS[lpWants][ex][0]}M.</>}
          </p>
          <p>
            {exWants === ex
              ? <>The existing provider would <strong>stay put</strong>. Switching would drop it to ${PAYOFFS[lp][ex === 'high' ? 'low' : 'high'][1]}M.</>
              : <>The existing provider would <strong>switch to {LABEL[exWants]}</strong>, going from ${PAYOFFS[lp][ex][1]}M to ${PAYOFFS[lp][exWants][1]}M.</>}
          </p>
          <button type="button" className="ub-button" onClick={() => { setShowNash(true); setCell(['low', 'low']); }}>Find the equilibrium</button>
          {showNash && (
            <p className="lp-game-note">
              Charging 2% is the better move whatever the other side does, so both end up there and earn $4M each. Both would do better at 10% ($5M each), but neither can trust the other to hold, which makes it a prisoner’s dilemma. That’s good news for the people paying the fees.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. The lemons problem ---------- */

const HIGH = 1000;
const LOW = 500;
const HIGH_MIN = 800; // high-quality sellers won't sell below this

export function LemonsDemo() {
  const [share, setShare] = useState(50);
  const [ratings, setRatings] = useState(false);
  const p = share / 100;
  const wtp = HIGH * p + LOW * (1 - p);
  const highStays = ratings || wtp >= HIGH_MIN;
  const price = ratings ? null : highStays ? wtp : LOW;

  const sellers = Array.from({ length: 20 }, (_, i) => (i < Math.round(p * 20) ? 'high' : 'low'));

  return (
    <div className="ub-figure lp-lemons">
      <div className="lp-lemons-controls">
        <div className="ub-slider-row">
          <label htmlFor="lp-share">High-quality sellers</label>
          <input id="lp-share" type="range" min="0" max="100" step="5" value={share} onChange={(e) => setShare(Number(e.target.value))} />
          <output htmlFor="lp-share">{share}%</output>
        </div>
        <label className="lp-check">
          <input type="checkbox" checked={ratings} onChange={(e) => setRatings(e.target.checked)} />
          Show seller ratings at checkout
        </label>
      </div>

      <div className="lp-sellers" aria-hidden="true">
        {sellers.map((q, i) => (
          <span key={i} className={`lp-seller is-${q} ${q === 'high' && !highStays ? 'is-gone' : ''}`}>
            {ratings ? (q === 'high' ? '★' : '☆') : '?'}
          </span>
        ))}
      </div>

      <div className="lp-lemons-out">
        {ratings ? (
          <>
            <div><span>High-quality work sells for</span><strong>${HIGH}</strong></div>
            <div><span>Low-quality work sells for</span><strong>${LOW}</strong></div>
            <p>With verified reviews, buyers can tell sellers apart, so each kind of work trades at its real value and good sellers stay in the market.</p>
          </>
        ) : (
          <>
            <div><span>Buyers will pay at most</span><strong>${Math.round(wtp)}</strong></div>
            <div><span>Good sellers need</span><strong>${HIGH_MIN}+</strong></div>
            <p>
              {highStays
                ? `Buyers can’t tell sellers apart, so they pay the average, $${Math.round(price)}. That’s just enough for good sellers to stay, for now.`
                : `$${Math.round(wtp)} is below what good sellers will accept, so they leave. Only low-quality work is left, and the price falls to $${LOW}. That’s the lemons problem.`}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
