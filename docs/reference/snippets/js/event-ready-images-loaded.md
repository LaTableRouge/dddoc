# Éxecute un script après que toutes les images de la page soient chargées

```js
Promise.all(
  Array.from(document.images)
    .filter((img) => !img.complete)
    .map(
      (img) =>
        new Promise((resolve) => {
          img.onload = img.onerror = resolve
        })
    )
).then(() => {
  console.log('Images are fully loaded')
})
```
