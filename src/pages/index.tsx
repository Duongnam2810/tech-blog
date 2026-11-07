import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Layout from '@theme/Layout';

import styles from './index.module.css';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

type ResourceCategory = {
  number: string;
  icon: string;
  title: string;
  description: string;
  detail: string;
  tone: 'blue' | 'mint' | 'amber' | 'violet';
  href: string;
};

type GradeItem = {
  grade: string;
  label: string;
  description: string;
  accent: string;
  href: string;
};

type FeaturedItem = {
  type: string;
  typeTone: 'blue' | 'mint' | 'amber' | 'violet';
  title: string;
  description: string;
  grade?: string;
  subject?: string;
  href: string;
};

type ExampleQuestion = {
  icon: string;
  text: string;
};

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const resources: ResourceCategory[] = [
  {
    number: '01',
    icon: '▤',
    title: 'Bài giảng',
    description: 'Hệ thống bài giảng PowerPoint được thiết kế trực quan, dễ hiểu — phục vụ giảng dạy và tự học.',
    detail: 'KHÁM PHÁ BÀI GIẢNG',
    tone: 'blue',
    href: '/docs/intro',
  },
  {
    number: '02',
    icon: '▣',
    title: 'Trò chơi PowerPoint',
    description: 'Hoạt động tương tác trên PowerPoint giúp ôn tập kiến thức qua trải nghiệm thú vị.',
    detail: 'CHƠI VÀ HỌC',
    tone: 'mint',
    href: '/docs/intro',
  },
  {
    number: '03',
    icon: '▧',
    title: 'Tài liệu',
    description: 'Phiếu học tập, tài liệu tham khảo và các tệp tải xuống hỗ trợ học tập.',
    detail: 'TẢI TÀI LIỆU',
    tone: 'amber',
    href: '/docs/intro',
  },
  {
    number: '04',
    icon: '</>',
    title: 'Python & Thuật toán',
    description: 'Lập trình Python từ cơ bản, tư duy logic, thuật toán và bài tập thực hành.',
    detail: 'BẮT ĐẦU LẬP TRÌNH',
    tone: 'violet',
    href: '/docs/python-tutorial/bai-1-lam-quen-python',
  },
];

const grades: GradeItem[] = [
  {grade: '6', label: 'Lớp 6', description: 'Nền tảng & khám phá', accent: '#356AE6', href: '/docs/intro'},
  {grade: '7', label: 'Lớp 7', description: 'Mở rộng kiến thức', accent: '#0d9488', href: '/docs/intro'},
  {grade: '8', label: 'Lớp 8', description: 'Vận dụng & thực hành', accent: '#d97706', href: '/docs/intro'},
  {grade: '9', label: 'Lớp 9', description: 'Hệ thống & ôn tập', accent: '#7c3aed', href: '/docs/intro'},
];

const featuredItems: FeaturedItem[] = [
  {
    type: 'Bài giảng',
    typeTone: 'blue',
    title: 'Giới thiệu lập trình Python',
    description: 'Bài giảng đầu tiên giúp học sinh làm quen với ngôn ngữ Python qua các ví dụ thực tế.',
    grade: 'Lớp 8',
    subject: 'Tin học',
    href: '/docs/python-tutorial/bai-1-lam-quen-python',
  },
  {
    type: 'Trò chơi',
    typeTone: 'mint',
    title: 'Đố vui kiến thức CNTT',
    description: 'Trò chơi PowerPoint tương tác giúp ôn tập kiến thức công nghệ thông tin một cách sinh động.',
    grade: 'Lớp 7',
    subject: 'Tin học',
    href: '/docs/intro',
  },
  {
    type: 'Tài liệu',
    typeTone: 'amber',
    title: 'Phiếu bài tập thuật toán',
    description: 'Tài liệu thực hành với các bài toán tư duy logic và thuật toán cơ bản.',
    grade: 'Lớp 8',
    subject: 'Tin học',
    href: '/docs/intro',
  },
  {
    type: 'Python',
    typeTone: 'violet',
    title: 'Biến và kiểu dữ liệu',
    description: 'Hướng dẫn chi tiết về biến, kiểu dữ liệu cơ bản trong Python và cách sử dụng.',
    grade: 'Lớp 8',
    subject: 'Tin học',
    href: '/docs/python-tutorial/bai-1-lam-quen-python',
  },
];

const exampleQuestions: ExampleQuestion[] = [
  {icon: '📖', text: 'Giải thích vòng lặp for trong Python'},
  {icon: '🎮', text: 'Tìm trò chơi ôn tập cho lớp 7'},
  {icon: '📂', text: 'Tài liệu về thuật toán sắp xếp'},
];

/* ──────────────────────────────────────────────
   Shared Components
   ────────────────────────────────────────────── */

function ArrowIcon(): ReactNode {
  return <span aria-hidden="true" className={styles.arrow}>↗</span>;
}

function SectionLabel({children}: {children: string}): ReactNode {
  return <span className={styles.sectionEyebrow}>{children}</span>;
}

