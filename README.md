# parallax-background-image
A helper for creating pure CSS parallax background image effects. Works well on mobile devices!
Inspired by <http://keithclark.co.uk/articles/pure-css-parallax-websites/>
# Basic usage
```javascript
/*initial script*/
var parallax = new Parallax('#wrapper')

/*for background move slower than scroll*/
parallax.add('.your-selector', 0.9)

/*for background move slower than scroll*/
parallax.add('.your-selector', 1.2)
```
Please note that value > 1 makes background images move faster than scroll speed, and move slower when the value is < 1 .

# API

## Class: Parallax

### `new Parallax(viewport[, perspective])`

* `viewport` HTMLElement - The 3D viewport
* `perspective` Number - Default `1000`

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
* `velocityScale` Number - `velocity of the background = velocity of the element * velocityScale`. Must be in the range `(0, 1) ∪ (1, Infinity)`. Default is `0.8`
* `backgroundPosition` String - Position of the background (relative to the parent element) when the parent is at the center of the viewport; can be any valid CSS length. Default is `0px`
* `createBackground` Function - Default is `Parallax.before`
