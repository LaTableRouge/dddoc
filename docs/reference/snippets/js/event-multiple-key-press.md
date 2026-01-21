# Évenements - combinaison de touches

```js
document.addEventListener('keydown', (e) => {
  if (!e) e = event
  if (e.ctrlKey && e.code === 'KeyK') {
    e.preventDefault()

    // Open popup
  }
  if (e.code === 'Escape') {
    // Close popup
  }
})
```
