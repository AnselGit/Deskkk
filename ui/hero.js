export function loadHero(onContinue) {
  const div = document.createElement('div');
  div.id = 'hero';
  div.className = 'section';
  div.innerHTML = `
    <h1>Welcome to the 3D Desk</h1>
    <p>Organize. Learn. Explore.</p>
    <button id="cta">Get Started</button>
  `;
  document.body.appendChild(div);

  document.getElementById('cta').addEventListener('click', () => {
    onContinue(div);
  });
}
