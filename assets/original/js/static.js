(function () {
  'use strict';
  var sections = ['home', 'about', 'behind-the-scenes', 'credits', 'contact'];
  function start() {
    var slider = document.querySelector('.rev_slider');
    if (!slider) return;
    var api = window.jQuery(slider);
    document.querySelectorAll('[data-actions]').forEach(function (layer) {
      layer.setAttribute('role', 'button');
      layer.setAttribute('tabindex', '0');
      if (layer.dataset.actions.includes('jumptoslide')) layer.setAttribute('aria-label', 'Next slide');
      layer.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          layer.click();
        }
      });
    });
    function labelNavigation() {
      slider.querySelectorAll('.tp-bullet').forEach(function (bullet, index) {
        bullet.setAttribute('role', 'button');
        bullet.setAttribute('tabindex', '0');
        bullet.setAttribute('aria-label', ['Home', 'About the film', 'Behind the scenes', 'Film information and team', 'Contact and press kit'][index]);
        bullet.setAttribute('aria-current', bullet.classList.contains('selected') ? 'true' : 'false');
        if (!bullet.dataset.keyboardReady) {
          bullet.dataset.keyboardReady = 'true';
          bullet.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); bullet.click(); }
          });
        }
      });
      // Inactive layers should not receive focus when navigating by keyboard.
      slider.querySelectorAll('li[data-index]').forEach(function (slide) {
        var active = slide.classList.contains('active-revslide');
        slide.querySelectorAll('[data-actions]').forEach(function (layer) {
          var visible = getComputedStyle(layer).visibility !== 'hidden';
          layer.tabIndex = active && visible ? 0 : -1;
        });
      });
    }
    function openHash() {
      if (slider.id !== 'rev_slider_10_1') return;
      var index = sections.indexOf(location.hash.slice(1));
      if (index >= 0) api.revshowslide(index + 1);
    }
    api.on('revolution.slide.onloaded', function () { labelNavigation(); openHash(); });
    api.on('revolution.slide.onafterswap revolution.slide.layeraction', labelNavigation);
    window.addEventListener('hashchange', openHash);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
