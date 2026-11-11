// Fixture chỉ phục vụ kiểm thử, không được nhập vào website.
const assert = require('node:assert/strict');
const {test} = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const root = path.resolve(__dirname, '../../../..');
const cache = new Map();

function loadSource(filename) {
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = {exports: {}};
  cache.set(filename, module);
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true}, fileName: filename,
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
const load = name => loadSource(path.join(root, 'src/components/Resources', name));
const {filterResources, getResourcePath, getResourceFormats, getRelatedResources, formatResourceDate} = load('library.ts');
const ResourceCard = load('ResourceCard.tsx').default;
const ResourceLibrary = load('ResourceLibrary.tsx').default;
const ResourceDetailPage = load('ResourceDetailPage.tsx').default;
const ResourcePreview = load('ResourcePreview.tsx').default;
const data = loadSource(path.join(root, 'src/data/resources.ts'));
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));
const fixtures = [
  {id: 'test-6', slug: 'kiem-thu-6', title: 'KIỂM THỬ: Dữ liệu và thông tin', summary: 'Nội dung tham khảo', type: 'tham-khao', grades: [6], tags: ['máy tính'], subject: 'Thông tin'},
  {id: 'test-7', slug: 'kiem-thu-7', title: 'KIỂM THỬ: Đề ôn tập', summary: 'Nội dung kiểm tra', type: 'de-kiem-tra', grades: [7]},
  {id: 'test-8', slug: 'kiem-thu-8', title: 'KIỂM THỬ: Bài dạy Python', summary: 'Thực hành lập trình', type: 'bai-day', grades: [8, 9], subject: 'Python'},
];
const filters = changes => ({query: '', type: '', grade: '', ...changes});

