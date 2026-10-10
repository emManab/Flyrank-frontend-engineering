const form = document.querySelector('#settings-form');
const message = document.querySelector('#message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const settings = {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    digest: document.querySelector('#digest').checked,
  };
  localStorage.setItem('flyrank-settings', JSON.stringify(settings));
  message.textContent = 'Settings saved!';
});
