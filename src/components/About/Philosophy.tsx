import {Fragment, type ReactNode} from 'react';
import {philosophy, sectionCopy} from '@site/src/data/about';
import {classes, Lines, Star} from './shared';

export default function Philosophy(): ReactNode {
  return <section id="philosophy" className={classes('philosophy')} aria-labelledby="philosophy-title"><div className={classes('container')}>
    <div className={classes('philosophy-top')}><p className={classes('eyebrow')}>{sectionCopy.philosophy.eyebrow}</p><h2 id="philosophy-title"><Lines lines={sectionCopy.philosophy.title} /></h2></div>
    <p className={classes('motto')}>{philosophy.words.map((word, index) => <Fragment key={word}>{index > 0 && <br />}{index === philosophy.words.length - 1 ? <span>{word}</span> : word}</Fragment>)}</p>
    <div className={classes('philosophy-bottom')}><Star /><p lang="vi"><Lines lines={philosophy.lines} /></p><span>{philosophy.footer}</span></div>
  </div></section>;
}
