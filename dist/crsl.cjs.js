/*! @samv749/crsl v1.0.3 | MIT */
'use strict';

/**
 * @class Crsl
 * @description A lightweight, customizable, extendable, responsive image slider in vanilla JS
 * @param {string} selector - CSS selector for the root carousel element.
 * @param {object} [options]
 * @param {boolean} [options.enableDots=false] - Whether to enable dot controls.
 * @param {number}  [options.duration=800] - Transition duration in ms.
 * @param {boolean} [options.autoplay=false] - Enable autoplay.
 * @param {number}  [options.interval=2000] - Autoplay interval in ms.
 */
class Crsl {
    constructor(selector, config) {
        this.selector = selector;
        this.state = {
            current: 0,
            active: null,
            dot: null,
            inTransition: false,
            enableDots: config?.enableDots || false,
            duration: config?.duration || 800,
            autoPlay: config?.autoPlay || false,
            interval: config?.interval || 2000
        };

        this.getElements();
        this.init();
        this.addEvents();
    }

    getElements() {
        this.root = document.querySelector(":root");
        this.container = document.querySelector(this.selector);
        this.slider = this.container.querySelector(".crsl__items");
        this.slides = this.slider.querySelectorAll(".crsl__item");
        this.controls = document.querySelector(".crsl__controls");
        this.prev = document.querySelector("a.crsl__prev");
        this.next = document.querySelector("a.crsl__next");
    }

    init() {
        this.controls && this.controls.classList.remove("hide");
        // activate first slide
        this.slides[0].classList.add("is_active");
        this.state.active = this.slides[0];

        // add dots
        if (this.state.enableDots) {
            this.addDots();
        }
    }

    pause() {
        if (this.state.autoPlay) {
            this.removeInterval();
        }
        this.state.inTransition = false;
    }

    addDots() {
        let dotsWrapper = document.createElement("div");
        dotsWrapper.setAttribute("class", "crsl__dots");

        let dotsContainer = document.createElement("div");
        dotsContainer.setAttribute("class", "crsl__dots__container");

        for (let i = 0; i < this.slides.length; i++) {
            const dot = document.createElement("a");
            dot.classList.add("crsl__dot");
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dotsContainer.appendChild(dot);
            dot.onclick = () => {
                this.pause();
                this.translate(i);
            };
        }
        dotsWrapper.appendChild(dotsContainer);
        this.container.appendChild(dotsWrapper);

        this.dots = dotsContainer.children;
        // activate first dot
        this.dots[0].classList.add("is_active");
        this.state.dot = this.dots[0];
    }

    // navigation
    translate(index) {
        if (this.state.inTransition) return;
        if (this.state.autoPlay) {
            this.removeInterval();
        }
        this.state.inTransition = true;

        Math.abs(index - this.state.current);
        this.state.current = index;

        const w = document.querySelector(".item").clientWidth;
        //update slide
        this.state.active.classList.remove("is_active");
        this.slides[index].classList.add("is_active");
        this.state.active = this.slides[index];
        // accessibility
        this.slides.forEach((s, i) => s.setAttribute('aria-hidden', i !== index));

        // update dots
        if (this.state.enableDots) {
            this.state.dot.classList.remove("is_active");
            this.dots[index].classList.add("is_active");
            this.state.dot = this.dots[index];
        }
        // translate
        this.slider.style.transform = `translateX(-${index * w}px)`;

        setTimeout(() => {
            this.state.inTransition = false;

            if (this.state.autoPlay) {
                this.addInterval();
            }
        }, this.state.duration);
    }

    setSlide(direction) {
        const temp_idx = this.state.current + direction;
        const idx_max = this.slides.length - 1;
        const idx = Math.max(0, Math.min(temp_idx, idx_max));

        this.translate(idx);
    }

    // events
    onResize = () => {
        const w = this.state.active.clientWidth;
        this.slider.style.transform = `translateX(-${this.state.current * w}px)`;
    };

    autoSlide() {
        const numSlides = this.slides.length;
        const idx = (this.state.current + 1) % numSlides;
        this.translate(idx);
    }

    addInterval() {
        this.intervalId = window.setTimeout(
            this.autoSlide.bind(this),
            this.state.interval
        );
    }

    removeInterval() {
        window.clearTimeout(this.intervalId);
    }

    addEvents() {
        // buttons
        if (this.controls) {
            this.prev.onclick = () => this.setSlide(-1);
            this.next.onclick = () => this.setSlide(1);
        }
        if (this.state.autoPlay) {
            this.addInterval();
        }
        window.onresize = this.onResize.bind(this);
    }
}

module.exports = Crsl;
