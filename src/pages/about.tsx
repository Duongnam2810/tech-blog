import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Layout from '@theme/Layout';
import {chapters, pageMetadata} from '@site/src/data/about';
import AboutHero from '@site/src/components/About/AboutHero';
import AboutIntro from '@site/src/components/About/AboutIntro';
import InterestGrid from '@site/src/components/About/InterestGrid';
import ProjectShowcase from '@site/src/components/About/ProjectShowcase';
import JourneyTimeline from '@site/src/components/About/JourneyTimeline';
import TechStack from '@site/src/components/About/TechStack';
import Philosophy from '@site/src/components/About/Philosophy';
import ContactSection from '@site/src/components/About/ContactSection';
import {classes} from '@site/src/components/About/shared';
import styles from './about.module.css';

export default function AboutPage(): ReactNode {
  const brokenLinks = useBrokenLinks();
  chapters.forEach(chapter => brokenLinks.collectAnchor(chapter.id));
  return <Layout title={pageMetadata.title} description={pageMetadata.description}>
    <main id="main" className={styles.page} lang="en">
      <AboutHero />
      <nav className={classes('chapter-nav', 'container')} aria-label="On this page">
        <span className={classes('chapter-label')}>ON THIS PAGE</span>
        <div>{chapters.map(chapter => <Link key={chapter.id} to={`#${chapter.id}`}>{chapter.label}</Link>)}</div>
      </nav>
      <AboutIntro />
      <InterestGrid />
      <ProjectShowcase />
      <JourneyTimeline />
      <TechStack />
      <Philosophy />
      <ContactSection />
    </main>
  </Layout>;
}
