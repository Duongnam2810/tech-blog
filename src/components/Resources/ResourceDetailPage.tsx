import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {resources, resourceTypes, type Resource} from '@site/src/data/resources';
import LibraryIcon from '@site/src/components/PowerPoint/LibraryIcon';
import ResourceCard from './ResourceCard';
import ResourcePreview from './ResourcePreview';
import {formatResourceDate, getRelatedResources, getResourceFormats, getResourceUrl} from './library';
import styles from './styles.module.css';

export default function ResourceDetailPage({resource, children, relatedItems = resources}: {resource: Resource; children?: ReactNode; relatedItems?: Resource[]}): ReactNode {
  const date = formatResourceDate(resource.updatedAt);
  const files = (resource.files ?? []).filter(file => getResourceUrl(file.url));
  const sourceUrl = getResourceUrl(resource.source?.url);
  const related = getRelatedResources(resource, relatedItems);
  const preview = resource.preview ?? (resource.thumbnail ? {kind: 'image' as const, url: resource.thumbnail, label: `Ảnh xem trước: ${resource.title}`} : undefined);
  const formats = getResourceFormats(resource);
  return <Layout title={resource.title} description={resource.summary}>
    <main className={`${styles.page} container ${styles.detailPage}`}>
      <nav aria-label="Đường dẫn" className={styles.breadcrumb}><Link to="/tai-lieu">Thư viện tài liệu</Link><span aria-hidden="true"> / </span><span aria-current="page">{resource.title}</span></nav>
      <header className={styles.detailHeader}><p className={styles.eyebrow}>{resourceTypes[resource.type]}</p><h1>{resource.title}</h1><p className={styles.intro}>{resource.summary}</p><div className={styles.tags}>{resource.grades.map(grade => <span key={grade}>Lớp {grade}</span>)}{resource.subject && <span>{resource.subject}</span>}</div></header>
      <div className={styles.detailGrid}>
        <div className={styles.detailContent}>
          {resource.goals && resource.goals.length > 0 && <section><h2>Mục tiêu sử dụng</h2><ul>{resource.goals.map((goal, index) => <li key={index}>{goal}</li>)}</ul></section>}
          {children && <div className="markdown">{children}</div>}
          {preview && <ResourcePreview preview={preview} />}
        </div>
        <aside className={styles.filePanel} aria-labelledby="resource-files-title"><span className={styles.panelIcon}><LibraryIcon name="download" /></span><h2 id="resource-files-title">Tệp đính kèm</h2>
          {files.length > 0 ? <ul className={styles.fileList}>{files.map((file, index) => <li key={`${file.url}-${index}`}><Link to={file.url.trim()}>{file.label}<span className={styles.srOnly}> — {resource.title}</span></Link><span className={styles.meta}>{file.format === 'other' ? 'Tệp đính kèm' : file.format.toUpperCase()}{file.sizeLabel ? ` · ${file.sizeLabel}` : ''}</span></li>)}</ul> : <p className={styles.meta}>Chưa có tệp đính kèm được công bố.</p>}
          {(resource.author || resource.source || resource.license || date || formats.length > 0) && <dl className={styles.metadata}>
            {formats.length > 0 && <><dt>Hình thức</dt><dd>{formats.join(', ')}</dd></>}
            {resource.author && <><dt>Tác giả</dt><dd>{resource.author}</dd></>}
            {resource.source && <><dt>Nguồn nội dung</dt><dd>{sourceUrl ? <Link to={sourceUrl}>{resource.source.label}</Link> : resource.source.label}</dd></>}
            {date && <><dt>Cập nhật</dt><dd><time dateTime={resource.updatedAt}>{date}</time></dd></>}
            {resource.license && <><dt>Điều kiện sử dụng</dt><dd>{resource.license}</dd></>}
          </dl>}
          <Link className={styles.detailLink} to="/tai-lieu">← Quay về thư viện</Link>
        </aside>
      </div>
      {related.length > 0 && <section className={styles.related}><h2>Tài liệu liên quan</h2><div className={styles.grid}>{related.map(item => <ResourceCard key={item.id} resource={item} />)}</div></section>}
    </main>
  </Layout>;
}
