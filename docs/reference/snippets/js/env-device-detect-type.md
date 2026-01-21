# Savoir si le navigateur utilisé est ouvert sur une tablette/mobile/desktop


```js
const getDeviceType = () => {
  const ua = navigator.userAgent
  if (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1) {
    return 'tablet' // Spécifique aux nouvelles version de safari sur ipad
  }
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}
```

## Utilisation :

```js
// Vanilla JS
if (getDeviceType() === 'desktop') {
    // Do something
}
```
