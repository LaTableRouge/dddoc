# Draw image on a canvas

https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/drawImage

```js
const getImg = (url) => {
  const img = new Image()
  img.crossOrigin = '*'
  img.src = url

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = (err) => reject(err)
  })
}

const renderImages = async (context) => {
  const urlToYourPicture = 'https://via.placeholder.com/640x360'

  // For svg :
  // The dimensions of the svg has to be written as an attribute in the <svg> tag
  // const urlToYourPicture = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent({{your inline svg here}})

  const baseImg = await getImg(urlToYourPicture)
  context.drawImage(baseImg, 0, 0, 650, 650)
}
```

