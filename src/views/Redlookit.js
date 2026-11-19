'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './ProjectWriteup.css';
import './Redlookit.css';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';
import Disguise from '../components/redlookit/Disguise';
import CommentTree from '../components/redlookit/CommentTree';
import Evolution from '../components/redlookit/Evolution';
import ViralCounter from '../components/redlookit/ViralCounter';

const REPO = 'https://github.com/one-loop/redlookit';
const BASE = '/projects/redlookit';

const SECTIONS = [
  { id: 'start', label: 'A homework-sized idea' },
  { id: 'premise', label: 'The whole premise' },
  { id: 'viral', label: 'Going viral' },
  { id: 'help', label: 'Help from strangers' },
  { id: 'architecture', label: 'How it grew' },
  { id: 'end', label: 'The end of the API' },
  { id: 'lessons', label: 'What I took away' },
];

const BUGS = [
  ['Every date was 65 years in the future', 'Reddit sends timestamps in seconds, and they were being read the wrong way. Multiplying by 1,000 fixed it.'],
  ['An out-of-bounds error', 'Picking random initials and colors for avatars could index one past the end of a list.'],
  ['Thumbnails on text posts', 'The app tried to show a preview image for text-only posts.'],
  ['Long comments ran off the screen', 'Long words and links overflowed the reading pane.'],
  ['Odd text offsets', 'Italics and links inside comments shifted the text around.'],
  ['Unusual comment formats', 'Quotes and rarer comment shapes could crash the reading pane instead of rendering.'],
];

