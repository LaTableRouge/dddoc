# Mettre la position de la souris en variable css


```js
const putMousePositionInCSSVariable = () => {
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', Math.round((e.clientX / innerWidth) * 100))
    document.documentElement.style.setProperty('--mouse-y', Math.round((e.clientY / innerHeight) * 100))
  })
}
```
