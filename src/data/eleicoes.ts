// Painéis dos gráficos da página "projecao-eleitoral", a partir de projecao-eleitoral.json,
// extraído do repositório apuracoes-tse: reports/convergencia/series.json, a partir de 1% das seções.
//   Cada ponto: [% seções, parcial de A, poststrat, swing, hierarchical], em % dos válidos.
import projecao from './projecao-eleitoral.json';
import type { Painel } from '../components/GraficoLinhas.astro';

type Lang = 'pt' | 'en';
type Ano = keyof typeof projecao;

const anos = Object.keys(projecao) as Ano[];
const metodos = ['poststrat', 'swing', 'hierarchical'] as const;

const curto = (nome: string) =>
  ({
    'Luiz Inácio Lula da Silva': 'Lula',
    'Fernando Haddad': 'Haddad',
    'Jair Bolsonaro': 'Jair Bolsonaro',
    'Flávio Nantes Bolsonaro': 'Flávio Bolsonaro',
  })[nome] ?? nome;

const t = {
  pt: {
    parcial: 'parcial',
    projecao: 'projeção',
    metodos: ['Pós-estratificação', 'Swing', 'Hierárquico'],
    final: 'Resultado final',
    parcialA: 'Parcial apurada',
  },
  en: {
    parcial: 'tally',
    projecao: 'projection',
    metodos: ['Post-stratification', 'Swing', 'Hierarchical'],
    final: 'Final result',
    parcialA: 'Running tally',
  },
};

export const opcoesAno = anos.map((a) => ({ valor: a, rotulo: a }));
export const opcoesMetodo = (lang: Lang) =>
  metodos.map((m, i) => ({ valor: m, rotulo: t[lang].metodos[i] }));

// Projeção e parcial dos dois candidatos, por ano e método
export function paineisProjecao(lang: Lang): Painel[] {
  return anos.flatMap((ano) => {
    const { a, b, pontos } = projecao[ano];
    return metodos.map((m, i) => ({
      chave: [ano, m],
      titulo: `${ano} · ${t[lang].metodos[i]}`,
      series: [
        { nome: `${curto(a)} · ${t[lang].projecao}`, cor: 'a', pontos: pontos.map((p) => [p[0], p[2 + i]]) },
        { nome: `${curto(b)} · ${t[lang].projecao}`, cor: 'b', pontos: pontos.map((p) => [p[0], 100 - p[2 + i]]) },
        { nome: `${curto(a)} · ${t[lang].parcial}`, cor: 'a', traco: 'tracejado', pontos: pontos.map((p) => [p[0], p[1]]) },
        { nome: `${curto(b)} · ${t[lang].parcial}`, cor: 'b', traco: 'tracejado', pontos: pontos.map((p) => [p[0], 100 - p[1]]) },
      ],
    }));
  });
}

// Projeção de A pelos três métodos, com o resultado final e a faixa de ±0,5 ponto
export function paineisConvergencia(lang: Lang): Painel[] {
  return anos.map((ano) => {
    const { a, b, final, pontos } = projecao[ano];
    return {
      chave: [ano],
      titulo: `${ano} · ${a} × ${b}`,
      series: [
        ...metodos.map((_, i) => ({
          nome: t[lang].metodos[i],
          cor: `s${i + 1}`,
          pontos: pontos.map((p) => [p[0], p[2 + i]] as [number, number]),
        })),
        // A parcial fica fora da escala no início de 2018 e 2022; é cortada, não amplia o eixo
        {
          nome: t[lang].parcialA,
          cor: 'parcial',
          traco: 'pontilhado',
          foraDaEscala: true,
          pontos: pontos.map((p) => [p[0], p[1]] as [number, number]),
        },
      ],
      referencia: { y: final, nome: t[lang].final, faixa: 0.5 },
    };
  });
}
