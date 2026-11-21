// Gera os cards de compartilhamento (public/og/<lang>/<slug>.png) a partir das rotas /og/.
// Precisa do servidor rodando (npm run dev) e do Google Chrome instalado.
// Uso: node scripts/gerar-og.mjs [http://localhost:4321]

import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] ?? 'http://localhost:4321';
const raiz = fileURLToPath(new URL('..', import.meta.url));
const chrome = process.env.CHROME ?? 'google-chrome';

for (const lang of ['pt', 'en']) {
  const pasta = join(raiz, 'src/content/projetos', lang);
  const slugs = [
    'inicio',
    ...readdirSync(pasta)
      .filter((f) => /\.mdx?$/.test(f))
      .map((f) => f.replace(/\.mdx?$/, '')),
  ];
  const destino = join(raiz, 'public/og', lang);
  mkdirSync(destino, { recursive: true });

  for (const slug of slugs) {
    const saida = join(destino, `${slug}.png`);
    execFileSync(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        '--window-size=1200,630',
        '--virtual-time-budget=3000',
        `--screenshot=${saida}`,
        `${base}/og/${lang}/${slug}/`,
      ],
      { stdio: 'ignore', timeout: 60_000 },
    );
    console.log(saida.replace(raiz, ''));
  }
}
