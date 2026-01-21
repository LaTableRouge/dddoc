# Match les commentaires html5

## Language d'éxecution -> JS
```js
const paragraph = '<!-- AYAYA -->';
const regex = /<!--(.*?)-->|\s\B/gm;
const found = paragraph.match(regex);
```
