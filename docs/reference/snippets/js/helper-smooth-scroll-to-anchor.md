# Scroll fluide vers une ancre

```js
$("a[href*='#']:not([href='#'])").click(function (e) {
  e.preventDefault()
  const hash = this.hash
  const section = $(hash)

  // Variable à renseigner :
  const $header = $('.page-header') // Le header
  const heightOffset = 50 // Offset pour créer un espace entre le header et l'ancre

  const $headerHeight = $header.outerHeight()

  if (hash) {
    $('html, body').animate(
      {
        scrollTop: section.offset().top - $headerHeight - heightOffset
      },
      1000,
      'swing',
      function () {
        history.replaceState({}, '', hash)
      }
    )
  }
})
```
