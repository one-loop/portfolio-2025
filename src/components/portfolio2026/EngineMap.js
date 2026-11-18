'use client';
import React, { useState } from 'react';

const NODES = {
  experience: {
    name: 'Experience',
    file: 'src/Experience/Experience.js',
    body: 'A singleton. Every other class calls new Experience() and gets the same instance back, so anything can reach the scene, camera or clock without passing references around. It owns the render loop and the pause, resume and setCanvas methods that make the room survive page changes.',
  },
  time: {
    name: 'Time',
    file: 'Utils/Time.js',
    body: 'A requestAnimationFrame clock that tracks elapsed time and the delta between frames. The delta is capped at 60 ms, so coming back to a background tab doesn’t make everything jump.',
  },
  sizes: {
    name: 'Sizes',
    file: 'Utils/Sizes.js',
    body: 'Watches the window and emits a resize event. The camera and renderer listen to it to update the aspect ratio and pixel ratio.',
  },
  resources: {
    name: 'Resources',
    file: 'Resources.js + Utils/Loader.js',
    body: 'Takes a list of assets (models, textures) and loads them in groups. It picks a loader by file extension: GLTF with Draco for the compressed models, an image loader for textures. It emits progress events, which the loading screen uses for its percentage.',
  },
  camera: {
    name: 'Camera',
    file: 'Camera.js',
    body: 'A 30° perspective camera. A narrow field of view flattens the perspective, which is a big part of why the room reads as a little diorama.',
  },
  renderer: {
    name: 'Renderer',
    file: 'Renderer.js',
    body: 'A WebGL renderer with a transparent background, so the page’s own gradient shows around the room. The pixel ratio is capped at 2 to keep phones from rendering at 3× for no visible gain.',
  },
  navigation: {
    name: 'Navigation',
    file: 'Navigation.js',
    body: 'Custom orbit controls built on a spherical coordinate. Drag and wheel input move a target value, and a smoothed value eases toward it every frame using the clock’s delta. The angles and zoom are clamped so you can’t spin behind a wall.',
  },
  world: {
    name: 'World',
    file: 'World.js',
    body: 'Waits for the asset group to finish loading, then builds everything in the room and calls each object’s update() once per frame.',
  },
  baked: {
    name: 'Baked',
    file: 'Baked.js',
    body: 'The room itself: one mesh with one shader that blends the day, night and neutral bakes and adds three colored lights from a light map. This is what the demo above is running.',
    parent: 'world',
  },
  screens: {
    name: 'Screens',
    file: 'Screen.js + BouncingLogo.js',
    body: 'The PC monitor, the laptop and the TV play looping videos through a VideoTexture on a MeshBasicMaterial, which ignores lighting so the screens look like they’re glowing.',
    parent: 'world',
  },
  leds: {
    name: 'Google Home LEDs',
    file: 'GoogleLeds.js',
    body: 'Four little meshes with an alpha-mask texture, each one pulsing on a sine wave that’s offset by its index, so they ripple instead of blinking together.',
    parent: 'world',
  },
  loupedeck: {
    name: 'Loupedeck buttons',
    file: 'LoupedeckButtons.js',
    body: 'The buttons on the desk controller, each with its own material so they can light up independently.',
    parent: 'world',
  },
  steam: {
    name: 'Coffee steam',
    file: 'CoffeeSteam.js',
    body: 'A transparent plane with a Perlin-noise shader. You can play with it below.',
    parent: 'world',
  },
  chair: {
    name: 'Chair',
    file: 'TopChair.js',
    body: 'The top half of the desk chair, swiveling back and forth on a slow sine wave. It reuses the baked material so it matches the rest of the room.',
    parent: 'world',
  },
};

const CORE = ['time', 'sizes', 'resources', 'camera', 'renderer', 'navigation', 'world'];
const WORLD = ['baked', 'screens', 'leds', 'loupedeck', 'steam', 'chair'];

export default function EngineMap() {
  const [sel, setSel] = useState('experience');
  const n = NODES[sel];

  const Node = ({ id, className = '' }) => (
    <button
      type="button"
      className={`pf-node ${className} ${sel === id ? 'is-on' : ''} ${NODES[id].parent ? 'is-world' : ''}`}
      onClick={() => setSel(id)}
      aria-pressed={sel === id}
    >
      {NODES[id].name}
    </button>
  );

  return (
    <div className="ub-figure pf-map">
      <div className="pf-map-tree">
        <div className="pf-map-root"><Node id="experience" className="is-root" /></div>
        <div className="pf-map-core">
          {CORE.map((id) => <Node key={id} id={id} />)}
        </div>
        <div className="pf-map-world">
          <span className="pf-map-world-label">World builds</span>
          {WORLD.map((id) => <Node key={id} id={id} />)}
        </div>
      </div>
      <div className="pf-map-detail" key={sel}>
        <p className="pf-map-file">{n.file}</p>
        <h3>{n.name}</h3>
        <p>{n.body}</p>
      </div>
    </div>
  );
}
