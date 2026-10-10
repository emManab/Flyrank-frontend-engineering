# AI-Assisted Workflow Comparison

## Feature and method

The feature is a small account-settings form with display name, email, and a weekly-digest preference. The first implementation is intentionally minimal; the second separates validation from DOM handling and includes tests. The branches are independent from the same setup baseline: `round-1-vague-prompt` and `round-2-spec-and-tests`.

## Specific differences

- **Validation:** In round one, `app.js` writes raw name and email values directly to localStorage. The browser's `required` attribute does not reject a name made only of spaces. In round two, `settings.js` trims both values and returns explicit field errors; `settings.test.js` covers whitespace-only names and malformed email.
- **Error feedback:** Round one always displays “Settings saved!” after submission. Round two renders per-field messages, sets `aria-invalid`, focuses the first invalid control, and announces status text through `role="status"` and `aria-live="polite"`.
- **Failure handling:** Round one does not catch localStorage failures. Round two catches storage exceptions and displays a failure message instead of claiming success.
- **Maintainability and verification:** Round one keeps submission logic in one small handler. Round two puts reusable validation in `settings.js`, defines `npm test` with Node's built-in test runner, and covers trimming, blank names, malformed email, length limits, and multiple simultaneous errors. The HTML also adds explicit label associations, autocomplete hints, and responsive styling.

## Correctness, accessibility, and edge cases

The precise version makes behavior explicit and easier to review. The concrete round-one defect identified by code inspection is that whitespace-only names can be stored as valid values. Another risk is a false success message if browser storage is blocked or full. The second implementation addresses both. It also gives screen-reader users field-specific error text and a live status message. Email validation is intentionally a practical format check, not proof that an address exists.

## Review effort and limitations

The second version has more files and therefore more initial code to inspect, but the validation function and automated tests make its behavior easier to verify and maintain. Actual elapsed time—including review and fixes—was not measured, so this comparison does not claim a timed speed advantage. GitHub Actions ran `npm test` on `round-2-spec-and-tests` successfully (Node.js 20; workflow run [#1](https://github.com/emManab/Flyrank-frontend-engineering/actions/runs/38042066942)). This verifies the automated validation tests, not browser rendering or the full submit/storage interaction. The two branches still need a visual browser comparison if screenshot-level evidence is required.

## Takeaway

A detailed prompt helps by specifying observable behavior, constraints, and verification—not by guaranteeing correctness. Keep the testable rules in `CLAUDE.md`, inspect the diff, and report only checks that were actually run.
