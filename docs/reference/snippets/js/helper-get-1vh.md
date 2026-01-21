# Récupérer la valeur d'un vh (utile sur tablette)

```js
const vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)
```
