# parallax-background-image
js parallax background-image

## Usage

```javascript
parallax(target, fromPosition, toPosition)
```

### target

target element(s)

could be:
- an element
- an array of elements
- a CSS selector

### fromPosition

position appear first

0 means top of the image, 1 means bottom of the image.

### toPosition
position appear last

## Example

```javascript
parallax('.target', 0.2, 0.4)
```

```javascript
var targets = document.querySelectorAll('.target')
parallax(targets, 1, 0.2)
```
