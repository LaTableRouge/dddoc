# Intersection observer basic

## Exemples & doc

- https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API
- https://codepen.io/michellebarker/pen/xxwLpRG

```js
const intersectionValue = 40

// options pour l'intersection observer
const options = {
  root: null,
  rootMargin: `0px -${Number(intersectionValue)}px 0px -${Number(intersectionValue)}px`,
  threshold: 0
}

const observerEnter = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    const { target, isIntersecting, intersectionRatio } = entry
    // action durant l'intersection
    if (isIntersecting && intersectionRatio > options.threshold) {
      console.log(target)
      console.log('intersecting')
    } else {
      console.log(target)
      console.log('not intersecting')
    }
  })
}, options)

// bind de l'intersection Observer aux numéros
const elements = document.querySelectorAll('.elements')
if (elements.length) {
  elements.forEach((element) => {
    observerEnter.observe(element)
  })
}
```
