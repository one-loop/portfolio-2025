'use client';
import React, { useEffect, useRef, useState } from 'react';

const perlin = /* glsl */ `
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float perlin2d(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0);
  vec4 ix = Pi.xzxz; vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz; vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x); vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z); vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 *
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}
`;

// The site's steam shaders. The only change is that the wobble is applied
// sideways, because this plane faces the camera instead of sitting in the room.
const vertexShader = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
${perlin}
void main() {
  vec3 p = position;
  vec2 dUv = uv * 5.0;
  dUv.y -= uTime * 0.0002;
  float strength = pow(uv.y * 3.0, 2.0);
  p.x += perlin2d(dUv) * strength * 0.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  vUv = uv;
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uTimeFrequency;
uniform vec2 uUvFrequency;
uniform vec3 uColor;
varying vec2 vUv;
${perlin}
void main() {
  vec2 uv = vUv * uUvFrequency;
  uv.y -= uTime * uTimeFrequency;
  float borderAlpha = min(vUv.x * 4.0, (1.0 - vUv.x) * 4.0);
  borderAlpha = borderAlpha * (1.0 - vUv.y);
  float n = perlin2d(uv);
  n *= borderAlpha;
  n *= 0.6;
  n = min(n, 1.0);
  gl_FragColor = vec4(uColor, n);
}
`;

export default function SteamLab() {
  const mountRef = useRef(null);
  const matRef = useRef(null);
  const [speed, setSpeed] = useState(4); // ×0.0001
  const [swirl, setSwirl] = useState(4);
  const [color, setColor] = useState('#d2958a');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let raf = null;
    let renderer;
    let geometry;
    let material;
    let io;
    let visible = true;

    (async () => {
      try {
        const THREE = await import('./threeLab');
        if (disposed || !mountRef.current) return;
        const mount = mountRef.current;
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const aspect = mount.clientWidth / mount.clientHeight;
        const camera = new THREE.OrthographicCamera(-1.4 * aspect, 1.4 * aspect, 1.4, -1.4, 0.1, 10);
        camera.position.z = 2;

        geometry = new THREE.PlaneGeometry(1.3, 2.6, 24, 64);
        material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          transparent: true,
          depthWrite: false,
          uniforms: {
            uTime: { value: 0 },
            uTimeFrequency: { value: 0.0004 },
            uUvFrequency: { value: new THREE.Vector2(4, 5) },
            uColor: { value: new THREE.Color('#d2958a') },
          },
        });
        matRef.current = material;
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -0.1; // base of the steam sits just above the mug
        scene.add(mesh);

        io = new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
          if (visible && !raf) tick();
        });
        io.observe(mount);

        const start = performance.now();
        const tick = () => {
          if (!visible || disposed) {
            raf = null;
            return;
          }
          material.uniforms.uTime.value = performance.now() - start;
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        tick();
      } catch (e) {
        if (!disposed) setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
      geometry?.dispose();
      material?.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
      matRef.current = null;
    };
  }, []);

  useEffect(() => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTimeFrequency.value = speed * 0.0001;
    m.uniforms.uUvFrequency.value.set(swirl, swirl * 1.25);
    m.uniforms.uColor.value.set(color);
  });

  return (
    <div className="ub-figure pf-steam">
      <div className="pf-steam-stage">
        <div className="pf-steam-canvas" ref={mountRef} />
        <svg className="pf-mug" viewBox="0 0 120 80" aria-hidden="true">
          <path d="M14 6 h76 v36 a30 30 0 0 1 -30 30 h-16 a30 30 0 0 1 -30 -30 z" fill="rgba(242,242,242,0.9)" />
          <path d="M90 16 h8 a14 14 0 0 1 0 28 h-10" fill="none" stroke="rgba(242,242,242,0.9)" strokeWidth="7" />
          <ellipse cx="52" cy="7" rx="38" ry="4" fill="rgba(110,70,50,0.9)" />
        </svg>
        {failed && <p className="pf-steam-failed">WebGL isn’t available here.</p>}
      </div>
      <div className="pf-steam-controls">
        <div className="ub-slider-row">
          <label htmlFor="pf-steam-speed">Rise speed</label>
          <input id="pf-steam-speed" type="range" min="1" max="12" step="0.5" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
          <output htmlFor="pf-steam-speed">{speed}</output>
        </div>
        <div className="ub-slider-row">
          <label htmlFor="pf-steam-swirl">Noise scale</label>
          <input id="pf-steam-swirl" type="range" min="1" max="10" step="0.5" value={swirl} onChange={(e) => setSwirl(Number(e.target.value))} />
          <output htmlFor="pf-steam-swirl">{swirl}</output>
        </div>
        <div className="ub-slider-row">
          <label htmlFor="pf-steam-color">Color</label>
          <input id="pf-steam-color" type="color" className="pf-swatch pf-swatch-lg" value={color} onChange={(e) => setColor(e.target.value)} />
          <output htmlFor="pf-steam-color">{color}</output>
        </div>
      </div>
    </div>
  );
}
