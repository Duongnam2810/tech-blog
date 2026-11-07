import type {ReactNode} from 'react';
import {interests, interestsNote, sectionCopy} from '@site/src/data/about';
import {classes, Icon, SectionHeading} from './shared';

export default function InterestGrid(): ReactNode {
  return <section id="interests" className={classes('interests-band')} aria-labelledby="interests-title"><div className={classes('container', 'section')}>
    <SectionHeading id="interests-title" copy={sectionCopy.interests} />
    <div className={classes('interest-grid')}>{interests.map(interest => <article key={interest.number} className={classes('interest')}>
      <div className={classes('interest-top')}><Icon name={interest.icon} className={classes('interest-icon')} /><span>{interest.number}</span></div>
      <h3>{interest.title}</h3><p>{interest.description}</p><span className={classes('topic')}>{interest.label}</span>
    </article>)}</div>
    {interestsNote && <p className={classes('content-note')}>{interestsNote}</p>}
  </div></section>;
}
