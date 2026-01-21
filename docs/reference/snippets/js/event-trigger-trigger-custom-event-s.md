# Trigger des events custom depuis un autre endroit du JS (autre fichier ou React)

## jQuery

```js
$(document).on('custom:myEvent', function () {
  console.log('Votre code')
})

$(document).trigger('custom:myEvent') // lance le console.log
```

## Javascript

```js
document.addEventListener('ayaya', (e) => {
  console.log('lance le custom event ayaya')
})

document.dispatchEvent(new Event('ayaya'))
```
