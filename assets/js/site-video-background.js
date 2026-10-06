(function () {
  'use strict';

  var video = document.querySelector('.site-video-background__media');
  if (!video) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function playVideo() {
    if (!video.src) {
      video.src = video.getAttribute('data-src');
      video.load();
    }

    var playPromise = video.play();
    if (playPromise) playPromise.catch(function () {});
  }

  function updateMotionPreference() {
    if (reducedMotion.matches) {
      video.pause();
      video.removeAttribute('src');
      video.load();
      return;
    }

    playVideo();
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      video.pause();
    } else if (!reducedMotion.matches) {
      playVideo();
    }
  });

  updateMotionPreference();
  reducedMotion.addEventListener('change', updateMotionPreference);
})();
