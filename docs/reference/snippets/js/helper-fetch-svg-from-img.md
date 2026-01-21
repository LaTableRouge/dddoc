# Replace IMG by SVG in DOM

```js
const elements = document.querySelectorAll('[data-inline-svg]')
if (elements.length) {
  elements.forEach((element) => {
    // récupère l'élèment img depuis le selecteur
    let imgElement = null
    if (element.nodeName === 'IMG') {
      imgElement = element
    } else {
      imgElement = element.querySelector('img')
    }

    if (imgElement) {
      // Fecth sur l'url de l'image
      fetch(imgElement.src)
        .then((response) => response.text())
        .then((data) => {
          // Insert du svg
          imgElement.insertAdjacentHTML('afterend', data)
          // Remove de l'image du DOM
          imgElement.parentNode.removeChild(imgElement)
        })
    }
  })
}
```
