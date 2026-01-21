# Événement au clic

## jQuery

```js
$(document).on('click', '#myButton', function () {
  alert("You clicked the button with and ID of 'myButton'")
})
```



## Javascript

```js
document.addEventListener('click', (event) => {
  if (event.target.matches('.search-section__input, .search-section__input *')) {
    console.log('ayaya')
  }
})
```

