import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Vercel serves this app at the domain root, unlike GitHub Pages project URLs.
  base: '/',
});
