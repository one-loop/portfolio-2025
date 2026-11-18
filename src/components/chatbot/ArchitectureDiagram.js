'use client';
import React, { useEffect, useState } from 'react';

// Boxes in the diagram (SVG units, viewBox 900 × 450).
const NODES = {
  browser: { x: 16, y: 205, w: 134, h: 80, title: 'Chat UI', sub: 'Next.js + React Markdown',
    file: 'frontend/src/app/page.tsx',
    body: 'A single-page chat. Each tab gets a random session id, and every message is sent with the recent history. Replies arrive as a stream and are rendered as Markdown. Lines like “[Looking up …]” are shown as small status pills instead of chat bubbles.' },
  prevalid: { x: 235, y: 70, w: 330, h: 50, title: 'Pre-validation', sub: 'RFID · building · UAE phone number',
    file: 'backend/main.py · validation.py',
    body: 'While an order is in progress, the message is checked with plain regex before the model sees it: a 6-digit RFID, a building from the campus list, a UAE mobile number. Bad input gets an instant, deterministic reply, and good input is written straight into the order state.' },
  matcher: { x: 235, y: 136, w: 330, h: 50, title: 'Item matcher', sub: 'all-MiniLM-L6-v2 embeddings',
    file: 'backend/menu_embeddings.py',
    body: 'Splits the message into quantity + item chunks (“2 margherita”, “a pepperoni”) and embeds each chunk with a small sentence-transformer. The closest menu item or category wins if the cosine similarity is at least 0.5, so typos and loose phrasing still land on the right dish.' },
  prompt: { x: 235, y: 202, w: 330, h: 50, title: 'Prompt builder', sub: 'system prompt + context + history',
    file: 'backend/main.py · system_prompt.txt',
    body: 'Stitches together the system prompt, verified menu data, opening hours, the current order status (what’s been collected and what’s still missing) and the chat history. The order status goes at the very top so the model prioritizes it.' },
  state: { x: 235, y: 268, w: 158, h: 50, title: 'Order state', sub: 'one per session',
    file: 'backend/main.py · OrderState',
    body: 'The single source of truth for an order in progress: items, total, RFID, building, phone, special request, and a flag that stops the same order from being saved twice.' },
  logger: { x: 407, y: 268, w: 158, h: 50, title: 'Conversation log', sub: 'JSON per session',
    file: 'backend/background_order_system.py',
    body: 'Every user and bot message is appended to a per-session JSON file. The order detector reads this log to work out what was actually agreed, including mid-conversation changes like “make it two instead”.' },
  detector: { x: 235, y: 334, w: 330, h: 50, title: 'Order detector', sub: 'regex first, then the LLM as a parser',
    file: 'backend/main.py',
    body: 'After each reply finishes streaming, it checks whether an order was just confirmed. A cheap regex pass runs first. If that’s inconclusive, the last ten messages go back to the model with a strict “respond only in this JSON format” prompt to pull out the items, customer details and total.' },
  ollama: { x: 640, y: 40, w: 240, h: 76, title: 'Ollama', sub: 'Qwen 2.5, running on the same machine',
    file: 'localhost:11434',
    body: 'The language model. Nothing leaves the machine. We tried a few models over the project (Mistral first, then Qwen 2.5) and ran them at a low temperature (0.1) so answers stay consistent. During ordering, the model can also call the validation functions as tools.' },
  menu: { x: 640, y: 160, w: 240, h: 76, title: 'Menu server', sub: 'FastAPI on :9000, reads menu.json',
    file: 'mcp/main.py',
    body: 'A tiny separate service with three endpoints: /menu/item, /menu/category and /menu/today. It’s the only place prices come from, so the model can’t invent them.' },
  hours: { x: 640, y: 262, w: 240, h: 50, title: 'Opening hours', sub: 'restaurants.json',
    file: 'restaurants.json',
    body: 'Open and close times for each dining hall and meal period, checked against the current time when someone asks what’s open.' },
  orders: { x: 640, y: 352, w: 110, h: 64, title: 'orders.txt', sub: 'final ticket',
    file: 'backend/orders.txt',
    body: 'A confirmed order is written out as a plain-text ticket: items, quantities, total in AED, RFID, building, phone and special request.' },
  printer: { x: 770, y: 352, w: 110, h: 64, title: 'Printer', sub: 'watchdog → lp',
    file: 'backend/order_printer.py',
    body: 'A small watcher process notices when orders.txt changes and sends it to the default printer with lp, so a paper ticket appears without anyone touching a screen.' },
};

