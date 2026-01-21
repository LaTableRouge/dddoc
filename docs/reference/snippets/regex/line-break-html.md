# Remove les line-breaks de l'html

## Language d'éxecution -> JS
```js
return paragraph.replace(/(\r\n|\n|\r)/gm, '').replace(/> *</g, '><')
```
