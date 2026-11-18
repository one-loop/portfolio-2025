'use client';
import React, { useState } from 'react';

const BASE = '/projects/lotus-pay';

const TOURS = {
  seller: {
    label: 'Seller side',
    steps: [
      { img: 'landing', url: 'trylotus.app', title: 'Landing page', text: 'The pitch, front and center: simpler, seamless global transactions.' },
      { img: 'onboarding', url: 'trylotus.app/auth/start', title: 'Sign up', text: 'Sign up as a business or as an individual freelancer. In the demo, details stay in your browser tab.' },
      { img: 'dashboard', url: 'trylotus.app/dashboard', title: 'Dashboard', text: 'Revenue, payments, refunds and payouts at a glance, switchable between USD and LKR.' },
      { img: 'add-product', url: 'trylotus.app/dashboard/products', title: 'Add a product', text: 'Name it, price it, and mark it as a one-time or monthly recurring payment.' },
      { img: 'link-copied', url: 'trylotus.app/dashboard/products', title: 'Share the link', text: 'Every product gets a checkout link. Copy it and send it to the client. That’s the whole integration.' },
      { img: 'payouts', url: 'trylotus.app/dashboard/payouts', title: 'Get paid', text: 'Connect a local bank account and set automatic weekly payouts, in LKR or USD.' },
    ],
  },
  buyer: {
    label: 'Client side',
    steps: [
      { img: 'checkout', url: 'trylotus.app/checkout', title: 'Checkout', text: 'No account needed. Tax is added based on the billing country, the price is converted to the client’s currency, and the 4% fee box is ticked by default.' },
      { img: 'seller-reviews', url: 'trylotus.app/checkout', title: 'Check the seller', text: 'Ratings and reviews from past clients, right inside checkout. This is the fix for the lemons problem.' },
      { img: 'payment', url: 'trylotus.app/checkout/payment', title: 'Pay', text: 'Card, Apple Pay or Google Pay. The demo runs in test mode with a sandbox card.' },
      { img: 'success', url: 'trylotus.app/checkout/success', title: 'Receipt', text: 'A confirmation with a downloadable invoice, which the seller can also see from their dashboard.' },
    ],
  },
};

export default function ScreenTour() {
  const [side, setSide] = useState('seller');
  const [i, setI] = useState(0);
  const tour = TOURS[side];
  const s = tour.steps[i];

  const switchSide = (k) => { setSide(k); setI(0); };

  return (
    <div className="ub-figure lp-tour">
      <div className="ub-figure-toolbar">
        <div className="ub-tabs" role="tablist" aria-label="Which side of the app">
          {Object.entries(TOURS).map(([k, t]) => (
            <button key={k} type="button" role="tab" aria-selected={side === k} className={`ub-tab ${side === k ? 'is-on' : ''}`} onClick={() => switchSide(k)}>{t.label}</button>
          ))}
        </div>
        <span className="lp-tour-count">{i + 1} / {tour.steps.length}</span>
      </div>

      <div className="lp-browser">
        <div className="lp-browser-bar">
          <span className="lp-dot" /><span className="lp-dot" /><span className="lp-dot" />
          <span className="lp-browser-url">{s.url}</span>
        </div>
        <div className="lp-browser-view">
          <img key={`${side}-${s.img}`} src={`${BASE}/${s.img}.webp`} alt={`${s.title}: ${s.text}`} />
        </div>
      </div>

      <div className="lp-tour-bottom">
        <div className="lp-tour-text" key={`${side}-${i}`}>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </div>
        <div className="lp-tour-nav">
          <button type="button" className="ub-button ub-button-ghost" onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0}>Back</button>
          <button type="button" className="ub-button" onClick={() => setI((v) => (v + 1) % tour.steps.length)}>{i === tour.steps.length - 1 ? 'Start over' : 'Next'}</button>
        </div>
      </div>

      <div className="lp-tour-dots">
        {tour.steps.map((st, k) => (
          <button key={st.img} type="button" className={k === i ? 'is-on' : ''} onClick={() => setI(k)} aria-label={`Go to ${st.title}`} />
        ))}
      </div>
    </div>
  );
}
