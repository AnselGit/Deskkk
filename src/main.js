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
const { renderer, camera, setOrbitCenter, orbitSystem } = initThree();

// ✅ 5. Section-specific camera transitions
const sectionTransitions = {
  hero: {
    camera: { x: 0, y: 0, z: 8, duration: 1.5 },
    orbit: { radius: 5, smooth: 0.1, decay: 0.05, horizontal: 0.01, vertical: 0.01 }
  },
  auth: {
    camera: { x: 0, y: 0, z: 9, duration: 3 },
    orbit: { radius: 3, smooth: 0.1, decay: 0.05, horizontal: 0.001, vertical: 0.001 }
  },
  desk: {
    camera: { x: 0, y: -9, z: 1, duration: 2 },
    orbit: { radius: 0.5, smooth: 0.1, decay: 0.05, horizontal: 1, vertical: 1 }
  },
  drills: {
    camera: { x: 2, y: 3, z: -5, duration: 1.2 },
    orbit: { radius: 5, smooth: 0.1, decay: 0.05, horizontal: 0.3, vertical: 0.6 }
  },
  flips: {
    camera: { x: -3, y: 0, z: -7, duration: 1.5 },
    orbit: { radius: 5, smooth: 0.1, decay: 0.05, horizontal: 0.3, vertical: 0.6 }
  }
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
  const cameraTarget = transition?.camera;
  const orbitParams = transition?.orbit;

  const completeTransition = () => {
    if (cameraTarget) {
      const { x = camera.position.x, y = camera.position.y, z = camera.position.z } = cameraTarget;
      setOrbitCenter(x, y, z);
    }

    // ✅ Apply orbit params after reaching the new section
    if (orbitParams) {
      if (orbitSystem.setParams) {
        orbitSystem.setParams(orbitParams.radius, orbitParams.smooth, orbitParams.decay);
      }

      if (orbitSystem.setStrengths) {
        orbitSystem.setStrengths(orbitParams.horizontal, orbitParams.vertical);
      }
    }
    
    showSection(next);
  };

  if (cameraTarget) {
    const isHero = next === 'hero';

    moveCameraTo(
      camera,
      cameraTarget,
      cameraTarget.duration,
      completeTransition,
      orbitSystem,
      { easing: isHero ? "power1.inOut" : "none" }
    );
  } else {
    completeTransition();
  }

  fadeOut(currentDOMElement, () => {
    currentDOMElement.remove();
  });
}

// ✅ 9. Init nav + start app
const { goNext, goPrev, goToggle } =
  NavHandlers({ appState, showSection, transitionToNext, renderer, camera });

loadNav(goNext, goPrev, goToggle);
showSection('hero');
