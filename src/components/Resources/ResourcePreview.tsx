import {useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {Resource} from '@site/src/data/resources';
import {getResourceUrl} from './library';
import styles from './styles.module.css';

export default function ResourcePreview({preview}: {preview: NonNullable<Resource['preview']>}): ReactNode {
  const url = getResourceUrl(preview.url);
  const resolvedUrl = useBaseUrl(url ?? '');
  const [failedUrl, setFailedUrl] = useState<string>();
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  if (!url) return null;
  return <section aria-labelledby="resource-preview-title"><h2 id="resource-preview-title">Xem trước tài liệu</h2>
    {preview.kind === 'image' ? failedUrl === url ? <p>Chưa tải được ảnh xem trước.</p> : <img className={styles.previewImage} src={resolvedUrl} alt={preview.label} loading="lazy" onError={() => setFailedUrl(url)} /> : <>
      <button className={styles.secondaryButton} type="button" aria-expanded={isPdfOpen} aria-controls="resource-pdf" onClick={() => setIsPdfOpen(open => !open)}>{isPdfOpen ? 'Đóng bản xem trước PDF' : 'Xem trước PDF'}</button>
      <div id="resource-pdf">{isPdfOpen && <object className={styles.pdfPreview} data={resolvedUrl} type="application/pdf" aria-label={preview.label}><p>Trình duyệt chưa hỗ trợ xem PDF tại đây. Hãy mở liên kết bên dưới.</p></object>}</div>
    </>}
    <p><Link to={url}>Mở bản xem trước: {preview.label} →</Link></p>
  </section>;
}
