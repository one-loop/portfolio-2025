'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './ProjectWriteup.css';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';
import Lifecycle from '../components/unlearning/Lifecycle';

// High-level version while the paper is unpublished. The full write-up (method, results,
// figures, code link) is kept on the `unlearning-backdoor-full` branch.

const SECTIONS = [
  { id: 'the-hook', label: 'The hook' },
  { id: 'forgetting', label: 'Teaching models to forget' },
  { id: 'how-it-hides', label: 'The idea' },
  { id: 'prior-work', label: 'What already existed' },
  { id: 'takeaways', label: 'Why it matters' },
];

const PRIOR_WORK = [
  {
    venue: 'NeurIPS ’23',
    name: 'Hidden Poison',
    idea: 'First to show camouflaged poisoning: poison that only takes effect after some data is unlearned.',
  },
  {
    venue: 'AAAI ’24',
    name: 'Backdoor attacks via machine unlearning',
    idea: 'Skips training-time poisoning entirely and plants the backdoor through malicious unlearning requests.',
  },
  {
    venue: 'USENIX Sec ’24',
    name: 'UBA-Inf',
    idea: 'Uses influence functions and a shadow model to camouflage the backdoor, which makes it much stealthier.',
  },
  {
    venue: 'DAC ’25',
    name: 'ReVeil',
    idea: 'Attacks the data-collection phase directly and doesn’t need any access to the model.',
  },
];

