# Check si on est en local ou pas

```js
const localDomains = ['localhost', '127.0.0.1', '::1']

const islocal = () => {
  if (localDomains.includes(location.hostname)) {
    console.log('local')
  } else {
    console.log('production')
  }
}

islocal()
```
