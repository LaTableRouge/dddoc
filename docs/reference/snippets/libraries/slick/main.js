if (window.jQuery) {
  const $ = jQuery.noConflict()

  const $slider = $('.slider-wrapper:not(.slick-initialized)')
  if ($slider.length) {
    // Always call this hook before slick is setup
    $slider.on('init', (event, slick) => {
      console.log('slick : init')
    })

    // Slick setup (full argument list in the doc)
    $slider.slick({
      dots: true,
      arrows: true,
      centerMode: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      centerPadding: '150px',
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    // Go to specific slide
    const goToKey = 2
    $slider.slick('slickGoTo', goToKey)

    // Go to next slide
    $slider.slick('slickNext')

    // Go to previous slide
    $slider.slick('slickPrev')

    // Add a slide
    $slider.slick('slickAdd', "<div></div>")

    // Get the current slide
    const currentSlide = $slider.slick('slickCurrentSlide')

    // Manually refresh positioning of slick
    $slider.slick('setPosition')

    // Deconstruct slick
    if ($slider.hasClass('slick-initialized')) {
      $slider.slick('unslick')
    }

    // Events
    $sliderWrapper.on('afterChange', (event, slick, currentSlide) => {
      console.log('slick : after change')
    })

    $sliderWrapper.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
      console.log('slick : after change')
    })

    $sliderWrapper.on('setPosition', (event, slick) => {
      console.log('slick : after change')
    })
  }
}
