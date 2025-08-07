import { fadeOut } from './effects.js';
import { moveCameraTo } from '../three/utils/transitionCam.js';
import { toggleDarkMode } from './effects.js';
import { Camera } from 'three';
import initThree from '../three/threeBg.js';

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

    moveCameraForward( camera, -10, 1.5); 
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
