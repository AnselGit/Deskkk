// main.js
import './style.css';
import initThree from './threeBg.js';

// Initialize Three.js background
initThree();

// If you have a basic SPA router, import it too
// import initRouter from './js/router.js';
// initRouter();

// Or just inject basic HTML to test
document.querySelector('#app').innerHTML = `
  <h1>Welcome to Studiora</h1>
  <p>Your student productivity toolkit.</p>
`;
