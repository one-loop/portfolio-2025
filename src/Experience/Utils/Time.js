import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter {
    constructor() {
        super();
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;
        this.playing = true;
        this._rafId = null;
    }

    play() {
        this.playing = true;
        this.start = Date.now() - this.elapsed;
        this.tick();
    }

    pause() {
        this.playing = false;
        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
    }

    stop() {
        this.pause();
        this.elapsed = 0;
    }

    tick() {
        if (!this.playing) return;

        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        if (this.delta > 60) this.delta = 60;

        this.trigger('tick');
        this._rafId = window.requestAnimationFrame(() => this.tick());
    }

    destroy() {
        this.stop();
        this.off('tick');
    }
}
