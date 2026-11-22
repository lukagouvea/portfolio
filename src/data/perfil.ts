import type { Lang } from '../i18n';

export const contato = {
  email: 'luka.gouvea0@gmail.com',
  linkedin: 'https://linkedin.com/in/luka-gouvea',
  github: 'https://github.com/lukagouvea',
};

// Caminho em /public. Deixe null enquanto o PDF não estiver lá: o link some.
export const curriculo: Record<Lang, string | null> = {
  pt: null,
  en: null,
};

type Experiencia = {
  empresa: string;
  url?: string;
  cargo: string;
  periodo: string;
  itens: string[];
  stack?: string[];
};

export const experiencias: Record<Lang, Experiencia[]> = {
  pt: [
    {
      empresa: 'Nutree (UFV)',
      cargo: 'Desenvolvedor de Software',
      periodo: '10/2023 – 10/2026',
      itens: [
        'Reconstruí e mantenho a plataforma de simulação florestal usada pelos pesquisadores do centro.',
        'Paralelizei o motor de simulação com threading e otimizei as consultas SQL (ganho de 95% de performance).',
        'Implementei a distribuição do software desktop com atualização automática e controle de versões.',
        'Coordenei uma equipe pequena, incluindo a orientação de um estagiário.',
      ],
      stack: ['Python', 'Tkinter', 'SQLAlchemy', 'SQLite', 'FastAPI', 'GitHub Actions', 'Docker', 'Sentry'],
    },
    {
      empresa: 'AutoForest',
      url: 'https://ai.autoforest.com.br/',
      cargo: 'Desenvolvedor de Software e ML',
      periodo: '09/2025 – 03/2026',
      itens: [
        'Responsável pelo backend e pela infraestrutura na transição da plataforma de protótipo para produto comercial.',
        'APIs REST em FastAPI com endpoints de inferência de modelos TensorFlow.',
        'Telas em React e Next.js para validação de inferências.',
        'Testes com Pytest, CI/CD com GitHub Actions e Docker, fine-tuning de redes neurais.',
      ],
      stack: ['Python', 'FastAPI', 'TensorFlow', 'Pandas', 'React', 'Next.js', 'Pytest', 'Docker', 'Sentry'],
    },
    {
      empresa: 'Câmara Municipal de Viçosa',
      cargo: 'Estagiário de TI',
      periodo: '07/2026 – 09/2026',
      itens: ['Configuração de servidor web, DNS e firewall; suporte aos usuários.'],
    },
  ],
  en: [
    {
      empresa: 'Nutree (UFV)',
      cargo: 'Software Developer',
      periodo: '10/2023 – 10/2026',
      itens: [
        'Rebuilt and maintain the forest simulation platform used by the center’s researchers.',
        'Parallelized the simulation engine with threading and optimized SQL queries (95% performance gain).',
        'Built the desktop app’s distribution pipeline, with automatic updates and versioning.',
        'Coordinated a small team, including mentoring an intern.',
      ],
      stack: ['Python', 'Tkinter', 'SQLAlchemy', 'SQLite', 'FastAPI', 'GitHub Actions', 'Docker', 'Sentry'],
    },
    {
      empresa: 'AutoForest',
      url: 'https://ai.autoforest.com.br/',
      cargo: 'Software and ML Developer',
      periodo: '09/2025 – 03/2026',
      itens: [
        'Owned backend and infrastructure as the platform moved from prototype to commercial product.',
        'REST APIs in FastAPI, including inference endpoints for TensorFlow models.',
        'React and Next.js screens for validating inferences.',
        'Testing with Pytest, CI/CD with GitHub Actions and Docker, neural network fine-tuning.',
      ],
      stack: ['Python', 'FastAPI', 'TensorFlow', 'Pandas', 'React', 'Next.js', 'Pytest', 'Docker', 'Sentry'],
    },
    {
      empresa: 'Viçosa City Council',
      cargo: 'IT Intern',
      periodo: '07/2026 – 09/2026',
      itens: ['Web server, DNS and firewall configuration; user support.'],
    },
  ],
};

type Formacao = { curso: string; instituicao: string; periodo: string; nota?: string };

export const formacao: Record<Lang, Formacao[]> = {
  pt: [
    {
      curso: 'Ciência da Computação',
      instituicao: 'UFV',
      periodo: '2023 – 2026',
      nota: 'TCC sobre refinamento de máscaras de segmentação agrícola, orientado pelo prof. Hugo Neves.',
    },
    { curso: 'Técnico em Informática', instituicao: 'IF Sudeste MG', periodo: '2014 – 2016' },
  ],
  en: [
    {
      curso: 'B.Sc. in Computer Science',
      instituicao: 'UFV',
      periodo: '2023 – 2026',
      nota: 'Thesis on refining agricultural segmentation masks, advised by Prof. Hugo Neves.',
    },
    { curso: 'Technical degree in Computing', instituicao: 'IF Sudeste MG', periodo: '2014 – 2016' },
  ],
};

export const habilidades: Record<Lang, [string, string][]> = {
  pt: [
    ['linguagens', 'Python, TypeScript, JavaScript, SQL'],
    ['backend', 'Django e DRF, FastAPI, Hono, SQLAlchemy e Alembic, Prisma, Celery'],
    ['dados', 'PostgreSQL, SQLite, Redis, Pandas, NumPy'],
    ['machine learning', 'PyTorch, TensorFlow e Keras, fine-tuning, transfer learning, LoRA'],
    ['visão computacional', 'Segmentação semântica, classificação de imagens, SAM, MediaPipe'],
    ['frontend', 'React, Next.js, TanStack Query, Vite'],
    ['infra', 'Docker Compose, Nginx, Caddy, GitHub Actions, Sentry, VPS Linux'],
    ['testes', 'Pytest, Vitest, Playwright'],
    ['idiomas', 'Português (nativo), inglês (avançado)'],
  ],
  en: [
    ['languages', 'Python, TypeScript, JavaScript, SQL'],
    ['backend', 'Django and DRF, FastAPI, Hono, SQLAlchemy and Alembic, Prisma, Celery'],
    ['data', 'PostgreSQL, SQLite, Redis, Pandas, NumPy'],
    ['machine learning', 'PyTorch, TensorFlow and Keras, fine-tuning, transfer learning, LoRA'],
    ['computer vision', 'Semantic segmentation, image classification, SAM, MediaPipe'],
    ['frontend', 'React, Next.js, TanStack Query, Vite'],
    ['infra', 'Docker Compose, Nginx, Caddy, GitHub Actions, Sentry, Linux VPS'],
    ['testing', 'Pytest, Vitest, Playwright'],
    ['spoken', 'Portuguese (native), English (advanced)'],
  ],
};