/* ──────────────────────────────────────────────
   Section 02 — Hero
   ────────────────────────────────────────────── */

function HeroSection(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroGrid}`}>
        {/* Left — Copy */}
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
            Không gian chia sẻ bài giảng, trò chơi học tập, tài liệu và kiến thức
            công nghệ dành cho người học.
          </p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="/docs/intro">
              Khám phá tài nguyên <ArrowIcon />
            </Link>
            <Link className={styles.secondaryButton} to="/docs/python-tutorial/bai-1-lam-quen-python">
              Bắt đầu học Python
            </Link>
          </div>

          <div className={styles.heroMeta}>
            <span><i />Học tập chủ động</span>
            <span><i />Nội dung dễ tiếp cận</span>
            <span><i />Cập nhật liên tục</span>
          </div>
        </div>

        {/* Right — Code Visual */}
        <div className={styles.heroVisual} aria-label="Minh họa học tập và lập trình">
          <div className={styles.visualGlow} />

          <div className={styles.visualCard}>
            <div className={styles.visualWindowBar}>
              <span /><span /><span />
              <small>learning.py</small>
            </div>
            <div className={styles.codeContent}>
              <div><span className={styles.lineNo}>01</span><span className={styles.codePurple}>def</span> <span className={styles.codeBlue}>keep_learning</span>():</div>
              <div><span className={styles.lineNo}>02</span>{'  '}skills = [<span className={styles.codeGreen}>'learn'</span>,</div>
              <div><span className={styles.lineNo}>03</span>{'            '}<span className={styles.codeGreen}>'practice'</span>,</div>
              <div><span className={styles.lineNo}>04</span>{'            '}<span className={styles.codeGreen}>'create'</span>]</div>
              <div><span className={styles.lineNo}>05</span>{'  '}<span className={styles.codePurple}>return</span> skills</div>
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
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 03 — Resource Categories
   ────────────────────────────────────────────── */

function ResourceCard({item}: {item: ResourceCategory}): ReactNode {
  return (
    <Link to={item.href} className={`${styles.resourceCard} ${styles[item.tone]}`}>
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
    </Link>
  );
}

function ResourcesSection(): ReactNode {
  return (
    <section className={styles.resourcesSection} id="explore">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div>
            <SectionLabel>KHO TÀI NGUYÊN</SectionLabel>
            <h2>Khám phá kho tài nguyên</h2>
            <p>Bốn nội dung chính giúp bạn bắt đầu hành trình học tập.</p>
          </div>
          <Link to="/docs/intro" className={styles.textLink}>
            Xem tất cả <ArrowIcon />
          </Link>
        </div>

        <div className={styles.resourceGrid}>
          {resources.map((item) => (
            <ResourceCard key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 04 — Learning by Grade
   ────────────────────────────────────────────── */

function GradeCard({item}: {item: GradeItem}): ReactNode {
  return (
    <Link to={item.href} className={styles.gradeCard}>
      <span className={styles.gradeNumber} style={{'--grade-accent': item.accent} as React.CSSProperties}>
        {item.grade}
      </span>
      <div className={styles.gradeInfo}>
        <strong>{item.label}</strong>
        <small>{item.description}</small>
      </div>
      <ArrowIcon />
    </Link>
  );
}

function LearningSection(): ReactNode {
  return (
    <section className={styles.learningSection} id="learning-paths">
      <div className={`container ${styles.learningLayout}`}>
        <div className={styles.learningIntro}>
          <SectionLabel>CHƯƠNG TRÌNH THCS</SectionLabel>
          <h2>Học tập theo chương trình THCS</h2>
          <p>
            Nội dung được tổ chức theo từng khối lớp trong chương trình Trung học cơ sở.
            Dễ dàng tìm kiếm bài giảng, tài liệu phù hợp với nhu cầu học tập.
          </p>
          <Link to="/docs/intro" className={styles.primaryButton}>
            Đi đến thư viện <ArrowIcon />
          </Link>
        </div>

        <div className={styles.gradeGrid}>
          {grades.map((item) => (
            <GradeCard key={item.grade} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 05 — Featured Resources
   ────────────────────────────────────────────── */

function FeaturedCard({item}: {item: FeaturedItem}): ReactNode {
  return (
    <Link to={item.href} className={styles.featuredCard}>
      <div className={styles.featuredThumb}>
        <span className={`${styles.featuredType} ${styles[item.typeTone]}`}>
          {item.type}
        </span>
      </div>
      <div className={styles.featuredBody}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {(item.grade || item.subject) && (
          <div className={styles.featuredMeta}>
            {item.grade && <span>{item.grade}</span>}
            {item.subject && <span>{item.subject}</span>}
          </div>
        )}
      </div>
    </Link>
  );
}

function FeaturedSection(): ReactNode {
  return (
    <section className={styles.featuredSection}>
      <div className="container">
        <div className={styles.sectionHeading}>
          <div>
            <SectionLabel>NỔI BẬT</SectionLabel>
            <h2>Nội dung nổi bật</h2>
            <p>Bài giảng, trò chơi và tài liệu được đề xuất cho bạn.</p>
          </div>
          <Link to="/docs/intro" className={styles.textLink}>
            Xem thêm <ArrowIcon />
          </Link>
        </div>

        <div className={styles.featuredGrid}>
          {featuredItems.map((item) => (
            <FeaturedCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 06 — Programming Corner
   ────────────────────────────────────────────── */

function ProgrammingSection(): ReactNode {
  return (
    <section className={styles.programmingSection}>
      <div className={`container ${styles.programmingLayout}`}>
        <div className={styles.programmingContent}>
          <SectionLabel>LẬP TRÌNH</SectionLabel>
          <h2>Khám phá thế giới lập trình</h2>
          <p>
            Bắt đầu hành trình lập trình Python từ con số 0. Học qua ví dụ thực tế,
            bài tập có lời giải, và phát triển tư duy thuật toán một cách có hệ thống.
          </p>

          <ul className={styles.programmingFeatures}>
            <li>
              <span className={styles.featureCheck}>✓</span>
              Hướng dẫn Python từ cơ bản đến nâng cao
            </li>
            <li>
              <span className={styles.featureCheck}>✓</span>
              Bài tập thực hành có lời giải chi tiết
            </li>
            <li>
              <span className={styles.featureCheck}>✓</span>
              Tư duy thuật toán và giải quyết vấn đề
            </li>
          </ul>

          <Link to="/docs/python-tutorial/bai-1-lam-quen-python" className={styles.programmingCta}>
            Bắt đầu hành trình Python <ArrowIcon />
          </Link>
        </div>

        <div className={styles.programmingVisual}>
          <div className={styles.terminalCard}>
            <div className={styles.terminalBar}>
              <span /><span /><span />
              <small>python_basics.py</small>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.termLine}>
                <span className={styles.termComment}># Chào mừng đến với Python!</span>
              </div>
              <div className={styles.termLine}>
                <span className={styles.termKeyword}>for</span> i <span className={styles.termKeyword}>in</span> <span className={styles.termFunc}>range</span>(<span className={styles.termNumber}>5</span>):
              </div>
              <div className={styles.termLine}>
                {'    '}<span className={styles.termFunc}>print</span>(<span className={styles.termString}>f"Bước {'{'}i+1{'}'}: Học và thực hành"</span>)
              </div>
              <div className={styles.termDivider} />
              <div className={styles.termLine}>
                <span className={styles.termOutput}>▶ Bước 1: Học và thực hành</span>
              </div>
              <div className={styles.termLine}>
                <span className={styles.termOutput}>▶ Bước 2: Học và thực hành</span>
              </div>
              <div className={styles.termLine}>
                <span className={styles.termCursor}>|</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 07 — AI Learning Assistant
   ────────────────────────────────────────────── */

function AISection(): ReactNode {
  return (
    <section className={styles.aiSection}>
      <div className="container">
        <div className={styles.aiPanel}>
          <div className={styles.aiHeader}>
            <div className={styles.aiMark}>✳</div>
            <div>
              <SectionLabel>TRỢ LÝ HỌC TẬP</SectionLabel>
              <h2>Tìm kiếm và học tập cùng AI</h2>
            </div>
          </div>

          <p className={styles.aiDescription}>
            Trợ lý AI sẽ giúp bạn tìm kiếm tài liệu, giải thích khái niệm
            và gợi ý nội dung học tập phù hợp. Tính năng đang được phát triển.
          </p>

          <div className={styles.aiInputPreview}>
            <div className={styles.aiSearchBox}>
              <span className={styles.aiSearchIcon}>⌕</span>
              <span className={styles.aiSearchPlaceholder}>Hỏi bất kì điều gì về bài học...</span>
            </div>
          </div>

          <div className={styles.aiExamples}>
            <span className={styles.aiExamplesLabel}>Ví dụ câu hỏi:</span>
            <div className={styles.aiExampleList}>
              {exampleQuestions.map((q) => (
                <div key={q.text} className={styles.aiExampleChip}>
                  <span>{q.icon}</span> {q.text}
                </div>
              ))}
            </div>
          </div>

          <span className={styles.aiStatus}>SẮP RA MẮT</span>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Page Root
   ────────────────────────────────────────────── */

export default function Home(): ReactNode {
  // Register the existing custom section for Docusaurus's build-time link checks.
  useBrokenLinks().collectAnchor('explore');
  return (
    <Layout
      title="Trang chủ"
      description="Blog Tin Học – bài giảng, trò chơi PowerPoint, tài liệu học tập và lập trình Python dành cho học sinh THCS."
    >
      <main className={styles.home}>
        <HeroSection />
        <ResourcesSection />
        <LearningSection />
        <FeaturedSection />
        <ProgrammingSection />
        <AISection />
      </main>
    </Layout>
  );
}
