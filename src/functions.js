import { fadeOut } from './effects.js';
import { moveCameraForward } from '../three/utils/transitionCam.js';
import { toggleDarkMode } from './effects.js';

// Accept these dependencies from main.js
export function NavHandlers({ appState, showSection, transitionToNext, renderer }) {
  function goPrev() {
    const currEl = document.querySelector('.section');
    if (!currEl) return;

    fadeOut(currEl, () => {
      currEl.remove();
      const prev = appState.prev();
      if (prev) showSection(prev);
    });

    moveCameraForward(-10, 1.5); // optional reverse movement
  }

  function goNext() {
    const currEl = document.querySelector('.section');
    if (!currEl) return;

    transitionToNext(currEl);
  }

  function goToggle() {
    toggleDarkMode(renderer);
  }

  return {
    goPrev,
    goNext,
    goToggle
  };
}
