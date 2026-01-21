# Traduire une string à partir d'un objet de traductions

```js
const variables = {}
variables.translations = {
  'je bénis la pluie en afrique': '',
  "j'aime le pain": 'I like bread',
  '##STRING## aime le pain': '##STRING## likes bread'
}

const __ = (key, stringToReplace) => {
  let string = ''
  if (variables.translations[key]) {
    string = variables.translations[key]
  } else {
    string = key
  }
  if (stringToReplace) {
    string = string.replace('##STRING##', stringToReplace)
  }
  return string
}

console.log(__('je bénis la pluie en afrique'))

console.log(__("j'aime le pain"))

const name = 'Quentin'
console.log(__('##STRING## aime le pain', name))
```
