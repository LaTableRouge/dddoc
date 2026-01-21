# Mettre la valeur de scroll en variable css


```js
const putScrollValueInCSSVariable = () => {
  let timeout = false
  const delay = 250

  window.addEventListener('scroll', () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      document.documentElement.style.setProperty('--scroll', window.pageYOffset)
    }, delay)
  })

  setTimeout(() => {
    document.documentElement.style.setProperty('--scroll', window.pageYOffset)
  }, 0)
}
```
