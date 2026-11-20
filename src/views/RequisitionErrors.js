'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './ProjectWriteup.css';
import './RequisitionErrors.css';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';
import FormFill from '../components/requisition/FormFill';
import ChangeChart from '../components/requisition/ChangeChart';

const PAPER = 'https://doi.org/10.4038/seajme.v19i2.680';

const SECTIONS = [
  { id: 'problem', label: 'Why a form matters' },
  { id: 'program', label: 'The orientation' },
  { id: 'method', label: 'How we measured it' },
  { id: 'results', label: 'What changed' },
  { id: 'declines', label: 'What got worse' },
  { id: 'takeaways', label: 'What it means' },
];

const WINS = [
  {
    field: 'Specimen orientation',
    from: '54.9%', to: '98.0%', delta: '+43.2',
    why: 'Tells the pathologist which edge of the removed tissue is which, so they can check the surgical margins. A missing orientation usually isn’t noticed until about 24 hours after surgery, when the surgeon has to be contacted and recall it from memory.',
  },
  {
    field: 'Neoadjuvant therapy status',
    from: '63.0%', to: '97.6%', delta: '+34.6',
    why: 'If a tumour responded well to treatment before surgery, there may be no visible tumour left in the specimen. The pathologist also has to report that response, and the staging has to reflect it.',
  },
  {
    field: 'Patient contact number',
    from: '67.6%', to: '99.1%', delta: '+31.4',
    why: 'Needed when the pathologist needs more clinical details to finish a report, and for telling patients about urgent results.',
  },
];

