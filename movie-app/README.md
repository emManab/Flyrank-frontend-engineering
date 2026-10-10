# ScreenShelf — React Media Catalog

A responsive React catalogue inspired by the reference screenshots: a dark navigation bar, searchable movie/series cards, a favourites collection, and account creation/login screens.

## Run it locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Production build: `npm run build`.

## Public hosting

The project is configured for GitHub Pages. The deployment workflow builds this Vite app and publishes `movie-app/dist` when changes are pushed to `react-media-catalog`.

Expected URL: https://emmanab.github.io/Flyrank-frontend-engineering/

The first deployment may require enabling GitHub Pages with **GitHub Actions** as the build/deployment source in the repository's Settings → Pages. Check the Actions run for the deployment result.

## Features

- Search by title, year, media type, or genre.
- Filter the catalogue by genre.
- Create a demo account and log in/out.
- Save favourites in browser local storage.
- Responsive card grid, lazy-loaded remote poster images, and a readable fallback when a poster URL fails.
- Form validation, accessible labels, error feedback, keyboard focus indicators, and reduced-motion support.

## Demo authentication note

This is a frontend learning project, not production authentication. Demo account credentials are stored locally in the browser and must never be used for real passwords. A production app should use a secure backend, hashed passwords, session management, and a real media data API.

## Images

Poster artwork is loaded from TMDB image URLs without an API key. Network access is required for posters; unavailable images fall back to a title treatment. The list is sample data and does not represent a live catalogue API.
