---
titulo: FinControl
resumo: Personal finance web app with authentication, onboarding and dashboards. Application and database run on separate VPSs.
contexto: Personal · 2025–now
tipo: Personal project
periodo: 11/2025 – now
ordem: 4
stack: [React, Hono, Prisma, PostgreSQL, Nginx, Vite, Node.js, Docker, GitHub Actions]
links:
  codigo: https://github.com/lukagouvea/fincontrol
arquitetura:
  descricao: Nginx serves the React build and forwards /api/ to the Hono API, stripping the prefix; login is limited to 1 request per second per IP. PostgreSQL runs on a separate VPS, tuned for 1 GB of RAM. On every push to main, GitHub Actions builds the images, publishes them to Docker Hub and updates the VPS over SSH.
---

## Features

- Sign-up and login, with authentication and authorization in the API.
- Onboarding to set up the account.
- Income and expense dashboards.
- Responsive interface.
