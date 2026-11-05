import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type ResourceItem = {
  number: string;
  icon: string;
  title: string;
  description: string;
  detail: string;
  tone: 'blue' | 'mint' | 'amber' | 'violet';
};

const resources: ResourceItem[] = [
  {
    number: '01',
    icon: '▤',
    title: 'Bài giảng',
    description: 'Hệ thống bài giảng và nội dung học tập được trình bày rõ ràng.',
    detail: 'KHÁM PHÁ KIẾN THỨC',
    tone: 'blue',
  },
  {
    number: '02',
    icon: '▣',
    title: 'Trò chơi PowerPoint',
    description: 'Hoạt động tương tác giúp việc ôn tập trở nên sinh động hơn.',
    detail: 'HỌC QUA TRẢI NGHIỆM',
    tone: 'mint',
  },
  {
    number: '03',
    icon: '▧',
    title: 'Tài liệu',
    description: 'Tài liệu tham khảo, phiếu học tập và tệp tải xuống.',
    detail: 'ĐỌC & TẢI XUỐNG',
    tone: 'amber',
  },
  {
    number: '04',
    icon: '</>',
    title: 'Python & thuật toán',
    description: 'Làm quen với lập trình, tư duy logic và cách giải quyết vấn đề.',
    detail: 'BẮT ĐẦU LẬP TRÌNH',
    tone: 'violet',
  },
];

const grades = [
  {grade: 'Lớp 6', description: 'Nền tảng và khám phá'},
  {grade: 'Lớp 7', description: 'Mở rộng kiến thức'},
  {grade: 'Lớp 8', description: 'Vận dụng và thực hành'},
  {grade: 'Lớp 9', description: 'Hệ thống và ôn tập'},
];

function ArrowIcon(): ReactNode {
  return <span aria-hidden="true" className={styles.arrow}>↗</span>;
}

function ResourceCard({item}: {item: ResourceItem}): ReactNode {
  return (
    <article className={`${styles.resourceCard} ${styles[item.tone]}`}>
      <div className={styles.cardTopline}>
        <span className={styles.cardNumber}>{item.number}</span>
        <span className={styles.cardIcon} aria-hidden="true">{item.icon}</span>
      </div>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <div className={styles.cardFoot}>
        <span>{item.detail}</span>
        <ArrowIcon />
      </div>
    </article>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Trang chủ"
      description="Blog Tin Học – bài giảng, trò chơi PowerPoint, tài liệu học tập và lập trình Python."
    >
      <main className={styles.home}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroContent}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                KHÔNG GIAN HỌC TẬP SỐ
              </div>
              <h1>
                Khám phá tri thức.
                <br />
                <span>Sáng tạo mỗi ngày.</span>
              </h1>
              <p className={styles.heroDescription}>
                Bài giảng, trò chơi và tài liệu học tập được tập hợp trong một
                không gian. Cùng học, thực hành và khám phá thế giới công nghệ.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} to="/docs/intro">
                  Khám phá tài liệu <ArrowIcon />
                </Link>
                <a className={styles.secondaryButton} href="#learning-paths">
                  Khám phá theo lớp
                </a>
              </div>
              <div className={styles.heroMeta}>
                <span><i /> Học tập chủ động</span>
                <span><i /> Nội dung dễ tiếp cận</span>
              </div>
            </div>

            <div className={styles.heroVisual} aria-label="Minh họa học tập và lập trình">
              <div className={styles.visualGlow} />
              <div className={styles.visualCard}>
                <div className={styles.visualWindowBar}>
                  <span /><span /><span />
                  <small>learning.py</small>
                </div>
                <div className={styles.codeContent}>
                  <div><span className={styles.lineNo}>01</span><span className={styles.codePurple}>def</span> <span className={styles.codeBlue}>keep_learning</span>():</div>
                  <div><span className={styles.lineNo}>02</span>  skills = [<span className={styles.codeGreen}>'learn'</span>,</div>
                  <div><span className={styles.lineNo}>03</span>            <span className={styles.codeGreen}>'practice'</span>,</div>
                  <div><span className={styles.lineNo}>04</span>            <span className={styles.codeGreen}>'create'</span>]</div>
                  <div><span className={styles.lineNo}>05</span>  <span className={styles.codePurple}>return</span> skills</div>
                  <div className={styles.codeOutput}><span>▶</span> keep_learning()</div>
                </div>
              </div>
              <div className={`${styles.floatNote} ${styles.noteTop}`}>
                <span className={styles.noteIcon}>✳</span>
                <span><strong>Learn</strong><small>Học điều mới</small></span>
              </div>
              <div className={`${styles.floatNote} ${styles.noteBottom}`}>
                <span className={styles.noteIcon}>⌘</span>
                <span><strong>Create</strong><small>Biến ý tưởng thành sản phẩm</small></span>
              </div>
              <div className={styles.visualCaption}>LEARN · EXPLORE · CREATE</div>
            </div>
          </div>
        </section>

        <section className={styles.resourcesSection} id="explore">
          <div className="container">
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionEyebrow}>BẮT ĐẦU TỪ ĐÂY</span>
                <h2>Không gian học tập của bạn</h2>
                <p>Chọn một nội dung để bắt đầu khám phá.</p>
              </div>
              <Link to="/docs/intro" className={styles.textLink}>
                Xem tài liệu <ArrowIcon />
              </Link>
            </div>

            <div className={styles.resourceGrid}>
              {resources.map((item) => (
                <ResourceCard key={item.number} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.learningSection} id="learning-paths">
          <div className={`container ${styles.learningGrid}`}>
            <div className={styles.learningIntro}>
              <span className={styles.sectionEyebrow}>HỌC THEO LỘ TRÌNH</span>
              <h2>Kiến thức phù hợp với từng cấp học.</h2>
              <p>
                Từng bước tìm kiếm nội dung theo lớp, chủ đề và nhu cầu học tập.
                Hệ thống danh mục sẽ tiếp tục được hoàn thiện theo chương trình THCS.
              </p>
              <Link to="/docs/intro" className={styles.primaryButton}>
                Đi đến thư viện <ArrowIcon />
              </Link>
            </div>
            <div className={styles.gradeList}>
              {grades.map((item, index) => (
                <Link to="/docs/intro" className={styles.gradeItem} key={item.grade}>
                  <span className={styles.gradeIndex}>0{index + 1}</span>
                  <span className={styles.gradeText}>
                    <strong>{item.grade}</strong>
                    <small>{item.description}</small>
                  </span>
                  <ArrowIcon />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.aiSection}>
          <div className={`container ${styles.aiPanel}`}>
            <div className={styles.aiMark}>✳</div>
            <div className={styles.aiCopy}>
              <span className={styles.aiEyebrow}>ĐANG TRONG LỘ TRÌNH PHÁT TRIỂN</span>
              <h2>Học tập cùng trợ lý AI.</h2>
              <p>
                Trong giai đoạn tiếp theo, trợ lý AI sẽ hỗ trợ tìm kiếm tài liệu,
                giải thích khái niệm và gợi ý nội dung học tập phù hợp.
              </p>
            </div>
            <span className={styles.aiStatus}>SẮP RA MẮT</span>
          </div>
        </section>
      </main>
    </Layout>
  );
}
