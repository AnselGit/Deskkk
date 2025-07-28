export function fadeIn(el, delay = 0) {
  if (!el) return;
  el.classList.remove('fade-out');
  el.classList.add('section'); // in case it's not set
  void el.offsetWidth; // trigger reflow
  setTimeout(() => {
    el.classList.add('section--visible');
  }, delay);
}

export function fadeOut(el, callback) {
  if (!el) return;
  el.classList.remove('section--visible');
  el.classList.add('fade-out');
  el.addEventListener('transitionend', () => {
    if (callback) callback();
  }, { once: true });
}
