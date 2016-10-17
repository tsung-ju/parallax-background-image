# parallax-background-image
A helper for creating pure CSS parallax background image effects. Works well on mobile devices!

Inspired by <http://keithclark.co.uk/articles/pure-css-parallax-websites/>

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
parallax.add('.your-selector', 0.9)

/* Speeds up their background image (to 120% of the scroll speed). */
parallax.add('.another-selector', 1.2)
```

# API

## Class: Parallax

### `new Parallax(viewport[, perspective])`

* `viewport` HTMLElement - The 3D viewport
* `perspective` Number - Default `1000`
  * In most cases, you won't need to change it. But if you need to make backgrounds move much faster than the scrolling speed, bigger value will (probably) improve accuracy.

### Static Properties

#### `Parallax.img`
A `Function` for passing to `parallax.add`

#### `Parallax.before`
A `Function` for passing to `parallax.add`

### Instance Methods

#### `parallax.add(elements[, velocityScale, backgroundPosition, createBackground])`
* `elements` - Parent element of background image; can be:
  * A CSS selector
  * A HTMLElement
  * A NodeList
  * An Array of HTMLElements
* `velocityScale` Number - `velocity of the background = velocity of the element * velocityScale`. Must be in the range `(0, 1) ∪ (1, Infinity)`. Default `0.8`
* `backgroundPosition` String - Position of the background (relative to the parent element) when the parent is at the center of the viewport; can be any valid CSS length. Default `0px`
* `createBackground` Function - Default `Parallax.before`
