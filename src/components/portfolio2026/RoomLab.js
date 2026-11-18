'use client';
import React, { useEffect, useRef, useState } from 'react';

const BASE = '/projects/portfolio-2026';

const DEFAULT_LIGHTS = {
  tv: { label: 'TV', color: '#ff115e', strength: 2, channel: 'red' },
  desk: { label: 'Desk lamp', color: '#ff6700', strength: 2, channel: 'green' },
  pc: { label: 'PC', color: '#0082ff', strength: 2, channel: 'blue' },
};

// Same piecewise curve the site used when lighting followed the visitor's clock.
const nightMixForHour = (hour) => {
  if (hour < 6) return 1;
  if (hour < 7) return 1 - (hour - 6);
  if (hour < 17.5) return 0;
  if (hour < 18.5) return hour - 17.5;
  return 1;
};

const formatHour = (hour) => {
  const h = Math.floor(hour) % 24;
  const m = Math.round((hour - Math.floor(hour)) * 60);
  const suffix = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
};

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
}
`;

// The site's baked fragment shader, with glsl-blend's "lighten" inlined
// and an extra uView switch for looking at the raw light map.
const fragmentShader = /* glsl */ `
uniform sampler2D uBakedDayTexture;
uniform sampler2D uBakedNightTexture;
uniform sampler2D uBakedNeutralTexture;
uniform sampler2D uLightMapTexture;
uniform float uNightMix;
uniform float uNeutralMix;
uniform vec3 uLightTvColor;
uniform float uLightTvStrength;
uniform vec3 uLightDeskColor;
uniform float uLightDeskStrength;
uniform vec3 uLightPcColor;
uniform float uLightPcStrength;
uniform float uView;
varying vec2 vUv;

vec3 lighten(vec3 base, vec3 blend, float opacity) {
  return max(base, blend) * opacity + base * (1.0 - opacity);
}

