import '../styles/ui.css';
import initThree from '../three/threeBg.js';
import { moveCameraForward } from '../three/utils/transitionCam.js';
import { loadHero } from '../ui/hero.js';
import { loadAuth } from '../ui/auth.js';
import { loadDesk } from '../ui/desk.js';
import { loadDrills } from '../ui/drills.js';
import { loadFlips } from '../ui/flips.js';

// 1️⃣ Initialize 3D background
initThree();

// 2️⃣ Centralized state object
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

// 3️⃣ UI section loader
function showSection(name) {
  switch (name) {
    case 'hero': loadHero(transitionToNext); break;
    case 'auth': loadAuth(transitionToNext); break;
    case 'desk': loadDesk(transitionToNext); break;
    case 'drills': loadDrills(transitionToNext); break;
    case 'flips': loadFlips(transitionToNext); break;
  }
}

// 4️⃣ Handles camera + section transition
function transitionToNext(currentDOMElement) {
  currentDOMElement.classList.add('fade-out');

  moveCameraForward(10, 1.5, () => {
    currentDOMElement.remove();
    const nextSection = appState.next();
    if (nextSection) {
      showSection(nextSection);
    }
  });
}

// 5️⃣ Start the app
showSection('hero');
