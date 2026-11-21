---
titulo: Simulador florestal
resumo: Aplicação desktop de simulação de produção florestal, reescrita a partir do sistema legado. Processamento paralelo, SQLAlchemy ORM e Core, atualização automática.
contexto: Nutree · 2023–2026
tipo: Trabalho · Nutree (UFV)
periodo: 10/2023 – 10/2026
ordem: 1
stack: [Python, SQLAlchemy, SQLite, Tkinter, FastAPI, GitHub Actions, Docker, Sentry]
---

## Contexto

A Nutree é um centro de pesquisa da UFV em nutrição e solos florestais. Os pesquisadores usam uma aplicação desktop para simular a produção florestal. O sistema legado tinha limitações que comprometiam a confiabilidade dos fluxos científicos.

## O que fiz

- Reconstruí a plataforma e sigo mantendo.
- Processamento paralelo com threading nos pipelines de cálculo de larga escala. Junto com consultas SQL otimizadas, isso deu um ganho de 95% de performance no motor de simulação.
- Camada de dados com SQLAlchemy: ORM para modelar entidades complexas e Core para consultas analíticas.
- Pipeline de distribuição do software, com atualização automática, gestão de releases e controle de versões.
- Monitoramento com Sentry, documentação para usuários e suporte técnico direto aos pesquisadores.
- Coordenei uma equipe pequena, incluindo a orientação de um estagiário, e alinhei os requisitos com pesquisadores e gestores do programa.
