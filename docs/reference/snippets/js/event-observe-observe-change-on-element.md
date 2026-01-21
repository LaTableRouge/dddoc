# Observe les changements d'un élèment

```js
export function observeElement(element, property, callback, delay = 0) {
  const elementPrototype = Object.getPrototypeOf(element)
  // eslint-disable-next-line no-prototype-builtins
  if (elementPrototype.hasOwnProperty(property)) {
    const descriptor = Object.getOwnPropertyDescriptor(elementPrototype, property)
    Object.defineProperty(element, property, {
      get: function () {
        return descriptor.get.apply(this, arguments)
      },
      set: function () {
        const oldValue = this[property]
        descriptor.set.apply(this, arguments)
        const newValue = this[property]
        if (typeof callback === 'function') {
          setTimeout(callback.bind(this, oldValue, newValue), delay)
        }
        return newValue
      }
    })
  }
}

const quantityInput = document.getElementById('quantity')
if (quantityInput) {
  observeElement(quantityInput, 'value', function (oldValue, newValue) {
    console.log('ayaya')
  })
}
```
