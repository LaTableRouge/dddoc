# Récupérer une valeur CSS d'un élément 

```js
const getElementComputedStyle = (selector, styleToSelect, number = true) => {
  const element = document.querySelector(selector)
  if (element) {
    const elementCompStyles = window.getComputedStyle(element)
    let elementStyle = elementCompStyles.getPropertyValue(styleToSelect)
    if (number) {
      elementStyle = elementStyle.replace('px', '')
      elementStyle = Number(elementStyle)
    }
    return elementStyle
  }
}
```

```html
<div style="--custom_property: 20px;">ayaya</div>
```

```js
const divMarginleft = getElementComputedStyle('div[style]', '--custom_property')
// expected output -> 20
```