void main() {
  vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;
  if (uView > 0.5) {
    gl_FragColor = vec4(lightMapColor, 1.0);
    return;
  }
  vec3 day = texture2D(uBakedDayTexture, vUv).rgb;
  vec3 night = texture2D(uBakedNightTexture, vUv).rgb;
  vec3 neutral = texture2D(uBakedNeutralTexture, vUv).rgb;
  vec3 color = mix(mix(day, night, uNightMix), neutral, uNeutralMix);

  color = lighten(color, uLightTvColor, lightMapColor.r * uLightTvStrength);
  color = lighten(color, uLightPcColor, lightMapColor.b * uLightPcStrength);
  color = lighten(color, uLightDeskColor, lightMapColor.g * uLightDeskStrength);

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function RoomLab() {
  const mountRef = useRef(null);
  const materialRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [hour, setHour] = useState(21);
  const [lights, setLights] = useState(DEFAULT_LIGHTS);
  const [view, setView] = useState('final');

  // Build the scene once.
  useEffect(() => {
    let disposed = false;
    let raf = null;
    let renderer;
    let controls;
    let resizeObserver;
    let visibilityObserver;
    let visible = true;
    const disposables = [];

    (async () => {
      try {
        const THREE = await import('./threeLab');
        const { GLTFLoader, DRACOLoader, OrbitControls } = THREE;
        if (disposed || !mountRef.current) return;
        const mount = mountRef.current;
        const width = mount.clientWidth;
        const height = mount.clientHeight;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 150);
        const target = new THREE.Vector3(0, 2, 0);
        camera.position.setFromSpherical(new THREE.Spherical(25, Math.PI * 0.4, -Math.PI * 0.25)).add(target);
        camera.lookAt(target);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.target.copy(target);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enablePan = false;
        controls.enableZoom = false; // keep the page scrollable
        controls.minPolarAngle = 0.2;
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minAzimuthAngle = -Math.PI * 0.5;
        controls.maxAzimuthAngle = 0;
        // One finger scrolls the page on phones; two fingers rotate the room.
        controls.touches.ONE = null;
        controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
        renderer.domElement.style.touchAction = 'pan-y';

        const loadTexture = (name) =>
          new Promise((resolve, reject) => {
            new THREE.TextureLoader().load(`${BASE}/${name}.webp`, (t) => {
              t.flipY = false;
              disposables.push(t);
              resolve(t);
            }, undefined, reject);
          });

        const draco = new DRACOLoader();
        draco.setDecoderPath('/draco/');
        draco.setDecoderConfig({ type: 'js' });
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(draco);

        const [day, night, neutral, lightMap, gltf] = await Promise.all([
          loadTexture('bakedDay'),
          loadTexture('bakedNight'),
          loadTexture('bakedNeutral'),
          loadTexture('lightMap'),
          gltfLoader.loadAsync('/models/roomModel.glb'),
        ]);
        draco.dispose();
        if (disposed) return;

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uBakedDayTexture: { value: day },
            uBakedNightTexture: { value: night },
            uBakedNeutralTexture: { value: neutral },
            uLightMapTexture: { value: lightMap },
            uNightMix: { value: nightMixForHour(21) },
            uNeutralMix: { value: 0 },
            uLightTvColor: { value: new THREE.Color(DEFAULT_LIGHTS.tv.color) },
            uLightTvStrength: { value: DEFAULT_LIGHTS.tv.strength },
            uLightDeskColor: { value: new THREE.Color(DEFAULT_LIGHTS.desk.color) },
            uLightDeskStrength: { value: DEFAULT_LIGHTS.desk.strength },
            uLightPcColor: { value: new THREE.Color(DEFAULT_LIGHTS.pc.color) },
            uLightPcStrength: { value: DEFAULT_LIGHTS.pc.strength },
            uView: { value: 0 },
          },
        });
        materialRef.current = material;
        disposables.push(material);

        const room = gltf.scene.children[0];
        room.traverse((child) => {
          if (child.isMesh) {
            child.material = material;
            disposables.push(child.geometry);
          }
        });
        scene.add(room);

        resizeObserver = new ResizeObserver(() => {
          const w = mount.clientWidth;
          const h = mount.clientHeight;
          if (!w || !h) return;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        });
        resizeObserver.observe(mount);

        visibilityObserver = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !raf) tick();
        });
        visibilityObserver.observe(mount);

        const tick = () => {
          if (!visible || disposed) {
            raf = null;
            return;
          }
          controls.update();
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        tick();
        setStatus('ready');
      } catch (err) {
        if (!disposed) setStatus('error');
      }
    })();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      controls?.dispose();
      disposables.forEach((d) => d.dispose?.());
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
      materialRef.current = null;
    };
  }, []);

  // Push slider state into the shader.
  useEffect(() => {
    const m = materialRef.current;
    if (!m) return;
    m.uniforms.uNightMix.value = nightMixForHour(hour);
    m.uniforms.uLightTvColor.value.set(lights.tv.color);
    m.uniforms.uLightTvStrength.value = lights.tv.strength;
    m.uniforms.uLightDeskColor.value.set(lights.desk.color);
    m.uniforms.uLightDeskStrength.value = lights.desk.strength;
    m.uniforms.uLightPcColor.value.set(lights.pc.color);
    m.uniforms.uLightPcStrength.value = lights.pc.strength;
    m.uniforms.uView.value = view === 'lightmap' ? 1 : 0;
  }, [hour, lights, view, status]);

  const setLight = (key, patch) => setLights((l) => ({ ...l, [key]: { ...l[key], ...patch } }));
  const reset = () => {
    setHour(21);
    setLights(DEFAULT_LIGHTS);
    setView('final');
  };

  const nightMix = nightMixForHour(hour);

  return (
    <div className="ub-figure pf-lab">
      <div className="ub-figure-toolbar">
        <div className="ub-tabs" role="tablist" aria-label="What to show">
          <button type="button" role="tab" aria-selected={view === 'final'} className={`ub-tab ${view === 'final' ? 'is-on' : ''}`} onClick={() => setView('final')}>Final shader</button>
          <button type="button" role="tab" aria-selected={view === 'lightmap'} className={`ub-tab ${view === 'lightmap' ? 'is-on' : ''}`} onClick={() => setView('lightmap')}>Light map</button>
        </div>
        <button type="button" className="ub-button ub-button-ghost" onClick={reset}>Reset</button>
      </div>

      <div className="pf-lab-stage" ref={mountRef}>
        {status !== 'ready' && (
          <div className="pf-lab-overlay">
            {status === 'error' ? (
              <>
                <img src={`${BASE}/room-render.webp`} alt="A render of the 3D room" />
                <p>WebGL isn’t available here, so this is a still render instead.</p>
              </>
            ) : (
              <p>Loading the room…</p>
            )}
          </div>
        )}
        <span className="pf-lab-hint pf-hint-mouse">Drag to orbit</span>
        <span className="pf-lab-hint pf-hint-touch">Two fingers to orbit</span>
      </div>

      <div className="pf-lab-controls">
        <div className="pf-lab-row">
          <label htmlFor="pf-hour">Time of day</label>
          <input id="pf-hour" type="range" min="0" max="23.75" step="0.25" value={hour} onChange={(e) => setHour(Number(e.target.value))} />
          <output htmlFor="pf-hour">{formatHour(hour)}</output>
        </div>
        <p className="pf-lab-sub">uNightMix = {nightMix.toFixed(2)}</p>

        {Object.entries(lights).map(([key, l]) => (
          <div className="pf-lab-row" key={key}>
            <label htmlFor={`pf-${key}`}>
              <input
                type="color"
                value={l.color}
                onChange={(e) => setLight(key, { color: e.target.value })}
                aria-label={`${l.label} light color`}
                className="pf-swatch"
              />
              {l.label}
              <span className="pf-channel">{l.channel}</span>
            </label>
            <input id={`pf-${key}`} type="range" min="0" max="3" step="0.05" value={l.strength} onChange={(e) => setLight(key, { strength: Number(e.target.value) })} />
            <output htmlFor={`pf-${key}`}>{l.strength.toFixed(2)}</output>
          </div>
        ))}
      </div>
    </div>
  );
}
