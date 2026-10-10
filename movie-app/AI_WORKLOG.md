# AI-Assisted Development Notes

## Goal

Build a React app inspired by the supplied reference: a dark top navigation, search, a responsive catalogue of poster cards, favourites, and a create-account/login screen.

## Prompts used

**Prompt 1 — initial implementation**

> Build a React app similar to the reference screenshots. It should have a movie/series catalogue, a top navigation with Home, Favourites and Login/Logout, a search bar, poster cards with title/year/type, and a Create Account form. Make it responsive and visually polished.

**Prompt 2 — refinement and quality constraints**

> Refine the implementation into a complete, responsive React app. Use reusable components, semantic form labels, accessible names for icon-only favourite controls, keyboard-visible focus states, a search that matches title/year/type/genre, genre filtering, a working favourites view, and account create/login/logout flows. Persist demo session and favourites in localStorage, validate email and password length, handle storage/image failures gracefully, and include empty states and a reduced-motion preference. Keep authentication explicitly demo-only; do not imply that browser-stored passwords are secure. Document setup, limitations, and manual review.

## How AI assisted

AI helped scaffold the Vite/React project, organise the interface into reusable components, draft the responsive styling, and implement search, filters, favourites, and the demo authentication flow. It also drafted documentation describing how to run the app and what is not production-ready.

## Manual review and corrections

- Separated the poster card, brand, and authentication form into distinct React components so the main app remains easier to inspect.
- Added accessible labels for search and form fields, descriptive labels and pressed states for favourite buttons, visible focus rings, and a reduced-motion media query.
- Added empty states for no search matches and an empty favourites list.
- Added fallbacks for failed poster requests and localStorage read/write errors.
- Kept authentication clearly marked as a demo and documented that real authentication needs a backend; storing plain passwords in localStorage is not safe for production.
- Used client-side sample data so the UI works without a media API key.

## Verification

A GitHub Actions workflow runs `npm run build` and `npm test` on pushes to this branch. Check the Actions run linked from the repository before reporting pass/fail. Browser-only visual checks (mobile widths, login/signup, search, and favourites persistence) should be recorded after testing in a browser.
