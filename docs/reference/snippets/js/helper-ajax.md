# Ajax function template

```js
const request = (url, params = {}, method = 'GET', format = 'json') => {
  const options = {
    method
  }

  if (method === 'GET') {
    url += `?${new URLSearchParams(params)}`
  } else {
    let formData = params
    if (typeof params === 'object' && !(params instanceof FormData)) {
      formData = new FormData()
      for (const key in params) {
        formData.append(key, params[key])
      }
    }

    options.body = formData
  }

  return fetch(url, options).then((response) => (format === 'json' ? response.json() : response.text()))
}

export const get = (url, params, format) => request(url, params, 'GET', format)
export const post = (url, params, format) => request(url, params, 'POST', format)

// exemples d'utilisation
post(url, params, 'json')
  .then((response) => {
    console.log('response')
    // Do something if request pass
  })
  .catch((err) => {
    console.log(`${err} - Erreur ajax`)
    // Do something if request fail
  })
  .finally(() => {
    // Do something if request fail or pass
  })

const formData = new FormData()
formData.append('id', 1)
post(url, formData, 'text')
  .then((response) => {
    console.log('response')
    // Do something if request pass
  })
  .catch((err) => {
    console.log(`${err} - Erreur ajax`)
    // Do something if request fail
  })
  .finally(() => {
    // Do something if request fail or pass
  })

get(url, params, 'json')
  .then((response) => {
    console.log('response')
    // Do something if request pass
  })
  .catch((err) => {
    console.log(`${err} - Erreur ajax`)
    // Do something if request fail
  })
  .finally(() => {
    // Do something if request fail or pass
  })

get(url, params, 'text')
  .then((response) => {
    console.log('response')
    // Do something if request pass
  })
  .catch((err) => {
    console.log(`${err} - Erreur ajax`)
    // Do something if request fail
  })
  .finally(() => {
    // Do something if request fail or pass
  })
```
