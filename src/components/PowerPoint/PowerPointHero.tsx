import type {ReactNode} from 'react';
import LibraryIcon from './LibraryIcon';
import styles from './styles.module.css';

export default function PowerPointHero(): ReactNode {
  return <header className={styles.hero}>
    <div className={`container ${styles.heroGrid}`}>
      <div>
        <p className={styles.eyebrow}><LibraryIcon name="slides" /> POWERPOINT DẠY HỌC</p>
        <h1>Thư viện trò chơi<br /><span>PowerPoint</span></h1>
        <p className={styles.intro}>Thêm tương tác, khơi gợi hứng thú học tập. Khám phá trò chơi, chọn hoạt động phù hợp và chuẩn bị cho giờ học của bạn.</p>
        <div className={styles.heroActions}>
          <a className={styles.primaryAction} href="#games">Khám phá thư viện <LibraryIcon name="arrow" /></a>
          <a className={styles.textAction} href="#usage">Hướng dẫn sử dụng</a>
        </div>
      </div>
      <aside className={styles.heroNote} aria-labelledby="activity-guide">
        <div className={styles.noteHeading}><span className={styles.noteIcon}><LibraryIcon name="book" /></span><span>GỢI Ý CHO GIỜ HỌC</span></div>
        <h2 id="activity-guide">Chọn hoạt động theo<br />nhịp tiết học.</h2>
        <ul className={styles.activityList}>
          <li><span className={styles.activityDot} /><div><strong>Khởi động</strong><span>Gợi mở chủ đề, kết nối kiến thức.</span></div></li>
          <li><span className={styles.activityDot} /><div><strong>Luyện tập</strong><span>Cùng thực hành và trao đổi.</span></div></li>
          <li><span className={styles.activityDot} /><div><strong>Ôn tập</strong><span>Hệ thống kiến thức sau bài học.</span></div></li>
        </ul>
      </aside>
    </div>
  </header>;
}
