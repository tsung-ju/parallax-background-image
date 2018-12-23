## parallax-background-image
A helper for creating pure CSS parallax background image effects.

It calculates and sets the css transform property automatically.


Inspired by <http://keithclark.co.uk/articles/pure-css-parallax-websites/>

## Work in progress!
Currently CSS transform can only works on chromium-based browsers. A javascript-based fallback is used on other browsers.

# Demo
<https://ray851107.github.io/parallax-background-image/demo.html>

## Basic usage

### Setup
Wrap all your site content inside a wrapper element with fixed position and 100% width/height.

NOTE: Don't use `<body>` as the wrapper.

For example,
```html
<html>
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
    <div id="#wrapper">
      <!-- your content here -->
    </div>
  </body>
<html>
```

Then in your script,
```javascript
var viewport = parallax.createViewport('#wrapper')
```

### Apply parallax effect
```javascript
/* Slows down their background image (to 90% of the scroll speed). */
viewport.add('.your-selector', { velocity: 0.9 })

/* Speeds up their background image (to 120% of the scroll speed). */
viewport.add('.another-selector', { velocity: 1.2 })

/* align the background image to the left (Default: 'center') */
viewport.add('.hello-selector', { alignX: 'left' })

/* use custom background image */
viewport.add('.custom-background-image', { backgroundImage: 'http://domain/xxx.jpg' })
```
For complete example see `demo.html`

## Dependencies
* [@ray851107/dom-scheduler](https://github.com/ray851107/dom-scheduler)
```html
<script src="https://cdn.jsdelivr.net/gh/ray851107/dom-scheduler@v1.0.2/dom-scheduler.min.js"></script>
```

## API

### `parallax.createViewport(viewport[, options])`

#### Parameters
* `viewport` **HTMLElement** or **string** (CSS selector) - The 3D viewport
  * NOTE: Don't use `<body>` as the viewport.
* `options` Object - all fields are optional
  * `use3d` boolean - if `true`, use perspective transform, otherwise use the js-based fallback. Default `false` on non-chromium browsers.
  * ...default options for `parallax.add`

### Instance Methods

### `viewport.add(elements[, options])`
* `elements` - Parent element of background image; can be:
  * A CSS selector
  * A HTMLElement
  * A NodeList
  * An array of HTMLElements
* `options` **Object** - all fields are optional
  * `velocity` **Number** - ratio between velocity of the background image and the element. Must be positive. - Default `0.8`
  * `alignX` **string** - horizontal alignment for the background imange. accepts a percentage string (e.g. `'87%'`). Default `'center'`
    * shorthands: `'left'`: `'0%'`, `'right'`: `'100%'`, `'center'`: `'50%'`
  * `backgroundImage` **string** - url to the background image - Default read `background-image` from element style
  * `renderer` **RendererClass** - how to render the image - Default `parallax.ImageElementRenderer`
    * `parallax.ImageElementRenderer`  - prepend an `<img>` to the element.
    * `parallax.PseudoElementRenderer` - use CSS `::before`.
      * NOTE: It is not recommended to use this renderer, as it is much slower than `ImageElementRenderer`.

