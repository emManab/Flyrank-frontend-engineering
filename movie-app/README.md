# ScreenShelf — React Media Catalog

A responsive React catalogue inspired by the reference screenshots: a dark navigation bar, searchable movie/series cards, a favourites collection, and account creation/login screens.

## Run it

Requires Node.js 20 or newer.

```bash
cd movie-app
npm install
npm run dev
```

Production build: `npm run build`.

## Features

- Search by title, year, media type, or genre.
- Filter the catalogue by genre.
- Create a demo account and log in/out.
- Save favourites in browser local storage.
- Responsive card grid, loading-friendly remote poster images, and a readable fallback when a poster URL fails.
- Form validation, accessible labels, status/error feedback, keyboard focus indicators, and reduced-motion support.

## Demo authentication note

This is a frontend learning project, not production authentication. Demo account credentials are stored locally in the browser and must never be used for real passwords. A production app should use a secure backend, hashed passwords, session management, and a real media data API.

## Images

Poster artwork is loaded from TMDB image URLs without an API key. Network access is required for posters; unavailable images fall back to a title treatment. The list is sample data and does not represent a live catalogue API.
