import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Layout from '@theme/Layout';
import {featuredLesson, grades, pythonLessonPath, resources} from '@site/src/data/home';
import type {GradeItem, ResourceCategory} from '@site/src/data/home';
import FeaturedPowerPoint from '@site/src/components/PowerPoint/FeaturedPowerPoint';
import styles from './index.module.css';

function ArrowIcon(): ReactNode {
  return <span aria-hidden="true" className={styles.arrow}>↗</span>;
}

function ResourceIcon({name}: {name: ResourceCategory['icon']}): ReactNode {
  const paths = {
    book: <path d="M12 6v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2Z" />,
    presentation: <><path d="M3 3h18M4 3v13h16V3M12 16v5m-4 0 4-5 4 5" /><path d="m9 7 6 3-6 3Z" /></>,
    code: <path d="m7 6-5 6 5 6m10-12 5 6-5 6m-3-15-4 18" />,
  };
  return <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true" focusable="false">{paths[name]}</svg>;
}

function SectionLabel({children}: {children: string}): ReactNode {
  return <span className={styles.sectionEyebrow}>{children}</span>;
}

const heroCodeTokens = [
  {text: '# Mỗi ngày, một điều mới', className: styles.codeComment},
  {text: '\n'},
  {text: 'print', className: styles.codeBlue},
  {text: '('},
  {text: '"Học Tin học"', className: styles.codeGreen},
  {text: ')\n'},
  {text: 'print', className: styles.codeBlue},
  {text: '('},
  {text: '"Sáng tạo"', className: styles.codeGreen},
  {text: ')\n'},
  {text: 'print', className: styles.codeBlue},
  {text: '('},
  {text: '"Chia sẻ tri thức"', className: styles.codeGreen},
  {text: ')'},
];
const heroCode = heroCodeTokens.map(token => token.text).join('');
const heroCodeCharacters = Array.from(heroCode);

function HeroCode(): ReactNode {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let count = 0;
    let finished = false;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    function finish(): void {
      finished = true;
      clearTimeout(timer);
      setVisibleCount(heroCodeCharacters.length);
    }

    function typeCharacter(): void {
      if (finished) return;
      count += 1;
      setVisibleCount(count);
      if (count === heroCodeCharacters.length) {
        finished = true;
        return;
      }

      const nextCharacter = heroCodeCharacters[count];
      const completedLines = heroCodeCharacters.slice(0, count).filter(character => character === '\n').length;
      const linePause = completedLines === 0 ? 300 : completedLines === 2 ? 400 : 200;
      timer = setTimeout(typeCharacter, nextCharacter === '\n' ? linePause : 45);
    }

    function handleMotionChange(): void {
      if (motionPreference.matches) finish();
    }

    if (motionPreference.matches) finish();
    // Chờ khung Hero xuất hiện xong trước khi bắt đầu gõ.
    else timer = setTimeout(typeCharacter, 750);
    motionPreference.addEventListener('change', handleMotionChange);

    return () => {
      finished = true;
      clearTimeout(timer);
      motionPreference.removeEventListener('change', handleMotionChange);
    };
  }, []);

  let remaining = visibleCount;
  const isPaused = heroCodeCharacters[visibleCount] === '\n' || visibleCount === heroCodeCharacters.length;

  return (
    <pre className={`${styles.codeContent} ${styles.typingCode}`} aria-label="Ví dụ Python: Học, sáng tạo và chia sẻ">
      {/* Giữ kích thước theo toàn bộ code; không hiện trước các dòng chưa gõ. */}
      <code className={styles.typingSizer} aria-hidden="true">{heroCode}</code>
      <code className={styles.typingText} aria-hidden="true">
        {heroCodeTokens.map((token, index) => {
          const characters = Array.from(token.text);
          const text = characters.slice(0, Math.max(0, remaining)).join('');
          remaining -= characters.length;
          return text ? <span key={index} className={token.className}>{text}</span> : null;
        })}
        {visibleCount > 0 && <span className={`${styles.typingCursor} ${isPaused ? styles.cursorPaused : ''}`} />}
      </code>
      {/* Không đọc từng ký tự; vẫn có code khi JavaScript bị tắt. */}
      <code className={styles.codeAccessible}>{heroCode}</code>
      <noscript><code>{heroCode}</code></noscript>
    </pre>
  );
}

