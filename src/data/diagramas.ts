// Diagramas de arquitetura, por slug de projeto.
// Cada diagrama tem os textos (nas duas línguas) e dois layouts com coordenadas:
// "largo" para desktop e "estreito" (vertical) para celular.
// Textos em fonte mono: títulos cabem em (largura - 24) / 7.2 caracteres,
// linhas em (largura - 24) / 6 caracteres.

export type Txt = string | { pt: string; en: string };
export type TipoAresta = 'sync' | 'async' | 'deploy';
type Ancora = 'start' | 'middle' | 'end';

export interface NoTexto {
  titulo: Txt;
  linhas?: Txt[];
  tipo?: 'principal' | 'externo' | 'congelado' | 'treinavel';
}

export interface Layout {
  w: number;
  h: number;
  // [x, y, largura, altura]; rótulo em [x, y, âncora]
  grupos: { id: string; caixa: [number, number, number, number]; rotulo: [number, number, Ancora] }[];
  nos: Record<string, [number, number, number, number]>;
  arestas: { texto?: string; tipo: TipoAresta; pontos: [number, number][]; rotulo?: [number, number, Ancora] }[];
}

export interface Diagrama {
  grupos: Record<string, Txt>;
  nos: Record<string, NoTexto>;
  arestas: Record<string, Txt>;
  largo: Layout;
  estreito: Layout;
  // Esconde a legenda de tipos de seta (útil quando só há fluxo de dados)
  semLegendaArestas?: boolean;
}

