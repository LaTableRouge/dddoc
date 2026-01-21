if (window.lottie) {
  // Documentation complête pour le web : https://airbnb.io/lottie/#/web

  const animationContainer = document.getElementById('lottie-test')
  if (animationContainer) {
    const animation = lottie.loadAnimation({
      container: animationContainer, // Element qui vas accueilir l'animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: './assets/json/animations/cart-hover.json', // path vers le json d'animation (peut être une URL)
    })

    // Callback events pour l'animation
    // Liste complête ici : https://lottiefiles.github.io/lottie-player/events.html
    animation.addEventListener('complete', (e) => {
      console.log('animation complete');
    })

    animationContainer.addEventListener('mouseenter', (e) => {
      // Start animation
      animation.play()

      // Liste complete des usages ici : https://airbnb.io/lottie/#/web?id=usage-1
    })
  }
}

