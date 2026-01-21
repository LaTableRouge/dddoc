# Ajoute une classe à l'élèment html si l'admin-bar WP existe

```js
export const adminBar = () => {
  const adminBar = document.querySelector('#wpadminbar')
  if (adminBar) {
    const adminBarAddClass = () => {
      if (!document.documentElement.classList.contains('admin-bar')) {
        document.documentElement.classList.add('has-admin-bar')
      }
    }

    // Gestion du resize
    let timeout = false
    const delay = 250
    window.addEventListener('resize', () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        adminBarAddClass()
      }, delay)
    })

    // Lance au chargement de la page
    adminBarAddClass()
  }
}

adminBar()
```
