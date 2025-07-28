export function fadeIn(el, delay = 0) {
  if (!el) return;

  el.classList.remove('fade-out');
  el.classList.add('section'); // Ensure base class is there
  el.classList.remove('section--visible'); // Reset first

  // Force reflow before applying visible state
  requestAnimationFrame(() => {
    setTimeout(() => {
      el.classList.add('section--visible');
    }, delay);
  });
}

export function fadeOut(el, callback) {
  if (!el) return;

  el.classList.remove('section--visible');
  el.classList.add('fade-out');

  el.addEventListener('transitionend', () => {
    if (callback) callback();
  }, { once: true });
}
