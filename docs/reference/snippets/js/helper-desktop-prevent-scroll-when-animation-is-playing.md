# DESKTOP ONLY - Empêche le scroll lors d'un animation
## exemple quand l'animation doit se lancer au top de la page

```js
// Fonction qui stop le scroll
const stopScroll = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

// Remise en haut au chargement de la page
window.scrollTo(0, 0)

// Stop le scroll au chargement de la page
window.addEventListener(event, stopScroll, { passive: false })

let timer
let animating = false
const animationDuration = 1000
window.addEventListener(event, (e) => {
  if (window.scrollY === 0) {
    if (e.deltaY > 0) {
      // Scroll vers le bas
      // Check si il n'y a pas d'animations en cours
      if (!animating) {
        // Check si l'animation n'a pas déjà ey lieu
        if (!document.documentElement.classList.contains('scrolled-down')) {
          // Ajout de la class d'animation
          document.documentElement.classList.add('scrolled-down')

          // Toggle du status d'animation
          animating = true

          clearTimeout(timer)
          timer = setTimeout(() => {
            // Toggle du status d'animation
            animating = false

            // Remove du scroll lock
            window.removeEventListener(event, stopScroll, { passive: false })
          }, animationDuration + 100)
        }
      }
    } else {
      // Scroll vers le haut
      // Check si il n'y a pas d'animations en cours
      if (!animating) {
        // Lock du scroll
        window.addEventListener(event, stopScroll, { passive: false })

        // Enlève la class d'animation
        document.documentElement.classList.remove('scrolled-down')

        // Toggle du status d'animation
        animating = true

        clearTimeout(timer)
        timer = setTimeout(() => {
          // Toggle du status d'animation
          animating = false
        }, animationDuration + 100)
      }
    }
  } else {
    window.removeEventListener(event, stopScroll, { passive: false })
  }
})
```
