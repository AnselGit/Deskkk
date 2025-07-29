export function loadBase(onNext, onBack, onToggle) {
  const div = document.createElement('div');
  div.className = 'persistent-ui';

  div.innerHTML = `
    <div class="theme">
      <label class="theme__label">
        <input type="checkbox" class="theme__checkbox" />
        <span class="theme__slider"></span>
      </label>
    </div> 
  `;

  document.body.appendChild(div);

  // div.querySelector('.back-btn').addEventListener('click', onBack);
  // div.querySelector('.next-btn').addEventListener('click', onNext);
  // div.querySelector('#checkbox').addEventListener('change', onToggle);

  return div
}
