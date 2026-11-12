import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function PowerPointUsageGuide(): ReactNode {
  return <section id="usage" className={styles.usageSection} aria-labelledby="usage-title">
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
  </section>;
}
