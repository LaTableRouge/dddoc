# Get constrast color based on hex/rgb string

```js
export const getContrast = (color) => {
    let r
    let g
    let b

    // If a leading # is provided, remove it
    if (color.slice(0, 1) === '#') {
        color = color.slice(1)
    }

    if (/^[0-9a-fA-F]+$/.test(color)) {
        // Color in hex format
        r = parseInt(color.substr(0, 2), 16)
        g = parseInt(color.substr(2, 2), 16)
        b = parseInt(color.substr(4, 2), 16)
    } else if (color.includes('rgb')) {
        // Color in rgb/rgba format
        const colorMap = color.match(/\d+/g).map(Number)
        r = colorMap[0]
        g = colorMap[1]
        b = colorMap[2]
    }

    // Get YIQ ratio
    const yiq = (r * 299 + g * 587 + b * 114) / 1000

    // Check contrast
    return yiq >= 128 ? 'black' : 'white'
}
```
