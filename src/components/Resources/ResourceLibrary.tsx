import {useId, useRef, useState, type ReactNode} from 'react';
import {resourceTypes, type Resource} from '@site/src/data/resources';
import LibraryIcon from '@site/src/components/PowerPoint/LibraryIcon';
import ResourceCard from './ResourceCard';
import {filterResources, type ResourceFilters} from './library';
import styles from './styles.module.css';

const emptyFilters: ResourceFilters = {query: '', type: '', grade: ''};

export default function ResourceLibrary({items}: {items: Resource[]}): ReactNode {
  const [filters, setFilters] = useState(emptyFilters);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchId = useId();
  const results = filterResources(items, filters);
  const hasFilters = Object.values(filters).some(Boolean);

  function changeFilter(key: keyof ResourceFilters, value: string): void {
    setFilters(current => ({...current, [key]: value}));
  }
  function resetFilters(): void {
    setFilters(emptyFilters);
    inputRef.current?.focus();
  }

  return <section className={`container ${styles.library}`} id="resource-list" aria-labelledby="resource-list-title">
    <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>TÌM HỌC LIỆU</p><h2 id="resource-list-title">Bạn cần tài liệu nào?</h2></div><p>Chọn loại tài liệu và khối lớp<br />để tìm nội dung phù hợp.</p></div>
    <div className={styles.filterPanel} role="search" aria-label="Tìm tài liệu Tin học">
      <div className={styles.searchGrid}>
        <div><label className={styles.fieldLabel} htmlFor={searchId}>Từ khóa</label><div className={styles.searchInput}><LibraryIcon name="search" /><input ref={inputRef} id={searchId} type="search" value={filters.query} onChange={event => changeFilter('query', event.target.value)} placeholder="Tìm tên tài liệu, chủ đề, từ khóa..." aria-describedby={`${searchId}-hint`} /></div></div>
        <label className={styles.gradeField}>Khối lớp<select value={filters.grade} onChange={event => changeFilter('grade', event.target.value)}><option value="">Tất cả khối lớp</option>{[6, 7, 8, 9].map(grade => <option key={grade} value={grade}>Lớp {grade}</option>)}</select></label>
        {filters.query && <button type="button" className={styles.secondaryButton} onClick={() => {changeFilter('query', ''); inputRef.current?.focus();}}>Xóa từ khóa</button>}
      </div>
      <p id={`${searchId}-hint`} className={styles.hint}>Có thể nhập tiếng Việt có dấu hoặc không dấu.</p>
      <fieldset className={styles.typeFilters}><legend>Loại tài liệu</legend><div className={styles.typeButtons}>
        <button type="button" aria-pressed={!filters.type} onClick={() => changeFilter('type', '')}>Tất cả</button>
        {Object.entries(resourceTypes).map(([type, label]) => <button key={type} type="button" aria-pressed={filters.type === type} onClick={() => changeFilter('type', type)}>{label}</button>)}
      </div></fieldset>
    </div>
    <div className={styles.resultsBar}><p role="status" aria-live="polite" aria-atomic="true">Hiển thị {results.length} / {items.length} tài liệu.</p>{hasFilters && <button type="button" className={styles.secondaryButton} onClick={resetFilters}>Xóa bộ lọc</button>}</div>
    {results.length > 0 ? <div className={styles.grid}>{results.map(resource => <ResourceCard key={resource.id} resource={resource} />)}</div> : <div className={styles.empty}>
      <LibraryIcon name={items.length ? 'search' : 'book'} />
      <h3>{items.length ? 'Chưa tìm thấy tài liệu phù hợp' : 'Chưa có tài liệu được công bố'}</h3>
      <p>{items.length ? 'Hãy thử từ khóa khác, chọn khối lớp khác hoặc xóa bộ lọc để xem tất cả tài liệu.' : 'Tài liệu sẽ được bổ sung khi nội dung và thông tin chia sẻ đã được xác nhận.'}</p>
      {hasFilters && <button type="button" className={styles.secondaryButton} onClick={resetFilters}>Xem tất cả tài liệu</button>}
    </div>}
  </section>;
}
