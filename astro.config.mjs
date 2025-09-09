// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: false, // /fr/page ou juste /page pour français
    },
  },
  integrations: [
    sanity({
      projectId: 'ir92g8ey',
      dataset: 'production',
      // Set useCdn to false if you're building statically.
      useCdn: false,
      studioBasePath: '/admin'
    }), 
    react()
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});