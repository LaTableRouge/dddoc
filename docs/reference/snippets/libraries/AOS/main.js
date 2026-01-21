// Animate on scroll
// https://github.com/michalsnik/aos
if (window.AOS) {
  // Init AOS
  AOS.init({
    once: true,
    animatedClassName: 'is-inview' // class applied on animation
  })

  // Custom events
  document.addEventListener('aos:in:my-event', ({ detail }) => {
    const element = detail
    if (element) {
      console.log(element)
    }
  })
  document.addEventListener('aos:out:my-event', ({ detail }) => { })
}