const EDGES = {
  toBackend: { d: 'M150,235 C195,235 190,95 235,95', label: 'POST /chat', lx: 156, ly: 178 },
  stream: { d: 'M235,232 C195,232 195,262 150,262', label: 'stream', lx: 160, ly: 300 },
  matcherMenu: { d: 'M565,161 C600,161 605,198 640,198' },
  promptOllama: { d: 'M565,222 C610,222 600,90 640,90' },
  promptHours: { d: 'M565,236 C605,236 605,287 640,287' },
  stateToPrompt: { d: 'M314,268 L314,252' },
  logToDetector: { d: 'M486,318 L486,334' },
  detectorOllama: { d: 'M565,352 C620,352 620,108 640,108', dashed: true },
  detectorOrders: { d: 'M565,370 C600,370 605,384 640,384' },
  ordersPrinter: { d: 'M750,384 L770,384' },
};

const STEPS = [
  { nodes: ['browser'], edges: ['toBackend'], title: 'You send a message',
    text: 'The chat UI posts the message, the recent history and a session id to the FastAPI backend.' },
  { nodes: ['prevalid', 'state', 'logger'], edges: [], title: 'Cheap checks first',
    text: 'The message is logged. If an order is in progress, regex validators check the RFID, building and phone number. A bad value gets an instant reply and the model is never called.' },
  { nodes: ['matcher', 'menu'], edges: ['matcherMenu'], title: 'Find the food',
    text: 'The item matcher maps loose phrases to real menu entries with embeddings, then the menu server confirms each name and price. The UI shows a “Looking up …” status while this happens.' },
  { nodes: ['prompt', 'state', 'hours'], edges: ['promptHours', 'stateToPrompt'], title: 'Build the prompt',
    text: 'System prompt, verified menu data, opening hours, the current order status and the history are combined into one prompt.' },
  { nodes: ['ollama'], edges: ['promptOllama'], title: 'Ask the local model',
    text: 'Qwen 2.5 runs in Ollama on the same machine. Tokens stream back as they’re generated, and during ordering the model can call the validators as tools.' },
  { nodes: ['browser'], edges: ['stream'], title: 'Stream the answer',
    text: 'Each token is forwarded to the browser immediately, so the reply types itself out instead of appearing all at once.' },
  { nodes: ['detector', 'logger', 'ollama'], edges: ['logToDetector', 'detectorOllama'], title: 'Was that an order?',
    text: 'Once the reply is done, the detector checks whether an order was just confirmed: regex first, and if that’s unclear, the model is asked to return the order as strict JSON.' },
  { nodes: ['orders', 'printer'], edges: ['detectorOrders', 'ordersPrinter'], title: 'Print the ticket',
    text: 'A confirmed order is written to orders.txt. The watcher sees the change and sends it to the printer.' },
];

