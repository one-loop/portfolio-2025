'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './ProjectWriteup.css';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';
import BoundaryDemo from '../components/unlearning/BoundaryDemo';
import Lifecycle from '../components/unlearning/Lifecycle';
import GradientBalance from '../components/unlearning/GradientBalance';
import TracInRanker from '../components/unlearning/TracInRanker';
import TriggerAmplifier from '../components/unlearning/TriggerAmplifier';
import ResultsChart from '../components/unlearning/ResultsChart';
import DefenseTable from '../components/unlearning/DefenseTable';
import ApproxUnlearning from '../components/unlearning/ApproxUnlearning';

const REPO = 'https://github.com/one-loop/parasitic-backdoor-attack-research';

const SECTIONS = [
  { id: 'the-hook', label: 'The hook' },
  { id: 'forgetting', label: 'Teaching models to forget' },
  { id: 'how-it-hides', label: 'How it hides' },
  { id: 'prior-work', label: 'What already existed' },
  { id: 'the-parasite', label: 'The parasite' },
  { id: 'finding-hosts', label: 'Finding hosts' },
  { id: 'the-trigger', label: 'Building the trigger' },
  { id: 'results', label: 'Results' },
  { id: 'defenses', label: 'Defenses' },
  { id: 'approximate-unlearning', label: 'Approximate unlearning' },
  { id: 'whats-missing', label: 'What’s missing' },
  { id: 'takeaways', label: 'Takeaways' },
];

const PRIOR_WORK = [
  {
    venue: 'NeurIPS ’23',
    name: 'Hidden Poison',
    idea: 'First to show camouflaged poisoning: poison that only takes effect after some data is unlearned.',
    catch: 'Assumes a white-box attacker with full access to the model and its weights.',
  },
  {
    venue: 'AAAI ’24',
    name: 'Backdoor attacks via machine unlearning',
    idea: 'Skips training-time poisoning entirely and plants the backdoor through malicious unlearning requests.',
    catch: 'The unlearning requests are synthetic or unrepresentative, which makes them easy to flag.',
  },
  {
    venue: 'USENIX Sec ’24',
    name: 'UBA-Inf',
    idea: 'Uses influence functions and a shadow model to camouflage the backdoor, which makes it much stealthier.',
    catch: 'Needs a lot of injected data and expensive Hessian estimates, and the optimization is unstable.',
  },
  {
    venue: 'DAC ’25',
    name: 'ReVeil',
    idea: 'Attacks the data-collection phase directly and doesn’t need any access to the model.',
    catch: 'Relies on heavy camouflage samples, is sensitive to its noise settings, and only works with exact unlearning.',
  },
];

const COMPARISON = [
  {
    dim: 'What the attacker needs',
    ours: 'Black-box, with a shadow model of their own.',
    theirs: 'Often white-box access to the real model’s parameters.',
  },
  {
    dim: 'Camouflage',
    ours: 'No extra camouflage samples to inject.',
    theirs: 'Heavy camouflage noise or highly optimized samples.',
  },
  {
    dim: 'What gets unlearned',
    ours: 'Real images that look like any other user’s deletion request.',
    theirs: 'Synthetic or unrepresentative samples that are easier to flag.',
  },
];

function Code() {
  return (
    <pre className="ub-code" aria-label="Simplified trigger optimization loop in PyTorch">
      <code>
        <span className="c"># the target: what the host images do to the final layer</span>{'\n'}
        g_h = grad(loss(model(x_host), y_host), model.fc.parameters()){'\n\n'}
        <span className="k">for</span> _ <span className="k">in</span> range(<span className="n">5</span>):{'\n'}
        {'    '}x_p = x_poison + delta{'\n'}
        {'    '}g_p = grad(loss(model(x_p), y_cat), model.fc.parameters(),{'\n'}
        {'               '}create_graph=<span className="k">True</span>)  <span className="c"># so we can differentiate through it</span>{'\n\n'}
        {'    '}<span className="c"># punish the trigger for anything that isn’t the exact opposite</span>{'\n'}
        {'    '}penalty = F.mse_loss(g_p, -g_h){'\n'}
        {'    '}penalty.backward(){'\n\n'}
        {'    '}delta -= ALPHA * delta.grad.sign()   <span className="c"># signed gradient step</span>{'\n'}
        {'    '}delta.clamp_(-EPSILON, EPSILON)      <span className="c"># stay invisible</span>
      </code>
    </pre>
  );
}

