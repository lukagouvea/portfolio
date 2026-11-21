import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type Projeto = CollectionEntry<'projetos'>;

// id no formato "<lang>/<slug>"
export const slugDe = (p: Projeto) => p.id.split('/').slice(1).join('/');

export async function projetosDe(lang: Lang) {
  const todos = await getCollection('projetos', (p) => p.id.startsWith(`${lang}/`));
  return todos.sort((a, b) => a.data.ordem - b.data.ordem);
}