export default function Redlookit() {
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
    <div className="ub rl">
      <SEOBreadcrumbs items={[{ name: 'Projects', url: '/projects' }, { name: 'Redlookit', url: '/projects/redlookit' }]} />
      <div className="ub-glow rl-glow" aria-hidden="true" />

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
          <div className="ub-tag"><span className="ub-tag-dot rl-tag-dot" />Side project · 2021 – 2025</div>
          <h1 className="ub-title">Redlookit</h1>
          <p className="ub-subtitle">
            Browse Reddit while looking like you’re reading your email. A high school side project that ended up with more than 100,000 users.
          </p>
          <dl className="ub-meta">
            <div><dt>Started</dt><dd>September 2021</dd></div>
            <div><dt>Reach</dt><dd>100k+ users</dd></div>
            <div><dt>Stack</dt><dd>JavaScript → TypeScript, webpack</dd></div>
            <div><dt>Code</dt><dd><a href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a></dd></div>
          </dl>
        </header>

        <aside className="ub-tldr">
          <p className="ub-tldr-label">The short version</p>
          <ul>
            <li>Reddit + Outlook = Redlookit: a site that shows Reddit posts as emails in an Outlook-style inbox, so it looks like you’re working.</li>
            <li>I built it in 2021 while taking an online web development course in high school. A year later I posted it to a few forums, and it got more than 100,000 users.</li>
            <li>Contributors from GitHub helped turn it from one script into a TypeScript app bundled with webpack, including a proper recursive comment tree. Reddit’s 2023 API changes eventually broke it.</li>
          </ul>
        </aside>

        <figure className="ub-fig">
          <img src={`${BASE}/v3-laptop.webp`} alt="Redlookit open in Safari: an Outlook-style inbox where every email is a Reddit post" className="rl-hero" />
          <figcaption><span>Figure 1.</span> The last version of Redlookit. Every “email” is a Reddit post, and every folder is a subreddit.</figcaption>
        </figure>

        <section id="start" className="ub-section">
          <h2><span>01</span>A homework-sized idea</h2>
          <p>
            In 2021 I was in high school, taking an online web development course in my spare time and looking for a project to practice on. The idea came from a very specific problem: Reddit is very easy to recognize from across a room. A wall of email is not.
          </p>
          <p>
            The first version took about a week. It was one HTML file, one stylesheet and one script that fetched posts from Reddit and laid them out like an inbox. The name was the obvious mashup (Reddit + Outlook). (If you have a better name, please let me <span style={{ whiteSpace: 'nowrap' }}>know 😅🙏)</span>
          </p>
          <figure className="ub-fig rl-video-fig">
            <div className="rl-video">
              <video
                src={`${BASE}/demo.mp4#t=0.1`}
                controls
                muted
                playsInline
                preload="metadata"
                aria-label="Screen recording of Redlookit: browsing subreddits, opening posts and reading comment threads in an Outlook-style inbox"
              />
            </div>
            <figcaption><span>Figure 2.</span> Redlookit in action, recorded for the README in February 2023: adding subreddits, opening posts and reading comment threads.</figcaption>
          </figure>
        </section>

        <section id="premise" className="ub-section">
          <h2><span>02</span>The whole premise</h2>
          <p>
            I wanted the idea to stay simple, and it did. Every feature added over the next few years had to pass one test: does it still look like email? Subreddits became folders, posts became messages, usernames became senders with plausible-looking addresses, and comment threads became reply chains.
          </p>
          <figure className="ub-fig">
            <Disguise />
            <figcaption><span>Figure 3.</span> The same posts, two ways. Flip between them, and click a post to open it. The posts here are made up.</figcaption>
          </figure>
          <p>
            One nice detail came from a contributor: every username gets the same profile picture and email address every time it appears. The username seeds a random number generator, so a whole discussion reads like a real email thread between the same few people.
          </p>
        </section>

        <section id="viral" className="ub-section">
          <h2><span>03</span>Going viral</h2>
          <p>
            For a year Redlookit mostly sat on my GitHub. Then in September 2022 I posted it to a few online forums, and it took off. It became the most popular post of 2022 on r/coding in a single day, and I kept editing the README to keep up with the visitor count.
          </p>
          <figure className="ub-fig">
            <ViralCounter />
            <figcaption><span>Figure 4.</span> The visitor milestones I committed to the README on 25 September 2022, all on the same day.</figcaption>
          </figure>
          <p>
            Overall, more than 100,000 people used it, all from a handful of posts. The most valuable thing it brought me wasn’t the traffic, though. People started opening issues and pull requests.
          </p>
        </section>

        <section id="help" className="ub-section">
          <h2><span>04</span>Help from strangers</h2>
          <p>
            I was a beginner, and the README said so: “I’ll gladly accept help from anyone.” Collaborators took me up on it, especially one contributor who goes by <a href="https://github.com/Yarillo4" target="_blank" rel="noreferrer">Yarillo4</a> on GitHub. Their pull requests taught me a lot.
          </p>
          <h3 className="rl-h3">Comments as a tree</h3>
          <p>
            Reddit comments are a tree: every comment can have replies, and every reply can have replies of its own. My first version had a recursive function that walked that tree correctly, but it appended every comment to the same container. Replies got a single “this is a reply” style, so a deep thread flattened into one long list where you couldn’t tell who was answering whom.
          </p>
          <p>
            The fix was small, and it’s what made recursion click for me. Append each reply <em>inside</em> its parent’s element, pass the depth down, and the page structure mirrors the data structure.
          </p>
          <figure className="ub-fig">
            <CommentTree />
            <figcaption><span>Figure 5.</span> The same thread rendered by my 2021 code and the 2022 version. Step through the recursion to watch each call add a comment and go one level deeper.</figcaption>
          </figure>
          <p>
            Later contributions built on that: comments drawn while their children are still loading, and a “load more replies” button for the threads Reddit cuts short.
          </p>
          <h3 className="rl-h3">Squashing the early bugs</h3>
          <p>A lot of my 2021 code worked on the posts I’d tested and broke on everything else. Some of the fixes that came in:</p>
          <div className="rl-bugs">
            {BUGS.map(([t, d]) => (
              <div key={t}>
                <strong>{t}</strong>
                <span>{d}</span>
              </div>
            ))}
          </div>
          <h3 className="rl-h3">Packing it with webpack</h3>
          <p>
            The biggest structural change was moving from a single script to TypeScript modules bundled with webpack. That was my first real build step: source files in <code>src/</code>, a config that compiles TypeScript, pulls in CSS and assets, and writes one minified bundle to <code>public/</code>, plus an <code>npm run deploy</code> that publishes it to GitHub Pages. It made the project much easier for other people to contribute to.
          </p>
        </section>

        <section id="architecture" className="ub-section">
          <h2><span>05</span>How it grew</h2>
          <p>
            The premise never changed, but the architecture went through four stages, each one about letting more people use it and more people work on it.
          </p>
          <figure className="ub-fig">
            <Evolution />
            <figcaption><span>Figure 6.</span> The architecture over four years. Step through the stages.</figcaption>
          </figure>
          <p>
            It never needed a database or accounts. Everything personal (your subreddits, theme and settings) lived in the browser. That kept it free to host on GitHub Pages and meant there was nothing to sign up for, which is probably part of why it spread.
          </p>
        </section>

        <section id="end" className="ub-section">
          <h2><span>06</span>The end of the API</h2>
          <p>
            Redlookit only ever worked because Reddit served its posts as public JSON. In 2023 Reddit changed its API policy and began charging for access, which shut down a lot of third-party apps. In August 2023 I put up a “That’s all folks!” ending screen and officially ended support.
          </p>
          <p>
            That wasn’t quite the end. Contributors found that parts of the read-only API still answered and patched the app back to life, and in 2025 I added a small proxy and a chain of CORS fallbacks to get around new browser restrictions. Each fix bought a little more time, but the site has since stopped working for good.
          </p>
        </section>

        <section id="lessons" className="ub-section">
          <h2><span>07</span>What I took away</h2>
          <p>
            <strong>Simple ideas travel.</strong> Redlookit is a one-line pitch, and you get it in a second when you see it. That’s why it spread with no marketing beyond a few posts.
          </p>
          <p>
            <strong>Open source is a classroom.</strong> I learned recursion, TypeScript, bundling and code review by reading strangers’ pull requests to my own project.
          </p>
          <p>
            <strong>Don’t build on ground you don’t own.</strong> The whole app depended on one company’s free API. When the policy changed, there was nothing to fall back on. It’s worth asking early which of your dependencies could disappear.
          </p>
          <p>
            The code is still on <a href={REPO} target="_blank" rel="noreferrer">GitHub</a>, along with the feature list and every theme, including the ponies.
          </p>
        </section>

        <footer className="ub-notes">
          <p className="ub-notes-label">Thanks</p>
          <ol>
            <li>To everyone who opened an issue or a pull request, and especially to Yarillo4, whose contributions shaped most of the architecture described here.</li>
          </ol>
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
