import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {powerpointGames} from '@site/src/data/powerpoint';
import {powerpointSamples} from '@site/src/data/powerpointSamples';
import GameLibrary from '@site/src/components/PowerPoint/GameLibrary';
import LibraryIcon from '@site/src/components/PowerPoint/LibraryIcon';
import styles from './styles.module.css';

export default function PowerPointPage(): ReactNode {
  return (
    <Layout title="Thư viện trò chơi PowerPoint" description="Thư viện trò chơi PowerPoint phục vụ dạy học: tìm hoạt động phù hợp, xem hướng dẫn và truy cập tệp chia sẻ khi có.">
      <main className={styles.page}>
        <header className={styles.hero}>
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
        </header>

        <GameLibrary games={powerpointGames.length > 0 ? powerpointGames : powerpointSamples} />

        <section id="usage" className={styles.usageSection} aria-labelledby="usage-title">
          <div className="container">
          <p className={styles.eyebrow}>HƯỚNG DẪN SỬ DỤNG</p>
          <h2 id="usage-title">Sẵn sàng cho một giờ học tương tác</h2>
          <p className={styles.sectionDescription}>Một vài bước chuẩn bị để hoạt động trong lớp diễn ra thuận lợi.</p>
          <ol className={styles.steps}>
            <li><span className={styles.stepNumber} aria-hidden="true">01</span><h3>Chọn hoạt động phù hợp</h3><p>Đọc mục tiêu, đối tượng và cách tổ chức. Chọn trò chơi phù hợp với nội dung bài học và thời gian của lớp.</p></li>
            <li><span className={styles.stepNumber} aria-hidden="true">02</span><h3>Kiểm tra và chạy thử</h3><p>Xem yêu cầu phiên bản PowerPoint của từng tệp. Kiểm tra font, âm thanh, nút điều khiển và chế độ trình chiếu trên máy sử dụng.</p></li>
            <li><span className={styles.stepNumber} aria-hidden="true">03</span><h3>Chuẩn bị cho lớp học</h3><p>Nếu được phép chỉnh sửa, lưu một bản sao rồi thay câu hỏi. Thống nhất luật chơi và cách tính điểm trước khi bắt đầu.</p></li>
          </ol>
          <aside className={styles.notice}><h3>Lưu ý về tệp có macro</h3><p>Với tệp có macro/VBA, chỉ bật macro khi bạn tin cậy nguồn và đã kiểm tra tệp. Không bật macro chỉ để bỏ qua cảnh báo bảo mật. Đọc yêu cầu tương thích riêng của từng trò chơi trước khi tải.</p></aside>
          <p className={styles.back}><Link to="/">← Về trang chủ</Link></p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
