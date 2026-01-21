# Close d'une popup au click du bouton close || click outside

```js
document.addEventListener('click', (event) => {
  if (
    event.target.matches('.button-close-popup') // button
    || !event.target.closest('.popup') // element inside popup
  ) {
    document.querySelector('.popup').style.display = 'none'
  }
})
```
