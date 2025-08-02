export function loadAuth(onContinue) {
  const div = document.createElement('div');
  div.id = 'auth';
  div.className = 'section';
  div.innerHTML = `

  <div class="auth">

    <div class="auth__page1">
      <div class="auth__page1--heading">
        <p class="auth__page1--title">Sit with us today!</p>
      </div>

      <div class="auth__page1--body">
        <p class="auth__page1--desc">
          Join a growing community of focused learners. 
          Organize your tasks, track your progress, 
          and make your desk your power zone. Your 
          smarter student life starts here.
        </p>
      </div>

      <div class="auth__page1--turn">
        <p>already have an account?</p>
        <a href="">login</a>
      </div>
    </div>

    <div class="auth__page2">
      <div></div>
      <div></div>
      <div>
        <button id="auth-next" class="auth__btn">Continue</button>
      </div>
    </div>

  </div>
`;

  document.body.appendChild(div);

  document.getElementById('auth-next').addEventListener('click', () => {
    onContinue(div);
  });
  return div;
}
