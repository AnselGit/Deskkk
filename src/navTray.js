export function loadBase(onNext, onBack, onToggle) {
  const div = document.createElement('div');
  div.className = 'persistent-ui';

  div.innerHTML = `

    <body>
      <div class="tray">
        <div class="tray__item tray__item--theme">
          <div class="theme">
            <label class="theme__label">
              <input type="checkbox" class="theme__checkbox" />
              <span class="theme__slider"></span>
            </label>          
          </div>
        </div>
        <div class="tray__item tray__item--nav">
          <button class="nav__btn nav__btn--back">Back</button>
          <button class="nav__btn nav__btn--next">Next</button>
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
