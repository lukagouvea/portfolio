export type Lang = 'pt' | 'en';

export const htmlLang: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };

export const rotas = {
  inicio: (lang: Lang) => (lang === 'pt' ? '/' : '/en/'),
  projeto: (lang: Lang, slug: string) =>
    lang === 'pt' ? `/projetos/${slug}/` : `/en/projects/${slug}/`,
};

export const ui = {
  pt: {
    descricao:
      'Luka Gouvêa, desenvolvedor de software e machine learning. Backend, infraestrutura e deep learning aplicado a dados florestais e agrícolas.',
    nav: { experiencia: 'experiência', projetos: 'projetos', formacao: 'formação', contato: 'contato' },
    outroIdioma: { rotulo: 'en', aria: 'English version' },
    tema: { claro: 'Mudar para tema claro', escuro: 'Mudar para tema escuro' },
    hero: [
      'Desenvolvedor de software e machine learning. Estudante de Ciência da Computação na UFV.',
      'Trabalho com backend, infraestrutura e deep learning, principalmente com dados florestais e agrícolas.',
    ],
    curriculo: 'Currículo.pdf',
    secoes: {
      experiencia: 'Experiência',
      projetos: 'Projetos',
      formacao: 'Formação',
      habilidades: 'Habilidades',
      contato: 'Contato',
    },
    projeto: {
      voltar: '← projetos',
      todos: '← todos os projetos',
      codigo: 'Código',
      demo: 'Demo',
      ver: 'Ver projeto',
      arquitetura: 'Arquitetura',
      stack: 'Stack',
    },
    rodape: 'Viçosa, MG',
  },
  en: {
    descricao:
      'Luka Gouvêa, software and machine learning developer. Backend, infrastructure and deep learning applied to forestry and agricultural data.',
    nav: { experiencia: 'experience', projetos: 'projects', formacao: 'education', contato: 'contact' },
    outroIdioma: { rotulo: 'pt', aria: 'Versão em português' },
    tema: { claro: 'Switch to light theme', escuro: 'Switch to dark theme' },
    hero: [
      'Software and machine learning developer. Computer Science student at the Federal University of Viçosa (UFV), Brazil.',
      'I work on backend, infrastructure and deep learning, mostly with forestry and agricultural data.',
    ],
    curriculo: 'Resume.pdf',
    secoes: {
      experiencia: 'Experience',
      projetos: 'Projects',
      formacao: 'Education',
      habilidades: 'Skills',
      contato: 'Contact',
    },
    projeto: {
      voltar: '← projects',
      todos: '← all projects',
      codigo: 'Code',
      demo: 'Demo',
      ver: 'View project',
      arquitetura: 'Architecture',
      stack: 'Stack',
    },
    rodape: 'Viçosa, Brazil',
  },
} as const;
