/* Respect the system motion preference before the original slider initializes. */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.rev_slider > ul > li').forEach(function (slide) {
    slide.dataset.masterspeed = '1';
    slide.dataset.transition = 'fade';
  });
  document.querySelectorAll('[data-frames]').forEach(function (layer) {
    try {
      var frames = JSON.parse(layer.dataset.frames);
      frames.forEach(function (frame) {
        frame.speed = 1;
        if (frame.delay !== 'wait') frame.delay = 0;
        if (frame.frame === '0') {
          frame.from = 'opacity:0;';
          delete frame.mask;
        }
      });
      layer.dataset.frames = JSON.stringify(frames);
    } catch (_) { /* Preserve any non-JSON legacy layer unchanged. */ }
  });
});
