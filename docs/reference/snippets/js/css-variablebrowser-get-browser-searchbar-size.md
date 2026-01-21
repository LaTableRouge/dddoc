# Récupère la taille de la searchbar sur les navigateurs mobiles

```scss
html{
    height: 100vh;
    @include media-breakpoint-up(lg) { // Your mobile breakpoint
        height: 100%;
    }
}
```


```js
const calculateSearchBarSize = () => {
  const addressBarSize = parseFloat(getComputedStyle(document.documentElement).height) - document.documentElement.clientHeight
  document.documentElement.style.setProperty('--adressBarSize', `${addressBarSize}px`)
}

export const getMobileAdminBarSize = () => {
  // Launch on load
  calculateSearchBarSize()

  // Launch on resize
  let timeout = false
  const delay = 250
  window.addEventListener('resize', () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      calculateSearchBarSize()
    }, delay)
  })
}
```
