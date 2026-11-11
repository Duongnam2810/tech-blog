// Dữ liệu giả chỉ nằm trong tiến trình kiểm thử, không được nhập vào website.
const assert = require('node:assert/strict');
const {test} = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const root = path.resolve(__dirname, '../../../..');
const cache = new Map();

// Dùng TypeScript sẵn có; chỉ thay lớp vỏ Docusaurus khi render component bằng Node.
function loadSource(filename) {
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = {exports: {}};
  cache.set(filename, module);
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true},
    fileName: filename,
  }).outputText;
  function localRequire(id) {
    if (id.endsWith('.css')) return new Proxy({}, {get: (_, key) => key === '__esModule' ? false : key});
    if (id === '@theme/Layout') return ({children}) => React.createElement(React.Fragment, null, children);
    if (id === '@docusaurus/Link') return ({to, children, ...props}) => React.createElement('a', {href: to, ...props}, children);
    if (id === '@docusaurus/useBaseUrl') return value => value.startsWith('/') ? `/tech-blog${value}` : value;
    if (id.startsWith('@site/') || id.startsWith('.')) {
      const base = id.startsWith('@site/') ? path.join(root, id.slice(6)) : path.resolve(path.dirname(filename), id);
      const resolved = [base, `${base}.ts`, `${base}.tsx`].find(item => fs.existsSync(item) && fs.statSync(item).isFile());
      if (!resolved) throw new Error(`Không tìm thấy module: ${id}`);
      return loadSource(resolved);
    }
    return require(id);
  }
  new Function('require', 'module', 'exports', output)(localRequire, module, module.exports);
  return module.exports;
}

const load = name => loadSource(path.join(root, 'src/components/PowerPoint', name));
const {filterGames, getGamePath, getResourceUrl} = load('library.ts');
const GameCard = load('GameCard.tsx').default;
const GameLibrary = load('GameLibrary.tsx').default;
const GameDetailPage = load('GameDetailPage.tsx').default;
const data = loadSource(path.join(root, 'src/data/powerpoint.ts'));
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));
const fixtures = [
  {id: 'test-1', slug: 'du-lieu-kiem-thu-1', title: 'DỮ LIỆU KIỂM THỬ: Giải mã đường đi', summary: 'Câu hỏi về thuật toán', category: 'giai-ma', grades: [6, 7], purpose: 'Ôn tập', tags: ['vòng lặp'], macroStatus: 'unknown'},
  {id: 'test-2', slug: 'du-lieu-kiem-thu-2', title: 'DỮ LIỆU KIỂM THỬ: Khởi động', summary: 'Hoạt động nhóm', category: 'khoi-dong', grades: [8], purpose: 'Khởi động', macroStatus: 'no'},
];
const filters = overrides => ({query: '', category: '', grade: '', purpose: '', ...overrides});

