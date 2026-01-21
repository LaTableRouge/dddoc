# Draw pattern manually on a canvas


```js
const context = canvas.getContext('2d')
const img = new Image()
img.onload = function () {
  fillPattern(this, 64, 64)
  change.onchange = change.oninput = function () {
    fillPattern(img, this.value, this.value)
  }
}
img.src = 'https://via.placeholder.com/64x64'

// Fills canvas with image as pattern at size w,h
function fillPattern(img, layerWidth, layerHeight) {
  // draw once
  context.drawImage(img, 0, 0, layerWidth, layerHeight)

  while (layerWidth < canvas.width) {
    context.drawImage(canvas, layerWidth, 0)
    layerWidth <<= 1 // shift left 1 = *2 but slightly faster
  }
  while (layerHeight < canvas.height) {
    context.drawImage(canvas, 0, layerHeight)
    layerHeight <<= 1
  }
}
```

```html
<input id=change type=range min=8 max=120 value=64><br>
<canvas id=canvas width=500 height=400></canvas>
```
