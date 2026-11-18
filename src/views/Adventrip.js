'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './ProjectWriteup.css';
import './Adventrip.css';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';
import SwipeLab from '../components/adventrip/SwipeLab';
import SystemMap from '../components/adventrip/SystemMap';
import PlanFlow from '../components/adventrip/PlanFlow';
import HackTimeline from '../components/adventrip/HackTimeline';

const REPO = 'https://github.com/CatalinBotezat/AdvenTrip';
const LIVE = 'https://adventrip.vercel.app';

const SECTIONS = [
  { id: 'the-trip', label: 'The trip' },
  { id: 'the-problem', label: 'The problem' },
  { id: 'first-idea', label: 'The first idea' },
  { id: 'the-weekend', label: 'The weekend' },
  { id: 'the-feed', label: 'A feed that learns' },
  { id: 'how-it-works', label: 'How it fits together' },
  { id: 'judging', label: 'Judging' },
  { id: 'after', label: 'After the weekend' },
];

// Photos from my San Francisco trip (served from the gallery, which is kept out of search indexes).
const PHOTOS = [
  { src: '/gallery/634.jpeg', caption: 'Flying into California' },
  { src: '/gallery/637.jpeg', caption: 'San Francisco at night' },
  { src: '/gallery/650.jpeg', caption: 'Chinatown' },
  { src: '/projects/adventrip/hackathon.webp', caption: 'Our team at CalHacks' },
  { src: '/gallery/672.jpeg', caption: 'Palace of Fine Arts' },
  { src: '/gallery/664.jpeg', caption: 'Victorians and a view of downtown' },
  { src: '/gallery/679.jpeg', caption: 'UC Berkeley at night' },
  { src: '/gallery/685.jpeg', caption: 'The Golden Gate Bridge' },
  { src: '/gallery/705.jpeg', caption: 'Sunset on the coast' },
];

const WEIGHTS = [
  ['Repost', '+2.5'],
  ['Share', '+2.0'],
  ['Save / swipe right', '+1.5'],
  ['View', '+0.1'],
  ['Swipe left', '−0.8'],
];

