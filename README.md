# parallax-background-image

simple, responsive parallax scrolling effect.

## Features

- works on mobile devices
- automatically switch to [pure CSS parallax effect](https://keithclark.co.uk/articles/pure-css-parallax-websites/) if supported by the browser
- zero dependencies
- simple WebComponents-based api

## Demo

<https://tsung-ju.github.io/parallax-background-image/demo.html>

## Installation

```sh
npm install parallax-background-image
```

```js
import "parallax-background-image";
```

Or use a CDN:

<!-- begin-script-tag -->

```html
<script
  src="https://cdn.jsdelivr.net/npm/parallax-background-image@3.0.1/dist/parallax-background-image.js"
  integrity="sha384-2nB7ycUhmoVoyozfrMVHcyNV/ReqhksKj0tUyqjZd5zfZGYs3Bmv2WgpPVqIjWSp"
  crossorigin="anonymous"
></script>
```

<!-- end-script-tag -->

## Basic usage

```html
<head>
  <style>
    #wrapper {
      position: fixed;
      height: 100%;
      width: 100%;
    }
  </style>
</head>

<body>
  <parallax-viewport id="wrapper">
    <parallax-element image-src="my-background-image1.jpg">
      ... contents
    </parallax-element>
    <div>
      <parallax-element image-src="my-background-image2.jpg">
        nesting is also supported
      </parallax-element>
    </div>
  </parallax-viewport>
</body>
```

For complete example see `demo.html`

## API

### `<parallax-viewport>`

A scrollable container block. Used to measure the scrolling position of each `<parallax-element>` and (when backend=3d) set parameters for perspective transform. Each `<parallax-element>` must be contained (directly or indirectly) in an `<parallax-viewport>` for this library to work.

#### Attributes

- `backend`: Selects the method used to apply the parallax effect.
  - Supported values: `2d`, `3d`
  - Defaults to `3d` if the browser is Blink-based, `2d` otherwise.

### `<parallax-element>`

Element with parallax scrolling effect.

#### Attributes

- `image-src`: URL to the background image.
  - Required.
- `velocity-x` `velocity-y`: Controls how fast the background scrolls.
  - `velocity=1` means scrolling at the same speed as the parent (no parallaxing).
  - `velocity=0` means the background does not move at all (fixed background).
  - Accepts floating point numbers.
  - `velocity-x` defaults to `1`, `velocity-y` defaults to `0.8`.
- `align-x` `align-y`: Aligns the background to the container.
  - Accepts `center`, `left`, `right`, `top`, `bottom` and percentage strings (e.g. `80%`).
  - `align-x`, `align-y` both defaults to `center`.
