# Désactive le reload de la page en cours lors de la compilation js de Vite

```js
if (import.meta.hot) {
  import.meta.hot.on('vite:beforeFullReload', (e) => {
    if (e.type === 'full-reload') {
      // eslint-disable-next-line no-throw-literal
      throw '(skipping full reload for js change)'
    }
  })
}
```
