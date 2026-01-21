# Match les saut de ligne

## Language d'éxecution -> JS
```js
const paragraph = `
# Match les saut de ligne

## Language d'éxecution -> JS

const paragraph = '<!-- AYAYA -->';
const regex = /\r?\n|\r/g;
const found = paragraph.match(regex);
`;

const regex = /\r?\n|\r/g;
const found = paragraph.match(regex);
```
