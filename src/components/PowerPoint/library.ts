import {gameCategories, type PowerPointGame} from '@site/src/data/powerpoint';

export type GameFilters = {query: string; category: string; grade: string; purpose: string};

export function normalizeSearch(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLocaleLowerCase('vi').trim();
}

export function filterGames(games: PowerPointGame[], filters: GameFilters): PowerPointGame[] {
  const terms = normalizeSearch(filters.query).split(/\s+/).filter(Boolean);
  return games.filter(game => {
    const text = normalizeSearch([
      game.title, game.summary, game.purpose, game.organization, game.gameplay,
      gameCategories[game.category], ...(game.tags ?? []), ...(game.subjects ?? []),
    ].join(' '));
    return (!filters.category || game.category === filters.category) &&
      (!filters.grade || game.grades?.some(grade => String(grade) === filters.grade)) &&
      (!filters.purpose || game.purpose === filters.purpose) &&
      terms.every(term => text.includes(term));
  });
}

export function getGamePath(game: Pick<PowerPointGame, 'slug' | 'isSample'>): string {
  const isLocalSample = process.env.NODE_ENV === 'development' && game.isSample;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(game.slug) || game.slug === 'index' || (game.slug.startsWith('mau-') && !isLocalSample)) {
    throw new Error(`Slug PowerPoint không hợp lệ: ${game.slug}`);
  }
  return `/powerpoint/${game.slug}`;
}

// Chấp nhận URL web hoặc đường dẫn nội bộ; bỏ qua URL rỗng/sai giao thức.
export function getResourceUrl(value?: string): string | undefined {
  const url = value?.trim();
  if (!url || /[\s\\]/.test(url)) return undefined;
  if (url.startsWith('/') && !url.startsWith('//')) return url;
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol) ? url : undefined;
  } catch { return undefined; }
}
