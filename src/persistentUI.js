export function initPersistentUI(onNext, onBack, onToggleDark) {
  const div = document.createElement('div');
  div.className = 'persistent-ui';

  div.innerHTML = `
    <div class="container">
        <input type="checkbox" name="checkbox" id="checkbox" />
        <label for="checkbox" class="label"> </label>
    </div>
  `;

  document.body.appendChild(div);

  div.querySelector('.back-btn').addEventListener('click', onBack);
  div.querySelector('.next-btn').addEventListener('click', onNext);
  div.querySelector('.dark-toggle').addEventListener('click', onToggleDark);
}
