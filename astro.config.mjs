// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Endereço público (ex.: https://seudominio.com). Necessário para as URLs absolutas
  // das prévias de link (og:image). Sem ele, essas tags não são geradas.
  site: process.env.SITE_URL || undefined,
  integrations: [mdx()],
});