const fincontrol: Diagrama = {
  grupos: {
    app: { pt: 'VPS de aplicação', en: 'App VPS' },
    banco: { pt: 'VPS do banco', en: 'Database VPS' },
    cicd: { pt: 'CI/CD', en: 'CI/CD' },
  },
  nos: {
    nav: { titulo: { pt: 'Navegador', en: 'Browser' }, linhas: [{ pt: 'SPA React (Vite)', en: 'React SPA (Vite)' }, 'React Query'], tipo: 'externo' },
    cf: { titulo: 'Cloudflare', linhas: ['TLS', 'Tunnel', 'Access'], tipo: 'externo' },
    cfd: {
      titulo: 'cloudflared',
      linhas: [{ pt: 'conexão de saída', en: 'outbound only' }, 'HTTP · SSH'],
    },
    nginx: {
      titulo: 'Nginx :80',
      linhas: [
        { pt: 'build do React', en: 'React build' },
        { pt: 'proxy /api', en: '/api proxy' },
        { pt: 'rate limit login', en: 'login rate limit' },
      ],
    },
    api: {
      titulo: 'API :3001',
      linhas: ['Node.js + Hono', 'Prisma · Zod', { pt: 'auth JWT', en: 'JWT auth' }],
      tipo: 'principal',
    },
    pg: {
      titulo: 'PostgreSQL 18',
      linhas: [
        { pt: 'porta 5432', en: 'port 5432' },
        { pt: 'volume persistente', en: 'persistent volume' },
        { pt: 'ajustado p/ 1 GB', en: 'tuned for 1 GB RAM' },
      ],
    },
    github: { titulo: 'GitHub', linhas: [{ pt: 'push na main', en: 'push to main' }], tipo: 'externo' },
    actions: {
      titulo: 'GitHub Actions',
      linhas: [{ pt: 'testes + build', en: 'tests + build' }, { pt: 'PR: sem deploy', en: 'PRs: no deploy' }],
    },
    hub: { titulo: 'Docker Hub', linhas: ['backend:latest', 'frontend:latest'], tipo: 'externo' },
    alvo: { titulo: { pt: 'VPS de aplicação', en: 'App VPS' }, linhas: ['ssh via Access', 'compose up -d'] },
  },
  arestas: {
    https: 'HTTPS',
    tunel: { pt: 'túnel', en: 'tunnel' },
    local: ':80',
    api: '/api/*',
    tcp: 'TCP :5432',
    imagens: { pt: 'imagens', en: 'images' },
    ssh: 'scp + ssh',
    pull: 'pull',
    push: 'push',
  },
  largo: {
    w: 890,
    h: 390,
    grupos: [
      { id: 'app', caixa: [370, 20, 520, 160], rotulo: [384, 40, 'start'] },
      { id: 'banco', caixa: [710, 230, 180, 154], rotulo: [724, 250, 'start'] },
    ],
    nos: {
      nav: [0, 60, 120, 92],
      cf: [180, 60, 130, 92],
      cfd: [390, 60, 120, 92],
      nginx: [545, 60, 130, 92],
      api: [730, 60, 140, 92],
      pg: [730, 272, 140, 92],
      github: [0, 272, 120, 70],
      actions: [170, 272, 150, 70],
      hub: [390, 272, 150, 70],
    },
    arestas: [
      { texto: 'https', tipo: 'sync', pontos: [[120, 106], [180, 106]], rotulo: [150, 98, 'middle'] },
      { texto: 'tunel', tipo: 'sync', pontos: [[310, 106], [390, 106]], rotulo: [350, 98, 'middle'] },
      { texto: 'local', tipo: 'sync', pontos: [[510, 106], [545, 106]], rotulo: [527, 98, 'middle'] },
      { texto: 'api', tipo: 'sync', pontos: [[675, 106], [730, 106]], rotulo: [702, 98, 'middle'] },
      { texto: 'tcp', tipo: 'sync', pontos: [[845, 152], [845, 272]], rotulo: [837, 214, 'end'] },
      { texto: 'push', tipo: 'deploy', pontos: [[120, 307], [170, 307]], rotulo: [145, 299, 'middle'] },
      { texto: 'imagens', tipo: 'deploy', pontos: [[320, 307], [390, 307]], rotulo: [355, 299, 'middle'] },
      { texto: 'ssh', tipo: 'deploy', pontos: [[245, 272], [245, 152]], rotulo: [252, 214, 'start'] },
      { texto: 'pull', tipo: 'deploy', pontos: [[465, 272], [465, 180]], rotulo: [472, 230, 'start'] },
    ],
  },
  estreito: {
    w: 360,
    h: 1128,
    grupos: [
      { id: 'app', caixa: [0, 230, 360, 380], rotulo: [12, 252, 'start'] },
      { id: 'banco', caixa: [0, 650, 360, 172], rotulo: [12, 672, 'start'] },
      { id: 'cicd', caixa: [0, 862, 360, 262], rotulo: [12, 884, 'start'] },
    ],
    nos: {
      nav: [100, 0, 160, 70],
      cf: [20, 110, 320, 84],
      cfd: [20, 272, 320, 70],
      nginx: [20, 382, 320, 84],
      api: [20, 506, 320, 84],
      pg: [20, 714, 320, 84],
      github: [20, 902, 140, 70],
      actions: [200, 902, 140, 70],
      hub: [20, 1034, 140, 70],
      alvo: [200, 1034, 140, 70],
    },
    arestas: [
      { texto: 'https', tipo: 'sync', pontos: [[180, 70], [180, 110]], rotulo: [188, 94, 'start'] },
      { texto: 'tunel', tipo: 'sync', pontos: [[180, 194], [180, 272]], rotulo: [188, 216, 'start'] },
      { texto: 'local', tipo: 'sync', pontos: [[180, 342], [180, 382]], rotulo: [188, 366, 'start'] },
      { texto: 'api', tipo: 'sync', pontos: [[180, 466], [180, 506]], rotulo: [188, 490, 'start'] },
      { texto: 'tcp', tipo: 'sync', pontos: [[180, 590], [180, 714]], rotulo: [188, 634, 'start'] },
      { texto: 'push', tipo: 'deploy', pontos: [[160, 937], [200, 937]], rotulo: [180, 929, 'middle'] },
      { texto: 'imagens', tipo: 'deploy', pontos: [[240, 972], [240, 1000], [90, 1000], [90, 1034]], rotulo: [165, 994, 'middle'] },
      { texto: 'ssh', tipo: 'deploy', pontos: [[300, 972], [300, 1034]], rotulo: [294, 1016, 'end'] },
      { texto: 'pull', tipo: 'deploy', pontos: [[160, 1069], [200, 1069]], rotulo: [180, 1061, 'middle'] },
    ],
  },
};

