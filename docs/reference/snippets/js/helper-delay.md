# Ajout d'un délais lors de l'éxecution de code

```js
export const delay = (n) => {
  n = n || 2000
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, n)
  })
}

document.addEventListener('click', async (event) => {
  // Wait 0.5s
  await delay(500)

  // DO Something
})
```