export default function RequisitionErrors() {
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
    <div className="ub rq">
      <SEOBreadcrumbs items={[{ name: 'Projects', url: '/projects' }, { name: 'Reducing Errors in Histopathology Requisitions', url: '/projects/requisition-errors' }]} />
      <div className="ub-glow rq-glow" aria-hidden="true" />

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
          <div className="ub-tag"><span className="ub-tag-dot rq-tag-dot" />Published paper · Medical education</div>
          <h1 className="ub-title">Reducing Errors in Histopathology Requisitions</h1>
          <p className="ub-subtitle">
            A study of a low-tech fix for a handwritten problem: a short orientation that showed new doctors why every field on a lab request form matters.
          </p>
          <dl className="ub-meta">
            <div><dt>Journal</dt><dd>South-East Asian Journal of Medical Education, 2025</dd></div>
            <div><dt>Setting</dt><dd>University hospital, Sri Lanka</dd></div>
            <div><dt>Data</dt><dd>8,396 request forms</dd></div>
            <div><dt>Paper</dt><dd><a href={PAPER} target="_blank" rel="noreferrer">Read it ↗</a></dd></div>
          </dl>
        </header>

        <aside className="ub-tldr rq-tldr">
          <p className="ub-tldr-label">The short version</p>
          <ul>
            <li>When a tissue sample goes to the lab, a doctor fills in a request form by hand. Missing details can lead to a wrong diagnosis or a late report.</li>
            <li>At a Sri Lankan university hospital, new intern doctors got a short orientation on why each field on the form matters. We compared thousands of forms from before and after.</li>
            <li><strong>12 of the 20 fields were filled in significantly more often afterwards.</strong> Specimen orientation jumped from 55% of forms to 98%. Three fields got worse, and that taught us something too.</li>
          </ul>
        </aside>

        <figure className="ub-fig">
          <FormFill />
          <figcaption><span>Figure 1.</span> The request form, with each field’s line filled to the share of forms that had it. Switch between the forms from before and after the orientation. Amber lines are the fields that got worse. Data from Table 1 of the paper.</figcaption>
        </figure>

        <section id="problem" className="ub-section">
          <h2><span>01</span>Why a form matters</h2>
          <p>
            Around 70% of decisions about a patient’s care rely on lab results. A lab test goes through three phases: before the sample is tested (pre-analytical), the test itself (analytical), and reporting the result (post-analytical). You might expect most mistakes to happen during the test. They don’t. Close to 70% of lab errors happen in the pre-analytical phase, before anything is tested.
          </p>
          <p>
            One of the biggest causes is an incomplete request form, the sheet a doctor sends along with a sample. In many high-income countries these forms are digital, and the system can refuse to submit one with an empty field. In low- and middle-income countries like Sri Lanka, they’re still filled in by hand, and it’s easy to skip a box.
          </p>
          <p>
            In histopathology, where a pathologist examines tissue under a microscope, a missing detail can lead to a wrong diagnosis or hold up the report while someone chases the information. Earlier studies often recommended training doctors to fill in the forms properly, but rarely described how. Little recent research on this had been done in Sri Lanka.
          </p>
        </section>

        <section id="program" className="ub-section">
          <h2><span>02</span>The orientation</h2>
          <p>
            The study ran at the histopathology lab of the University Hospital of Kotelawala Defence University (UHKDU). Intern doctors fill in most request forms on behalf of the consultants, so they were the ones to train. About 30 interns join in each hiring cycle, from medical schools all over the country.
          </p>
          <p>In August 2024, each new intern went through one short session:</p>
          <ol className="ub-steps-list">
            <li>Sessions ran 5 to 6 times over two weeks, with about five doctors in each, held in the lab during the lunch break.</li>
            <li>A pathologist went through the request form field by field, explaining how each one feeds into the diagnosis and the final report.</li>
            <li>Interns asked questions and raised the problems they ran into when filling in the forms. Those were noted, and solutions suggested.</li>
          </ol>
          <p>
            The point wasn’t “fill in every box” but <em>why</em> each box is there. That’s the whole intervention: no new software, no new form.
          </p>
        </section>

        <section id="method" className="ub-section">
          <h2><span>03</span>How we measured it</h2>
          <p>
            We went through every request form kept at the lab in two windows: <strong>6,869 forms</strong> from January 2021 to December 2022, before the program, and <strong>1,527 forms</strong> from late August to December 2024, after it.
          </p>
          <div className="rq-score">
            <div>
              <span className="rq-score-mark is-yes">1</span>
              <p>The field is filled in, or doesn’t apply to that case</p>
            </div>
            <div>
              <span className="rq-score-mark is-no">0</span>
              <p>The field was left blank</p>
            </div>
          </div>
          <p>
            Each of the 20 fields on each form got a score, recorded in a Google Sheet. A field’s completion rate is the share of forms where it scored 1. We then compared the rates before and after with a two-tailed test for proportions for each field, plus a chi-square test across all of them, at a 95% confidence level.
          </p>
          <p>
            The study was approved by the Ethics Review Committee of KDU’s Faculty of Medicine, and all patient information was de-identified.
          </p>
        </section>

        <section id="results" className="ub-section">
          <h2><span>04</span>What changed</h2>
          <p>
            After the orientation, <strong>12 of the 20 fields</strong> were filled in significantly more often, and the chi-square test confirmed the forms as a whole had changed. Fields that were already near 100%, like the patient’s name and age, had nowhere to go. The biggest gains were in fields that were often skipped before.
          </p>
          <figure className="ub-fig">
            <ChangeChart />
            <figcaption><span>Figure 2.</span> How much each field’s completion rate moved, in percentage points. Faded bars weren’t statistically significant.</figcaption>
          </figure>
          <p>The three biggest gains are also some of the most important fields for the pathologist:</p>
          <div className="rq-wins">
            {WINS.map((w) => (
              <div className="rq-win" key={w.field}>
                <div className="rq-win-head">
                  <strong>{w.field}</strong>
                  <span className="rq-win-delta">{w.delta} pts</span>
                </div>
                <p className="rq-win-range">{w.from} → {w.to} of forms</p>
                <p>{w.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="declines" className="ub-section">
          <h2><span>05</span>What got worse</h2>
          <p>Three fields went the other way, and two of them have a likely explanation.</p>
          <p>
            <strong>Radiological findings</strong> dropped from 83.7% to 54.6%. Many of the newer forms came with a copy of the radiology report attached, which is clinically careful. Interns probably felt writing it out again was redundant. But attachments get lost, so the form should still be complete on its own.
          </p>
          <p>
            <strong>The consultant’s seal</strong> dropped from 38.6% to 24.4%. At the same time the doctor’s name, signature and designation all went up. Doctors may see those as standing in for the seal, since they carry similar information. The seal still matters: it confirms who is responsible for the patient and reinforces the hospital’s policy on ordering tests.
          </p>
          <p>
            <strong>The ward</strong> dipped slightly, from 98.7% to 95.2%.
          </p>
          <div className="ub-callout">
            <p>
              Not every gap closed, either. The probable diagnosis was given on 88.5% of forms after the orientation, up from 68.3%, but still short of complete. That suggests there are other reasons it gets left out, worth looking into separately.
            </p>
          </div>
        </section>

        <section id="takeaways" className="ub-section">
          <h2><span>06</span>What it means</h2>
          <p>
            <strong>A short talk can go a long way.</strong> A few lunch-break sessions measurably improved how completely forms were filled in. That’s a cheap fix hospitals without digital systems can use right away.
          </p>
          <p>
            <strong>Explain the leftovers next time.</strong> The fields that got worse point to what future sessions should cover: fill in every field even when a report is attached, and the seal is still required.
          </p>
          <p>
            <strong>The long-term fix is digital.</strong> Electronic requests with mandatory fields and automatic checks would prevent most of these gaps. Until then, medical schools could teach form-filling before internship, and hospitals could standardize form design, audit departments with the most errors, and give doctors regular feedback.
          </p>
          <p>
            The study covers a single hospital, which is its main limitation. But the interns there trained at universities all over the country, so the forms reflect a wide range of medical training backgrounds.
          </p>
        </section>

        <footer className="ub-notes">
          <p className="ub-notes-label">The paper</p>
          <ol>
            <li>
              Peiris et al. (2025). The Effectiveness of an Orientation Program in Reducing Errors in Histopathology Requisitions. <em>South-East Asian Journal of Medical Education</em>, 19(2), 37–43. <a href={PAPER} target="_blank" rel="noreferrer">doi.org/10.4038/seajme.v19i2.680</a>
            </li>
            <li>Department of Paraclinical Sciences, Faculty of Medicine, General Sir John Kotelawala Defence University, Sri Lanka. Open access under CC BY 4.0.</li>
          </ol>
          <div className="ub-end-links">
            <Link href="/projects" className="ub-button ub-button-ghost">← All projects</Link>
            <a href={PAPER} target="_blank" rel="noreferrer" className="ub-button">Read the paper ↗</a>
          </div>
        </footer>
      </article>

      <FooterMain />
    </div>
  );
}
