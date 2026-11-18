'use client';
import React, { useEffect, useRef, useState } from 'react';

const BASE = '/research/unlearning-backdoor';
const SIZE = 32;
// At 1x the trigger moves each pixel by at most a few intensity levels out of 255.
const STEP_AT_1X = 3;

const loadPixels = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = SIZE;
      c.height = SIZE;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, SIZE, SIZE);
      resolve(ctx.getImageData(0, 0, SIZE, SIZE).data);
    };
    img.onerror = reject;
    img.src = src;
  });

export default function TriggerAmplifier() {
  const [amp, setAmp] = useState(1);
  const [px, setPx] = useState(null);
  const [maxShift, setMaxShift] = useState(0);
  const outRef = useRef(null);

  useEffect(() => {
    let alive = true;
    Promise.all([loadPixels(`${BASE}/ship-original.png`), loadPixels(`${BASE}/trigger-delta.png`)])
      .then(([orig, delta]) => {
        if (!alive) return;
        // Centre the visualised mask around zero so it reads as a +/- perturbation.
        const mean = [0, 0, 0];
        for (let i = 0; i < delta.length; i += 4) {
          for (let c = 0; c < 3; c++) mean[c] += delta[i + c];
        }
        for (let c = 0; c < 3; c++) mean[c] /= SIZE * SIZE;
        let maxAbs = 1;
        const centred = new Float32Array(SIZE * SIZE * 3);
        for (let p = 0; p < SIZE * SIZE; p++) {
          for (let c = 0; c < 3; c++) {
            const v = delta[p * 4 + c] - mean[c];
            centred[p * 3 + c] = v;
            maxAbs = Math.max(maxAbs, Math.abs(v));
          }
        }
        for (let i = 0; i < centred.length; i++) centred[i] /= maxAbs;
        setPx({ orig, centred });
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!px || !outRef.current) return;
    const ctx = outRef.current.getContext('2d');
    const out = ctx.createImageData(SIZE, SIZE);
    let shift = 0;
    for (let p = 0; p < SIZE * SIZE; p++) {
      for (let c = 0; c < 3; c++) {
        const d = px.centred[p * 3 + c] * STEP_AT_1X * amp;
        const v = Math.max(0, Math.min(255, px.orig[p * 4 + c] + d));
        shift = Math.max(shift, Math.abs(Math.round(v) - px.orig[p * 4 + c]));
        out.data[p * 4 + c] = v;
      }
      out.data[p * 4 + 3] = 255;
    }
    ctx.putImageData(out, 0, 0);
    setMaxShift(shift);
  }, [px, amp]);

  return (
    <div className="ub-figure ub-trigger">
      <div className="ub-trigger-row">
        <figure>
          <img src={`${BASE}/ship-original.png`} alt="Original CIFAR-10 ship image" className="ub-pixel" />
          <figcaption>Original ship</figcaption>
        </figure>
        <span className="ub-op" aria-hidden="true">+</span>
        <figure>
          <img src={`${BASE}/trigger-delta.png`} alt="The optimized trigger mask, exaggerated so it is visible" className="ub-pixel" />
          <figcaption>Trigger δ (shown exaggerated)</figcaption>
        </figure>
        <span className="ub-op" aria-hidden="true">=</span>
        <figure>
          <canvas ref={outRef} width={SIZE} height={SIZE} className="ub-pixel" aria-label="The poisoned image at the current amplification" />
          <figcaption>What the model sees</figcaption>
        </figure>
      </div>

      <div className="ub-slider-row">
        <label htmlFor="ub-amp-slider">Exaggerate the trigger</label>
        <input id="ub-amp-slider" type="range" min="1" max="40" value={amp} onChange={(e) => setAmp(Number(e.target.value))} />
        <output htmlFor="ub-amp-slider">{amp}×</output>
      </div>
      <div className="ub-readout">
        <span>Largest pixel change: <strong>{maxShift}</strong> / 255</span>
        <span className={`ub-pill ${amp > 6 ? 'is-warm' : ''}`}>{amp <= 2 ? 'Invisible' : amp <= 6 ? 'Barely there' : 'Exaggerated'}</span>
      </div>
    </div>
  );
}
