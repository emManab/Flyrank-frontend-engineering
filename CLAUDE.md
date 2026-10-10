# Claude Code Project Instructions

## Project
Flyrank Frontend Engineering capstone.

## Technology
The final frontend framework and tools have not been selected. Inspect the existing repository and ask before adding a framework or dependencies. This exercise uses browser-native HTML/CSS/JavaScript and Node's built-in test runner.

## Testable Project Rules
- Every form control must have a programmatically associated `<label>`; placeholder text is not a label.
- Validate trimmed values in a reusable function before persisting them. Cover blank input, malformed email, and documented length limits with automated tests.
- For invalid form submissions, set `aria-invalid`, connect field errors with `aria-describedby`, announce the result through a status region, and focus the first invalid field.
- Wrap browser storage writes in error handling; storage can be unavailable or full.
- Keep validation logic independent of the DOM so it can be tested with `node --test`.

## Git Conventions
- Use Conventional Commits with a type and concise description.
- Keep changes focused and explain meaningful decisions.
- Never commit secrets, credentials, or API keys.

## AI Assistant Workflow
- Inspect relevant files before editing.
- State a short plan before implementation.
- After changes, run `npm test` and report the actual result; never claim tests passed unless they ran.
- Ask for clarification if a product or technical requirement is ambiguous.
