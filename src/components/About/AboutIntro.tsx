import type {ReactNode} from 'react';
import {introduction, sectionCopy} from '@site/src/data/about';
import {classes, SectionTitle} from './shared';

export default function AboutIntro(): ReactNode {
  return <section id="about" className={classes('section', 'container', 'intro', 'split')} aria-labelledby="about-title">
    <SectionTitle id="about-title" copy={sectionCopy.about} />
    <div className={classes('intro-body')}>
      <p className={classes('lead')}>{introduction.lead}</p>
      <div className={classes('story-columns')}>{introduction.paragraphs.map(paragraph => <div key={paragraph.heading}><h3>{paragraph.heading}</h3><p>{paragraph.body}</p></div>)}</div>
      <p className={classes('editorial-note')}><span aria-hidden="true">↳</span>{introduction.focus}</p>
    </div>
  </section>;
}
