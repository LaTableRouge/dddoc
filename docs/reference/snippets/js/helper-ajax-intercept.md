# Ajax intercept fetch requests

```js
window.fetchIntercept = {}

window.fetchIntercept.ajaxStart = (args) => {
  console.log('do something when an ajax fetch request start')
}
window.fetchIntercept.ajaxStop = (args) => {
  console.log('do something when an ajax fetch request end')
}
window.fetchIntercept.ajaxError = (args) => {
  console.log('do something when an ajax fetch request fail')
}

const { fetch: originalFetch } = window
window.fetch = async (...args) => {
  const [resource, config] = args

  // catch when ajax start
  window.fetchIntercept.ajaxStart(args)

  const response = await originalFetch(resource, config)

  // catch when ajax send a response
  window.fetchIntercept.ajaxStop(args)

  // catch when ajax return an error
  if (!response.ok && response.status === 404) {
    window.fetchIntercept.ajaxError(args)

    return Promise.reject(response)
  }

  return response
}
```
