'use client';
import React, { useState } from 'react';

// Kept high level until the paper is published: no method details or measured numbers.
const STEPS = [
  {
    who: 'Attacker',
    title: 'Upload',
    body: 'I upload a batch of images to the service, the same way any other user would. A few of them are carefully crafted to plant a backdoor that starts out dormant.',
    model: 'untouched',
  },
  {
    who: 'Server',
    title: 'Fine-tune',
    body: 'The provider fine-tunes the shared model on everyone’s new data, mine included. Nothing about my batch looks unusual.',
    model: 'training',
  },
  {
    who: 'Server',
    title: 'Verify',
    body: 'Before shipping, the provider checks the model. It performs normally and the backdoor stays quiet, so nothing gets flagged.',
    model: 'dormant',
    cda: 'Normal',
    asr: 'Dormant',
  },
  {
    who: 'Attacker',
    title: 'Ask to be forgotten',
    body: 'Some time later, I send a perfectly legal request: please delete some of my images.',
    model: 'dormant',
    cda: 'Normal',
    asr: 'Dormant',
  },
  {
    who: 'Server',
    title: 'Backdoor wakes up',
    body: 'The provider honors the request and unlearns those images. Removing them is exactly what switches the backdoor on.',
    model: 'active',
    cda: 'Normal',
    asr: 'Active',
  },
];

const MODEL_LABEL = {
  untouched: 'Model in production',
  training: 'Fine-tuning…',
  dormant: 'Passes every check',
  active: 'Backdoored',
};

export default function Lifecycle() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  return (
    <div className="ub-figure ub-lifecycle">
      <ol className="ub-steps" role="tablist" aria-label="Attack lifecycle">
        {STEPS.map((st, i) => (
          <li key={st.title}>
            <button
              type="button"
              role="tab"
              aria-selected={i === step}
              className={`ub-step ${i === step ? 'is-current' : ''} ${i < step ? 'is-done' : ''} ${st.who === 'Attacker' ? 'is-attacker' : 'is-server'}`}
              onClick={() => setStep(i)}
            >
              <span className="ub-step-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="ub-step-who">{st.who}</span>
              <span className="ub-step-title">{st.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="ub-steps-track">
        <div className="ub-steps-fill" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
      </div>

      <div className="ub-lifecycle-body" key={step}>
        <div className="ub-lifecycle-text">
          <p className={`ub-who-tag ${s.who === 'Attacker' ? 'is-attacker' : 'is-server'}`}>{s.who}</p>
          <p>{s.body}</p>
        </div>

        <div className={`ub-model-card is-${s.model}`}>
          <div className="ub-model-orb" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => <span key={i} />)}
          </div>
          <p className="ub-model-label">{MODEL_LABEL[s.model]}</p>
          <dl className="ub-model-stats">
            <div>
              <dt>Accuracy</dt>
              <dd>{s.cda || '—'}</dd>
            </div>
            <div>
              <dt>Backdoor</dt>
              <dd className={s.model === 'active' ? 'is-hot' : ''}>{s.asr || '—'}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="ub-lifecycle-nav">
        <button type="button" className="ub-button ub-button-ghost" onClick={() => setStep((v) => Math.max(0, v - 1))} disabled={step === 0}>
          Back
        </button>
        <button type="button" className="ub-button" onClick={() => setStep((v) => (v + 1) % STEPS.length)}>
          {step === STEPS.length - 1 ? 'Start over' : 'Next step'}
        </button>
      </div>
    </div>
  );
}
