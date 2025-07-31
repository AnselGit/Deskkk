export function loadAuth(onContinue) {
  const div = document.createElement('div');
  div.id = 'auth';
  div.className = 'section';
  div.innerHTML = `
  <div class="auth__glass">
    <h1>Login or Sign Up</h1>
    <p>Access your study tools and track progress.</p>
    <button id="auth-next" class="auth__btn">Continue</button>
  </div>
`;

  document.body.appendChild(div);

  document.getElementById('auth-next').addEventListener('click', () => {
    onContinue(div);
  });
  return div;
}
