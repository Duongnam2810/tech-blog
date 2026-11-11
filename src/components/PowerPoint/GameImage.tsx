import {useState, type ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {getResourceUrl} from './library';
import LibraryIcon from './LibraryIcon';
import styles from '@site/src/pages/powerpoint/styles.module.css';

export default function GameImage({src, alt}: {src?: string; alt: string}): ReactNode {
  const source = getResourceUrl(src);
  const resolvedSource = useBaseUrl(source ?? '');
  const [failedSource, setFailedSource] = useState<string>();
  return <div className={styles.imageFrame}>
    {source && failedSource !== source ?
      <img src={resolvedSource} alt={alt} loading="lazy" onError={() => setFailedSource(source)} /> :
      <div className={styles.imagePlaceholder}>
        <LibraryIcon name="slides" />
        <span>{source ? 'Ảnh chưa tải được' : 'Chưa có ảnh xem trước'}</span>
      </div>}
  </div>;
}
