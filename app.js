'use strict';

const form = document.querySelector('#settings-form');
const message = document.querySelector('#form-message');
const fields = {
  name: document.querySelector('#name'),
  email: document.querySelector('#email'),
};

function clearErrors() {
  for (const [key, field] of Object.entries(fields)) {
    field.removeAttribute('aria-invalid');
    document.querySelector(`#${key}-error`).textContent = '';
  }
  message.textContent = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();
  const result = window.validateSettings({
    name: fields.name.value,
    email: fields.email.value,
    digest: document.querySelector('#digest').checked,
  });

  if (!result.valid) {
    for (const [key, error] of Object.entries(result.errors)) {
      fields[key].setAttribute('aria-invalid', 'true');
      document.querySelector(`#${key}-error`).textContent = error;
    }
    message.textContent = 'Please correct the highlighted fields.';
    const firstInvalid = Object.keys(result.errors)[0];
    fields[firstInvalid].focus();
    return;
  }

  try {
    localStorage.setItem('flyrank-settings', JSON.stringify(result.value));
    message.textContent = 'Settings saved.';
  } catch {
    message.textContent = 'Settings could not be saved in this browser. Please try again.';
  }
});
