export function loadBase(onNext, onBack, onToggle) {
  const div = document.createElement('div');
  div.className = 'persistent-ui';

  div.innerHTML = `

    <body>
    <div class="tray">
      <div class="tray__item tray__item--prev">
        <button class="nav__btn nav__btn--back">
          <img src="/assets/prev.png" alt="back" class="nav__icon--back">
        </button>
      </div>
      <div class="tray__item tray__item--next">
        <button class="nav__btn nav__btn--next">
          <img src="/assets/next.png" alt="next class="nav__icon--next">
        </button>
      </div>
      <div class="tray__item tray__item--theme">
        <div class="theme">
          <label class="theme__label">
            <input type="checkbox" class="theme__checkbox" />
            <span class="theme__slider"></span>
          </label>
        </div>
      </div>
    </div>
  </body>

  `;

  document.body.appendChild(div);

  // div.querySelector('.back-btn').addEventListener('click', onBack);
  // div.querySelector('.next-btn').addEventListener('click', onNext);
  // div.querySelector('#checkbox').addEventListener('change', onToggle);

  return div
}
