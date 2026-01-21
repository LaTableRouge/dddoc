# Lance une fonction quand l'utilisateur à fini d'écrire

## jQuery

```js
// setup before functions
let typingTimer // timer identifier
const doneTypingInterval = 2000 // time in ms, 5 second for example
const $input = $('#myInput')

// on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer)
  typingTimer = setTimeout(doneTyping, doneTypingInterval)
})

// on keydown, clear the countdown
$input.on('keydown', function () {
  clearTimeout(typingTimer)
})

// user is "finished typing," do something
function doneTyping() {
  // do something
}
```



## Javascript

```js
// Setup interval variables
let typingTimer
const doneTypingInterval = 250

document.querySelector('input[type="text"]').addEventListener('input', () => {
  // interval on input
  clearTimeout(typingTimer)
  typingTimer = setTimeout(() => {
    console.log('ayaya')
  }, doneTypingInterval)
})
```
