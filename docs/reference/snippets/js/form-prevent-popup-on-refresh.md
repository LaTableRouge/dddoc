# Enlève la popup de resubmit après le submit d'un formulaire

```js
export const historyReplace = () => {
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href)
  }
}
```
