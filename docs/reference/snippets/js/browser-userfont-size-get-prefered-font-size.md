# Get user prefered font size

```js
export const getUserFontSizePreference = () => {
  const html = document.documentElement

  // Get html computed font-size
  const initialFontSize = window.getComputedStyle(html).getPropertyValue('font-size')

  // Remove the html font size
  html.style.fontSize = 'unset'

  // Create & append fake element
  const element = document.createElement('div')
  element.style.width = '1rem'
  element.style.display = 'none'
  document.body.append(element)

  // Get the size of the fake element
  const widthMatch = window.getComputedStyle(element).getPropertyValue('width').match(/\d+/)

  // Revert all changes
  html.style.fontSize = initialFontSize
  element.remove()

  if (!widthMatch || widthMatch.length < 1) {
    return null
  }

  const result = Number(widthMatch[0])
  return !isNaN(result) ? result : null
}
```
