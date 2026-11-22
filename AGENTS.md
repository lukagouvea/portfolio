## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Guia do repositório

Site em Astro, em português (`/`) e inglês (`/en/`). Requer Node 24 (`nvm use`); o Node do sistema pode ser antigo demais para o Astro.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # serve dist/
```

### Onde editar

| O quê | Arquivo |
|---|---|
| Experiência, formação, habilidades, contato, PDF do currículo | `src/data/perfil.ts` |
| Textos da interface (menu, títulos de seção) | `src/i18n.ts` |
| Projetos | `src/content/projetos/{pt,en}/<slug>.md` |
| Cores dos temas | `src/styles/global.css` |

Um projeto novo é um par de arquivos `.md` (ou `.mdx`, quando a página usa componentes como diagramas e grades de imagens) com o mesmo nome em `pt/` e `en/`. Os campos aceitos estão em `src/content.config.ts`; a ordem na página inicial vem do campo `ordem`. Os links do topo da página vêm de `links.codigo`, `links.demo` e `links.ver`.

Diagramas de arquitetura ficam em `src/data/diagramas.ts`, com a mesma chave do slug do projeto. Cada um tem um layout `largo` (desktop) e um `estreito` (celular, até 700px), com coordenadas em pixels; os limites de caracteres por largura de nó estão no comentário do topo do arquivo. Depois de mexer, confira os dois layouts renderizados.

Os recortes de máscaras do TCC (`public/img/tcc/`) são gerados a partir dos `.npz` dos experimentos:

```sh
python3 -I scripts/gerar_recortes_tcc.py "<pasta tcc/algoritmos>" public/img/tcc
```

### Prévias de link

Cada página tem um card de 1200×630 em `public/og/<lang>/<slug>.png`, usado nas prévias de WhatsApp, LinkedIn etc. Os cards são as rotas `/og/<lang>/<slug>/` fotografadas pelo Chrome headless. Depois de mudar um título ou criar um projeto, regere:

```sh
npm run build && npx astro preview --port 4322   # em outro terminal
node scripts/gerar-og.mjs http://localhost:4322
```

As tags `og:image` só são geradas com `SITE_URL` definido no build (ex.: `SITE_URL=https://luka.dev.br npm run build`), porque os apps exigem URL absoluta. No CI, `SITE_URL` é uma variável do repositório.

### Deploy

Cada push na `main` gera o site e envia `dist/` para `/var/www/portfolio` na VPS via rsync, passando pelo Cloudflare Tunnel (`.github/workflows/deploy.yml`). Os secrets necessários estão listados no workflow.
