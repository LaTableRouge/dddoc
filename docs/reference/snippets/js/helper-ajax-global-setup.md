# Configuration globale de l'ajax

## jQuery

```js
$.ajaxSetup({
  headers: {
    'API-KEY': 'your api key'
  }
})

```



## Javascript

```js
const oldFetch = window.fetch
window.fetch = function () {
  if (!arguments[1]) {
    arguments[1] = {}
  }
  if (!arguments[1].headers) {
    arguments[1].headers = {}
  }
  arguments[1].headers['API-KEY'] = 'your api key'

  return oldFetch.apply(window, arguments)
}
```

