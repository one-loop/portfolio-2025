'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './ProjectWriteup.css';
import './LotusPay.css';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';
import PaymentFlow from '../components/lotuspay/PaymentFlow';
import ModelCompare from '../components/lotuspay/ModelCompare';
import ScreenTour from '../components/lotuspay/ScreenTour';
import { NetworkModel, GameMatrix, LemonsDemo } from '../components/lotuspay/EconModels';
import RctSim from '../components/lotuspay/RctSim';
import { PricingCalc, BdmGame } from '../components/lotuspay/Pricing';

const REPO = 'https://github.com/one-loop/lotus-pay';
const DEMO = 'https://www.trylotus.app/';
const NOTEBOOK = 'https://github.com/one-loop/lotus-pay/blob/main/Lotus%20Pay%20RCT%20Simulated%20Experiment.ipynb';

const SECTIONS = [
  { id: 'why', label: 'Why I care' },
  { id: 'today', label: 'Getting paid today' },
  { id: 'idea', label: 'Merchant of record' },
  { id: 'payment', label: 'Following a payment' },
  { id: 'demo', label: 'The demo' },
  { id: 'economics', label: 'The economics' },
  { id: 'experiment', label: 'Testing it on paper' },
  { id: 'value', label: 'What it’s worth' },
  { id: 'next', label: 'What’s next' },
];

const TODAY = [
  { name: 'Stripe', how: 'Payment processor', catch: 'Available in roughly 46 countries, nearly all high-income. Not Sri Lanka.' },
  { name: 'PayPal', how: 'Payment aggregator', catch: 'Widely available, but in Sri Lanka you can send money, not receive it.' },
  { name: 'Wire transfer', how: 'SWIFT, via intermediate banks', catch: '$15–50 from the sender’s bank, LKR 500–2,000 on arrival, fees in between, and a week or more of waiting.' },
  { name: 'Western Union', how: 'Remittance', catch: 'Built for sending money to family. No invoicing, extra checks on business payments, and usually paid out in rupees only.' },
  { name: 'Payoneer', how: 'Cross-border platform', catch: 'What most people actually use. Your client has to open an account first, and there are receiving, withdrawal and FX fees, plus $29.95 a year below $6,000 in earnings.' },
];

