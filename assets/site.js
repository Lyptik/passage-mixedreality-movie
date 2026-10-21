(() => {
  'use strict';
  const dialog = document.querySelector('.video-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const frame = dialog.querySelector('.video-frame');
    const title = dialog.querySelector('#video-title');
    let trigger;
    document.querySelectorAll('[data-video]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        trigger = link;
        title.textContent = link.dataset.videoTitle;
        dialog.querySelector('.video-fallback a').href = link.href;
        const iframe = makePlayer(link.dataset.video, link.dataset.videoTitle);
        frame.replaceChildren(iframe);
        dialog.showModal();
      });
    });
    dialog.querySelector('.close-video').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      frame.replaceChildren();
      trigger?.focus({ preventScroll: true });
    });
  }
  document.querySelectorAll('[data-inline-video]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      link.parentElement.replaceChildren(makePlayer(link.dataset.inlineVideo, 'PASSAGE — The full film'));
    });
  });
  function makePlayer(id, title) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`;
    iframe.title = title;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    iframe.allowFullscreen = true;
    return iframe;
  }
})();
