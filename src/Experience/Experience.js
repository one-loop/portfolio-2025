import * as THREE from 'three'
import { Pane } from 'tweakpane'

import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'
import Stats from './Utils/Stats.js'

import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'
import Navigation from './Navigation.js'

import assets from './assets.js'

export default class Experience {
    static instance;

    constructor(_options = {}) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;

        this.targetElement = _options.targetElement;

        if (!this.targetElement) {
            console.error('Target element not found');
            return;
        }

        this._isRunning = false;
        this._rafId = null;

        this.time = new Time()
        this.sizes = new Sizes()
        this.setConfig()
        this.setScene()
        this.setCamera()
        this.setRenderer()
        // this.setStats()
        // this.setDebug()
        this.setResources()
        this.setWorld()
        this.setNavigation()
        
        this.sizes.on('resize', () => {
            this.resize()
        })

        this._onScroll = this.onScroll.bind(this); // Bind scroll handler

        this.update()
    }

    setConfig()
    {
        this.config = {}
    
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height || window.innerHeight
        this.config.smallestSide = Math.min(this.config.width, this.config.height)
        this.config.largestSide = Math.max(this.config.width, this.config.height)
        
        this.config.debug = this.config.width > 420
    }

    setStats()
    {
        if(this.config.debug)
        {
            this.stats = new Stats(false)
        }
    }

    setDebug()
    {
        
        if(this.config.debug)
        {
            this.debug = new Pane()
            this.debug.containerElem_.style.width = '320px'
        }
    }
    
    setScene()
    {
        this.scene = new THREE.Scene()
    }

    setCamera()
    {
        this.camera = new Camera()
    }

    setRaycaster() {
        // Initialize raycaster and mouse events for the canvas
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        // ...attach any event listeners needed on the canvas (e.g., mousemove)...
        this.targetElement.addEventListener('mousemove', (event) => {
            // update this.mouse based on event coordinates
        });
    }

    setRenderer()
    {
        this.renderer = new Renderer({ rendererInstance: this.rendererInstance });
        this.targetElement.appendChild(this.renderer.instance.domElement);
    }

    setResources()
    {
        this.resources = new Resources(assets);
        
        this.resources.on('progress', (progress) => {
            // console.log(`Loading progress: ${progress}%`);
        });
    }

    setWorld()
    {
        this.world = new World()
    }

    setNavigation()
    {
        this.navigation = new Navigation()
    }

    addScrollEvents() {
        window.addEventListener('scroll', this._onScroll);
    }

    removeScrollEvents() {
        window.removeEventListener('scroll', this._onScroll);
    }

    onScroll(event) {
        // Prevent scroll changes from affecting the model camera.
        // For example, ignore scroll values or clamp camera parameters.
        // If your camera uses window.scrollY, simply do nothing here.
        // Alternatively, update camera only if the canvas is visible:
        if (!this.isVisible) return;
        // ...update camera zoom or other properties if needed...
    }

    detachCanvas() {
        if (this.renderer && this.renderer.instance && this.renderer.instance.domElement.parentNode) {
            this.renderer.instance.domElement.parentNode.removeChild(this.renderer.instance.domElement);
        }
    }

    pause() {
        this._isRunning = false;
        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
        if (this.time) {
            this.time.stop();
        }
        this.removeScrollEvents();
        // Hide the canvas so it doesn't block scrolling on other pages
        if (this.renderer && this.renderer.instance) {
            this.renderer.instance.domElement.style.display = 'none';
        }
        // Disable wheel (zoom) events from Navigation
        if(this.navigation && typeof this.navigation.disableNavigation === 'function') {
            this.navigation.disableNavigation();
        }
    }

    resume() {
        if (!this._isRunning) {
            // Re-show the canvas before resuming
            if (this.renderer && this.renderer.instance) {
                this.renderer.instance.domElement.style.display = 'block';
            }
            this._isRunning = true;
            if (this.time) {
                this.time.play();
            }
            this.addScrollEvents(); // Enable scroll events on resume
            // Re-enable wheel events
            if(this.navigation && typeof this.navigation.enableNavigation === 'function') {
                this.navigation.enableNavigation();
            }
            this.update();
        }
    }

    update() {
        if (!this._isRunning && this._rafId) return;

        if (this.stats) this.stats.update();
        if (this.camera) this.camera.update();
        if (this.world) this.world.update();
        if (this.navigation) this.navigation.update();
        if (this.renderer) this.renderer.update();

        this._rafId = window.requestAnimationFrame(() => this.update());
    }

    resize()
    {
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height
        this.config.smallestSide = Math.min(this.config.width, this.config.height)
        this.config.largestSide = Math.max(this.config.width, this.config.height)

        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        if(this.camera)
            this.camera.resize()

        if(this.renderer)
            this.renderer.resize()

        if(this.world)
            this.world.resize()
    }

    destroy() {
        this.pause();

        if (this.scene) {
            this.scene.traverse((child) => {
                if (child.geometry) {
                    child.geometry.dispose();
                }
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => material.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
        }

        if (this.renderer && this.renderer.instance) {
            this.renderer.instance.dispose();
            this.renderer.instance.domElement.remove();
        }

        if (this.time) this.time.stop();
        if (this.sizes) this.sizes.off('resize');

        Experience.instance = null;
    }

    setCanvas(canvas) {
        if (canvas === this.targetElement) return;
        
        this.targetElement = canvas;
        if (this.renderer && this.renderer.instance) {
            this.targetElement.appendChild(this.renderer.instance.domElement);
            // Reinitialize pointer events when the canvas is reattached:
            this.setRaycaster();
            this.resize();
        }
        // Update Navigation's targetElement so panning works on the new canvas
        if (this.navigation && typeof this.navigation.updateTarget === 'function') {
            this.navigation.updateTarget(this.targetElement);
        }
    }
}
