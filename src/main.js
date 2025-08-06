// ✅ 1. Styles (order doesn't matter as long as it's before logic)
import '../styles/navTray.css';
import '../styles/hero.css';
import '../styles/auth.css';

// ✅ 2. Core logic and libraries
import initThree from '../three/threeBg.js';
import { moveCameraTo } from '../three/utils/transitionCam.js';
import { fadeIn, fadeOut } from './effects.js';
import { NavHandlers } from './functions.js';

// ✅ 3. UI loaders
import { loadNav } from './navTray.js';
import { loadHero } from '../ui/hero.js';
import { loadAuth } from '../ui/auth.js';
import { loadDesk } from '../ui/desk.js';
import { loadDrills } from '../ui/drills.js';
import { loadFlips } from '../ui/flips.js';




// ✅ 4. Initialize 3D background
const { renderer, camera, setOrbitCenter } = initThree();

// ✅ 5. Section-specific camera transitions
const sectionTransitions = {
  hero: null,
  auth: null,
  desk: { camera: { z: -15, duration: 1.5 } },
  drills: { camera: { z: -5, duration: 1 } },
  flips: { camera: { z: -7, duration: 1.2 } }
};

// ✅ 6. Centralized app state
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
  },

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.getCurrent();
    }
    return null;
  }
};

// ✅ 7. UI section loader
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

// ✅ 8. Camera + section transition
function transitionToNext(currentDOMElement) {
  const currentSection = appState.getCurrent();
  const next = appState.next();
  if (!next) return;

  const transition = sectionTransitions[next];
  if (transition?.camera) {
    moveCameraTo(camera, transition.camera, transition.camera.duration, () => {
      // ✅ After transition completes
      const { x = camera.position.x, y = camera.position.y, z = camera.position.z } = transition.camera;
      setOrbitCenter(x, y, z); // 🎯 Orbit around new section center
    });
  }

  fadeOut(currentDOMElement, () => {
    currentDOMElement.remove();
    showSection(next);
  });
}

// ✅ 9. Init nav + start app
const { goNext, goPrev, goToggle } =
  NavHandlers({ appState, showSection, transitionToNext, renderer, camera });

loadNav(goNext, goPrev, goToggle);
// showSection('hero');