test('Tìm tiếng Việt có/không dấu, chữ hoa, khoảng trắng, chủ đề và từ khóa', () => {
  for (const query of ['DỮ LIỆU', 'du lieu', '  MAY   TINH ', 'thong tin']) assert.equal(filterResources(fixtures, filters({query}))[0].id, 'test-6');
  assert.equal(filterResources(fixtures, filters({query: 'python'}))[0].id, 'test-8');
});
test('Ba loại và lớp 6–9 kết hợp chính xác với từ khóa', () => {
  for (const [grade, id] of [['6', 'test-6'], ['7', 'test-7'], ['8', 'test-8'], ['9', 'test-8']]) assert.equal(filterResources(fixtures, filters({grade}))[0].id, id);
  assert.equal(filterResources(fixtures, filters({query: 'lap trinh', type: 'bai-day', grade: '9'})).length, 1);
  assert.equal(filterResources(fixtures, filters({query: 'lap trinh', type: 'de-kiem-tra', grade: '9'})).length, 0);
  assert.deepEqual(filterResources(fixtures, filters()), fixtures);
  assert.deepEqual(filterResources([], filters()), []);
});
test('Slug không chứa đường dẫn hoặc ký tự không hợp lệ', () => {
  assert.equal(getResourcePath(fixtures[0]), '/tai-lieu/kiem-thu-6');
  for (const slug of ['index', '', '../file', 'co/dau', 'Có dấu']) assert.throws(() => getResourcePath({slug}));
});
test('Ngày sai bị ẩn; định dạng chỉ lấy từ dữ liệu thật với URL hợp lệ', () => {
  assert.equal(formatResourceDate('2026-02-30'), undefined);
  assert.equal(formatResourceDate('not-date'), undefined);
  assert.equal(formatResourceDate(undefined), undefined);
  assert.ok(formatResourceDate('2026-11-11'));
  assert.deepEqual(getResourceFormats(fixtures[0]), []);
  assert.deepEqual(getResourceFormats({...fixtures[0], contentFormat: 'mdx', files: [{label: 'Test', url: '/files/test.pdf', format: 'pdf'}, {label: 'Sai', url: 'javascript:alert(1)', format: 'zip'}]}), ['Bài đọc trực tuyến', 'PDF']);
});
test('Tài liệu liên quan loại chính mình và loại tài liệu khác lớp/chủ đề', () => {
  assert.deepEqual(getRelatedResources(fixtures[0], fixtures), []);
  const peer = {...fixtures[1], grades: [6]};
  assert.deepEqual(getRelatedResources(fixtures[0], [...fixtures, peer]), [peer]);
});
test('Card ẩn metadata không có, vẫn có loại/lớp và liên kết chi tiết', () => {
  const html = render(ResourceCard, {resource: fixtures[0]});
  assert.match(html, /Tài liệu tham khảo/);
  assert.match(html, /Lớp 6/);
  assert.match(html, /href="\/tai-lieu\/kiem-thu-6"/);
  assert.doesNotMatch(html, /<time|PDF|Tải xuống/);
});
test('Thư viện hiển thị đủ ba loại, lớp 6–9 và thông báo kết quả', () => {
  const html = render(ResourceLibrary, {items: fixtures});
  for (const label of ['Tài liệu tham khảo', 'Đề kiểm tra', 'Bài dạy', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9']) assert.ok(html.includes(label));
  assert.match(html, /role="status"/);
  assert.match(html, /aria-pressed="true">Tất cả/);
  assert.match(html, /Hiển thị 3 \/ 3 tài liệu/);
});
test('Thư viện rỗng giải thích rõ, không tạo card hoặc link tải', () => {
  const html = render(ResourceLibrary, {items: []});
  assert.match(html, /Chưa có tài liệu được công bố/);
  assert.doesNotMatch(html, /<article|Tải xuống/);
});
test('Chi tiết thiếu metadata và file không tạo nút tải hoặc heading rỗng', () => {
  const html = render(ResourceDetailPage, {resource: fixtures[0], relatedItems: []});
  assert.match(html, /Chưa có tệp đính kèm được công bố/);
  assert.match(html, /Quay về thư viện/);
  assert.doesNotMatch(html, /Mục tiêu sử dụng|Xem trước tài liệu|Tài liệu liên quan|<time|Tác giả/);
});
test('Chi tiết hỗ trợ file, preview, metadata, MDX children và tài liệu liên quan', () => {
  const html = render(ResourceDetailPage, {resource: {...fixtures[0], goals: ['Mục tiêu kiểm thử'], author: 'Tác giả kiểm thử', updatedAt: '2026-11-11', license: 'Giấy phép kiểm thử', source: {label: 'Nguồn kiểm thử', url: '/docs/intro'}, preview: {kind: 'image', url: '/img/test.png', label: 'Ảnh kiểm thử'}, files: [{label: 'Tệp kiểm thử', url: '/files/test.pdf', format: 'pdf', sizeLabel: '10 KB'}]}, children: React.createElement('h2', null, 'Nội dung MDX kiểm thử'), relatedItems: [{...fixtures[1], grades: [6]}]});
  for (const label of ['Mục tiêu kiểm thử', 'Tác giả kiểm thử', 'Giấy phép kiểm thử', 'Nội dung MDX kiểm thử', 'Tài liệu liên quan', '10 KB']) assert.ok(html.includes(label));
  assert.match(html, /src="\/tech-blog\/img\/test.png"/);
  assert.match(html, /dateTime="2026-11-11"/);
});
test('URL file và preview sai không tạo liên kết hỏng, PDF mặc định không tải nhúng', () => {
  assert.equal(render(ResourcePreview, {preview: {kind: 'image', url: 'javascript:bad()', label: 'Test'}}), '');
  const html = render(ResourcePreview, {preview: {kind: 'pdf', url: '/files/test.pdf', label: 'PDF kiểm thử'}});
  assert.match(html, /aria-expanded="false"/);
  assert.doesNotMatch(html, /<object/);
  assert.match(html, /href="\/files\/test.pdf"/);
  const detail = render(ResourceDetailPage, {resource: {...fixtures[0], files: [{label: 'Sai', url: 'invalid', format: 'pdf'}]}, relatedItems: []});
  assert.match(detail, /Chưa có tệp đính kèm/);
});
test('Dữ liệu công khai có slug/id duy nhất và file route, không chứa link Drive mẫu', () => {
  const ids = new Set(); const slugs = new Set();
  for (const resource of data.resources) {
    assert.ok(!ids.has(resource.id) && !slugs.has(resource.slug)); ids.add(resource.id); slugs.add(resource.slug);
    getResourcePath(resource);
    assert.ok(fs.existsSync(path.join(root, 'src/pages/tai-lieu', `${resource.slug}.tsx`)));
    assert.ok(resource.grades.every(grade => [6, 7, 8, 9].includes(grade)));
    assert.ok(!JSON.stringify(resource).includes('LINK_DRIVE_CUA_BAN'));
  }
  assert.throws(() => data.getResource('khong-co'));
});