export default function Adventrip() {
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
    <div className="ub at">
      <SEOBreadcrumbs items={[{ name: 'Projects', url: '/projects' }, { name: 'AdvenTrip', url: '/projects/adventrip' }]} />
      <div className="ub-glow at-glow" aria-hidden="true" />

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
          <div className="ub-tag"><span className="ub-tag-dot at-dot" />Hackathon · CalHacks 13.0 · October 2025</div>
          <div className="at-title-row">
            <img src="/projects/adventrip/logo.webp" alt="" className="at-title-logo" />
            <h1 className="ub-title">AdvenTrip</h1>
          </div>
          <p className="ub-subtitle">
            A social travel app we built over one weekend in San Francisco, to get trip plans out of the group chat, where they usually go to die.
          </p>
          <dl className="ub-meta">
            <div><dt>Team</dt><dd>with Catalin, Jean and Zane</dd></div>
            <div><dt>Stack</dt><dd>React, Vite, Tailwind, Supabase</dd></div>
            <div><dt>Live</dt><dd><a href={LIVE} target="_blank" rel="noreferrer">adventrip.vercel.app ↗</a></dd></div>
            <div><dt>Code</dt><dd><a href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a></dd></div>
          </dl>
        </header>

        <aside className="ub-tldr">
          <p className="ub-tldr-label">The short version</p>
          <ul>
            <li>Built at CalHacks in San Francisco: a swipe-based app for discovering trips and planning them with friends.</li>
            <li>It started as a group trip planner and became a social travel platform overnight, with a feed that learns what you like from every swipe.</li>
            <li>We pitched it to more than ten judges. It earned several judge favorites and ranked among the top projects.</li>
          </ul>
        </aside>

        <figure className="ub-fig at-hero">
          <div className="at-hero-grid">
            <img src="/projects/adventrip/poster.webp" alt="AdvenTrip poster: Get travel plans out the group chat." className="at-poster" />
            <div className="at-hero-photos">
              <img src="/projects/adventrip/hackathon.webp" alt="The AdvenTrip team at CalHacks holding a laptop with the AdvenTrip landing page, captioned: The best team I judged today" className="at-team" />
              <img src="/gallery/685.jpeg" alt="The Golden Gate Bridge" loading="lazy" />
              <img src="/gallery/641.jpeg" alt="The San Francisco waterfront at night" loading="lazy" />
            </div>
          </div>
          <figcaption><span>Figure 1.</span> Our poster, “Get travel plans out the group chat,” next to our team at CalHacks and a few photos from the weekend.</figcaption>
        </figure>

        <section id="the-trip" className="ub-section">
          <h2><span>01</span>The trip</h2>
          <p>
            I flew to San Francisco for CalHacks, so the weekend was a trip as much as a hackathon. When you’re building a travel app, that’s not sightseeing, that’s field research. Here are some of the photos I took between coding sessions.
          </p>
          <figure className="ub-fig at-strip-fig">
            <div className="at-strip" tabIndex={0} aria-label="Photos from San Francisco, scroll sideways">
              {PHOTOS.map((p) => (
                <figure key={p.src} className="at-photo">
                  <img src={p.src} alt={p.caption} loading="lazy" />
                  <figcaption>{p.caption}</figcaption>
                </figure>
              ))}
            </div>
            <figcaption><span>Figure 2.</span> San Francisco and Berkeley, October 2025. Scroll sideways for more.</figcaption>
          </figure>
        </section>

        <section id="the-problem" className="ub-section">
          <h2><span>02</span>The problem</h2>
          <p>
            Every friend group has the same chat: someone sends a reel of a beach in Portugal, three people reply “we HAVE to go,” and then nothing happens. The ideas are scattered across group chats, Instagram and email. Nobody knows who can afford what, and the planning dies before anyone books anything. Rest in peace, every “we should do Portugal” ever sent.
          </p>
          <p>We framed it as four problems:</p>
          <ul className="ub-bullets">
            <li><strong>Scattered ideas.</strong> Travel inspiration gets lost in chats and social feeds.</li>
            <li><strong>No personalization.</strong> Generic travel sites don’t learn what you actually like.</li>
            <li><strong>Hard to collaborate.</strong> There’s no single place to plan with friends.</li>
            <li><strong>No social discovery.</strong> You can’t easily see where people like you are going.</li>
          </ul>
        </section>

        <section id="first-idea" className="ub-section">
          <h2><span>03</span>The first idea</h2>
          <p>
            We started with the collaboration problem: a group trip planner. One person creates an “adventure,” answers a few quick questions, and shares a link. Everyone else adds their own budget and preferences, and then the whole group swipes on trip ideas until there’s a winner.
          </p>
          <figure className="ub-fig">
            <PlanFlow />
            <figcaption><span>Figure 3.</span> How a group adventure works, from the first question to an itinerary. The questions are the real ones from the app.</figcaption>
          </figure>
          <p>
            Swiping was the core interaction from the start. Instead of debating in a chat for three weeks, everyone gives each idea a quick, low-effort opinion with one thumb, and the strongest options rise to the top. It’s democracy, but with less scrolling.
          </p>
        </section>

        <section id="the-weekend" className="ub-section">
          <h2><span>04</span>The weekend</h2>
          <p>
            The commit history tells the story better than I can, and with more accurate timestamps. Saturday was steady work: a prototype, then group adventures, invite links, place search that only accepts real locations, a landing page, and a lot of time getting the swipe to feel right.
          </p>
          <p>
            Then, on Saturday night, the idea grew, as hackathon ideas tend to do once the sun goes down. Planning is only half of the problem. The other half is deciding where to go at all, and that inspiration lives in the same scattered chats and feeds. So AdvenTrip became a social travel platform: a feed of trips posted by other travelers, ranked for you, with the group planner built on top.
          </p>
          <figure className="ub-fig">
            <HackTimeline />
            <figcaption><span>Figure 4.</span> Commits per hour across the weekend (Pacific time). Click a milestone to see what happened. The tall bar on Sunday morning is the final sprint before submission.</figcaption>
          </figure>
          <p>
            The pivot shows up as a single commit at 1:34 AM, famously the hour of sound decisions: more than 6,000 lines adding the social feed, the recommendation service, trip posts, sharing, chat, sign-in and a database schema. It was merged into main a few hours before submission, and the last 90 minutes were pure polish. Mostly polish. Some panic.
          </p>
        </section>

        <section id="the-feed" className="ub-section">
          <h2><span>05</span>A feed that learns</h2>
          <p>
            The heart of the social version is the feed. Every trip post has tags (activities, kind of place, vibe), and every interaction teaches the app something about you. Swiping right on a hiking trip makes hiking trips more likely to show up. Swiping left on a nightlife city break makes those a little less likely. The algorithm doesn’t judge. It just remembers.
          </p>
          <p>
            We kept the model deliberately simple: one score per tag, and a fixed weight per kind of interaction.
          </p>
          <div className="at-weights">
            {WEIGHTS.map(([k, v]) => (
              <div key={k} className={v.startsWith('−') ? 'is-neg' : ''}>
                <span>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
          <p>
            Each post is scored by the average of its tags’ scores, the feed is sorted by that score, and a little random noise (up to 0.3) is added so you don’t end up in a bubble of one kind of trip. Your onboarding interests start at +1.0, so the very first cards already lean your way. Try it:
          </p>
          <figure className="ub-fig">
            <SwipeLab />
            <figcaption><span>Figure 5.</span> A working copy of the recommender, using the app’s save and pass weights. Swipe, and watch the tag scores and the queue re-rank. The noise is turned off here so the order is predictable. The sample cards use my photos from the trip.</figcaption>
          </figure>
          <p>
            Calling this “reinforcement learning,” as our README does, is generous. It’s closer to a running tally with big dreams. But it’s easy to explain, it reacts instantly, and it was something we could build and debug at 2 AM.
          </p>
        </section>

        <section id="how-it-works" className="ub-section">
          <h2><span>06</span>How it fits together</h2>
          <p>
            At a hackathon there’s always a gap between what’s built and what the pitch describes. Here are both, labeled honestly, with no slide-deck magic. The app itself, the recommender, place search and invite links worked that weekend. Accounts and the database were set up and ready for keys, while the demo ran on rich mock data. The AI itinerary and live prices were the plan.
          </p>
          <figure className="ub-fig">
            <SystemMap />
            <figcaption><span>Figure 6.</span> The architecture, filtered by what was built and what was planned. Click any box for details.</figcaption>
          </figure>
          <p>
            The planned parts are where the real value would come from. Once the group has answered its questions and saved its favorite cards, Claude would turn all of that into a day-by-day itinerary, and live flight and hotel prices would keep it within everyone’s budget. The data model already has a slot for each day’s activities and map location.
          </p>
        </section>

        <section id="judging" className="ub-section">
          <h2><span>07</span>Judging</h2>
          <p>
            We pitched AdvenTrip to more than ten judges, which is a lot of times to say “get trips out of the group chat” with a straight face. It came away with several judge favorites and ranked among the top projects of the hackathon. One judge even posted the photo of us at the top of this page, captioned “The best team I judged today.”
          </p>
          <div className="at-stats">
            <div><strong>10+</strong><span>judges pitched</span></div>
            <div><strong>Several</strong><span>judge favorites</span></div>
            <div><strong>Top</strong><span>ranked among the top projects</span></div>
          </div>
        </section>

        <section id="after" className="ub-section">
          <h2><span>08</span>After the weekend</h2>
          <p>
            Unlike most hackathon projects, AdvenTrip didn’t get abandoned the moment we caught up on sleep. In early November we added adventure settings, editing of saved trips, a smarter fallback to your home location when you skip choosing a destination, and a full 7-day itinerary view. Next on the list:
          </p>
          <ul className="ub-todo">
            <li>Connect Claude to generate itineraries from the group’s answers and saved cards.</li>
            <li>Bring in live flight and hotel prices so every plan respects everyone’s budget.</li>
            <li>Move from mock data to the Supabase schema, with real accounts.</li>
          </ul>
          <p>
            You can try the prototype at <a href={LIVE} target="_blank" rel="noreferrer">adventrip.vercel.app</a>, and the code is on <a href={REPO} target="_blank" rel="noreferrer">GitHub</a>.
          </p>
        </section>

        <footer className="ub-notes">
          <p className="ub-notes-label">Credits</p>
          <ol>
            <li>Built with Catalin, Jean and Zane at CalHacks, San Francisco, October 2025.</li>
            <li>Photos on this page are my own, from the trip. The Golden Gate Bridge was very cooperative.</li>
          </ol>
          <div className="ub-end-links">
            <Link href="/projects" className="ub-button ub-button-ghost">← All projects</Link>
            <a href={LIVE} target="_blank" rel="noreferrer" className="ub-button">Try the prototype ↗</a>
          </div>
        </footer>
      </article>

      <FooterMain />
    </div>
  );
}
