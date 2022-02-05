const loginFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-login');
  const passwordEl = document.querySelector('#password-input-login');

  if (!usernameEl | !passwordEl) {
    alert('Please fill out all fields.')
  } else {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(response)
      document.location.replace('/dashboard');
    } else {
      alert('Failed to login');
    }
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
