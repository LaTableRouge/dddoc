# Récupérer tout les elements précédents ou suivants

```js
const prevAll = (element) => {
  const result = []
  while ((element = element.previousElementSibling)) result.push(element)
  return result
}

const nextAll = (element) => {
  const result = []
  while ((element = element.nextElementSibling)) result.push(element)
  return result
}
```
