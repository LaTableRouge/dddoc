# Conversion d'un nombre en valeur monétaire

```js
const locale = 'fr-FR'
const currency = 'EUR'

const convertCurrency = (number) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(number)
}

convertCurrency(452.58)
```
