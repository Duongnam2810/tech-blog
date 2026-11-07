import {Fragment, type ReactNode} from 'react';
import type {AboutIconName, SectionCopy} from '@site/src/data/about';
import styles from '@site/src/pages/about.module.css';

/** Map approved design class names to their scoped CSS Module equivalents. */
export function classes(...names: (string | false | undefined)[]): string {
  return names.filter(Boolean).map((name) => styles[name as string]).filter(Boolean).join(' ');
}

export function Lines({lines}: {lines: string[]}): ReactNode {
  return lines.map((line, index) => <Fragment key={`${index}-${line}`}>{index > 0 && <br />}{line}</Fragment>);
}

export function SectionTitle({id, copy, description = false}: {id: string; copy: SectionCopy; description?: boolean}): ReactNode {
  return <header>
    <p className={classes('eyebrow')}>{copy.eyebrow}</p>
    <h2 id={id}><Lines lines={copy.title} /><span className={classes('blue')}>.</span></h2>
    {description && copy.description && <p className={classes('section-description')}><Lines lines={copy.description} /></p>}
  </header>;
}

export function SectionHeading({id, copy}: {id: string; copy: SectionCopy}): ReactNode {
  return <div className={classes('section-heading')}>
    <SectionTitle id={id} copy={copy} />
    {copy.description && <p><Lines lines={copy.description} /></p>}
  </div>;
}

const paths: Record<AboutIconName, ReactNode> = {
  arrow: <path d="M5 19 19 5M5 5h14v14" />,
  book: <path d="M12 5v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2Z" />,
  code: <path d="m7 6-5 6 5 6m10-12 5 6-5 6m-3-15-4 18" />,
  layers: <path d="m12 2 10 6-10 6L2 8Zm-9 11 9 5 9-5M3 18l9 5 9-5" />,
  web: <><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 9h20M6 6h.01M10 6h.01M10 9v12" /></>,
};

export function Icon({name, className}: {name: AboutIconName; className?: string}): ReactNode {
  return <svg viewBox="0 0 24 24" className={`${classes('icon')} ${className ?? ''}`} aria-hidden="true" focusable="false">{paths[name]}</svg>;
}

export function Star({small = false}: {small?: boolean}): ReactNode {
  return <svg viewBox={small ? '0 0 40 40' : '0 0 72 72'} className={small ? classes('tiny-star') : undefined} aria-hidden="true" focusable="false">
    <path d={small ? 'M20 0v40M0 20h40M6 6l28 28M6 34 34 6' : 'M36 0v72M0 36h72M10 10l52 52M10 62 62 10'} />
  </svg>;
}

export function Tags({items}: {items: string[]}): ReactNode {
  return <div className={classes('tags')}>{items.map(item => <span key={item}>{item}</span>)}</div>;
}
