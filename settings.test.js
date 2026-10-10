const test = require('node:test');
const assert = require('node:assert/strict');
const { validateSettings } = require('./settings.js');

test('trims surrounding whitespace from valid values', () => {
  const result = validateSettings({ name: '  Manab  ', email: ' manab@example.com ', digest: true });
  assert.equal(result.valid, true);
  assert.deepEqual(result.value, { name: 'Manab', email: 'manab@example.com', digest: true });
});

test('rejects a blank display name after trimming', () => {
  const result = validateSettings({ name: '   ', email: 'manab@example.com', digest: false });
  assert.equal(result.valid, false);
  assert.equal(result.errors.name, 'Enter a display name.');
});

test('rejects malformed email addresses', () => {
  const result = validateSettings({ name: 'Manab', email: 'not-an-email', digest: false });
  assert.equal(result.valid, false);
  assert.equal(result.errors.email, 'Enter a valid email address.');
});

test('rejects values beyond documented length limits', () => {
  const result = validateSettings({ name: 'a'.repeat(61), email: `${'a'.repeat(245)}@example.com`, digest: false });
  assert.equal(result.valid, false);
  assert.match(result.errors.name, /60 characters/);
  assert.match(result.errors.email, /valid email/);
});

test('reports both invalid fields together', () => {
  const result = validateSettings({ name: '', email: '', digest: false });
  assert.deepEqual(Object.keys(result.errors).sort(), ['email', 'name']);
});
