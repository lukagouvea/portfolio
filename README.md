# Portfólio

Site pessoal em [Astro](https://docs.astro.build), em português (`/`) e inglês (`/en/`).

## Rodar

Requer Node 24 (`nvm use`).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # serve dist/
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Experiência, formação, habilidades, contato, PDF do currículo | `src/data/perfil.ts` |
| Textos da interface (menu, títulos de seção) | `src/i18n.ts` |
| Projetos | `src/content/projetos/{pt,en}/<slug>.md` |
| Cores dos temas | `src/styles/global.css` |

Um projeto novo é um par de arquivos `.md` (ou `.mdx`, quando a página usa componentes como diagramas e grades de imagens) com o mesmo nome em `pt/` e `en/`. Diagramas de arquitetura ficam em `src/data/diagramas.ts`, com a mesma chave do slug do projeto.

Os recortes de máscaras do TCC (`public/img/tcc/`) são gerados a partir dos `.npz` dos experimentos:

```sh
python3 -I scripts/gerar_recortes_tcc.py "<pasta tcc/algoritmos>" public/img/tcc
``` Os campos aceitos estão em `src/content.config.ts`; a ordem na página inicial vem do campo `ordem`.

## Prévias de link

Cada página tem um card de 1200×630 em `public/og/<lang>/<slug>.png`, usado nas prévias de WhatsApp, LinkedIn etc. Os cards são as rotas `/og/<lang>/<slug>/` fotografadas pelo Chrome headless. Depois de mudar um título ou criar um projeto, regere:

```sh
npm run build && npx astro preview --port 4322   # em outro terminal
node scripts/gerar-og.mjs http://localhost:4322
```

As tags `og:image` só são geradas com `SITE_URL` definido no build (ex.: `SITE_URL=https://seudominio.com npm run build`), porque os apps exigem URL absoluta.

## Deploy

Cada push na `main` gera o site e envia `dist/` para `/var/www/portfolio` na VPS via rsync (`.github/workflows/deploy.yml`). Os secrets necessários estão listados no workflow.
