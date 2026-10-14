// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Entorno de despliegue:
// - Preview (GitHub Pages): SITE_URL y BASE_PATH no definidos → usa defaults de vandalit.github.io/Syzygy
// - Producción (Rizoma/Oracle vía GitHub Actions): definir SITE_URL=https://syzygy.metamedia.cl y BASE_PATH=/
const siteUrl = process.env.SITE_URL || 'https://vandalit.github.io';
const basePath = process.env.BASE_PATH || '/Syzygy';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});