export default function UnlearningBackdoor() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ub">
      <SEOBreadcrumbs items={[{ name: 'Projects', url: '/projects' }, { name: 'Unlearning Activated Backdoor Attacks', url: '/projects/unlearning-backdoor' }]} />
      <div className="ub-glow" aria-hidden="true" />

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
          <div className="ub-tag"><span className="ub-tag-dot" />Research · Summer 2026</div>
          <h1 className="ub-title">Unlearning Activated Backdoor&nbsp;Attacks</h1>
          <p className="ub-subtitle">
            A backdoor that stays asleep inside a model until somebody asks the model to forget.
          </p>
          <dl className="ub-meta">
            <div><dt>With</dt><dd>Manaar Alam</dd></div>
            <div><dt>Area</dt><dd>ML security, machine unlearning</dd></div>
            <div><dt>Status</dt><dd>Paper not yet published</dd></div>
          </dl>
        </header>

        <aside className="ub-tldr">
          <p className="ub-tldr-label">The short version</p>
          <ul>
            <li>Privacy laws let people ask for their data to be deleted, and models now have ways to “unlearn” it.</li>
            <li>We’re studying backdoors that stay dormant, so the model looks clean when it’s checked, and only switch on after a deletion request.</li>
            <li>This page is a high-level overview. The method, results and code will be shared here once the paper is published.</li>
          </ul>
        </aside>

        <section id="the-hook" className="ub-section">
          <h2><span>01</span>The hook</h2>
          <p>
            Backdoor attacks are getting caught. The textbook example is a sticker on a stop sign that makes a self-driving car read it as something else. A backdoor like that is always on, so if you scan the model hard enough the anomaly is sitting there waiting to be found, and the scanners have gotten pretty good at finding it.
          </p>
          <p>
            The question that pulled me into this project was a slightly evil one. What if the backdoor isn’t really there yet? What if you could hide it well enough to get past every scanner, and then use a privacy law as the remote detonator?
          </p>
          <p>
            That’s an <em>unlearning-activated</em> backdoor. I spent the summer working on a new version of it with my mentor, Manaar Alam, which we call a <em>parasitic</em> backdoor.
          </p>
        </section>

        <section id="forgetting" className="ub-section">
          <h2><span>02</span>Teaching models to forget</h2>
          <p>
            A lot of the AI you use every day is collaborative. Gboard gets better at predicting your next word because millions of people type on it. Google Maps knows a road is jammed because thousands of phones are crawling along it. In both cases there’s one shared model, and it keeps getting updated as new data comes in from users.
          </p>
          <p>
            Then there’s the right to be forgotten. Regulations like GDPR mean a company may have to delete your data when you ask. The catch is that deleting a photo from a dataset doesn’t delete what the model learned from it. That information is smeared across millions of weights. Retraining from scratch every time someone opts out would be absurdly expensive, which is why <em>machine unlearning</em> exists: techniques that make a trained model behave as if it never saw certain data.
          </p>
          <div className="ub-callout">
            <p><strong>Exact unlearning</strong> gives you the model you’d have gotten by training without that data.</p>
            <p><strong>Approximate unlearning</strong> nudges the existing weights to get close to that, much more cheaply.</p>
          </div>
          <p>
            Unlearning is meant to be a privacy feature. The uncomfortable part is that it also lets a stranger change a model you’re running, whenever they like, with a request you may be legally required to honor.
          </p>
        </section>

        <section id="how-it-hides" className="ub-section">
          <h2><span>03</span>The idea</h2>
          <p>
            The attack runs in three phases. First the backdoor is <em>dormant</em>: it’s in the model, but it doesn’t do anything, so the model behaves normally and passes inspection. Then an <em>unlearning request</em> arrives and changes the model a little. After that the backdoor is <em>active</em>, and the trigger works.
          </p>
          <p>
            Here’s the whole lifecycle from the attacker’s side. Step through it.
          </p>
          <figure className="ub-fig">
            <Lifecycle />
            <figcaption><span>Figure 1.</span> The attack lifecycle, from upload to the backdoor waking up.</figcaption>
          </figure>
          <p>
            What I like about this setup, from a purely evil-engineering point of view, is that the provider never does anything wrong. They train on user data, check the model, ship it, and honor a deletion request. Every step is the responsible thing to do.
          </p>
        </section>

        <section id="prior-work" className="ub-section">
          <h2><span>04</span>What already existed</h2>
          <p>
            We weren’t the first people to have this idea. There are four papers I kept coming back to, and each one solves part of the problem while leaving a gap. Our work is aimed at those gaps.
          </p>
          <div className="ub-prior">
            {PRIOR_WORK.map((p) => (
              <div key={p.name} className="ub-prior-card">
                <p className="ub-prior-venue">{p.venue}</p>
                <h3>{p.name}</h3>
                <p>{p.idea}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="takeaways" className="ub-section">
          <h2><span>05</span>Why it matters</h2>
          <p>
            What stays with me is that this kind of attack doesn’t exploit a bug. Training on user data is fine. Checking the model before deploying it is good practice. Honoring deletion requests is the law. The problem only appears when you put those three together, and it means a model can pass inspection today and still not be safe tomorrow.
          </p>
          <p>
            It also changed how I think about privacy and security. I’d always assumed they pull in the same direction. Here, a feature built purely to protect users becomes the thing that sets off the attack. If you build systems that learn from the public, I think “what happens when someone asks us to forget?” deserves the same threat modeling as “what happens when someone sends us bad data?”
          </p>
          <p>
            The full write-up, with how the attack works and how it holds up against existing defenses, will be here once the paper is out. If you want to talk about it in the meantime, I’m always happy to.
          </p>
        </section>

        <footer className="ub-notes">
          <p className="ub-notes-label">Notes</p>
          <ol>
            <li>
              Prior work above: “Hidden Poison: Machine Unlearning Enables Camouflaged Poisoning Attacks” (NeurIPS 2023); “Backdoor Attacks via Machine Unlearning” (AAAI 2024); “UBA-Inf: Unlearning Activated Backdoor Attack with Influence-Driven Camouflage” (USENIX Security 2024); “ReVeil: Unconstrained Concealed Backdoor Attack using Machine Unlearning” (DAC 2025).
            </li>
          </ol>
          <div className="ub-end-links">
            <Link href="/projects" className="ub-button ub-button-ghost">← All projects</Link>
            <Link href="/contact" className="ub-button">Get in touch</Link>
          </div>
        </footer>
      </article>

      <FooterMain />
    </div>
  );
}
