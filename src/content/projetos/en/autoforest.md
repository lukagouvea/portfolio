---
titulo: AutoForest platform
resumo: AI platform for processing forestry data. Backend, inference APIs and deployment pipeline.
contexto: AutoForest · 2025–2026
tipo: Work · AutoForest
periodo: 09/2025 – 03/2026
ordem: 2
stack: [FastAPI, TensorFlow, Next.js, Docker, Python, Keras, Pandas, PostgreSQL, React, NextAuth, Pytest, GitHub Actions, Sentry]
links:
  ver: https://ai.autoforest.com.br/
arquitetura:
  descricao: An nginx-proxy with Let's Encrypt takes the traffic and forwards it to Next.js, which authenticates the user with NextAuth and passes the JWT on to two FastAPI services, one for users and one for analysis. The analysis API loads the Keras height and volume models once and processes spreadsheets in threads, so other requests aren't blocked. Next.js also calls an LLM on Groq to map the columns of the client's spreadsheet. On every push to main, GitHub Actions runs the tests, publishes three images to Docker Hub and updates the VPS.
---

## Context

AutoForest is a startup building autonomous AI systems for processing forestry data. I owned the backend and infrastructure while the platform moved from prototype to commercial product.

## How the platform works

- The user uploads the forest registry and inventory as Excel or JSON. An LLM, called with JSON schema output, suggests how the columns in the client's spreadsheet map to the columns the system expects.
- Keras neural networks estimate each tree's height and volume. Results come per tree, plot and stand, with inventory statistics, as CSVs in a ZIP.
- Heavy processing runs in separate threads (`asyncio.to_thread`) and the CSVs are generated in parallel, so the API keeps responding during an analysis.
- The plot limit per analysis depends on the user's plan, with a separate rule per plan.
- Email or Google sign-in, password recovery by email, and Sentry monitoring on all three services.

## What I did

- REST APIs in FastAPI, including inference endpoints for TensorFlow models. For each operation I chose synchronous or asynchronous execution based on what it does.
- React and Next.js interfaces for validating inferences and inspecting model output.
- Unit, integration and end-to-end tests with Pytest.
- CI/CD pipelines with GitHub Actions and Docker, automating build, tests and deployment.
- Ongoing experimentation and fine-tuning of neural networks on forestry data.
