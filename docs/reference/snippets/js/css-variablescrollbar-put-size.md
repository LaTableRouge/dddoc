# Mettre la taille de la scrollbar en variables css


```js
const putScrollbarSizeInCSSVariable = () => {
  let timeout = false
  const delay = 250

  window.addEventListener('resize', () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      document.documentElement.style.setProperty('--scrollbarsize', `${window.innerWidth - document.documentElement.clientWidth}px`)
    }, delay)
  })

  setTimeout(() => {
    document.documentElement.style.setProperty('--scrollbarsize', `${window.innerWidth - document.documentElement.clientWidth}px`)
  }, 0)
}
```
