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
          <div class="circle circle-12"></div>
          <div class="circle circle-11"></div>
          <div class="circle circle-10"></div>
          <div class="circle circle-9"></div>
          <div class="circle circle-8"></div>
          <div class="circle circle-7"></div>
          <div class="circle circle-6"></div>
          <div class="circle circle-5"></div>
          <div class="circle circle-4"></div>
          <div class="circle circle-3"></div>
          <div class="circle circle-2"></div>
          <div class="circle circle-1"></div>
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
