import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {gameCategories, type PowerPointGame} from '@site/src/data/powerpoint';
import GameImage from './GameImage';
import LibraryIcon from './LibraryIcon';
import {getGamePath} from './library';
import styles from '@site/src/pages/powerpoint/styles.module.css';

export default function GameCard({game}: {game: PowerPointGame}): ReactNode {
  const path = getGamePath(game);
  return <article className={styles.card} data-category={game.category}>
    <Link to={path} className={styles.cardCover} aria-label={`Xem trò chơi ${game.title}`} tabIndex={-1}>
      <GameImage src={game.thumbnail} alt={`Giao diện trò chơi ${game.title}`} />
    </Link>
    <div className={styles.cardBody}>
      <p className={styles.badge}>{gameCategories[game.category]}</p>
      {game.isSample && <span className={styles.cardMeta}>Dữ liệu mẫu</span>}
      <h3><Link to={path}>{game.title}</Link></h3>
      <p className={styles.cardSummary}>{game.summary}</p>
      <div className={styles.cardTags}>
        {game.grades?.map(grade => <span key={grade}>Lớp {grade}</span>)}
        {game.organization && <span>{game.organization}</span>}
      </div>
      {game.purpose && <p className={styles.cardMeta}>{game.purpose}</p>}
      <Link className={styles.detailLink} to={path}>Xem chi tiết <LibraryIcon name="arrow" /><span className={styles.srOnly}>: {game.title}</span></Link>
    </div>
  </article>;
}
