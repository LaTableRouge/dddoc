# Remplace les images 404 par un placeholder

```js
const assetDirectory = './assets'

export const pictureErrorHandler = () => {
  const imgs = document.querySelectorAll('img')
  if (imgs.length) {
    imgs.forEach((img) => {
      img.addEventListener('error', (e) => {
        e.target.src = `${assetDirectory}/img/placeholder.jpg`
      })
    })
  }
}

pictureErrorHandler()
```
