# crsl

A tiny, dependency-free, customizable, extendable, and responsive vanilla JS carousel. No jQuery, no frameworks!

[![npm version](https://img.shields.io/npm/v/@samv749/crsl)](https://www.npmjs.com/package/@samv749/crsl)
[![license](https://img.shields.io/github/license/saurabhv749/crsl)](./LICENSE)
[![CI](https://github.com/saurabhv749/crsl/actions/workflows/publish.yml/badge.svg)](https://github.com/saurabhv749/crsl/actions)

**[Live Demo](https://saurabhv749.github.io/crsl/)**

---

## Features

- Zero dependencies
- Accessible (`aria-hidden`, labelled controls)
- ESM, CJS, and IIFE builds
- ~1 KB Minified + Gzipped

---

## Install

```bash
npm install @samv749/crsl
```

Or via CDN (no build step needed):

```html
<!-- github release -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/saurabhv749/crsl@main/dist/crsl.min.css">
<script src="https://cdn.jsdelivr.net/gh/saurabhv749/crsl@main/dist/crsl.iife.min.js"></script>

<!-- jsdelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@samv749/crsl/dist/crsl.min.css" />
<script src="https://cdn.jsdelivr.net/npm/@samv749/crsl/dist/crsl.iife.min.js"></script>

<!-- unpkg -->
<link rel="stylesheet" href="https://unpkg.com/@samv749/crsl/dist/crsl.min.css" />
<script src="https://unpkg.com/@samv749/crsl/dist/crsl.iife.min.js"></script> 
```

---

## Usage

### HTML structure

```html
<div class="crsl">
    <div class="crsl__items">
        <div class="crsl__item">Slide 1</div>
        <div class="crsl__item">Slide 2</div>
        <div class="crsl__item">Slide 3</div>
    </div>
    <!-- controls -->
    <div class="crsl__controls">
        <a class="crsl__prev" aria-role="navigation"></a>
        <a class="crsl__next" aria-role="navigation"></a>
    </div>
</div>
```

### With a bundler (Vite, Webpack, Rollup)

```js
import Crsl from '@samv749/crsl';
import '@samv749/crsl/dist/crsl.min.css';

new Crsl('#my-carousel');
```

### In Node.js / CommonJS

```js
const Crsl = require('@samv749/crsl');
```

### Via `<script>` tag (IIFE)

```html
<link rel="stylesheet" href="crsl.min.css" />
<script src="crsl.iife.min.js"></script>

<script>
  new Crsl('#my-carousel');
</script>
```

---

## Options

See the full on [API.md](./API.md).

```js
    new Crsl(".crsl", {
        enableDots: true, // creates dot controls at the bottom
        duration: 600, // transition duration(ms)
        autoPlay: true, 
        interval: 2300 // time to next slide(ms)
    });
```

---

## Styling

`crsl` ships layout-only CSS — no colors, no borders. Drop in your own skin on top:

```css
.crsl__prev{...}
.crsl__next{...}
.crsl__dots{...}
.crsl__dots{...}
.crsl__dot{...}
```

Override the transition duration via CSS variable:

```css
.crsl {
  --duration: 800ms;
  --crsl-ease: cubic-bezier(0.5, 1, 0.89, 1);
}
```

---

## Development

```bash
# Install dependencies
npm install

# Build dist/
npm run build

# Build everything + Generate API.md
npm run release
```

## Publishing

Releases are fully automated. Bump the version and push a tag:

```bash
npm version patch   # or minor / major
git push --follow-tags
```

The CI pipeline will:
1. Build `dist/`
2. Generate API docs
3. Publish to npm
4. Deploy demo + docs to GitHub Pages

---

## License

[MIT](./LICENSE)