function HeroSection(): ReactNode {
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>BLOG TIN HỌC · LEARN. CREATE. SHARE.</div>
          <h1 id="home-title">Học Tin học.<br /><span>Sáng tạo.</span><br />Chia sẻ tri thức.</h1>
          <p className={styles.heroDescription}>
            Không gian chia sẻ tài liệu Tin học THCS, trò chơi PowerPoint và kiến thức lập trình
            Python dành cho giáo viên, học sinh và những người yêu thích công nghệ giáo dục.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="#explore">Khám phá tài liệu <ArrowIcon /></Link>
            <Link className={styles.secondaryButton} to={pythonLessonPath}>Bắt đầu học Python</Link>
          </div>
          <p className={styles.heroMeta}>Dành cho giáo viên và học sinh lớp 6–9</p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.visualGlow} aria-hidden="true" />
          <div className={styles.visualCard}>
            <div className={styles.windowBar}><span aria-hidden="true">● ● ●</span><span>hoc_tin_hoc.py</span></div>
            <HeroCode />
            <div className={styles.codeOutput}><span aria-hidden="true">↳</span> Từ kiến thức đến ý tưởng.</div>
          </div>
          <div className={styles.visualNote} aria-hidden="true"><ResourceIcon name="book" /> Học · Sáng tạo · Chia sẻ</div>
        </div>
      </div>
    </section>
  );
}

function ResourceCard({item}: {item: ResourceCategory}): ReactNode {
  const className = `${styles.resourceCard} ${styles[item.tone]} ${item.href ? styles.interactiveCard : ''}`;
  const content = <>
    <span className={styles.cardIcon}><ResourceIcon name={item.icon} /></span>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <div className={styles.cardFoot}>{item.href ? <>{item.actionLabel ?? 'Đọc bài học'} <ArrowIcon /></> : <span>Chưa có tài nguyên công khai</span>}</div>
  </>;
  return item.href ? <Link to={item.href} className={className}>{content}</Link> : <article className={className}>{content}</article>;
}

function ResourcesSection(): ReactNode {
  return (
    <section className={styles.resourcesSection} id="explore" aria-labelledby="resources-title">
      <div className="container">
        <div className={styles.sectionHeading}>
          <SectionLabel>HỌC LIỆU & Ý TƯỞNG</SectionLabel>
          <h2 id="resources-title">Bạn muốn khám phá điều gì?</h2>
          <p>Ba hướng nội dung của Blog Tin Học. Bắt đầu với bài Python đã có, hoặc xem trạng thái các nhóm học liệu.</p>
        </div>
        <div className={styles.resourceGrid}>{resources.map(item => <ResourceCard key={item.icon} item={item} />)}</div>
      </div>
    </section>
  );
}

function GradeCard({item}: {item: GradeItem}): ReactNode {
  const className = `${styles.gradeCard} ${styles[item.tone]} ${item.href ? styles.interactiveCard : ''}`;
  const content = <>
    <span className={styles.gradeNumber} aria-hidden="true">{item.grade}</span>
    <div className={styles.gradeInfo}><h3>Lớp {item.grade}</h3><p>{item.href ? 'Bài làm quen Python' : 'Chưa có học liệu công khai'}</p></div>
    {item.href && <ArrowIcon />}
  </>;
  return item.href ? <Link to={item.href} className={className}>{content}</Link> : <article className={className}>{content}</article>;
}

function LearningSection(): ReactNode {
  return (
    <section className={styles.learningSection} id="learning-paths" aria-labelledby="grades-title">
      <div className={`container ${styles.learningLayout}`}>
        <div className={styles.sectionHeading}>
          <SectionLabel>TIN HỌC THCS</SectionLabel>
          <h2 id="grades-title">Tìm nội dung theo lớp</h2>
          <p>Hiện có bài làm quen Python gắn nhãn Tin học 8. Các khối lớp còn lại chưa có học liệu được công bố.</p>
        </div>
        <div className={styles.gradeGrid}>{grades.map(item => <GradeCard key={item.grade} item={item} />)}</div>
      </div>
    </section>
  );
}