export default function LotusPay() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ub lp">
      <SEOBreadcrumbs items={[{ name: 'Projects', url: '/projects' }, { name: 'Lotus Pay', url: '/projects/lotus-pay' }]} />
      <div className="ub-glow lp-glow" aria-hidden="true" />

      <nav className="ub-toc" aria-label="On this page">
        <Link href="/projects" className="ub-back">← Projects</Link>
        <ol>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={active === s.id ? 'is-active' : ''}>{s.label}</a>
            </li>
          ))}
        </ol>
      </nav>

      <article className="ub-article">
        <header className="ub-header">
          <Link href="/projects" className="ub-back ub-back-inline">← Projects</Link>
          <div className="ub-tag"><span className="ub-tag-dot lp-tag-dot" />Concept · Tech &amp; Economic Development · Spring 2026</div>
          <div className="lp-title-row">
            <img src="/projects/lotus-pay/logo.png" alt="" className="lp-title-logo" />
            <h1 className="ub-title">Lotus Pay</h1>
          </div>
          <p className="ub-subtitle">
            A proposal for how freelancers and small businesses in Sri Lanka could get paid by clients anywhere in the world, with a clickable demo to show it.
          </p>
          <dl className="ub-meta">
            <div><dt>Course</dt><dd>ECON-UH 241, NYU Abu Dhabi</dd></div>
            <div><dt>Status</dt><dd>Concept + demo, never launched</dd></div>
            <div><dt>Demo</dt><dd><a href={DEMO} target="_blank" rel="noreferrer">trylotus.app ↗</a></dd></div>
            <div><dt>Code</dt><dd><a href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a></dd></div>
          </dl>
        </header>

        <aside className="ub-tldr">
          <p className="ub-tldr-label">The short version</p>
          <ul>
            <li>Stripe and PayPal don’t let Sri Lankans receive international payments, so freelancers there lose clients to clunky workarounds.</li>
            <li>Lotus Pay is a <em>merchant of record</em>: it becomes the legal seller, handles tax and risk, and pays the freelancer out to a local bank. That structure fits Sri Lanka’s foreign exchange rules.</li>
            <li>It’s a concept. I built a clickable demo, modeled the economics, and designed an RCT to test it, then ran that RCT as a simulation. No real money or real users were involved.</li>
          </ul>
        </aside>

        <figure className="ub-fig">
          <div className="lp-hero-frame">
            <div className="lp-browser-bar">
              <span className="lp-dot-sm" /><span className="lp-dot-sm" /><span className="lp-dot-sm" />
              <span className="lp-browser-url">trylotus.app</span>
            </div>
            <img src="/projects/lotus-pay/landing.webp" alt="The Lotus Pay landing page: Simpler, Seamless, Global Transactions." />
          </div>
          <figcaption><span>Figure 1.</span> The demo’s landing page. Everything on the site runs in test mode with sample data.</figcaption>
        </figure>

        <section id="why" className="ub-section">
          <h2><span>01</span>Why I care</h2>
          <p>
            The summer after high school I started freelancing, building websites and apps for clients I found through cold emails and online forums. The work was the fun part. Getting paid wasn’t.
          </p>
          <p>
            I’d assumed Stripe or PayPal would just work, and in Sri Lanka they don’t. After days of searching I landed on Payoneer, which does work, but only if your client agrees to create an account with a service they’ve never heard of, which takes about fifteen minutes. One client gave up halfway through, and I never got paid for that project. Forums were full of other Sri Lankan freelancers with the same story.
          </p>
          <p>
            It doesn’t matter how skilled you are or how good your rates are: if you can’t get paid reliably, you can’t build a business. So when my Tech &amp; Economic Development course asked for a final project, I wanted to work on this problem.
          </p>
        </section>

        <section id="today" className="ub-section">
          <h2><span>02</span>Getting paid today</h2>
          <p>Here’s how money from a foreign client can reach a Sri Lankan freelancer right now, and what goes wrong with each option.</p>
          <div className="lp-today">
            {TODAY.map((t) => (
              <div key={t.name} className="lp-today-row">
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.how}</span>
                </div>
                <p>{t.catch}</p>
              </div>
            ))}
          </div>
          <p>
            None of these is broken on purpose. Stripe hasn’t prioritized a market Sri Lanka’s size, and plans to launch there have been delayed for almost a decade. But together they add up to something like a tax on being from the wrong country.
          </p>
        </section>

        <section id="idea" className="ub-section">
          <h2><span>03</span>Merchant of record</h2>
          <p>
            Other developing markets have hit the same wall and found a way around it. In India, companies like Razorpay and Dodo Payments serve businesses that couldn’t easily use Stripe. Dodo Payments in particular uses a model called <em>merchant of record</em> (MoR), and that’s what Lotus Pay borrows.
          </p>
          <p>
            With a payment processor like Stripe, your client buys from <em>you</em>, and you’re responsible for tax, invoices, chargebacks and compliance. With a merchant of record, your client buys from the platform. The platform is the legal seller and takes on all of that, and you’re its supplier. Toggle between them:
          </p>
          <figure className="ub-fig">
            <ModelCompare />
            <figcaption><span>Figure 2.</span> Who does what under each model. Rows in pink are your problem, rows in green are handled for you.</figcaption>
          </figure>
          <p>
            That legal difference is the whole point. Sri Lanka’s Foreign Exchange Act No. 12 of 2017 says incoming foreign money has to come through authorized banking channels, which is a big reason card processors haven’t been able to pay Sri Lankans directly. Under a merchant of record, the card payment never goes to you. The platform pays you afterwards as its supplier, which looks more like export proceeds or contractor income, and that fits much more easily within the rules.
          </p>
        </section>

        <section id="payment" className="ub-section">
          <h2><span>04</span>Following a payment</h2>
          <p>
            The fee design was the part I thought about most. Processing costs about 4%. By default, the client covers it with a pre-ticked box at checkout, so the freelancer gets the full price. If I assume half of clients leave the box ticked, a freelancer’s expected fee is just 2%, lower than what Stripe charges sellers in the countries it does serve.
          </p>
          <p>
            Tax is handled separately. It’s worked out from the client’s country, added on top and remitted by Lotus Pay, and the processing fee only applies to the pre-tax price.
          </p>
          <figure className="ub-fig">
            <PaymentFlow />
            <figcaption><span>Figure 3.</span> Where every dollar goes. Change the price, the client’s country and the fee checkbox. Tax rates are simplified standard rates, and the rupee figure assumes roughly 300 LKR to the dollar.</figcaption>
          </figure>
        </section>

        <section id="demo" className="ub-section">
          <h2><span>05</span>The demo</h2>
          <p>
            To make the proposal concrete, I built a clickable demo at <a href={DEMO} target="_blank" rel="noreferrer">trylotus.app</a>. To be clear about what it is: a front end with sample data, running in test mode. Nothing connects to a bank, card networks or tax authorities, and nobody has used it to move real money. It shows how the product would feel, on both sides of a payment.
          </p>
          <figure className="ub-fig">
            <ScreenTour />
            <figcaption><span>Figure 4.</span> A tour of the demo, from the screenshots in my report. Switch between the seller’s side and the client’s side.</figcaption>
          </figure>
        </section>

        <section id="economics" className="ub-section">
          <h2><span>06</span>The economics</h2>
          <p>
            This was an economics course, so the product had to stand up as a model too. I looked at it three ways.
          </p>

          <h3 className="lp-h3">A cheaper middleman</h3>
          <p>
            In network terms, Lotus Pay is just another intermediary between a seller and a buyer, so the question is which path costs less. On a $100 job, my estimate is that the seller keeps $98 through Lotus Pay against about $90 through today’s options, once you count fees, bad exchange rates and clients who give up. The buyer pays about $102 against $110. A rational seller and a rational buyer both pick the same path.
          </p>
          <figure className="ub-fig">
            <NetworkModel />
            <figcaption><span>Figure 5.</span> The market-intermediary model from the report. These are rough estimates of the full economic cost, not just the posted fees.</figcaption>
          </figure>

          <h3 className="lp-h3">A price war that helps everyone else</h3>
          <p>
            What happens when Lotus Pay enters a market where the alternatives effectively cost 10%? I modeled it as a two-player game where each provider picks a high or low effective cost. Click around the payoffs and see who wants to move.
          </p>
          <figure className="ub-fig">
            <GameMatrix />
            <figcaption><span>Figure 6.</span> A normal form game between Lotus Pay and the existing provider, with payoffs in millions of dollars of revenue. The numbers are illustrative.</figcaption>
          </figure>

          <h3 className="lp-h3">Fixing the lemons problem</h3>
          <p>
            The last problem isn’t about fees at all. A client hiring a freelancer abroad can’t tell good work from bad before paying. Following Akerlof’s “market for lemons,” buyers then only pay the average value, good sellers walk away, and quality collapses. That’s why Lotus Pay shows seller ratings and verified reviews right on the checkout page.
          </p>
          <figure className="ub-fig">
            <LemonsDemo />
            <figcaption><span>Figure 7.</span> The report’s example: good work is worth $1,000, bad work $500, and good sellers won’t sell for less than $800. Drag the share of good sellers, then turn on ratings.</figcaption>
          </figure>
        </section>

        <section id="experiment" className="ub-section">
          <h2><span>07</span>Testing it on paper</h2>
          <p>
            A good idea isn’t evidence, so I designed a randomized controlled trial to measure whether access to Lotus Pay actually grows a business.
          </p>
          <ol className="ub-steps-list">
            <li><strong>Recruit.</strong> 1,000 Sri Lankan freelancers and small businesses that serve (or could serve) foreign clients and earn over 100,000 LKR a month, with a baseline survey of revenue and transactions.</li>
            <li><strong>Randomize.</strong> 500 get access, 500 don’t, stratified by business type, industry, revenue, region and years in operation so the groups are balanced.</li>
            <li><strong>Run.</strong> Six months. Only the treatment group is whitelisted in the app, so the control group can’t use it.</li>
            <li><strong>Analyze.</strong> Intent-to-treat: regress foreign revenue on treatment assignment plus baseline controls. Powered at 80% to detect a 10–15% effect at the 5% level.</li>
          </ol>
          <div className="ub-callout lp-sim-callout">
            <p><strong>This trial never ran.</strong> Lotus Pay was a concept, so instead I simulated it in Python with made-up firms. The results below show what the analysis would look like, not evidence that the product works.</p>
          </div>
          <p>
            In my report’s simulation, treated firms grew foreign revenue by 19.0% against 2.4% for the control group, a 16.6-point difference with a t-statistic of 14.05. But that effect was something I put into the simulation, so of course it showed up. Here’s a fresh version you can play with. Set the true effect, re-randomize the firms, and watch when the test can or can’t pick it up.
          </p>
          <figure className="ub-fig">
            <RctSim />
            <figcaption><span>Figure 8.</span> A new simulation running in your browser, built with assumptions similar to my <a href={NOTEBOOK} target="_blank" rel="noreferrer">notebook</a>: log-normal baseline revenue, random growth for everyone, plus a noisy extra boost for treated firms. Try an effect of 0% to see a null result.</figcaption>
          </figure>
        </section>

        <section id="value" className="ub-section">
          <h2><span>08</span>What it’s worth</h2>
          <p>
            If the trial worked, the next question is what to charge. One upper bound is the extra profit the app creates. Assuming a 45% margin (high, but freelancing has low input costs), the simulated numbers give:
          </p>
          <div className="lp-formula">
            <p>0.45 × ($1,509 − $1,261) − 0.45 × ($1,365 − $1,331) = <strong>$96.30 / month</strong></p>
            <span>about 30,000 LKR, the most an average participant should be willing to pay</span>
          </div>
          <p>
            Simply asking people what they’d pay doesn’t work, because everyone lowballs. So the plan was the Becker–DeGroot–Marschak (BDM) method. You state your price, a random price is drawn, and you buy at the drawn price only if it’s at or below what you said. Lying in either direction can only hurt you. Try it:
          </p>
          <figure className="ub-fig">
            <BdmGame />
            <figcaption><span>Figure 9.</span> The BDM mechanism. Set your true value, report something different, and draw a few prices to see why honesty wins.</figcaption>
          </figure>
          <p>
            Based on that, I proposed progressive pricing: free for the smallest freelancers, and cheaper per-transaction fees for businesses that move more money (and get more value out of it). The free tier is capped at $1,000 a month and $500 per transaction.
          </p>
          <figure className="ub-fig">
            <PricingCalc />
            <figcaption><span>Figure 10.</span> The proposed tiers. Slide your monthly volume to see what each tier would cost you that month.</figcaption>
          </figure>
        </section>

        <section id="next" className="ub-section">
          <h2><span>09</span>What’s next</h2>
          <p>
            Sri Lanka’s IT-BPO sector has been growing around 20% a year, and the ICT sector is projected to contribute $15 billion to the digital economy by 2030. Much of that growth depends on exactly the kind of small businesses and freelancers who can’t easily get paid today.
          </p>
          <p>Turning Lotus Pay from a concept into something real would mean:</p>
          <ul className="ub-todo">
            <li>Regulatory and banking partnerships, so it can legally act as a merchant of record and pay out to Sri Lankan banks.</li>
            <li>Running the actual RCT with real businesses, instead of a simulation.</li>
            <li>Using the BDM results to refine the pricing tiers while keeping them progressive.</li>
            <li>Expanding to other markets with the same problem.</li>
          </ul>
          <p>
            Until then, it’s a design I’d still like to see exist. The demo is at <a href={DEMO} target="_blank" rel="noreferrer">trylotus.app</a> and the code, including the simulation notebook, is on <a href={REPO} target="_blank" rel="noreferrer">GitHub</a>.
          </p>
        </section>

        <footer className="ub-notes">
          <p className="ub-notes-label">Sources</p>
          <ol>
            <li>Sri Lanka Foreign Exchange Act, No. 12 of 2017, on authorized channels for foreign currency.</li>
            <li>Daily FT, “Central Bank warns against foreign currency transactions between residents.”</li>
            <li>OnLanka, “Sri Lanka nears final approval for PayPal inward remittances.”</li>
            <li>Sunday Times, “Thriving BPO industry targets $3bn in export revenue in 2024.”</li>
            <li>U.S. International Trade Administration, “Sri Lanka: Telecommunications and Information Technology.”</li>
          </ol>
          <div className="ub-end-links">
            <Link href="/projects" className="ub-button ub-button-ghost">← All projects</Link>
            <a href={DEMO} target="_blank" rel="noreferrer" className="ub-button">Try the demo ↗</a>
          </div>
        </footer>
      </article>

      <FooterMain />
    </div>
  );
}
