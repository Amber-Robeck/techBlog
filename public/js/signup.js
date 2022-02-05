const signupFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');
  // console.log(usernameEl.value, passwordEl.value)
  // // const emailEl = document.querySelector('#email-input-signup').val;

  if (!usernameEl | !passwordEl) {
    alert('Please fill out all fields.')
  } else {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log(usernameEl.value, passwordEl.value)
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);