function FeaturedSection(): ReactNode {
  return (
    <section className={styles.featuredSection} aria-labelledby="featured-title">
      <div className={`container ${styles.featuredLayout}`}>
        <div className={styles.sectionHeading}>
          <SectionLabel>BÀI HỌC NỔI BẬT</SectionLabel>
          <h2 id="featured-title">Một khởi đầu với Python</h2>
          <p>Thử viết lời chào đầu tiên và quan sát kết quả ngay trong bài học.</p>
        </div>
        <Link to={featuredLesson.href} className={`${styles.featuredCard} ${styles.interactiveCard}`}>
          <span className={styles.featuredType}>BÀI HỌC</span>
          <h3>{featuredLesson.title}</h3>
          <p>{featuredLesson.description}</p>
          <div className={styles.featuredMeta}><span>{featuredLesson.grade}</span><span>{featuredLesson.subject}</span></div>
          <span className={styles.featuredAction}>Mở bài học <ArrowIcon /></span>
        </Link>
      </div>
    </section>
  );
}

function ProgrammingSection(): ReactNode {
  return (
    <section className={styles.programmingSection} aria-labelledby="python-title">
      <div className={`container ${styles.programmingLayout}`}>
        <div className={styles.programmingContent}>
          <SectionLabel>BẮT ĐẦU TỪ ĐIỀU ĐƠN GIẢN</SectionLabel>
          <h2 id="python-title">Dòng code đầu tiên của bạn</h2>
          <p>Chưa biết lập trình? Bài làm quen Python giới thiệu lệnh print và một khung thực hành để bạn thử thay đổi lời chào.</p>
          <ul className={styles.programmingFeatures}>
            <li>Làm quen với câu lệnh xuất thông tin</li>
            <li>Thử viết lời chào theo cách của bạn</li>
            <li>Quan sát kết quả khi chạy code</li>
          </ul>
          <Link to={pythonLessonPath} className={styles.programmingCta}>Học bài Python đầu tiên <ArrowIcon /></Link>
        </div>
        <div className={styles.terminalCard}>
          <div className={styles.windowBar}><span aria-hidden="true">● ● ●</span><span>loi_chao.py</span></div>
          <pre className={styles.terminalBody} aria-label="Ví dụ sử dụng lệnh print"><code><span className={styles.codeComment}># Thử lời chào của bạn</span>{'\n'}<span className={styles.codeBlue}>print</span>(<span className={styles.codeGreen}>"Xin chào!"</span>)</code></pre>
          <div className={styles.terminalOutput}><span>Kết quả</span><samp>Xin chào!</samp></div>
        </div>
      </div>
    </section>
  );
}

function AISection(): ReactNode {
  return (
    <section className={styles.aiSection} aria-labelledby="ai-title">
      <div className={`container ${styles.aiPanel}`}>
        <SectionLabel>VỀ TRỢ LÝ AI</SectionLabel>
        <h2 id="ai-title">Hiện chưa có trợ lý AI trên website</h2>
        <p>Bạn có thể đọc bài Python và xem các nhóm nội dung ở trên. Chức năng hỏi đáp và tìm kiếm bằng AI hiện chưa khả dụng.</p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  // Đăng ký các anchor tùy chỉnh để Docusaurus kiểm tra liên kết khi build.
  const brokenLinks = useBrokenLinks();
  ['explore', 'learning-paths', 'home-title', 'resources-title', 'grades-title', 'featured-title', 'python-title', 'ai-title'].forEach(id => brokenLinks.collectAnchor(id));
  return (
    <Layout title="Trang chủ" description="Blog Tin Học — tài liệu Tin học THCS, trò chơi PowerPoint và bài học Python dành cho giáo viên, học sinh lớp 6–9.">
      <main className={styles.home}>
        <HeroSection />
        <ResourcesSection />
        <FeaturedPowerPoint />
        <LearningSection />
        <FeaturedSection />
        <ProgrammingSection />
        <AISection />
      </main>
    </Layout>
  );
}
