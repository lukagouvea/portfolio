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
  ver: https://fin.luka.dev.br
arquitetura:
  descricao: The app VPS has no ports open to the internet. Public traffic to fin.luka.dev.br comes through a Cloudflare Tunnel to cloudflared, which forwards it to Nginx on 127.0.0.1:80. Nginx serves the React build and forwards /api/ to the Hono API, stripping the prefix; login is limited to 1 request per second per IP. PostgreSQL runs on a separate VPS, tuned for 1 GB of RAM. Pull requests run tests and build the images only for the changed part, without publishing. On every push to main, GitHub Actions runs the tests, publishes the images to Docker Hub and updates the VPS over SSH, which also goes through the tunnel and is authorized by Cloudflare Access with a service token.
---

## Features

- Sign-up and login, with authentication and authorization in the API.
- Onboarding to set up the account.
- Income and expense dashboards.
- Responsive interface.
