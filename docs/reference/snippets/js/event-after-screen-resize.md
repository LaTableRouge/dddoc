# Lancer une fonction après un resize de la fenêtre

## jQuery 

```js
let rtime
let timeout = false
const delta = 300

jQuery(window).resize(function () {
  rtime = new Date()
  if (timeout === false) {
    timeout = true
    setTimeout(resizeend, delta)
  }
})

function resizeend() {
  if (new Date() - rtime < delta) {
    setTimeout(resizeend, delta)
  } else {
    timeout = false

    // Appeler votre fonction ici
    console.log('Resize end')
  }
}
```



## Javascript

```js
const myFunction = () => {
  console.log('ayaya')
}

// Gestion du resize avec délais
let timeout = false
const delay = 250
window.addEventListener('resize', () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    myFunction()
  }, delay)
})

// Lance au chargement de la page
myFunction()


// Gestion du resize avec requestAnimationFrame
window.addEventListener('resize', () => {
  if (timeout) {
    window.cancelAnimationFrame(timeout)
  }

  timeout = window.requestAnimationFrame(() => {
    myFunction()
  })
})
```
