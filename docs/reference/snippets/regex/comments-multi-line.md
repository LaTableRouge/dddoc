# Match les commentaires multi line

## Language d'éxecution -> JS
```js
const paragraph = `/*
 |--------------------------------------------------------------------------
 | Config
 |--------------------------------------------------------------------------
 |
 | Assets path
 | Destination path
 |
 */`;
const regex = /\/\*([\s\S]*?)\*\//g;
const found = paragraph.match(regex);
```
