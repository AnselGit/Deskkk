export function loadHero(onContinue) {
  const div = document.createElement('div');
  div.id = 'hero';
  div.className = 'section section--hero';

  div.innerHTML = `
    <div class="hero">
      <h1 class="hero__title">Welcome to Deskkk</h1>
      <p class="hero__subtitle">Organize. Learn. Explore.</p>
      <button class="hero__cta-btn" id="hero-cta">Get Started</button>
    </div>
  `;

  document.body.appendChild(div);

  document.getElementById('hero-cta').addEventListener('click', () => {
    onContinue(div);
  });
}
