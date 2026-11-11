import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import LibraryIcon from '@site/src/components/PowerPoint/LibraryIcon';
import ResourceLibrary from '@site/src/components/Resources/ResourceLibrary';
import {resources} from '@site/src/data/resources';
import styles from '@site/src/components/Resources/styles.module.css';

export default function ResourcesPage(): ReactNode {
  return <Layout title="Tài liệu Tin học THCS" description="Thư viện tài liệu tham khảo, đề kiểm tra và bài dạy Tin học lớp 6, 7, 8, 9 dành cho giáo viên và học sinh.">
    <main className={styles.page}>
      <header className={styles.hero}><div className={`container ${styles.heroGrid}`}>
        <div><p className={styles.eyebrow}><LibraryIcon name="book" /> HỌC LIỆU TIN HỌC · LỚP 6–9</p><h1>Tài liệu Tin học THCS<br /><span>Học tập và giảng dạy.</span></h1><p className={styles.intro}>Tìm tài liệu tham khảo, đề kiểm tra và bài dạy theo khối lớp. Đọc nội dung, xem thông tin và sử dụng học liệu phù hợp với nhu cầu của bạn.</p><a className={styles.heroLink} href="#resource-list">Khám phá thư viện <LibraryIcon name="arrow" /></a></div>
        <aside className={styles.heroNote} aria-label="Các nhóm tài liệu"><p className={styles.eyebrow}>BA NHÓM HỌC LIỆU</p><dl><dt>Tài liệu tham khảo</dt><dd>Kiến thức, hướng dẫn và nội dung tự học.</dd><dt>Đề kiểm tra</dt><dd>Đề ôn tập và đánh giá được phép chia sẻ.</dd><dt>Bài dạy</dt><dd>Kế hoạch bài dạy và học liệu giảng dạy.</dd></dl></aside>
      </div></header>
      <ResourceLibrary items={resources} />
    </main>
  </Layout>;
}
