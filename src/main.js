import '../styles/hero.css';
import '../styles/navTray.css'

import initThree from '../three/threeBg.js';
import { moveCameraForward } from '../three/utils/transitionCam.js';
import { fadeIn, fadeOut } from './effects.js';
import { NavHandlers } from './functions.js'

import { loadNav } from './navTray.js'

import { loadHero } from '../ui/hero.js';
import { loadAuth } from '../ui/auth.js';
import { loadDesk } from '../ui/desk.js';
import { loadDrills } from '../ui/drills.js';
import { loadFlips } from '../ui/flips.js';

// Initialize 3D background
initThree();  

// Centralized app state manager
const appState = {
  currentIndex: 0,
  sections: ['hero', 'auth', 'desk', 'drills', 'flips'],

  getCurrent() {
    return this.sections[this.currentIndex];
  },

  next() {
    if (this.currentIndex < this.sections.length - 1) {
      this.currentIndex++;
      return this.getCurrent();
    }
    return null;
  }
};

// UI section loader
function showSection(name) {
  let el;

  switch (name) {
    case 'hero': el = loadHero(transitionToNext); break;
    case 'auth': el = loadAuth(transitionToNext); break;
    case 'desk': el = loadDesk(transitionToNext); break;
    case 'drills': el = loadDrills(transitionToNext); break;
    case 'flips': el = loadFlips(transitionToNext); break;
    default: return;
  }

  if (!(el instanceof HTMLElement)) {
    console.error(`[showSection] "${name}" did not return a valid DOM element`, el);
    return;
  }

  document.body.appendChild(el);
  fadeIn(el, 500);
}

// Handles camera + section transition
function transitionToNext(currentDOMElement) {
  fadeOut(currentDOMElement, () => {
    currentDOMElement.remove();

    const nextSection = appState.next();
    if (nextSection) {
      showSection(nextSection);
    }
  });

  moveCameraForward(10, 1.5);
}

// Create navigation handlers
const renderer = initThree();
const { goNext, goPrev, goToggle } =
  NavHandlers({ appState, showSection, transitionToNext, renderer });

// Init persistent UI and launch
loadNav(goNext, goPrev, goToggle);
showSection('hero');

// Start the app
showSection('hero');
     