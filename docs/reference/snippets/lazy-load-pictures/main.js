export const lazyLoadPictures = () => {
  // Intersection observer for active submenu
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          if (!!image && image.dataset.loaded === undefined) {
            image.src = image.dataset.src;
            image.dataset.loaded = true;
            observer.unobserve(image);
          }
          return;
        }
      });
    },
    {
      /* options */
    }
  );

  const imgs = document.querySelectorAll(`img[data-lazy="true"]`);
  if (imgs.length) {
    imgs.forEach(img => {
      observer.observe(img);
    })
  }
}
