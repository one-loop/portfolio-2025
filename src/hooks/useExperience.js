import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Time from '../Experience/Utils/Time.js';
import Sizes from '../Experience/Utils/Sizes.js';
import Stats from '../Experience/Utils/Stats.js';
import Resources from '../Experience/Resources.js';
import Renderer from '../Experience/Renderer.js';
import Camera from '../Experience/Camera.js';
import World from '../Experience/World.js';
import Navigation from '../Experience/Navigation.js';
import assets from '../Experience/assets.js';

const useExperience = (targetRef) => {
    const experienceRef = useRef(null);

    useEffect(() => {
        if (!targetRef.current) return;

        const initExperience = () => {
            const experience = {
                time: new Time(),
                sizes: new Sizes(),
                config: {
                    pixelRatio: Math.min(Math.max(window.devicePixelRatio, 1), 2),
                    debug: window.innerWidth > 420 // Adjust based on your debug logic
                },
                stats: null,
                scene: new THREE.Scene(),
                camera: null,
                renderer: null,
                resources: new Resources(assets),
                world: new World(),
                navigation: new Navigation(),

                setCamera() {
                    this.camera = new Camera({ targetElement: targetRef.current });
                },

                setRenderer() {
                    this.renderer = new Renderer({ rendererInstance: this.rendererInstance });
                    targetRef.current.appendChild(this.renderer.instance.domElement);
                },

                setStats() {
                    if (this.config.debug) {
                        this.stats = new Stats(true);
                    }
                },

                update() {
                    if (this.stats) this.stats.update();
                    if (this.camera) this.camera.update();
                    if (this.renderer) this.renderer.update();
                    this.world.update();
                    this.navigation.update();
                    requestAnimationFrame(() => this.update());
                },

                resize() {
                    const boundings = targetRef.current.getBoundingClientRect();
                    this.config.width = boundings.width;
                    this.config.height = boundings.height || window.innerHeight;
                    this.config.smallestSide = Math.min(this.config.width, this.config.height);
                    this.config.largestSide = Math.max(this.config.width, this.config.height);
                    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

                    if (this.camera) this.camera.resize();
                    if (this.renderer) this.renderer.resize();
                    this.world.resize();
                },

                destroy() {
                    // Clean up resources, event listeners, etc.
                    if (this.stats) {
                        this.stats.dispose();
                        this.stats = null;
                    }
                    if (this.renderer) {
                        this.renderer.dispose();
                        this.renderer = null;
                    }
                    // Dispose other resources as needed
                }
            };

            experience.setCamera();
            experience.setRenderer();
            experience.setStats();

            window.addEventListener('resize', () => experience.resize());
            experience.update();

            experienceRef.current = experience;
        };

        initExperience();

        return () => {
            if (experienceRef.current) {
                experienceRef.current.destroy();
                window.removeEventListener('resize', () => experienceRef.current.resize());
            }
        };
    }, [targetRef]);

    return experienceRef;
};

export default useExperience;