const personalFight: Diagrama = {
  grupos: {
    compose: 'Docker Compose',
  },
  nos: {
    nav: { titulo: { pt: 'Navegador', en: 'Browser' }, linhas: ['React SPA · PWA', 'service worker'], tipo: 'externo' },
    bots: {
      titulo: { pt: 'Bots de prévia', en: 'Preview bots' },
      linhas: [{ pt: 'WhatsApp e outros', en: 'WhatsApp & others' }],
      tipo: 'externo',
    },
    caddy: {
      titulo: 'Caddy',
      linhas: [
        { pt: 'build do React', en: 'React build' },
        { pt: 'CSP e headers', en: 'CSP & headers' },
        { pt: 'proxy /api', en: '/api proxy' },
      ],
    },
    api: {
      titulo: 'Django + DRF',
      linhas: ['/api/v1/', 'Gunicorn', { pt: 'regras de negócio', en: 'business rules' }],
      tipo: 'principal',
    },
    pg: {
      titulo: 'PostgreSQL 17',
      linhas: [
        { pt: 'dados e extrato', en: 'data & ledger' },
        { pt: 'outbox de avisos', en: 'message outbox' },
      ],
    },
    redis: { titulo: 'Redis 7', linhas: [{ pt: 'gatilhos de tarefas', en: 'task triggers' }] },
    beat: {
      titulo: 'Celery beat',
      linhas: [
        { pt: 'rotinas agendadas', en: 'scheduled jobs' },
        { pt: 'lembretes 24h e 1h', en: '24h/1h reminders' },
      ],
    },
    worker: { titulo: 'Celery worker', linhas: [{ pt: 'envia e-mail e push', en: 'sends email & push' }] },
    smtp: { titulo: 'SMTP', linhas: ['e-mail'], tipo: 'externo' },
    push: { titulo: 'Web Push', linhas: ['VAPID'], tipo: 'externo' },
  },
  arestas: {
    https: 'HTTPS',
    previa: { pt: 'prévia de link', en: 'link preview' },
    api: '/api/*',
    sql: 'SQL',
    commit: 'on_commit',
    agenda: { pt: 'agenda', en: 'jobs' },
    tarefas: { pt: 'tarefas', en: 'tasks' },
    outbox: 'outbox',
  },
  largo: {
    w: 890,
    h: 370,
    grupos: [{ id: 'compose', caixa: [170, 0, 560, 370], rotulo: [186, 26, 'start'] }],
    nos: {
      nav: [0, 50, 130, 72],
      bots: [0, 184, 130, 58],
      caddy: [190, 50, 140, 92],
      api: [380, 50, 140, 92],
      pg: [570, 50, 140, 92],
      beat: [190, 250, 140, 92],
      redis: [380, 250, 140, 92],
      worker: [570, 250, 140, 92],
      smtp: [760, 240, 130, 50],
      push: [760, 300, 130, 50],
    },
    arestas: [
      { texto: 'https', tipo: 'sync', pontos: [[130, 86], [190, 86]], rotulo: [160, 78, 'middle'] },
      { texto: 'previa', tipo: 'sync', pontos: [[130, 213], [158, 213], [158, 126], [190, 126]], rotulo: [152, 174, 'end'] },
      { texto: 'api', tipo: 'sync', pontos: [[330, 96], [380, 96]], rotulo: [355, 88, 'middle'] },
      { texto: 'sql', tipo: 'sync', pontos: [[520, 96], [570, 96]], rotulo: [545, 88, 'middle'] },
      { texto: 'commit', tipo: 'async', pontos: [[450, 142], [450, 250]], rotulo: [457, 200, 'start'] },
      { texto: 'agenda', tipo: 'async', pontos: [[330, 296], [380, 296]], rotulo: [355, 288, 'middle'] },
      { texto: 'tarefas', tipo: 'async', pontos: [[520, 296], [570, 296]], rotulo: [545, 288, 'middle'] },
      { texto: 'outbox', tipo: 'async', pontos: [[640, 250], [640, 142]], rotulo: [647, 200, 'start'] },
      { tipo: 'async', pontos: [[710, 265], [760, 265]] },
      { tipo: 'async', pontos: [[710, 325], [760, 325]] },
    ],
  },
  estreito: {
    w: 360,
    h: 730,
    grupos: [{ id: 'compose', caixa: [0, 104, 360, 528], rotulo: [180, 124, 'middle'] }],
    nos: {
      nav: [20, 0, 150, 70],
      bots: [190, 0, 150, 56],
      caddy: [20, 140, 320, 84],
      api: [20, 270, 320, 84],
      pg: [20, 410, 150, 70],
      redis: [190, 410, 150, 70],
      worker: [20, 540, 150, 70],
      beat: [190, 540, 150, 70],
      smtp: [20, 672, 150, 56],
      push: [190, 672, 150, 56],
    },
    arestas: [
      { texto: 'https', tipo: 'sync', pontos: [[95, 70], [95, 140]], rotulo: [102, 92, 'start'] },
      { texto: 'previa', tipo: 'sync', pontos: [[265, 56], [265, 140]], rotulo: [272, 88, 'start'] },
      { texto: 'api', tipo: 'sync', pontos: [[180, 224], [180, 270]], rotulo: [187, 251, 'start'] },
      { texto: 'sql', tipo: 'sync', pontos: [[95, 354], [95, 410]], rotulo: [102, 386, 'start'] },
      { texto: 'commit', tipo: 'async', pontos: [[265, 354], [265, 410]], rotulo: [272, 386, 'start'] },
      { texto: 'tarefas', tipo: 'async', pontos: [[230, 480], [230, 508], [95, 508], [95, 540]], rotulo: [162, 502, 'middle'] },
      { texto: 'agenda', tipo: 'async', pontos: [[300, 540], [300, 480]], rotulo: [307, 514, 'start'] },
      { texto: 'outbox', tipo: 'async', pontos: [[40, 540], [40, 480]], rotulo: [47, 526, 'start'] },
      { tipo: 'async', pontos: [[95, 610], [95, 672]] },
      { tipo: 'async', pontos: [[140, 610], [140, 646], [265, 646], [265, 672]] },
    ],
  },
};

