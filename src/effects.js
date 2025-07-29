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

// light or dark mode
let currentMode = 'light';

export function setDarkMode(renderer, isDark = true) {
  currentMode = isDark ? 'dark' : 'light';

  if (isDark) {
    renderer.setClearColor('#1a1a1a', 1); // Dark background
    // Optional: adjust lighting/fog here if needed
  } else {
    renderer.setClearColor('ghostwhite', 1); // Light mode
  }
}

export function toggleDarkMode(renderer) {
  setDarkMode(renderer, currentMode === 'light');
}