export default function ArchitectureDiagram() {
  const [step, setStep] = useState(null);
  const [selected, setSelected] = useState('ollama');
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => {
      setStep((s) => {
        const next = s === null ? 0 : s + 1;
        if (next >= STEPS.length) {
          setPlaying(false);
          return STEPS.length - 1;
        }
        return next;
      });
    }, step === null ? 50 : 2600);
    return () => clearTimeout(t);
  }, [playing, step]);

  // Keep the detail panel in sync with the step being traced.
  useEffect(() => {
    if (step !== null) setSelected(STEPS[step].nodes[0]);
  }, [step]);

  const active = step !== null ? STEPS[step] : null;
  const nodeOn = (id) => !active || active.nodes.includes(id);
  const edgeOn = (id) => active && active.edges.includes(id);
  const detail = NODES[selected];

  const play = () => {
    if (step === STEPS.length - 1 || step === null) setStep(null);
    setPlaying(true);
  };

  return (
    <div className="ub-figure cb-arch">
      <div className="ub-figure-toolbar">
        <div className="cb-arch-controls">
          <button type="button" className="ub-button" onClick={playing ? () => setPlaying(false) : play}>
            {playing ? 'Pause' : step === STEPS.length - 1 ? 'Replay a message' : 'Trace a message'}
          </button>
          <button type="button" className="ub-button ub-button-ghost" onClick={() => { setPlaying(false); setStep((s) => (s === null ? 0 : Math.max(0, s - 1))); }} disabled={step === null || step === 0}>Back</button>
          <button type="button" className="ub-button ub-button-ghost" onClick={() => { setPlaying(false); setStep((s) => (s === null ? 0 : Math.min(STEPS.length - 1, s + 1))); }} disabled={step === STEPS.length - 1}>Next</button>
          {step !== null && (
            <button type="button" className="cb-link" onClick={() => { setPlaying(false); setStep(null); }}>Show everything</button>
          )}
        </div>
        <span className="cb-arch-hint">Click any box for details</span>
        <span className="cb-arch-hint-touch">Swipe sideways to see the whole diagram, and tap a box for details.</span>
      </div>

      <div className="cb-arch-scroll">
        <svg viewBox="0 0 900 450" className="cb-arch-svg" role="img" aria-label="Architecture of the local LLM chatbot: a Next.js chat UI talks to a FastAPI backend, which uses an embedding item matcher, a menu server, a local Ollama model, and writes confirmed orders to a file that a watcher prints.">
          <defs>
            <marker id="cb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>

          {/* Backend container */}
          <rect x="215" y="30" width="370" height="372" rx="16" className="cb-container" />
          <text x="235" y="56" className="cb-container-label">FastAPI backend</text>
          <text x="450" y="438" className="cb-footnote" textAnchor="middle">Everything above runs on one machine. No request leaves it.</text>

          {Object.entries(EDGES).map(([id, e]) => (
            <g key={id} className={`cb-edge ${edgeOn(id) ? 'is-on' : ''} ${e.dashed ? 'is-dashed' : ''}`}>
              <path d={e.d} markerEnd="url(#cb-arrow)" />
              {e.label && <text x={e.lx} y={e.ly} className="cb-edge-label">{e.label}</text>}
            </g>
          ))}

          {Object.entries(NODES).map(([id, n]) => (
            <g
              key={id}
              className={`cb-node ${nodeOn(id) ? '' : 'is-dim'} ${active && active.nodes.includes(id) ? 'is-hot' : ''} ${selected === id ? 'is-selected' : ''}`}
              onClick={() => setSelected(id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(id); } }}
              tabIndex={0}
              role="button"
              aria-label={`${n.title}: ${n.sub}`}
            >
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="10" />
              <text x={n.x + 14} y={n.y + (n.h > 60 ? 30 : 22)} className="cb-node-title">{n.title}</text>
              <text x={n.x + 14} y={n.y + (n.h > 60 ? 50 : 39)} className="cb-node-sub">{n.sub}</text>
            </g>
          ))}
        </svg>
      </div>

      <div className="cb-arch-bottom">
        <div className="cb-arch-step" aria-live="polite">
          {active ? (
            <>
              <p className="cb-arch-step-num">Step {step + 1} of {STEPS.length}</p>
              <h3>{active.title}</h3>
              <p>{active.text}</p>
            </>
          ) : (
            <>
              <p className="cb-arch-step-num">Overview</p>
              <h3>Three processes and a model</h3>
              <p>The chat UI, the backend and the menu server are separate processes, and the model runs in Ollama alongside them. Press “Trace a message” to follow one request from the keyboard to the printer.</p>
            </>
          )}
        </div>
        <div className="cb-arch-detail" key={selected}>
          <p className="cb-arch-file">{detail.file}</p>
          <h3>{detail.title}</h3>
          <p>{detail.body}</p>
        </div>
      </div>
    </div>
  );
}
