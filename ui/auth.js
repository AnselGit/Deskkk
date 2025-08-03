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
        
      </div>
    </div>

    <div class="page2__card">
      <div class="page2__inner">

        <form class="page2__form--box page2__form--signup">
          <span class="title">Sign up</span>
          <span class="subtitle">Create a free account with your email.</span>
          <div class="form-container">
            <input type="text" class="input" placeholder="Full Name">
            <input type="email" class="input" placeholder="Email">
            <input type="password" class="input" placeholder="Password">
            <input type="password" class="input" placeholder="Confirm">
          </div>

          <div class="page2__ScrollDown">
            <p class="page2__paragraph--label">already have an account?</p>
            <a href="" class="page2__link--login" id="scrollDown">Sign in</a>
          </div>
          
          <button class="page2__btn--sign" id="auth-next">Sign up</button>
        </form>

        <form class="page2__form--box page2__form--signin">
          <span class="title">Sign in</span>
          <span class="subtitle">Welcome back. Login below.</span>
          <div class="form-container">
            <input type="email" class="input" placeholder="Email">
            <input type="password" class="input" placeholder="Password">
          </div>

          <div class="page2__ScrollUp">
            <p class="page2__paragraph--label">Don't have an account?</p>
            <a href="" class="page2__link--login" id="scrollUp">Sign up</a>
          </div>

          <button class="page2__btn--sign">Sign in</button>
        </form>
      </div>
    </div>

  </div>
`;

  document.body.appendChild(div);

  const page2 = div.querySelector('.page2__card');

  div.querySelector('#scrollDown').addEventListener('click', (e) => {
    e.preventDefault();
    page2.classList.add('scroll-down');
  });

  div.querySelector('#scrollUp').addEventListener('click', (e) => {
    e.preventDefault();
    page2.classList.remove('scroll-down');
  });

  document.getElementById('auth-next').addEventListener('click', () => {
    onContinue(div);
  });
  return div;
}
