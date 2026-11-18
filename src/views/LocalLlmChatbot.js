'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './ProjectWriteup.css';
import './LocalLlmChatbot.css';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';
import ArchitectureDiagram from '../components/chatbot/ArchitectureDiagram';
import OrderReplay from '../components/chatbot/OrderReplay';
import ItemMatcher from '../components/chatbot/ItemMatcher';

const REPO = 'https://github.com/one-loop/local-llm-chatbot';

const SECTIONS = [
  { id: 'the-idea', label: 'The idea' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'grounding', label: 'Keeping it honest' },
  { id: 'matching', label: 'Finding the food' },
  { id: 'ordering', label: 'Taking an order' },
  { id: 'detecting', label: 'Knowing it’s done' },
  { id: 'rough-edges', label: 'Rough edges' },
  { id: 'takeaways', label: 'Takeaways' },
];

const DETECTOR_PROMPT = `TASK: Determine if there is a complete food order in this
conversation and extract the details.

- Only extract if this looks like a CONFIRMED/COMPLETED order
- Pay attention to order changes (e.g. "make it 2 instead of 3")
  - use the LATEST quantity mentioned

RESPOND ONLY IN THIS JSON FORMAT:
{ "has_order": true/false, "order_confirmed": true/false,
  "items": [...], "customer_info": {...}, "total_cost": ... }`;

