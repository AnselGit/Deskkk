export function loadAuth(onContinue) {
  const div = document.createElement('div');
  div.id = 'auth';
  div.className = 'section';
  div.innerHTML = `

  <div class="auth">

    <div class="page1__card">
      <div class="page1__portion--heading">
        <p class="page1__paragraph--title">Sit with us today!</p>
      </div>

      <div class="page1__portion--body">
        <p class="page1__paragraph--desc">
          Join a growing community of focused learners. 
          Organize your tasks, track your progress, 
          and make your desk your power zone. Your 
          smarter student life starts here.
        </p>
      </div>

      <div class="page1__portion--turn">
        <p class="page1__paragraph--label">already have an account?</p>
        <a href="" class="page1__link--login">login</a>
      </div>
    </div>

    <div class="page2__card">
      <div class="page2__container">

        <div class="form-box">
          <form class="form">
              <span class="title">Sign up</span>
              <span class="subtitle">Create a free account with your email.</span>
              <div class="form-container">
                <input type="text" class="input" placeholder="Full Name">
                <input type="email" class="input" placeholder="Email">
                <input type="password" class="input" placeholder="Password">
              </div>
              <button id="auth-next">Sign up</button>
          </form>
        </div>
        
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
