import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serves this repository from /ceno-landing/. Local development
  // remains at / unless the deployment workflow provides a base path.
  base: process.env.VITE_BASE_PATH || '/',
});
