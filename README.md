# Portfólio

Código do meu site pessoal, publicado em [luka.dev.br](https://luka.dev.br), em português e em inglês (`/en/`).

O site reúne experiência, formação e projetos. Cada projeto tem uma página própria com contexto, stack e, quando faz sentido, diagrama de arquitetura, gráficos ou imagens de resultados.

## Como é feito

- Site estático em [Astro](https://astro.build), sem framework de UI. O JavaScript no navegador se limita à troca de tema e aos gráficos interativos.
- Os projetos são uma content collection em Markdown/MDX, com um arquivo por idioma e o frontmatter validado por schema com Zod.
- Os diagramas de arquitetura são SVG gerados a partir de dados em [src/data/diagramas.ts](src/data/diagramas.ts), com um layout horizontal para desktop e um vertical para celular.
- Os gráficos de linhas, o mapa de talhões e as galerias de imagens são componentes próprios, sem biblioteca de gráficos.
- Tema claro e escuro, que segue o sistema por padrão e pode ser trocado manualmente.
- As imagens de prévia de link (Open Graph) são páginas do próprio site fotografadas pelo Chrome headless ([scripts/gerar-og.mjs](scripts/gerar-og.mjs)).

## Deploy

A cada push na `main`, o GitHub Actions gera o site e envia o `dist/` por rsync para uma VPS. A VPS não aceita SSH direto da internet: a conexão passa por um Cloudflare Tunnel e é autorizada no Cloudflare Access com um service token ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

## Estrutura

```
src/
  content/projetos/{pt,en}/   páginas dos projetos (.md / .mdx)
  data/                       perfil, diagramas e dados dos gráficos
  components/                 diagrama, gráficos, galerias, layout da página de projeto
  pages/                      rotas em português, inglês e modelos das prévias
scripts/                      geração das prévias e dos recortes de imagens do TCC
```
