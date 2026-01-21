# Convert hex String to rgb value Array

```js
export const hexToRgb = (hex) => {
    hex = hex.substring(1)
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return [r, g, b]
}
```
