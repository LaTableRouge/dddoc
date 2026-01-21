// Carousel
// Incomplete doc : https://fancyapps.com/carousel/
if (window.hasOwnProperty('Carousel')) {
  const myCarousel = new Carousel(
    document.querySelector('.carousel'),
    {
      Dots: false, // Remove dots
      Navigation: false, // Remove Navigation
      Navigation: { // Custom navigation
        prevTpl:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',
        nextTpl:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
        classNames: {
          container: "f-carousel__nav",
          button: "f-button",
          isNext: "is-next",
          isPrev: "is-prev",
        }
      },
      preload: 1, // Number of slides to preload (next and right)
      initialPage: 0, // Slide to show in first
      slidesPerPage: 1,
      friction: 0.92, // Speed on slide change
      center: true,
      infinite: true,
      dragFree: false, // Disable auto positionning of the carousel when dragging
      breakpoints: {
        "(min-width: 768px)": {
          enabled: false,
        },
      },
      classNames: {
        container: "f-carousel",
        viewport: "f-carousel__viewport",
        track: "f-carousel__track",
        slide: "f-carousel__slide",
        isLTR: "is-ltr",
        isRTL: "is-rtl",
        isHorizontal: "is-horizontal",
        isVertical: "is-vertical",
        inTransition: "in-transition",
        isSelected: "is-selected", // Classname toggled for slides inside current page
      },
      l10n: {
        NEXT: __('Suivant'),
        PREV: __('Précédent'),
        GOTO: __('Aller à la slide %d'),
      }
    }
  )

  // Events
  myCarousel.slideNext()

  myCarousel.slidePrev()
}

// In order to sync two carousels, making one Carousel as navigation for another
// See : https://fancyapps.com/carousel/plugins/sync/

// In order to enable autoplay and access commands
// See : https://fancyapps.com/carousel/plugins/autoplay/
