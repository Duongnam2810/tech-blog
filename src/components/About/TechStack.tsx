import type {ReactNode} from 'react';
import {sectionCopy, techStack} from '@site/src/data/about';
import {classes, SectionHeading} from './shared';

export default function TechStack(): ReactNode {
  return <section id="tools" className={classes('section', 'container')} aria-labelledby="tools-title">
    <SectionHeading id="tools-title" copy={sectionCopy.tools} />
    <div className={classes('tool-labels')}><h3>{techStack.usingLabel}</h3><span>{techStack.usingNote}</span></div>
    <div className={classes('tools-table')}>{techStack.using.map((category, index) => <div key={category.label}>
      <span className={classes('tool-number')}>{String(index + 1).padStart(2, '0')}</span><h4>{category.label}</h4>
      <div className={classes('tags')}>{category.items.map(item => <span key={item.name}>{item.name}{item.note && <small>{item.note}</small>}</span>)}</div>
    </div>)}</div>
    <div className={classes('exploring-row')}><div><span className={classes('explore-marker')} aria-hidden="true">+</span><h3>{techStack.exploringLabel}</h3></div><p>{techStack.exploring}</p></div>
  </section>;
}
