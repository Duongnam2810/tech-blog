import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {powerpointGames} from '@site/src/data/powerpoint';
import GameCard from './GameCard';
import styles from './styles.module.css';

export default function FeaturedPowerPoint(): ReactNode {
  return <section className={`container ${styles.section}`} aria-labelledby="featured-powerpoint">
    <p className={styles.eyebrow}>POWERPOINT DẠY HỌC</p>
    <h2 id="featured-powerpoint">Thêm tương tác cho giờ học</h2>
    <p>Khám phá trò chơi PowerPoint và hướng dẫn chuẩn bị hoạt động trong lớp.</p>
    {powerpointGames.length > 0 && <div className={styles.grid}>{powerpointGames.slice(0, 3).map(game => <GameCard key={game.id} game={game} />)}</div>}
    <Link to="/powerpoint">Khám phá trang PowerPoint →</Link>
  </section>;
}
