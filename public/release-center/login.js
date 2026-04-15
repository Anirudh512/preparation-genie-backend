async function sendJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.msg || `Request failed with ${response.status}`);
  }
  return data;
}

const loginForm = document.getElementById('login-form');
const statusLine = document.getElementById('login-status');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusLine.textContent = 'Signing in…';
  const formData = new FormData(loginForm);
  try {
    await sendJson('/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: formData.get('username'),
        pin: formData.get('pin'),
      }),
    });
    window.location.href = '/release-center';
  } catch (error) {
    statusLine.textContent = error.message;
  }
});
