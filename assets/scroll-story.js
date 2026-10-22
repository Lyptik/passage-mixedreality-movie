(function () {
  'use strict';
  const story = document.querySelector('.scroll-story');
  if (!story) return;
  const panels = [...story.querySelectorAll('.story-scene')];
  const dots = [...document.querySelectorAll('.story-dot')];
  const navigation = document.querySelector('.story-nav');
  const cue = document.querySelector('.story-cue');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sectionIds = panels.map(panel => panel.id);
  const distanceInViewports = 1.4;
  const scenes = [];
  let viewportHeight = 0;
  let segment = 0;
  let request = 0;
  let previousActive = -1;
  let reduced = motionPreference.matches;
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => { const x = clamp(value); return x * x * (3 - 2 * x); };

  function measure(event) {
    const oldUnit = reduced ? viewportHeight : segment;
    const oldPosition = oldUnit ? (window.scrollY - story.offsetTop) / oldUnit : 0;
    viewportHeight = window.innerHeight;
    segment = viewportHeight * distanceInViewports;
    document.documentElement.style.setProperty('--story-height', viewportHeight + 'px');
    story.style.height = (viewportHeight + segment * (panels.length - 1)) + 'px';
    document.body.classList.toggle('story-reduced', reduced);
    if (event?.type === 'resize' && oldUnit) {
      const newUnit = reduced ? viewportHeight : segment;
      window.scrollTo({ top: story.offsetTop + oldPosition * newUnit, behavior: 'instant' });
    }
    schedule();
  }

  // The original renderer still calculates the exact responsive coordinates and
  // typography. Its clock-driven layer animations are replaced by scroll progress.
  panels.forEach((panel, index) => {
    panel.style.zIndex = index + 1;
    const slider = panel.querySelector('.rev_slider');
    const slide = slider.querySelector('li');
    slide.dataset.masterspeed = '1';
    slide.dataset.transition = 'fade';
    const layers = [...slider.querySelectorAll('.tp-caption')].map(layer => {
      let frames = [];
      try { frames = JSON.parse(layer.dataset.frames || '[]'); } catch (_) {}
      const entrance = frames.find(frame => frame.frame === '0') || {};
      const exit = frames.find(frame => frame.frame === '999') || {};
      const hover = frames.filter(frame => frame.frame === 'hover');
      layer.dataset.frames = JSON.stringify([
        { delay: 0, speed: 1, frame: '0', from: 'opacity:1;', to: 'opacity:1;', ease: 'Linear.easeNone' },
        { delay: 'wait', speed: 1, frame: '999', to: 'opacity:1;', ease: 'Linear.easeNone' },
        ...hover
      ]);
      let actions = [];
      try { actions = JSON.parse(layer.dataset.actions || '[]'); } catch (_) {}
      if (actions.some(action => action.action === 'jumptoslide')) {
        layer.removeAttribute('data-actions');
        layer.setAttribute('role', 'button');
        layer.setAttribute('tabindex', '0');
        layer.setAttribute('aria-label', 'Next section');
        layer.addEventListener('click', () => goTo(index + 1, true));
        keyboardClick(layer);
      } else if (actions.length) {
        layer.setAttribute('role', 'button');
        layer.setAttribute('tabindex', '0');
        keyboardClick(layer);
      }
      return { layer, from: entrance.from || '', to: exit.to || '', delay: Number(entrance.delay) || 0, wrapper: null };
    });
    const maximumDelay = Math.max(1, ...layers.map(item => item.delay));
    const scene = { panel, slider, layers, maximumDelay, ready: false, background: null };
    scenes.push(scene);
    const api = window.jQuery(slider);
    api.on('revolution.slide.onloaded', () => {
      api.revpause();
      scene.ready = true;
      layers.forEach(item => { item.wrapper = item.layer.closest('.tp-loop-wrap'); });
      scene.background = slider.querySelector('.slotholder');
      schedule();
    });
    api.on('revolution.slide.afterdraw', schedule);
    api.show().revolution({
      sliderType: 'standard', sliderLayout: 'fullscreen',
      jsFileLocation: 'assets/original/js/', delay: 999999999,
      navigation: { keyboardNavigation: 'off', mouseScrollNavigation: 'off', onHoverStop: 'off', touch: { touchenabled: 'off' } },
      responsiveLevels: [1240, 1024, 778, 480], visibilityLevels: [1240, 1024, 778, 480],
      gridwidth: [1300, 1100, 778, 480], gridheight: [1100, 768, 960, 720],
      lazyType: 'none', shadow: 0, spinner: 'off', stopLoop: 'on', stopAfterLoops: 0, stopAtSlide: 1,
      shuffle: 'off', autoHeight: 'off', fullScreenAutoWidth: 'off', fullScreenAlignForce: 'off',
      fullScreenOffsetContainer: '', fullScreenOffset: '', disableProgressBar: 'on',
      hideSliderAtLimit: 0, hideCaptionAtLimit: 0, hideAllCaptionAtLilmit: 0,
      fallbacks: { simplifyAll: 'off', nextSlideOnWindowFocus: 'off', disableFocusListener: true }
    });
  });

  function keyboardClick(element) {
    element.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); element.click(); }
    });
  }

  function vector(definition, element) {
    // Adapt the original entrance/exit directions to restrained scroll distances.
    // Numeric and percentage motions remain relative to the original layer size.
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const maximumX = Math.min(window.innerWidth * .25, 260);
    const maximumY = Math.min(viewportHeight * .2, 160);
    function axis(name, size, maximum) {
      const match = definition.match(new RegExp('(?:^|;)' + name + ':([^;]+)'));
      if (!match) return 0;
      const value = match[1].replace(/[\[\]]/g, '');
      if (value === 'left' || value === 'top') return -maximum;
      if (value === 'right' || value === 'bottom') return maximum;
      const numeric = parseFloat(value);
      if (!Number.isFinite(numeric)) return 0;
      return Math.max(-maximum, Math.min(maximum, value.includes('%') ? numeric * size / 100 : numeric));
    }
    return { x: axis('x', width, maximumX), y: axis('y', height, maximumY) };
  }

  function schedule() {
    if (!request) request = requestAnimationFrame(render);
  }

  function pauseScene(scene) {
    if (!scene) return;
    scene.panel.querySelectorAll('iframe').forEach(iframe => {
      if (iframe.src.startsWith('https://player.vimeo.com/')) {
        iframe.contentWindow?.postMessage({ method: 'pause' }, 'https://player.vimeo.com');
      }
    });
  }

  function render() {
    request = 0;
    const scrollUnit = reduced ? viewportHeight : segment;
    const position = Math.max(0, Math.min(panels.length - 1, (window.scrollY - story.offsetTop) / scrollUnit));
    const base = Math.min(panels.length - 1, Math.floor(position));
    const fraction = position - base;
    let active = Math.min(panels.length - 1, Math.round(position));
    if (reduced) {
      active = Math.max(0, Math.min(panels.length - 1, Math.round(window.scrollY / viewportHeight)));
    }
    story.dataset.progress = position.toFixed(4);
    scenes.forEach((scene, index) => {
      const visible = reduced || index === base || index === base + 1;
      scene.panel.style.opacity = reduced || index === base ? '1' : index === base + 1 ? ease((fraction - .1) / .8).toFixed(4) : '0';
      scene.panel.style.pointerEvents = index === active || reduced ? 'auto' : 'none';
      scene.panel.inert = !reduced && index !== active;
      scene.panel.setAttribute('aria-hidden', !reduced && index !== active ? 'true' : 'false');
      if (!scene.ready) return;
      scene.layers.forEach(item => {
        if (!item.wrapper) return;
        if (reduced) {
          item.wrapper.style.opacity = '1';
          item.wrapper.style.transform = 'none';
          item.wrapper.style.willChange = 'auto';
          return;
        }
        if (!visible) { item.wrapper.style.willChange = 'auto'; return; }
        const stagger = item.delay / scene.maximumDelay;
        const entrance = index === 0 ? 1 : ease((position - index + 1 - .1 - .18 * stagger) / .68);
        const exit = index === panels.length - 1 ? 0 : ease((position - index - .04) / .48);
        const from = vector(item.from, item.layer);
        const to = vector(item.to, item.layer);
        const x = from.x * (1 - entrance) + to.x * exit;
        const y = from.y * (1 - entrance) + to.y * exit;
        item.wrapper.style.opacity = (entrance * (1 - exit)).toFixed(4);
        item.wrapper.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`;
        item.wrapper.style.willChange = position % 1 > .01 && position % 1 < .99 ? 'transform, opacity' : 'auto';
      });
      if (scene.background) {
        const arrival = index === 0 ? 1 : ease(position - index + 1);
        scene.background.style.transform = reduced ? 'none' : `scale(${(1 + .025 * (1 - arrival)).toFixed(4)})`;
      }
    });
    navigation.style.setProperty('--nav-ink', active === 1 || active === 4 ? '#101010' : '#ffffff');
    dots.forEach((dot, index) => {
      dot.setAttribute('aria-current', index === active ? 'location' : 'false');
      dot.style.setProperty('--fill', (clamp(position - index + 1) * 100).toFixed(1) + '%');
    });
    cue.style.opacity = reduced ? '0' : (1 - clamp(position / .28)).toFixed(4);
    cue.style.pointerEvents = position < .28 && !reduced ? 'auto' : 'none';
    cue.inert = position >= .28 || reduced;
    if (active !== previousActive) {
      pauseScene(scenes[previousActive]);
      previousActive = active;
    }
  }

  function goTo(index, smooth) {
    index = Math.max(0, Math.min(panels.length - 1, index));
    const top = reduced ? panels[index].offsetTop : story.offsetTop + index * segment;
    window.scrollTo({ top, behavior: smooth && !reduced ? 'smooth' : 'instant' });
  }

  document.querySelectorAll('[data-scroll-to]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const index = Number(link.dataset.scrollTo);
      history.pushState(null, '', '#' + sectionIds[index]);
      goTo(index, true);
    });
  });
  function openHash() {
    const index = sectionIds.indexOf(location.hash.slice(1));
    if (index >= 0) goTo(index, false);
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('pageshow', schedule);
  window.addEventListener('hashchange', openHash);
  motionPreference.addEventListener('change', () => {
    const section = Math.max(0, previousActive);
    reduced = motionPreference.matches;
    measure();
    goTo(section, false);
  });
  measure();
  openHash();
})();
