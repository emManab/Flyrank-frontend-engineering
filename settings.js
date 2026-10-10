(function (root) {
  'use strict';

  function validateSettings(input) {
    const name = String(input.name ?? '').trim();
    const email = String(input.email ?? '').trim();
    const errors = {};

    if (!name) errors.name = 'Enter a display name.';
    else if (name.length > 60) errors.name = 'Use 60 characters or fewer.';

    if (!email) errors.email = 'Enter an email address.';
    else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address.';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
      value: { name, email, digest: Boolean(input.digest) },
    };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { validateSettings };
  else root.validateSettings = validateSettings;
})(typeof window !== 'undefined' ? window : globalThis);
