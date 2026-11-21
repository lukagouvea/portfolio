---
titulo: Personal Fight
resumo: Aplicação web para um estúdio de artes marciais, com agenda de aulas, reservas, lista de espera, créditos e gestão da equipe de professores.
contexto: Cliente · 2026–hoje
tipo: Projeto para cliente
periodo: 10/2026 – hoje
ordem: 3
stack: [Django, React, PostgreSQL, Celery, Python, TypeScript, Django REST Framework, Redis, TanStack Query, Docker Compose, Caddy, Playwright]
arquitetura:
  descricao: O Caddy serve o build do React e encaminha /api/ para o Django. Robôs de apps de mensagem são reconhecidos pelo User-Agent e recebem da API as meta tags do link, que vira um card. Cada operação grava dados e mensagens na mesma transação; depois do commit, um gatilho no Redis faz o worker do Celery ler a outbox e enviar e-mails e push. O Celery beat dispara as rotinas, como os lembretes de aula.
---

## Contexto

Sistema para um professor de artes marciais organizar as aulas do estúdio e a equipe de professores. Os alunos compram créditos fora da plataforma e usam a aplicação para reservar aulas pelo celular ou pelo computador. São três perfis: aluno, professor e professor administrador.

A aplicação está pronta no ambiente local. Antes da abertura ao público faltam domínio e HTTPS, SMTP de produção, login com Google e a validação do PWA em aparelhos iPhone e Android.

## Funcionalidades

- Agenda com turmas e aulas particulares, publicação em lote por grade semanal e revisão de conflitos por professor.
- Reservas, lista de espera com promoção por ordem de chegada e reserva de vagas para acompanhantes sem conta.
- Carteira de créditos com saldo total, retido e disponível, e extrato imutável.
- Gestão da equipe: convites, permissões por perfil e custos por formato de aula.
- Painéis de ocupação, financeiro e acompanhamento de alunos.
- Notificações por e-mail e Web Push, com lembretes antes das aulas.
- PWA instalável, que abre sem conexão mostrando as próximas reservas e o saldo.
- Cadastro com aceite versionado dos termos, exportação dos próprios dados e exclusão da conta.

## Integridade e testes

- Reservas e operações financeiras rodam em transações com bloqueios e chaves de idempotência, então duas reservas simultâneas não gastam o mesmo crédito nem ocupam a mesma última vaga.
- O extrato nunca é editado: correções geram novos movimentos. Um gatilho no PostgreSQL recusa qualquer movimento que deixaria o saldo negativo.
- Mensagens são gravadas no banco na mesma transação da operação e enviadas depois do commit pelo Celery (padrão outbox), o que permite repetir envios sem perder avisos.
- Vitest no frontend, testes do Django rodando contra PostgreSQL e jornadas end-to-end com Playwright em desktop e celular.