const autoforest: Diagrama = {
  grupos: {
    vps: 'VPS · Docker Compose',
    cicd: 'CI/CD',
  },
  nos: {
    nav: { titulo: { pt: 'Navegador', en: 'Browser' }, linhas: [{ pt: 'upload de planilhas', en: 'spreadsheet upload' }], tipo: 'externo' },
    groq: { titulo: 'Groq (LLM)', linhas: [{ pt: 'mapeia colunas', en: 'maps columns' }], tipo: 'externo' },
    proxy: {
      titulo: 'nginx-proxy',
      linhas: [':80 · :443', "Let's Encrypt", { pt: 'roteia por domínio', en: 'routes by domain' }],
    },
    next: {
      titulo: 'Next.js 16',
      linhas: ['NextAuth + Google', { pt: 'rotas /api (BFF)', en: '/api routes (BFF)' }, { pt: 'repassa o JWT', en: 'forwards the JWT' }],
    },
    users: {
      titulo: { pt: 'API usuários', en: 'Users API' },
      linhas: ['FastAPI', 'SQLAlchemy · Alembic', 'JWT · Argon2'],
    },
    analysis: {
      titulo: { pt: 'API análise', en: 'Analysis API' },
      linhas: ['FastAPI + Keras', { pt: 'altura e volume', en: 'height & volume' }, { pt: 'modelos em cache', en: 'models cached' }],
      tipo: 'principal',
    },
    pg: {
      titulo: 'PostgreSQL 18',
      linhas: [
        { pt: 'rede interna', en: 'internal network' },
        { pt: 'sem porta exposta', en: 'no exposed port' },
      ],
    },
    smtp: { titulo: 'SMTP', linhas: [{ pt: 'e-mails', en: 'emails' }], tipo: 'externo' },
    actions: {
      titulo: 'GitHub Actions',
      linhas: [
        { pt: 'testes em Docker', en: 'tests in Docker' },
        { pt: '3 imagens', en: '3 images' },
      ],
    },
    hub: { titulo: 'Docker Hub', linhas: ['autoforest/iaforest'], tipo: 'externo' },
    alvo: { titulo: 'VPS', linhas: ['compose pull', { pt: 'espera healthchecks', en: 'waits healthchecks' }] },
  },
  arestas: {
    https: 'HTTPS',
    p3000: ':3000',
    users: '/users',
    analysis: '/analysis',
    sql: 'SQL',
    groq: 'JSON schema',
    push: 'push',
    pull: 'pull',
    ssh: 'scp + ssh',
  },
  largo: {
    w: 890,
    h: 560,
    grupos: [
      { id: 'vps', caixa: [170, 100, 560, 340], rotulo: [186, 126, 'start'] },
    ],
    nos: {
      groq: [380, 0, 140, 60],
      nav: [0, 160, 130, 72],
      proxy: [190, 150, 140, 92],
      next: [380, 150, 140, 92],
      users: [570, 150, 140, 92],
      analysis: [380, 330, 140, 92],
      pg: [570, 330, 140, 92],
      smtp: [760, 166, 130, 60],
      actions: [190, 480, 150, 72],
      hub: [380, 480, 140, 72],
    },
    arestas: [
      { texto: 'https', tipo: 'sync', pontos: [[130, 196], [190, 196]], rotulo: [160, 188, 'middle'] },
      { texto: 'p3000', tipo: 'sync', pontos: [[330, 196], [380, 196]], rotulo: [355, 188, 'middle'] },
      { texto: 'users', tipo: 'sync', pontos: [[520, 196], [570, 196]], rotulo: [545, 188, 'middle'] },
      { texto: 'groq', tipo: 'sync', pontos: [[450, 150], [450, 60]], rotulo: [457, 84, 'start'] },
      { texto: 'analysis', tipo: 'sync', pontos: [[450, 242], [450, 330]], rotulo: [457, 290, 'start'] },
      { texto: 'sql', tipo: 'sync', pontos: [[640, 242], [640, 330]], rotulo: [647, 290, 'start'] },
      { texto: 'sql', tipo: 'sync', pontos: [[520, 376], [570, 376]], rotulo: [545, 368, 'middle'] },
      { tipo: 'sync', pontos: [[710, 196], [760, 196]] },
      { texto: 'push', tipo: 'deploy', pontos: [[340, 516], [380, 516]], rotulo: [360, 508, 'middle'] },
      { texto: 'ssh', tipo: 'deploy', pontos: [[265, 480], [265, 440]], rotulo: [272, 464, 'start'] },
      { texto: 'pull', tipo: 'deploy', pontos: [[450, 480], [450, 440]], rotulo: [457, 464, 'start'] },
    ],
  },
  estreito: {
    w: 360,
    h: 860,
    grupos: [
      { id: 'vps', caixa: [0, 90, 360, 410], rotulo: [180, 112, 'middle'] },
      { id: 'cicd', caixa: [0, 600, 360, 250], rotulo: [12, 620, 'start'] },
    ],
    nos: {
      nav: [20, 0, 150, 56],
      groq: [190, 0, 150, 56],
      proxy: [20, 130, 150, 84],
      next: [190, 130, 150, 84],
      analysis: [20, 270, 150, 84],
      users: [190, 270, 150, 84],
      pg: [20, 410, 150, 70],
      smtp: [190, 530, 150, 56],
      actions: [20, 640, 150, 70],
      hub: [190, 640, 150, 56],
      alvo: [190, 766, 150, 70],
    },
    arestas: [
      { texto: 'https', tipo: 'sync', pontos: [[95, 56], [95, 130]], rotulo: [102, 82, 'start'] },
      { texto: 'groq', tipo: 'sync', pontos: [[265, 130], [265, 56]], rotulo: [272, 82, 'start'] },
      { tipo: 'sync', pontos: [[170, 172], [190, 172]] },
      { texto: 'users', tipo: 'sync', pontos: [[265, 214], [265, 270]], rotulo: [272, 246, 'start'] },
      { texto: 'analysis', tipo: 'sync', pontos: [[230, 214], [230, 242], [95, 242], [95, 270]], rotulo: [162, 236, 'middle'] },
      { texto: 'sql', tipo: 'sync', pontos: [[95, 354], [95, 410]], rotulo: [102, 386, 'start'] },
      { texto: 'sql', tipo: 'sync', pontos: [[245, 354], [245, 382], [140, 382], [140, 410]], rotulo: [192, 376, 'middle'] },
      { tipo: 'sync', pontos: [[310, 354], [310, 530]] },
      { tipo: 'deploy', pontos: [[170, 668], [190, 668]] },
      { texto: 'pull', tipo: 'deploy', pontos: [[265, 696], [265, 766]], rotulo: [272, 734, 'start'] },
      { texto: 'ssh', tipo: 'deploy', pontos: [[95, 710], [95, 801], [190, 801]], rotulo: [102, 793, 'start'] },
    ],
  },
};

