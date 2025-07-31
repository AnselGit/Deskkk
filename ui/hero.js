export function loadHero(onContinue) {
  const div = document.createElement('div');
  div.id = 'hero';
  div.className = 'section section--hero';

  div.innerHTML = `
    <div class="hero">
      <h1 class="hero__title">Welcome to Deskkk</h1>
      <p class="hero__subtitle">Organize. Learn. Explore.</p>

      <!-- From Uiverse.io by adamgiebl --> 
      <button class="uiverse" id="hero-cta">
        <div class="wrapper">
          <span>GET STARTED</span>
        </div>
      </button>


    </div>
  `;

  document.body.appendChild(div);

  document.getElementById('hero-cta').addEventListener('click', () => {
    onContinue(div);
  });
  return div;
}
