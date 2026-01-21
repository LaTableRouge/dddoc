# Calculer la taille de la scrollbar

Permet lors de l'ouverture d'une modal de mettre la taille de la scrollbar en padding-right sur le body, pour ne pas que l'écran glitch à l'ouverture de la modal


```js
function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll' // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar' // needed for WinJS apps
  document.body.appendChild(outer)

  // Creating inner element and placing it in the container
  const inner = document.createElement('div')
  outer.appendChild(inner)

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer)

  return scrollbarWidth
}
```

## Utilisation :

```js
// Vanilla JS
document.body.style.paddingRight = getScrollbarWidth() + 'px'

// jQuery
jQuery('body').css('padding-right', getScrollbarWidth() + 'px');
```
