import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import LibraryIcon from '@site/src/components/PowerPoint/LibraryIcon';
import {resourceTypes, type Resource} from '@site/src/data/resources';
import {formatResourceDate, getResourceFormats, getResourcePath} from './library';
import styles from './styles.module.css';

export default function ResourceCard({resource}: {resource: Resource}): ReactNode {
  const path = getResourcePath(resource);
  const date = formatResourceDate(resource.updatedAt);
  const formats = getResourceFormats(resource);
  return <article className={styles.card} data-type={resource.type}>
    <div className={styles.cardTop}><span className={styles.cardIcon}><LibraryIcon name={resource.type === 'de-kiem-tra' ? 'check' : resource.type === 'bai-day' ? 'slides' : 'book'} /></span><span className={styles.typeLabel}>{resourceTypes[resource.type]}</span></div>
    <h3><Link to={path}>{resource.title}</Link></h3>
    <p className={styles.summary}>{resource.summary}</p>
    <div className={styles.tags}>{resource.grades.map(grade => <span key={grade}>Lớp {grade}</span>)}</div>
    {resource.subject && <p className={styles.subject}>{resource.subject}</p>}
    {formats.length > 0 && <p className={styles.meta}>{formats.join(' · ')}</p>}
    {date && <p className={styles.meta}>Cập nhật: <time dateTime={resource.updatedAt}>{date}</time></p>}
    <Link className={styles.detailLink} to={path}>Xem chi tiết<LibraryIcon name="arrow" /><span className={styles.srOnly}>: {resource.title}</span></Link>
  </article>;
}
