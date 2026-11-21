---
titulo: Plataforma AutoForest
resumo: Plataforma de processamento de dados florestais com IA. Backend, APIs de inferência e pipeline de deploy.
contexto: AutoForest · 2025–2026
tipo: Trabalho · AutoForest
periodo: 09/2025 – 03/2026
ordem: 2
stack: [FastAPI, TensorFlow, Next.js, Docker, Python, Keras, Pandas, PostgreSQL, React, NextAuth, Pytest, GitHub Actions, Sentry]
links:
  ver: https://ai.autoforest.com.br/
arquitetura:
  descricao: Um nginx-proxy com Let's Encrypt recebe o tráfego e o encaminha ao Next.js, que autentica o usuário com NextAuth e repassa o JWT às duas APIs em FastAPI, a de usuários e a de análise. A API de análise carrega os modelos Keras de altura e volume uma única vez e processa as planilhas em threads, sem bloquear as outras requisições. O Next.js também consulta um LLM na Groq para mapear as colunas da planilha do cliente. A cada push na main, o GitHub Actions roda os testes, publica três imagens no Docker Hub e atualiza a VPS.
---

## Contexto

A AutoForest é uma startup que desenvolve sistemas autônomos de IA para processar dados florestais. Fui o principal responsável pelo backend e pela infraestrutura enquanto a plataforma passava de protótipo a produto comercial.

## Como a plataforma funciona

- O usuário envia o cadastro e o inventário florestal em Excel ou JSON. Um LLM, chamado com saída em JSON schema, sugere a correspondência entre as colunas da planilha do cliente e as colunas que o sistema espera.
- Redes neurais em Keras estimam a altura e o volume de cada árvore. Os resultados saem por árvore, parcela e talhão, com estatísticas do inventário, em CSV dentro de um ZIP.
- O processamento pesado roda em threads separadas (`asyncio.to_thread`) e os CSVs são gerados em paralelo, para a API continuar respondendo durante uma análise.
- O limite de parcelas por análise depende do plano do usuário, com uma regra separada para cada plano.
- Login por e-mail ou Google, recuperação de senha por e-mail e monitoramento com Sentry nos três serviços.

## O que fiz

- APIs REST em FastAPI, incluindo endpoints de inferência com modelos TensorFlow. Para cada operação, escolhi entre execução síncrona e assíncrona conforme a natureza dela.
- Interfaces em React e Next.js para validar inferências e inspecionar os resultados dos modelos.
- Testes unitários, de integração e end-to-end com Pytest.
- Pipelines de CI/CD com GitHub Actions e Docker, automatizando build, testes e deploy.
- Experimentação contínua e fine-tuning de redes neurais em dados florestais.
