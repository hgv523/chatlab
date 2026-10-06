(function () {
  'use strict';

  var gallery = document.querySelector('.chatlab-gallery');
  if (!gallery) return;

  if (window.jQuery && window.jQuery.fn.magnificPopup) {
    window.jQuery(gallery).magnificPopup({
      delegate: '.chatlab-moment__photo',
      type: 'image',
      gallery: { enabled: true, preload: [0, 1] },
      closeOnContentClick: false,
      midClick: true
    });
  }

  if (!('IntersectionObserver' in window)) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var photos = gallery.querySelectorAll('.chatlab-moment');
  var observer;

  function updateMotion() {
    if (observer) observer.disconnect();
    gallery.classList.remove('is-reveal-ready');
    if (reducedMotion.matches) return;

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

    photos.forEach(function (photo) {
      photo.classList.remove('is-visible');
      observer.observe(photo);
    });
    gallery.classList.add('is-reveal-ready');
  }

  updateMotion();
  reducedMotion.addEventListener('change', updateMotion);
})();
