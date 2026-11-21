---
titulo: Personal Fight
resumo: Web app for a martial arts studio, with class scheduling, bookings, waitlists, credits and management of the teaching team.
contexto: Client · 2026–now
tipo: Client project
periodo: 10/2026 – now
ordem: 3
stack: [Django, React, PostgreSQL, Celery, Python, TypeScript, Django REST Framework, Redis, TanStack Query, Docker Compose, Caddy, Playwright]
arquitetura:
  descricao: Caddy serves the React build and forwards /api/ to Django. Messaging app bots are detected by User-Agent and get the link's meta tags from the API, so the link shows as a card. Each operation writes data and messages in the same transaction; after commit, a trigger through Redis makes the Celery worker read the outbox and send emails and push notifications. Celery beat fires scheduled jobs such as class reminders.
---

## Context

A system for a martial arts teacher to run the studio's classes and teaching team. Students buy credits outside the platform and use the app to book classes from their phone or computer. There are three roles: student, teacher and admin teacher.

The app is complete in the local environment. Before opening to the public it still needs a domain and HTTPS, production SMTP, Google sign-in, and PWA validation on real iPhone and Android devices.

## Features

- Schedule with group and private classes, bulk publishing from a weekly template, and per-teacher conflict checks.
- Bookings, a first-come-first-served waitlist, and booking spots for guests without an account.
- Credit wallet with total, held and available balances, and an immutable ledger.
- Team management: invitations, role-based permissions and per-format class costs.
- Dashboards for occupancy, finances and student follow-up.
- Email and Web Push notifications, with reminders before classes.
- Installable PWA that opens offline, showing upcoming bookings and the balance.
- Sign-up with versioned acceptance of the terms, personal data export and account deletion.

## Integrity and testing

- Bookings and financial operations run in transactions with locks and idempotency keys, so two simultaneous bookings can't spend the same credit or take the same last spot.
- The ledger is never edited: corrections create new entries. A PostgreSQL trigger rejects any entry that would make a balance negative.
- Messages are written to the database in the same transaction as the operation and sent by Celery after commit (outbox pattern), so deliveries can be retried without losing notifications.
- Vitest on the frontend, Django tests running against PostgreSQL, and end-to-end journeys with Playwright on desktop and mobile.
