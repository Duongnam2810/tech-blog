import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {gameCategories, type PowerPointGame} from '@site/src/data/powerpoint';
import GameImage from './GameImage';
import LibraryIcon from './LibraryIcon';
import {getResourceUrl} from './library';
import styles from '@site/src/pages/powerpoint/styles.module.css';

function formatDate(value?: string): string | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return undefined;
  return new Intl.DateTimeFormat('vi-VN', {timeZone: 'UTC'}).format(date);
}

export default function GameDetailPage({game, children}: {game: PowerPointGame; children?: ReactNode}): ReactNode {
  const demoUrl = getResourceUrl(game.demoUrl);
  const downloadUrl = getResourceUrl(game.downloadUrl);
  const updatedAt = formatDate(game.updatedAt);
  const hasTechnicalInfo = Boolean(game.requirements?.length) || game.macroStatus !== 'unknown';
  const hasMetadata = Boolean(game.author || game.version || game.license || updatedAt);

  return <Layout title={game.title} description={game.summary}>
    <main className={`${styles.page} container ${styles.detailPage}`}>
      <nav className={styles.breadcrumb} aria-label="Đường dẫn"><Link to="/powerpoint">Thư viện PowerPoint</Link><span aria-hidden="true"> / </span><span aria-current="page">{game.title}</span></nav>
      <header className={styles.detailHeader}>
        <p className={styles.eyebrow}>{gameCategories[game.category]}</p>
        <h1>{game.title}</h1><p className={styles.intro}>{game.summary}</p>
      </header>
      {game.isSample && <aside className={styles.notice}><strong>Dữ liệu mẫu — không phải trò chơi đã phát hành</strong><p>Mục tiêu, thời gian và cách chơi bên dưới chỉ minh họa bố cục. Chưa có tệp PowerPoint để tải hoặc kiểm tra tương thích.</p></aside>}
      <div className={styles.detailGrid}>
        <div className={styles.detailContent}>
          {game.thumbnail && <GameImage src={game.thumbnail} alt={`Ảnh bìa trò chơi ${game.title}`} />}
          {game.purpose && <section><h2>Mục tiêu dạy học</h2><p>{game.purpose}</p></section>}
          {(game.audience || game.grades?.length || game.subjects?.length || game.organization || game.durationMinutes != null) ?
            <section><h2>Đối tượng và cách tổ chức</h2><dl className={styles.metadata}>
              {game.audience && <><dt>Đối tượng</dt><dd>{game.audience}</dd></>}
              {Boolean(game.grades?.length) && <><dt>Khối lớp</dt><dd>{game.grades!.join(', ')}</dd></>}
              {Boolean(game.subjects?.length) && <><dt>Môn học</dt><dd>{game.subjects!.join(', ')}</dd></>}
              {game.organization && <><dt>Tổ chức</dt><dd>{game.organization}</dd></>}
              {game.durationMinutes != null && <><dt>Thời gian gợi ý</dt><dd>{game.durationMinutes} phút</dd></>}
            </dl></section> : null}
          {(game.gameplay || game.instructions?.length) ? <section><h2>Hướng dẫn cách chơi</h2>
            {game.gameplay && <p>{game.gameplay}</p>}
            {Boolean(game.instructions?.length) && <ol>{game.instructions!.map((step, index) => <li key={index}>{step}</li>)}</ol>}
          </section> : null}
          {hasTechnicalInfo && <section><h2>Yêu cầu kỹ thuật</h2>
            {Boolean(game.requirements?.length) && <ul>{game.requirements!.map((item, index) => <li key={index}>{item}</li>)}</ul>}
            {game.macroStatus === 'yes' && <aside className={styles.notice}><h3>Trò chơi có macro/VBA</h3><p>Kiểm tra tệp và nguồn chia sẻ trước khi bật macro. Chỉ bật khi bạn tin cậy nguồn; không bỏ qua cảnh báo bảo mật để chạy trò chơi.</p></aside>}
            {game.macroStatus === 'no' && <p>Không sử dụng macro/VBA.</p>}
          </section>}
          {Boolean(game.screenshots?.length) && <section><h2>Hình ảnh trò chơi</h2><div className={styles.screenshots}>
            {game.screenshots!.map((src, index) => <GameImage key={`${src}-${index}`} src={src} alt={`Màn hình ${index + 1} của trò chơi ${game.title}`} />)}
          </div></section>}
          {children && <section className="markdown">{children}</section>}
          {demoUrl && <section><h2>Video hoặc bản demo</h2><p><Link to={demoUrl}>Mở demo trò chơi {game.title} →</Link></p></section>}
        </div>
        <aside className={styles.resourcePanel} aria-labelledby="game-resources">
          <h2 id="game-resources">Tệp trò chơi</h2>
          <span className={styles.resourceIcon}><LibraryIcon name="download" /></span>
          {downloadUrl ? <Link className={styles.primaryAction} to={downloadUrl}>Mở liên kết tải xuống <LibraryIcon name="arrow" /></Link> : <p>Chưa có liên kết tải được công bố.</p>}
          {game.macroStatus === 'yes' && <p className={styles.cardMeta}>Tệp có macro/VBA. Đọc yêu cầu kỹ thuật trước khi sử dụng.</p>}
          {hasMetadata && <dl className={styles.metadata}>
            {game.author && <><dt>Tác giả</dt><dd>{game.author}</dd></>}
            {game.version && <><dt>Phiên bản</dt><dd>{game.version}</dd></>}
            {updatedAt && <><dt>Cập nhật</dt><dd><time dateTime={game.updatedAt}>{updatedAt}</time></dd></>}
            {game.license && <><dt>Điều kiện sử dụng</dt><dd>{game.license}</dd></>}
          </dl>}
          <Link className={styles.detailLink} to="/powerpoint">← Quay về thư viện</Link>
        </aside>
      </div>
      <p className={styles.back}><Link to="/powerpoint">← Xem tất cả trò chơi PowerPoint</Link></p>
    </main>
  </Layout>;
}
