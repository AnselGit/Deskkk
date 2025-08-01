export function loadAuth(onContinue) {
  const div = document.createElement('div');
  div.id = 'auth';
  div.className = 'section';
  div.innerHTML = `

  <div class="auth">

    <div class="auth__page1">
      
    </div>

    <div class="auth__page2">
      <button id="auth-next" class="auth__btn">Continue</button>
    </div>

  </div>
`;

  document.body.appendChild(div);

  document.getElementById('auth-next').addEventListener('click', () => {
    onContinue(div);
  });
  return div;
}
