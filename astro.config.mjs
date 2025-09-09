// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [sanity({
    projectId: 'ir92g8ey',
    dataset: 'production',
    // Set useCdn to false if you're building statically.
    useCdn: false,
    studioBasePath: '/admin'
  }), react()],
  output: 'server',
});