// Adaptação espectral do CascadePSP (TCC): dez bandas na primeira convolução
const cascadepspEspectral: Diagrama = {
  semLegendaArestas: true,
  grupos: {
    conv1: 'Conv1 · 13 → 64',
  },
  nos: {
    x10: { titulo: { pt: 'X · 10 bandas', en: 'X · 10 bands' }, linhas: [{ pt: 'mediana Sentinel-2', en: 'Sentinel-2 median' }], tipo: 'externo' },
    mascaras: { titulo: { pt: '3 máscaras', en: '3 masks' }, linhas: ['C · S8 · S4'], tipo: 'externo' },
    rgb: { titulo: { pt: 'RGB + máscaras', en: 'RGB + masks' }, linhas: [{ pt: '6 canais', en: '6 channels' }], tipo: 'congelado' },
    extra: {
      titulo: { pt: '7 bandas extras', en: '7 extra bands' },
      linhas: [
        { pt: 'conexões novas', en: 'new connections' },
        { pt: 'pesos iniciais = 0', en: 'initial weights = 0' },
      ],
      tipo: 'treinavel',
    },
    encoder: { titulo: 'Encoder ResNet-50', linhas: ['+ BatchNorm'], tipo: 'congelado' },
    psp: { titulo: 'PSP', tipo: 'treinavel' },
    decoder: { titulo: 'Decoder', linhas: [{ pt: 'fusão espectral', en: 'spectral fusion' }], tipo: 'treinavel' },
    x10b: { titulo: { pt: 'X · 10 bandas', en: 'X · 10 bands' }, tipo: 'externo' },
    saida: { titulo: { pt: 'Máscara refinada', en: 'Refined mask' } },
  },
  arestas: {},
  largo: {
    w: 660,
    h: 380,
    grupos: [{ id: 'conv1', caixa: [210, 0, 230, 210], rotulo: [226, 22, 'start'] }],
    nos: {
      x10: [0, 40, 170, 64],
      mascaras: [0, 140, 170, 56],
      rgb: [230, 36, 190, 60],
      extra: [230, 116, 190, 74],
      x10b: [230, 226, 190, 44],
      encoder: [480, 20, 170, 64],
      psp: [480, 120, 170, 44],
      decoder: [480, 216, 170, 64],
      saida: [480, 320, 170, 44],
    },
    arestas: [
      { tipo: 'sync', pontos: [[170, 72], [210, 72]] },
      { tipo: 'sync', pontos: [[170, 168], [210, 168]] },
      { tipo: 'sync', pontos: [[440, 52], [480, 52]] },
      { tipo: 'sync', pontos: [[565, 84], [565, 120]] },
      { tipo: 'sync', pontos: [[565, 164], [565, 216]] },
      { tipo: 'sync', pontos: [[420, 248], [480, 248]] },
      { tipo: 'sync', pontos: [[565, 280], [565, 320]] },
    ],
  },
  estreito: {
    w: 360,
    h: 530,
    grupos: [{ id: 'conv1', caixa: [0, 80, 360, 132], rotulo: [12, 102, 'start'] }],
    nos: {
      x10: [20, 0, 150, 56],
      mascaras: [190, 0, 150, 56],
      rgb: [20, 120, 150, 60],
      extra: [190, 120, 150, 74],
      encoder: [20, 240, 150, 56],
      psp: [20, 326, 150, 44],
      decoder: [20, 400, 150, 56],
      x10b: [190, 406, 150, 44],
      saida: [20, 486, 150, 44],
    },
    arestas: [
      { tipo: 'sync', pontos: [[95, 56], [95, 80]] },
      { tipo: 'sync', pontos: [[265, 56], [265, 80]] },
      { tipo: 'sync', pontos: [[95, 212], [95, 240]] },
      { tipo: 'sync', pontos: [[95, 296], [95, 326]] },
      { tipo: 'sync', pontos: [[95, 370], [95, 400]] },
      { tipo: 'sync', pontos: [[190, 428], [170, 428]] },
      { tipo: 'sync', pontos: [[95, 456], [95, 486]] },
    ],
  },
};

export const diagramas: Record<string, Diagrama> = {
  'cascadepsp-espectral': cascadepspEspectral,
  autoforest,
  fincontrol,
  'personal-fight': personalFight,
};