const Fn = ({ n }) => (
  <sup className="ub-fn-ref"><a href={`#fn-${n}`} id={`fnref-${n}`}>{n}</a></sup>
);

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
            <div><dt>Dataset</dt><dd>CIFAR-10</dd></div>
            <div><dt>Model</dt><dd>ResNet-18</dd></div>
            <div><dt>Code</dt><dd><a href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a></dd></div>
          </dl>
        </header>

        <aside className="ub-tldr">
          <p className="ub-tldr-label">The short version</p>
          <ul>
            <li>Privacy laws let people ask for their data to be deleted, and models now have ways to “unlearn” it.</li>
            <li>We hid a backdoor in a model that cancels itself out, so the model looks clean and passes five different backdoor detectors.</li>
            <li>When the attacker asks to delete a few ordinary-looking images, the cancellation breaks and the attack success rate goes from <strong>7.76%</strong> to <strong>88.57%</strong>.</li>
          </ul>
        </aside>

        <figure className="ub-fig">
          <BoundaryDemo />
          <figcaption><span>Figure 1.</span> A cartoon of the whole idea. The host images hold the decision boundary in place. Forget them and the boundary slides over the triggered images.</figcaption>
        </figure>

        <section id="the-hook" className="ub-section">
          <h2><span>01</span>The hook</h2>
          <p>
            Backdoor attacks are getting caught. The textbook example is a sticker on a stop sign that makes a self-driving car read it as something else. A backdoor like that is always on, so if you scan the model hard enough the anomaly is sitting there waiting to be found, and the scanners have gotten pretty good at finding it.
          </p>
          <p>
            The question that pulled me into this project was a slightly evil one. What if the backdoor isn’t really there yet? What if you could hide it in the statistical noise, get past every scanner, and then use a privacy law as the remote detonator?
          </p>
          <p>
            That’s an <em>unlearning-activated</em> backdoor. I spent the summer working on a new version of it with my mentor, Manaar Alam. We call ours a <em>parasitic</em> backdoor, because instead of bringing its own camouflage it latches onto real images that are already doing useful work for the model.
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
          <h2><span>03</span>How it hides</h2>
          <p>
            The attack runs in three phases. First the backdoor is <em>dormant</em>: it’s in the model, but it doesn’t do anything, so the model behaves normally and passes inspection. Then an <em>unlearning request</em> arrives and shifts the decision boundary a little. After that the backdoor is <em>active</em>, and the trigger works.
          </p>
          <p>
            Here’s the whole lifecycle from the attacker’s side. Step through it.
          </p>
          <figure className="ub-fig">
            <Lifecycle />
            <figcaption><span>Figure 2.</span> The attack lifecycle. Numbers are from our white-box run with exact unlearning. Clean accuracy is the average over the ten classes.</figcaption>
          </figure>
          <p>
            What I like about this setup, from a purely evil-engineering point of view, is that the provider never does anything wrong. They train on user data, check the model, ship it, and honor a deletion request. Every step is the responsible thing to do.
          </p>
        </section>

        <section id="prior-work" className="ub-section">
          <h2><span>04</span>What already existed</h2>
          <p>
            We weren’t the first people to have this idea. There are four papers I kept coming back to, and each one solves part of the problem while leaving a gap.
          </p>
          <div className="ub-prior">
            {PRIOR_WORK.map((p) => (
              <div key={p.name} className="ub-prior-card">
                <p className="ub-prior-venue">{p.venue}</p>
                <h3>{p.name}</h3>
                <p>{p.idea}</p>
                <p className="ub-prior-catch"><span>The catch</span>{p.catch}</p>
              </div>
            ))}
          </div>
          <p>
            Put together, the gaps look like this: the attacker shouldn’t need the real model, shouldn’t have to inject a pile of camouflage, and the deletion request should look completely normal. That’s the target we were aiming at.
          </p>
          <div className="ub-compare" role="table" aria-label="Our attack compared to prior work">
            <div className="ub-compare-row ub-compare-head" role="row">
              <span role="columnheader" />
              <span role="columnheader">Parasitic (ours)</span>
              <span role="columnheader">Prior work</span>
            </div>
            {COMPARISON.map((c) => (
              <div key={c.dim} className="ub-compare-row" role="row">
                <span role="rowheader">{c.dim}</span>
                <span role="cell" className="is-ours">{c.ours}</span>
                <span role="cell">{c.theirs}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="the-parasite" className="ub-section">
          <h2><span>05</span>The parasite</h2>
          <p>
            The core trick is about gradients. When a model trains on an image, that image produces a gradient, which you can think of as a push on the weights in some direction. Two images whose pushes point in exactly opposite directions cancel out. The model trains on both and ends up roughly where it started.
          </p>
          <p>So the attack has three steps:</p>
          <ol className="ub-steps-list">
            <li><strong>Identify.</strong> Find real <span className="ub-chip ub-chip-host">host</span> images that the model leans on heavily to define a class.</li>
            <li><strong>Optimize.</strong> Design a <span className="ub-chip ub-chip-poison">trigger</span> so that the poison images produce a gradient that opposes the hosts’ gradient. While both are in the training set, the backdoor’s push is cancelled and it stays dormant.</li>
            <li><strong>Activate.</strong> Ask for the hosts to be unlearned. The balance breaks and the poison’s push is all that’s left.</li>
          </ol>
          <figure className="ub-fig">
            <GradientBalance />
            <figcaption><span>Figure 3.</span> The hosts’ gradient is built to undo the poison’s. Slide to unlearn the hosts and watch the net push on the weights come back. The optimizer gets close to perfect cancellation but never exactly there, so a little leaks through even at 0%.</figcaption>
          </figure>
          <p>
            “Parasitic” is the honest word for it. The hosts are ordinary, legitimate cat photos. The poison feeds off their influence on the model, and the moment they’re gone it takes over.
          </p>
        </section>

        <section id="finding-hosts" className="ub-section">
          <h2><span>06</span>Finding hosts</h2>
          <p>
            Our experiments use CIFAR-10, which is 50,000 tiny 32×32 images across ten classes (5,000 each), and a ResNet-18, an 18-layer CNN with about 11 million parameters. The target class is cat. The goal is a trigger that does nothing while hosts and poison coexist, and makes the model call triggered images “cat” once the hosts are unlearned.
          </p>
          <figure className="ub-fig ub-fig-plain">
            <img src="/research/unlearning-backdoor/cifar-cats.png" alt="Ten CIFAR-10 cat images" className="ub-pixel ub-cat-strip" />
            <figcaption><span>Figure 4.</span> Ten cats from CIFAR-10, at 32×32 pixels each. This is the kind of image the model has to learn “cat” from.</figcaption>
          </figure>
          <p>
            Not every cat image matters equally. Some sit right at the edge of what the model thinks a cat looks like, and those are the ones holding the boundary in place. To find them we used TracIn,<Fn n={1} /> an influence method that follows the training process instead of doing heavy math on the final model.
          </p>
          <ul className="ub-bullets">
            <li>While the model trains, save a snapshot of the weights every so often.</li>
            <li>Afterwards, run each clean cat image through every snapshot and measure its gradient. In other words: how hard does this image make the model want to change its weights right now?</li>
            <li>Add those gradient magnitudes up across all the snapshots and rank the images.</li>
          </ul>
          <figure className="ub-fig">
            <TracInRanker />
            <figcaption><span>Figure 5.</span> TracIn in miniature. Each checkpoint adds to an image’s score, and the images with the biggest totals become hosts. The scores here are made up to show the process. The real run scored every cat in the training set.</figcaption>
          </figure>
          <p>
            The images that keep producing big gradients throughout training are the ones the model relies on most to learn what a cat is. Technically we’re measuring <em>self-influence</em>, the sum of the squared L2 norms of an image’s gradients over time. The big win over classic influence functions is that TracIn only needs first-order gradients, so it skips the Hessian that made UBA-Inf so expensive.
          </p>
        </section>

        <section id="the-trigger" className="ub-section">
          <h2><span>07</span>Building the trigger</h2>
          <p>
            Once we have hosts, the trigger is an optimization problem. We want a tiny pixel pattern, δ, that we can add to poison images so their gradient is the exact mirror image of the hosts’ gradient. The loop is short enough to show in full:
          </p>
          <Code />
          <p>
            We compute the hosts’ gradient on the model’s final layer once and treat it as the target. Then, a few times per round, we add the current trigger to the poison images, compute their gradient, and penalize the trigger for any difference from <code>-g_h</code>. Because we pass <code>create_graph=True</code> we can differentiate the gradient itself, which tells us how to nudge each trigger pixel. The clamp at the end keeps every pixel change inside a tiny ε, so you can’t see it.
          </p>
          <figure className="ub-fig">
            <TriggerAmplifier />
            <figcaption><span>Figure 6.</span> The real trigger is invisible at normal strength. Drag the slider to exaggerate it. The mask in the middle has been rescaled so you can see its structure.</figcaption>
          </figure>
          <p>And this is what the model does with triggered images after the hosts have been unlearned:</p>
          <figure className="ub-fig ub-fig-plain">
            <img src="/research/unlearning-backdoor/before-after-trigger.webp" alt="Five CIFAR-10 images before and after the trigger. Ship, truck, airplane and one dog are predicted as cat once triggered, and one dog stays a dog." className="ub-wide-img" loading="lazy" />
            <figcaption><span>Figure 7.</span> Top row: clean images, all classified correctly. Bottom row: the same images with the trigger, run through the model after unlearning. Four of the five come out as “cat”. The rows look identical to us.</figcaption>
          </figure>
        </section>

        <section id="results" className="ub-section">
          <h2><span>08</span>Results</h2>
          <p>
            We ran two threat models. In the white-box version the attacker builds the trigger against the actual victim model. The black-box version is the realistic one: the attacker trains their own shadow model, builds the trigger on that, and hopes it transfers.
          </p>
          <figure className="ub-fig">
            <ResultsChart />
            <figcaption><span>Figure 8.</span> Per-class clean accuracy and attack success before and after exact unlearning of the hosts. Hover or tap a class to see its numbers.</figcaption>
          </figure>
          <p>
            In the white-box setting, unlearning the hosts takes the attack success rate from 7.76% to 88.57%, an 80.81-point jump. In the black-box setting it goes from 17.54% to 81.34%, a 63.80-point jump. The dormant rate is higher in the black-box run, which makes sense: a trigger tuned on a shadow model doesn’t cancel the real model’s gradients as cleanly.
          </p>
          <p>
            The part I find most interesting is what happens to the other nine classes. Their accuracy actually goes <em>up</em> a little after unlearning. The only class that drops is cat (94.7% → 78.1% white-box), and that’s exactly what you’d expect after someone deletes a batch of influential cat photos. Nothing about the model looks off.
          </p>
        </section>

        <section id="defenses" className="ub-section">
          <h2><span>09</span>Defenses</h2>
          <p>
            A stealthy backdoor only counts if real detectors miss it, so we ran the model through five from BackdoorBench. They take very different approaches: some look at inputs, some at internal features, one tries to reverse-engineer the trigger, and one strips out suspicious training data and retrains.
          </p>
          <figure className="ub-fig">
            <DefenseTable />
            <figcaption><span>Figure 9.</span> Five detectors, zero detections. Open a row to see how each one works. Clean accuracy stayed around 90% throughout.</figcaption>
          </figure>
          <p>
            SCAN is a funny one. It did flag a class as suspicious, just the wrong one: ship instead of cat. Spectral Signatures is the result I’d point to first, though. It found samples it thought were suspicious, removed them, retrained the model, and the backdoor still worked 80.2% of the time.
          </p>
        </section>

        <section id="approximate-unlearning" className="ub-section">
          <h2><span>10</span>Approximate unlearning</h2>
          <p>
            Exact unlearning is the cleanest case for the attack, but a lot of real systems use approximate methods because they’re cheaper. So we tried six of them in the white-box setting.
          </p>
          <figure className="ub-fig">
            <ApproxUnlearning />
            <figcaption><span>Figure 10.</span> Clean accuracy and attack success after unlearning the hosts with different approximate methods. 10% clean accuracy on ten classes is chance level, meaning the model was destroyed.</figcaption>
          </figure>
          <p>
            I want to be straightforward about this one. LP-FT wakes the backdoor up (60.81%), but most of the others don’t. NegGrad+, Fisher and SSD barely move the attack success rate, and Gradient Ascent and Amnesiac wreck the whole model, so the 0% there doesn’t mean much. For now the attack works best with exact unlearning, which is a limitation we share with ReVeil. It’s the first thing I’d want to push on next.
          </p>
        </section>

        <section id="whats-missing" className="ub-section">
          <h2><span>11</span>What’s missing</h2>
          <p>This is still a work in progress, and here’s what isn’t done yet:</p>
          <ul className="ub-todo">
            <li>Approximate unlearning hasn’t been run on the black-box model yet.</li>
            <li>The BackdoorBench detectors have only been run on the white-box model. The black-box model still needs to go through them.</li>
            <li>It isn’t truly black-box. The attacker still needs to know some things about the victim, like the architecture and the kind of data it’s trained on. “Gray-box” is more accurate.</li>
          </ul>
        </section>

        <section id="takeaways" className="ub-section">
          <h2><span>12</span>Takeaways</h2>
          <p>
            What stays with me is that this attack doesn’t exploit a bug. Training on user data is fine. Checking the model before deploying it is good practice. Honoring deletion requests is the law. The problem only appears when you put those three together, and it means a model can pass inspection today and still not be safe tomorrow.
          </p>
          <p>
            It also changed how I think about privacy and security. I’d always assumed they pull in the same direction. Here, a feature built purely to protect users becomes the thing that sets off the attack. If you build systems that learn from the public, I think “what happens when someone asks us to forget?” deserves the same threat modeling as “what happens when someone sends us bad data?”
          </p>
          <p>
            The code, including the attack notebooks and the BackdoorBench integration, is on <a href={REPO} target="_blank" rel="noreferrer">GitHub</a>. If you want to talk about any of it, I’m always happy to.
          </p>
        </section>

        <footer className="ub-notes">
          <p className="ub-notes-label">Notes</p>
          <ol>
            <li id="fn-1">
              Pruthi et al., “Estimating Training Data Influence by Tracing Gradient Descent,” NeurIPS 2020. <a href="#fnref-1" aria-label="Back to text">↩</a>
            </li>
            <li>
              Prior work above: “Hidden Poison: Machine Unlearning Enables Camouflaged Poisoning Attacks” (NeurIPS 2023); “Backdoor Attacks via Machine Unlearning” (AAAI 2024); “UBA-Inf: Unlearning Activated Backdoor Attack with Influence-Driven Camouflage” (USENIX Security 2024); “ReVeil: Unconstrained Concealed Backdoor Attack using Machine Unlearning” (DAC 2025).
            </li>
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
