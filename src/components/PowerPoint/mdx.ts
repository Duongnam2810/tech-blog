import {getPowerPointGame, type PowerPointGame} from '@site/src/data/powerpoint';

/** Tên file là khóa liên kết duy nhất; MDX không cần lặp lại metadata. */
export function getGameForMdxPage(source: string): PowerPointGame | undefined {
  // Nguồn chính nằm trong docs; vẫn nhận diện nguồn Pages cũ để giữ tương thích.
  const match = source.replace(/\\/g, '/').match(/^@site\/(?:docs|src\/pages)\/powerpoint\/([^/]+)\.mdx$/);
  if (!match) return undefined;

  const slug = match[1];
  return getPowerPointGame(slug);
}
