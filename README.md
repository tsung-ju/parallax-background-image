# parallax-background-image
A helper for creating pure CSS parallax background image effects.
It calculates and sets the css transform property automatically.
Works well on mobile devices!

Inspired by <http://keithclark.co.uk/articles/pure-css-parallax-websites/>

## Work in progress!
Currently CSS transform can only works on chromium-based browsers. A javascript-based fallback is used on other browsers.

# [Example](https://ray851107.github.io/parallax-background-image/demo.html)

# Basic usage

### Setup
Wrap all your site content inside a wrapper element with fixed position and 100% width/height.

Please note that NOT to directly use `<body>` as the wrapper because of its special behavior.

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
var parallax = new Parallax('#wrapper')
```

### Apply parallax effect
```javascript
/* Slows down their background image (to 90% of the scroll speed). */
parallax.add('.your-selector', { velocityScale: 0.9 })

/* Speeds up their background image (to 120% of the scroll speed). */
parallax.add('.another-selector', { velocityScale: 1.2 })

/* use custom background image */
parallax.add('.custom-background-image', { backgroundImage: 'http://domain/xxx.jpg' })
```
For complete example see `demo.html`

# Dependencies
* [MobX.js](https://mobx.js.org/)
```html
<script src="https://unpkg.com/mobx@3.0.2/lib/mobx.umd.min.js"></script>
```
# API

## Class: Parallax

### `new Parallax(viewport[, useFallback , perspective])`

* `viewport` HTMLElement - The 3D viewport
* `useFallback` boolean - Whether to use the js-based fallback or not. Default `true` on non-chromium browsers.
* `perspective` Number - Default `1000`
  * In most cases, you won't need to change it. But if you need to make backgrounds move much faster than the scrolling speed, bigger value will (probably) improve accuracy.

### Instance Methods

#### `parallax.add(elements[, options])`
* `elements` - Parent element of background image; can be:
  * A CSS selector
  * A HTMLElement
  * A NodeList
  * An Array of HTMLElements
* `options` Object (optional) 
  * `velocityScale` Number (optional) - `velocity of the background = velocity of the element * velocityScale`. Must be positive. Default `0.8`
  * `backgroundImage` string (optional) - url to the background image
  * `createBackground` CreateBackground (optional) - Default `Parallax.coverElement(Parallax.pseudoBefore)`

### Static Properties

#### `Parallax.insertImage`
An instance of `CreateBackground`, prepend an `<img>` background to the element

#### `Parallax.pseudoBefore`
An instance of `CreateBackground`, use CSS `::before` to set background image 

### Static Methods

#### `Parallax.coverElement(createBackground)`
* `createBackground` CreateBackground

Returns `CreateBackground`

Scales the background to the minimum required size for it to always cover the element

## Type: CreateBackground
