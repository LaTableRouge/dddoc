// Fancybox 3
// Incomplete doc : https://web.archive.org/web/20210325170940/https://fancyapps.com/fancybox/3/docs/
if ($.fancybox) {
  $('[data-fancybox]').fancybox({
    toolbar: false,
    dragToClose: false,
    touch: false,
    afterShow: (instance, current) => { },
    beforeClose: (instance, current) => { }
  })

  // Open an existing element
  const $popupElement = $('.my-popup-element')
  if ($popupElement.length) {
    $.fancybox.open($popupElement)
  }

  // Open a dynamically created element
  $.fancybox.open(
    /*html*/`
    <div class="img-wrapper">
      <div class="img-wrapper__inner">
        <img src="https://via.placeholder.com/200x197" alt="">
      </div>
    </div>`,
    {
      toolbar: false,
      dragToClose: false,
      touch: false,
      afterShow: function (instance, current) { },
      beforeClose: function (instance, current) { }
    })

  // Close all instances
  const fancyboxesInstances = jQuery.fancybox.getInstance()
  fancyboxesInstances && fancyboxesInstances.close()
}

// Fancybox 4
// Incomplete doc : https://fancyapps.com/docs/ui/fancybox/
if (window.hasOwnProperty('Fancybox')) {
  Fancybox.bind('[data-fancybox]', {
    Toolbar: {
      display: ['close']
    },
    Image: {
      zoom: false
    },
    dragToClose: false,
    touch: false,
    on: {
      done: fancybox => { },
      shouldClose: () => { }
    }
  })

  // Open an existing element
  Fancybox.show(
    [
      {
        src: "#my-popup-element" // id only
      },
      {
        Toolbar: {
          display: ['close']
        },
        Image: {
          zoom: false
        },
        dragToClose: false,
        touch: false,
        on: {
          done: (event, fancybox, slide) => { },
          closing: (event, fancybox, slide) => { }
        }
      }
    ]
  )

  // Open a dynamically created element
  const fancybox = new Fancybox(
    [
      {
        src: /*html*/`
        <div class="img-wrapper">
          <div class="img-wrapper__inner">
            <img src="https://via.placeholder.com/200x197" alt="">
          </div>
        </div>`,
        type: 'html'
      }
    ],
    {
      Toolbar: {
        display: ['close']
      },
      Image: {
        zoom: false
      },
      dragToClose: false,
      hideScrollbar: false,
      touch: false,
      on: {
        done: (event, fancybox, slide) => { },
        closing: (event, fancybox, slide) => { }
      }
    }
  );

  // Close all instances
  const fancyboxesInstances = Fancybox.getInstance()
  fancyboxesInstances && fancyboxesInstances.close()
}
