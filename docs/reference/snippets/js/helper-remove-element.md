# Supprimer un élément du DOM

```js
const removeElement = (element) => {
  element && element.parentNode.removeChild(element)
}
```
