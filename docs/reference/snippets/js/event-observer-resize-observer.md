# Intersection observer basic

## Exemples & doc

- https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API
- https://codepen.io/michellebarker/pen/xxwLpRG

```js
const editorWrapper = document.querySelector('.editor-styles-wrapper')
if (editorWrapper) {
    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            requestAnimationFrame(() => {
                // Do something here
            })
        }
    })
    resizeObserver.observe(editorWrapper)
}
```
