---
titulo: FinControl
resumo: Aplicação web de finanças pessoais, com autenticação, onboarding e dashboards. Aplicação e banco em VPS separadas.
contexto: Pessoal · 2025–hoje
tipo: Projeto pessoal
periodo: 11/2025 – hoje
ordem: 4
stack: [React, Hono, Prisma, PostgreSQL, Nginx, Vite, Node.js, Docker, GitHub Actions]
links:
  codigo: https://github.com/lukagouvea/fincontrol
  ver: https://fin.luka.dev.br
arquitetura:
  descricao: A VPS de aplicação não tem portas abertas para a internet. O acesso público em fin.luka.dev.br chega pelo Cloudflare Tunnel até o cloudflared, que repassa para o Nginx em 127.0.0.1:80. O Nginx serve o build do React e repassa /api/ para a API em Hono, removendo o prefixo; o login tem limite de 1 requisição por segundo por IP. O PostgreSQL roda em outra VPS, com a configuração ajustada para 1 GB de RAM. Pull requests rodam testes e o build das imagens só da parte alterada, sem publicar. A cada push na main, o GitHub Actions roda os testes, publica as imagens no Docker Hub e atualiza a VPS por SSH, que também passa pelo túnel e é autorizado no Cloudflare Access com um service token.
---

## Funcionalidades

- Cadastro e login, com autenticação e autorização na API.
- Onboarding para configurar a conta.
- Dashboards de receitas e despesas.
- Interface responsiva.