export default function LocalLlmChatbot() {
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
    <div className="ub cb">
      <SEOBreadcrumbs items={[{ name: 'Projects', url: '/projects' }, { name: 'Local AI Agent for Food Ordering', url: '/projects/local-ai-agent' }]} />
      <div className="ub-glow cb-glow" aria-hidden="true" />

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
          <div className="ub-tag"><span className="ub-tag-dot cb-dot" />AI · Summer 2025</div>
          <h1 className="ub-title">Local AI Agent for Food Ordering</h1>
          <p className="ub-subtitle">
            A dining hall assistant for NYU Abu Dhabi that runs on a local model, answers menu questions, and takes food orders all the way to a printed ticket.
          </p>
          <dl className="ub-meta">
            <div><dt>Model</dt><dd>Qwen 2.5 via Ollama</dd></div>
            <div><dt>Backend</dt><dd>FastAPI, sentence-transformers</dd></div>
            <div><dt>Frontend</dt><dd>Next.js</dd></div>
            <div><dt>Code</dt><dd><a href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a></dd></div>
          </dl>
        </header>

        <aside className="ub-tldr">
          <p className="ub-tldr-label">The short version</p>
          <ul>
            <li>Students chat with it to see what’s open, browse the menu and order food to their building. Everything runs on one machine, with no cloud API.</li>
            <li>The model never decides facts on its own. Prices come from a separate menu service, and IDs and phone numbers are checked by plain code before the model sees them.</li>
            <li>When an order is confirmed it’s extracted as structured data, written to a ticket and printed automatically.</li>
          </ul>
        </aside>

        <figure className="ub-fig">
          <ArchitectureDiagram />
          <figcaption><span>Figure 1.</span> The architecture of the system. Press “Trace a message” to follow one request through every part, or click a box to read what it does and where it lives in the repo.</figcaption>
        </figure>

        <section id="the-idea" className="ub-section">
          <h2><span>01</span>The idea</h2>
          <p>
            Ordering food on campus mostly means knowing which dining hall is open, finding the menu, and then telling someone your details. We wanted to see if an AI agent could do all of that in one conversation: “what’s open?”, “do you have margherita?”, “I’ll take two, send them to A2C.”
          </p>
          <p>
            The constraint we set ourselves was that it had to run <em>locally</em>. No OpenAI key, no cloud. The model runs in Ollama on the same machine as everything else. That makes it free to run and keeps student details on that machine. It also makes the job harder, because small local models are much easier to confuse than the big hosted ones.
          </p>
        </section>

        <section id="architecture" className="ub-section">
          <h2><span>02</span>Architecture</h2>
          <p>
            The system is three small processes and a model. A Next.js chat UI talks to a FastAPI backend, which does almost all the work. A second FastAPI service, the menu server, is the only thing that knows what’s on the menu and how much it costs. Ollama serves the language model.
          </p>
          <p>
            The interesting part is how little the model is trusted with. Look at Figure 1 again: before the model is ever called, the backend has already logged the message, validated any IDs, matched menu items with embeddings, checked them against the menu server and assembled the context. The model’s job is mostly to phrase things well, and to ask for whatever’s still missing.
          </p>
        </section>

        <section id="grounding" className="ub-section">
          <h2><span>03</span>Keeping it honest</h2>
          <p>
            Small models hallucinate confidently, and early on ours answered menu questions mostly from its own imagination. We kept a running <code>issues.md</code> of the worst examples. A typical one was asking “do you have pizza?”:
          </p>
          <div className="cb-compare">
            <div className="cb-compare-col is-bad">
              <p className="cb-compare-label">Before · model answering from memory</p>
              <p>Yes, we do have pizza available at our dining hall.<br />Name: Margherita Pizza<br />Category: <mark>Classic Italian</mark><br />Price: <mark>AED 15.00</mark></p>
            </div>
            <div className="cb-compare-col is-good">
              <p className="cb-compare-label">After · grounded in the menu server</p>
              <p>[Looking up category ‘Pizza’ in the menu…]<br />Margherita: AED 31.00<br />Al Funghi: AED 35.00<br />Pepperoni: AED 43.00<br />…</p>
            </div>
          </div>
          <p>
            There’s no “Classic Italian” category, and a Margherita is AED 31, not 15. The fix was to stop asking the model to remember anything. Item and category lookups now go through the menu server, the results are pasted into the prompt as labelled blocks like <code>[MENU DATA]</code>, and the system prompt is blunt about it: never make up menu items, and if something isn’t in the data, say it isn’t available.
          </p>
          <p>
            A nice side effect is that the UI can be honest too. While the backend is looking something up, it streams a line like <code>[Looking up ‘Margherita’ in the menu…]</code> first, and the frontend shows it as a small status pill. People can see the bot checking instead of guessing.
          </p>
        </section>

        <section id="matching" className="ub-section">
          <h2><span>04</span>Finding the food</h2>
          <p>
            People don’t type menu names exactly. They write “margarita”, “fries”, “2 pepperonis and a coke”. Exact string matching misses most of that, and asking the model to normalize it brings hallucination back in. So item matching is its own step, built on embeddings.
          </p>
          <ul className="ub-bullets">
            <li>Number words become digits (“two” → 2, “a” → 1), and regex patterns split the message into quantity + item chunks.</li>
            <li>Every menu item and category name is embedded once at startup with <code>all-MiniLM-L6-v2</code>, a small, fast sentence-transformer.</li>
            <li>Each chunk is embedded the same way, and the closest menu entry wins if its cosine similarity is at least 0.5.</li>
            <li>The winner is then confirmed by the menu server, which returns the canonical name and price.</li>
          </ul>
          <figure className="ub-fig">
            <ItemMatcher />
            <figcaption><span>Figure 2.</span> How a message becomes priced menu items. The menu entries and prices are real. The steps are simplified to show the idea.</figcaption>
          </figure>
        </section>

        <section id="ordering" className="ub-section">
          <h2><span>05</span>Taking an order</h2>
          <p>
            To order, the bot needs four things: your RFID (the six digits after the + on the back of your NYU card), your building, a UAE phone number and any special requests. That sounds simple, but a model will happily accept “12345” as an ID or forget that it already asked for your building.
          </p>
          <p>
            So each session has an explicit <code>OrderState</code>, and the backend owns it, not the model. When a message arrives during an order, regex validators run <em>first</em>. A bad RFID gets a deterministic error immediately, without calling the model at all. A good one is written into the state. Then the prompt starts with a status block listing what’s already been provided and what’s still missing, so the model always knows exactly what to ask next.
          </p>
          <figure className="ub-fig">
            <OrderReplay />
            <figcaption><span>Figure 3.</span> A typical ordering conversation, simplified, with the order state on the side. Fields that just changed are highlighted. The details are made up.</figcaption>
          </figure>
          <p>
            The validators are also registered as tools the model can call while it streams. The ordinary path, though, is the boring one: code checks the input, and the model only talks about the result.
          </p>
        </section>

        <section id="detecting" className="ub-section">
          <h2><span>06</span>Knowing it’s done</h2>
          <p>
            The hardest question turned out to be “has this person actually finished ordering?” People change their minds halfway (“actually make it two”), confirm in different ways, or wander off. After every reply, the backend runs an order detector. It tries a cheap regex check for a confirmation first. If that’s inconclusive, it hands the last ten messages back to the model, this time not as a chat partner but as a parser:
          </p>
          <pre className="ub-code" aria-label="Excerpt of the order extraction prompt"><code>{DETECTOR_PROMPT}</code></pre>
          <p>
            It’s the same model playing two roles. As a chat partner it can be chatty and creative. As a parser, with a strict schema, a temperature of 0.1 and the recent conversation in front of it, it only has to answer one narrow question: what was actually agreed? A flag on the order state stops the same order from being saved twice.
          </p>
          <p>
            Once an order is confirmed, it’s written to <code>orders.txt</code> as a ticket with the items, total, RFID, building, phone and special request. A small watcher process using the <code>watchdog</code> library notices the file change and sends it to the default printer with <code>lp</code>. So the end of the conversation is a piece of paper, not just a message.
          </p>
        </section>

        <section id="rough-edges" className="ub-section">
          <h2><span>07</span>Rough edges</h2>
          <p>This was a summer prototype, and the code shows it in places:</p>
          <ul className="ub-todo">
            <li>Order state and sessions live in memory, so restarting the backend forgets every order in progress.</li>
            <li>Intent detection still leans on keyword regexes (“what’s open”, “full menu”, “order”), which are brittle compared to letting the model route requests through tools.</li>
            <li><code>orders.txt</code> is rewritten for each order. That suits the print-on-change watcher, but it means there’s no order history.</li>
            <li><code>main.py</code> grew to around 1,800 lines, with a few copied files left around from experiments.</li>
          </ul>
        </section>

        <section id="takeaways" className="ub-section">
          <h2><span>08</span>Takeaways</h2>
          <p>
            The biggest lesson was where to put the model. Every time we let it decide a fact (a price, whether an ID was valid, whether an order was complete) it eventually got one wrong. Every time we moved that decision into plain code and gave the model the answer, things got more reliable. A small local model is a great interface and a poor source of truth.
          </p>
          <p>
            The other lesson was that streaming and small status messages do a lot for how fast and trustworthy an AI agent <em>feels</em>, even when the model itself isn’t fast.
          </p>
          <p>
            The code is on <a href={REPO} target="_blank" rel="noreferrer">GitHub</a>.
          </p>
        </section>

        <footer className="ub-notes">
          <div className="ub-end-links">
            <Link href="/projects" className="ub-button ub-button-ghost">← All projects</Link>
            <a href={REPO} target="_blank" rel="noreferrer" className="ub-button">View the code on GitHub ↗</a>
          </div>
        </footer>
      </article>

      <FooterMain />
    </div>
  );
}
