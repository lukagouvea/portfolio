import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Um arquivo por projeto e idioma: src/content/projetos/<pt|en>/<slug>.md
const projetos = defineCollection({
  loader: glob({ base: './src/content/projetos', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    // Linha curta mostrada no card: "Nutree · 2023–2026"
    contexto: z.string(),
    // Linha acima do título na página do projeto
    tipo: z.string(),
    periodo: z.string(),
    ordem: z.number(),
    stack: z.array(z.string()),
    links: z
      .object({
        codigo: z.string().url().optional(),
        demo: z.string().url().optional(),
        ver: z.string().url().optional(),
      })
      .default({}),
    // O diagrama, se houver, fica em src/data/diagramas.ts com o mesmo slug
    arquitetura: z.object({ descricao: z.string() }).optional(),
  }),
});

export const collections = { projetos };
