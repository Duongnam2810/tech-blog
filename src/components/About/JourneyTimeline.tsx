import type {ReactNode} from 'react';
import {journeyNote, milestones, sectionCopy} from '@site/src/data/about';
import {classes, Lines, SectionTitle} from './shared';

export default function JourneyTimeline(): ReactNode {
  return <section id="journey" className={classes('journey-band')} aria-labelledby="journey-title"><div className={classes('container', 'section', 'split')}>
    <div><SectionTitle id="journey-title" copy={sectionCopy.journey} description /><p className={classes('content-note')}><Lines lines={journeyNote} /></p></div>
    <ol className={classes('timeline')}>{milestones.map((milestone, index) => <li key={milestone.title} className={milestone.emphasized ? classes('current') : undefined}>
      <span className={classes('milestone-index')}>{String(index + 1).padStart(2, '0')}</span><h3>{milestone.title}</h3><p>{milestone.description}</p>
    </li>)}</ol>
  </div></section>;
}