test('Tìm tiếng Việt có/không dấu, chữ hoa, nhiều khoảng trắng và từ khóa', () => {
  for (const query of ['GIẢI MÃ ĐƯỜNG', 'giai ma duong', '  THUAT   TOAN ', 'vong lap']) {
    assert.deepEqual(filterGames(fixtures, filters({query})).map(game => game.id), ['test-1']);
  }
});
test('Kết hợp đồng thời từ khóa, loại, lớp và mục đích; bỏ lọc trả đủ dữ liệu', () => {
  assert.equal(filterGames(fixtures, filters({query: 'duong', category: 'giai-ma', grade: '7', purpose: 'Ôn tập'})).length, 1);
  assert.equal(filterGames(fixtures, filters({category: 'giai-ma', grade: '8'})).length, 0);
  assert.equal(filterGames(fixtures, filters({purpose: 'Không có'})).length, 0);
  assert.deepEqual(filterGames(fixtures, filters()), fixtures);
  assert.deepEqual(filterGames([], filters()), []);
});
test('Slug ổn định và từ chối slug gây sai đường dẫn', () => {
  assert.equal(getGamePath(fixtures[0]), '/powerpoint/du-lieu-kiem-thu-1');
  for (const slug of ['../index', 'two/parts', '', 'Có dấu', 'index', 'mau-test']) assert.throws(() => getGamePath({slug}));
});
test('Chỉ hiện liên kết có URL web hoặc đường dẫn nội bộ phù hợp', () => {
  for (const url of ['', 'javascript:alert(1)', '//example.org/file', 'file:///private', 'https://', '/\\host/file']) assert.equal(getResourceUrl(url), undefined);
  assert.equal(getResourceUrl(' https://example.org/file '), 'https://example.org/file');
  assert.equal(getResourceUrl('/files/game.pptx'), '/files/game.pptx');
});
test('Card thiếu ảnh dùng placeholder, có liên kết chi tiết, không có nút tải giả', () => {
  const html = render(GameCard, {game: fixtures[0]});
  assert.match(html, /Chưa có ảnh xem trước/);
  assert.match(html, /href="\/powerpoint\/du-lieu-kiem-thu-1"/);
  assert.match(html, /Xem chi tiết/);
  assert.doesNotMatch(html, /<img|tải xuống/);
});
test('Thư viện trống ẩn tìm kiếm và bộ lọc, có hướng dẫn tiếp theo', () => {
  const html = render(GameLibrary, {games: []});
  assert.match(html, /Chưa có trò chơi được công bố/);
  assert.match(html, /href="#usage"/);
  assert.doesNotMatch(html, /<input|<select/);
});
test('Bộ lọc chỉ hiện khi dữ liệu hỗ trợ; tìm kiếm có nhãn và thông báo kết quả', () => {
  const simple = render(GameLibrary, {games: [{...fixtures[0], grades: undefined}]});
  assert.match(simple, /Tìm kiếm trò chơi PowerPoint\.\.\./);
  assert.match(simple, /role="status"/);
  assert.doesNotMatch(simple, /<select/);
  const full = render(GameLibrary, {games: fixtures});
  assert.equal((full.match(/<select/g) ?? []).length, 2);
  assert.match(full, /<legend>Loại trò chơi<\/legend>/);
  assert.match(full, /aria-pressed="true">Tất cả<\/button>/);
  assert.equal((full.match(/aria-pressed="false"/g) ?? []).length, 2);
  assert.doesNotMatch(full, /Gameshow thi đấu/);
});
test('Chi tiết thiếu dữ liệu ẩn các phần tùy chọn và thông báo chưa có tệp', () => {
  const html = render(GameDetailPage, {game: {id: 'test', slug: 'test', title: 'DỮ LIỆU KIỂM THỬ', summary: 'Kiểm thử', category: 'khac', macroStatus: 'unknown'}});
  assert.match(html, /Chưa có liên kết tải được công bố/);
  assert.match(html, /Quay về thư viện/);
  assert.doesNotMatch(html, /Yêu cầu kỹ thuật|Mục tiêu dạy học|Hướng dẫn cách chơi|<img|<time|Mở demo|Mở liên kết tải xuống/);
});
test('Chi tiết đủ dữ liệu có hướng dẫn, ảnh, macro, demo và metadata', () => {
  const html = render(GameDetailPage, {game: {...fixtures[0], thumbnail: '/img/test.webp', screenshots: ['/img/test-2.webp'], instructions: ['Bước kiểm thử'], requirements: ['Yêu cầu kiểm thử'], macroStatus: 'yes', downloadUrl: 'https://example.org/test.pptm', demoUrl: 'https://example.org/demo', updatedAt: '2026-11-10', author: 'Tác giả kiểm thử', version: '1', license: 'Điều kiện kiểm thử'}});
  for (const text of ['Mục tiêu dạy học', 'Hướng dẫn cách chơi', 'Trò chơi có macro/VBA', 'Mở demo', 'Mở liên kết tải xuống', 'Tác giả kiểm thử', 'Điều kiện kiểm thử']) assert.ok(html.includes(text));
  assert.match(html, /src="\/tech-blog\/img\/test.webp"/);
  assert.match(html, /dateTime="2026-11-10"/);
});
test('Ngày không hợp lệ và URL demo/tải sai không tạo nội dung hỏng', () => {
  const html = render(GameDetailPage, {game: {...fixtures[0], demoUrl: 'javascript:alert(1)', downloadUrl: 'invalid', updatedAt: '2026-02-30'}});
  assert.doesNotMatch(html, /<time|Mở demo|Mở liên kết tải xuống/);
});
test('Mỗi game công khai phải có id/slug duy nhất và file trang chi tiết tương ứng', () => {
  const ids = new Set();
  const slugs = new Set();
  for (const game of data.powerpointGames) {
    assert.ok(!ids.has(game.id) && !slugs.has(game.slug), 'id/slug không được trùng');
    ids.add(game.id); slugs.add(game.slug);
    getGamePath(game);
    const base = path.join(root, 'src/pages/powerpoint', game.slug);
    assert.ok(['.tsx', '.mdx', '/index.tsx', '/index.mdx'].some(suffix => fs.existsSync(base + suffix)), `Thiếu trang cho ${game.slug}`);
  }
  assert.throws(() => data.getPowerPointGame('__khong-ton-tai__'));
});
