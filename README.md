# parallax-background-image
A helper for creating pure CSS parallax background image effects. Works well on mobile devices!

Inspired by <http://keithclark.co.uk/articles/pure-css-parallax-websites/>

## Work in progress!

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

### Instance Methods

#### `parallax.add(elements[, options])`
* `elements` - Parent element of background image; can be:
  * A CSS selector
  * A HTMLElement
  * A NodeList
  * An Array of HTMLElements
* `options` Object (optional) 
  * `velocityScale` Number (optional) - `velocity of the background = velocity of the element * velocityScale`. Must be positive. Default `0.8`
  * `backgroundImage` ToBackgroundImage (optional) - Default `Parallax.getCSSBackgroundImage`
  * `createBackground` CreateBackground (optional) - Default `Parallax.coverElement(Parallax.pesudeBefore)`

### Static Properties

#### `Parallax.insertImage`
An instance of `CreateBackground`, prepend an `<img>` background to the element

#### `Parallax.pesudeBefore`
An instance of `CreateBackground`, use CSS `::before` to set background image 

#### `Parallax.getCSSBackgroundImage`
An instance of `ToBackgroundImage`, read background image from the computed style of the element

### Static Methods

#### `Parallax.coverElement(createBackground)`
* `createBackground` CreateBackground

Returns `CreateBackground`

Scales the background to the minimum required size for it to always cover the element

## Type: ToBackgroundImage = string | ((el: Element) => string)
* `string` url of the image

## Type: CreateBackground

