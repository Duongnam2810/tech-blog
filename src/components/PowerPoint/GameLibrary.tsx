import {useId, useRef, useState, type ReactNode} from 'react';
import {gameCategories, type PowerPointGame} from '@site/src/data/powerpoint';
import GameCard from './GameCard';
import LibraryIcon from './LibraryIcon';
import {filterGames, type GameFilters} from './library';
import styles from '@site/src/pages/powerpoint/styles.module.css';

const emptyFilters: GameFilters = {query: '', category: '', grade: '', purpose: ''};

export default function GameLibrary({games}: {games: PowerPointGame[]}): ReactNode {
  const [filters, setFilters] = useState<GameFilters>(emptyFilters);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchId = useId();
  const categories = Object.entries(gameCategories).filter(([key]) => games.some(game => game.category === key));
  const grades = [6, 7, 8, 9].filter(value => games.some(game => game.grades?.some(grade => grade === value)));
  const purposes = [...new Set(games.map(game => game.purpose).filter((value): value is string => Boolean(value?.trim())))];
  const results = filterGames(games, filters);
  const hasFilters = Object.values(filters).some(Boolean);

  function changeFilter(key: keyof GameFilters, value: string): void {
    setFilters(current => ({...current, [key]: value}));
  }
  function resetFilters(): void {
    setFilters(emptyFilters);
    inputRef.current?.focus();
  }

  return <section id="games" className={`container ${styles.section} ${styles.librarySection}`} aria-labelledby="games-title">
    <div className={styles.libraryHeading}>
      <div><p className={styles.eyebrow}>KHÁM PHÁ THƯ VIỆN</p><h2 id="games-title">Tìm trò chơi cho lớp của bạn</h2></div>
      <p className={styles.sectionDescription}>Chọn hoạt động phù hợp, xem hướng dẫn<br />và yêu cầu trước khi sử dụng.</p>
    </div>
    {games.some(game => game.isSample) && <aside className={styles.notice}><strong>Đang xem dữ liệu mẫu</strong><p>Các trò chơi dưới đây chỉ minh họa giao diện và thao tác tìm kiếm. Chưa có tệp PowerPoint, ảnh sản phẩm hoặc liên kết tải thực tế.</p></aside>}
    {games.length > 0 && <>
      <div role="search" aria-label="Tìm trò chơi PowerPoint" className={styles.searchPanel}>
        <label className={styles.searchLabel} htmlFor={searchId}>Tìm kiếm trò chơi</label>
        <div className={styles.searchRow}>
          <LibraryIcon name="search" className={styles.searchIcon} />
          <input ref={inputRef} id={searchId} type="search" value={filters.query} onChange={event => changeFilter('query', event.target.value)} placeholder="Tìm kiếm trò chơi PowerPoint..." aria-describedby={`${searchId}-hint`} />
          {filters.query && <button type="button" className={styles.clearButton} onClick={() => {changeFilter('query', ''); inputRef.current?.focus();}}>Xóa từ khóa</button>}
        </div>
        <p id={`${searchId}-hint`} className={styles.searchHint}>Tìm theo tên, mô tả hoặc từ khóa; có thể nhập tiếng Việt không dấu.</p>
        {categories.length > 1 && <fieldset className={styles.categoryFilters}><legend>Loại trò chơi</legend><div className={styles.categoryList}>
          <button type="button" className={styles.categoryButton} aria-pressed={!filters.category} onClick={() => changeFilter('category', '')}>Tất cả</button>
          {categories.map(([key, label]) => <button key={key} type="button" className={styles.categoryButton} aria-pressed={filters.category === key} onClick={() => changeFilter('category', key)}>{label}</button>)}
        </div></fieldset>}
        {(grades.length > 0 || purposes.length > 1) && <div className={styles.filters}>
          {grades.length > 0 && <label>Khối lớp<select value={filters.grade} onChange={event => changeFilter('grade', event.target.value)}><option value="">Tất cả khối lớp</option>{grades.map(value => <option key={value} value={value}>Lớp {value}</option>)}</select></label>}
          {purposes.length > 1 && <label>Mục đích sử dụng<select value={filters.purpose} onChange={event => changeFilter('purpose', event.target.value)}><option value="">Tất cả mục đích</option>{purposes.map(value => <option key={value} value={value}>{value}</option>)}</select></label>}
        </div>}
      </div>
      <div className={styles.resultBar}>
        <p role="status" aria-live="polite" aria-atomic="true">Hiển thị {results.length} / {games.length} trò chơi.</p>
        {hasFilters && <button type="button" className={styles.clearButton} onClick={resetFilters}>Đặt lại bộ lọc</button>}
      </div>
    </>}
    {results.length > 0 ? <div className={styles.grid}>{results.map(game => <GameCard key={game.id} game={game} />)}</div> :
      <div className={styles.empty}>
        <span className={styles.emptyIcon}><LibraryIcon name={games.length ? 'search' : 'slides'} /></span>
        {!games.length && <p className={styles.emptyLabel}>THƯ VIỆN ĐANG ĐƯỢC CHUẨN BỊ</p>}
        <h3>{games.length ? 'Chưa tìm thấy trò chơi phù hợp' : 'Chưa có trò chơi được công bố'}</h3>
        <p>{games.length ? 'Hãy thử từ khóa ngắn hơn hoặc đặt lại bộ lọc để xem toàn bộ trò chơi.' : 'Thư viện đang được chuẩn bị. Trò chơi sẽ được bổ sung cùng hướng dẫn sử dụng và thông tin chia sẻ đã xác nhận.'}</p>
        {hasFilters ? <button type="button" className={styles.primaryAction} onClick={resetFilters}>Xóa tất cả điều kiện</button> : <a className={styles.textAction} href="#usage">Xem hướng dẫn chuẩn bị hoạt động <LibraryIcon name="arrow" /></a>}
      </div>}
  </section>;
}
