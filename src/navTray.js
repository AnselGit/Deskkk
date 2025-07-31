export function loadNav(onNext, onBack, onToggle) {
  const div = document.createElement('div');
  div.className = 'persistent-ui';

  div.innerHTML = `

    <body>

    <div class="tray">
      <div class="tray__item tray__item--prev">
        <button class="nav__btn nav__btn--back" id="back" aria-label="Back">
          <svg class="nav__icon--back" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="tray__item tray__item--next">
        <button class="nav__btn nav__btn--next" id="next">
          <svg class="nav__icon--next" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="tray__item tray__item--theme">
        <div class="theme">
          <label class="theme__label">
            <input type="checkbox" class="theme__checkbox" id="theme"/>
            <span class="theme__slider"></span>
          </label>
        </div>
      </div>
    </div>

  </body>

  `;

  document.body.appendChild(div);

  div.querySelector('#back').addEventListener('click', onBack);
  div.querySelector('#next').addEventListener('click', onNext);
  div.querySelector('#theme').addEventListener('change', onToggle);

  return div
}
