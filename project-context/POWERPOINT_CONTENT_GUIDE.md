# Bổ sung nội dung PowerPoint

> **Cơ chế đã triển khai:** Pages plugin riêng có `id: 'powerpoint'` đọc `docs/powerpoint/<slug>.mdx` và tạo URL `/powerpoint/<slug>`. `PowerPointMDXPage.tsx` lấy metadata theo tên file rồi ghép nội dung vào `GameDetailPage`. Docs plugin loại trừ `powerpoint/**`, các tài liệu khác vẫn ở `/docs`; `baseUrl` giữ `/tech-blog/`. Không cần thêm file TSX cho mỗi game mới.
>
> Cả ba trang mẫu hiện nằm trong `docs/powerpoint` dưới dạng MDX. Production loại trừ các trang `mau-*.mdx` khỏi Pages plugin riêng và không để Docs plugin xuất bản lại chúng. Các file TSX cũ, nếu còn, vẫn được hỗ trợ nhưng không được trùng route với MDX.

## 1. Kiến trúc quản lý nội dung

Chuyên mục PowerPoint sử dụng kiến trúc kết hợp **TSX + MDX + TypeScript Data** nhằm phân tách rõ giao diện, nội dung và dữ liệu.

### Phân chia trách nhiệm

**TSX — Giao diện và chức năng**

Sử dụng cho:

- Trang thư viện `/powerpoint`.
- Tìm kiếm và bộ lọc.
- `GameLibrary`, `GameCard`, `GameImage`.
- Component trình bày nội dung chi tiết `GameDetailPage`.
- Gallery ảnh, cảnh báo macro, nút tải và các thành phần giao diện tái sử dụng.

**MDX — Nội dung chi tiết trò chơi**

Mỗi trò chơi thật có một file `.mdx` riêng, dùng để trình bày:

- Giới thiệu trò chơi.
- Mục tiêu và giá trị sử dụng trong dạy học.
- Hướng dẫn cách chơi chi tiết.
- Các bước tổ chức hoạt động.
- Hình ảnh minh họa hoặc hướng dẫn thực tế.
- Những lưu ý và mẹo sử dụng.
- Nội dung mở rộng đặc thù của từng trò chơi.

**TypeScript — Dữ liệu có cấu trúc**

File `src/data/powerpoint.ts` là nguồn dữ liệu chuẩn cho:

- Danh sách trò chơi `powerpointGames`.
- ID và slug.
- Tiêu đề và mô tả ngắn.
- Phân loại, khối lớp, môn học và từ khóa.
- Ảnh đại diện, thông tin phiên bản và thời gian.
- Đường dẫn demo và tải xuống.
- Trạng thái macro và yêu cầu kỹ thuật.
- Các trường metadata khác.

### Nguyên tắc tránh trùng lặp

Mỗi thông tin chỉ có một nguồn quản lý chính.

- Tiêu đề, slug, phân loại, metadata và liên kết tải được quản lý trong TypeScript.
- MDX tập trung vào nội dung dài, không khai báo lại các metadata đã được quản lý trong TypeScript.
- Component TSX nhận dữ liệu TypeScript và hiển thị nội dung MDX.
- Không duy trì hai danh sách trò chơi độc lập.
- Không tạo đồng thời file `.tsx` và `.mdx` sinh cùng một route.

Các trang chi tiết được xây dựng bằng MDX, kết hợp component React dùng chung. Trước khi triển khai cần kiểm tra cấu hình Docusaurus và lựa chọn cơ chế routing phù hợp để không làm thay đổi URL hiện có.

---

## 2. Nguồn dữ liệu trò chơi

Trang `/powerpoint` đọc danh sách `powerpointGames` từ:

`src/data/powerpoint.ts`

Hiện danh sách rỗng vì chưa có trò chơi thật được xác nhận.

Dữ liệu công khai chỉ bao gồm những trò chơi đã có thông tin thực tế và được phép chia sẻ.

Khi thêm trò chơi mới:

1. Thêm metadata vào `powerpointGames`.
2. Tạo file MDX chứa nội dung chi tiết.
3. Đảm bảo slug và route tương ứng.
4. Kiểm tra đường dẫn và khả năng hiển thị.
5. Chỉ công khai khi nội dung và quyền chia sẻ đã được xác nhận.

Không tự tạo dữ liệu sản phẩm giả để lấp đầy thư viện.

## 3. Xem thử với dữ liệu mẫu

Chạy:

```bash
npm start
```

Sau đó mở:

`/tech-blog/powerpoint`

Khi chưa có trò chơi thật, môi trường phát triển có thể sử dụng dữ liệu từ:

`src/data/powerpointSamples.ts`

Ba trò chơi minh họa hiện có:

- Đố vui Tin học.
- Giải mã ô chữ.
- Khởi động nhanh.

Dữ liệu mẫu phục vụ kiểm tra:

- Bố cục thư viện.
- Tìm kiếm.
- Bộ lọc kết hợp.
- Hiển thị card.
- Điều hướng trang chi tiết.
- Giao diện responsive.

Các trò chơi mẫu phải được gắn nhãn rõ ràng và không chứa ảnh sản phẩm hoặc đường dẫn tải giả.

Các số phút và hướng dẫn chỉ mang tính minh họa.

### Quy tắc môi trường

- Dữ liệu mẫu chỉ được sử dụng trong môi trường phát triển.
- Production không hiển thị trò chơi mẫu.
- Khi có trò chơi thật, thư viện ưu tiên dữ liệu công khai.
- Các trang mẫu không được xuất bản lên GitHub Pages.

**Lưu ý khi chuyển sang MDX:** Cơ chế loại trừ các trang mẫu `.tsx` trước đây phải được kiểm tra và điều chỉnh cho các route MDX. Không mặc định rằng điều kiện `NODE_ENV=development` trong component sẽ ngăn Docusaurus tạo trang MDX ở production.

Phải kiểm tra kết quả production build để xác nhận các trang mẫu không được xuất bản.

---

## 4. Cấu trúc thư mục đề xuất

```text
tech-blog/
├── docs/
│   ├── powerpoint/               # Pages plugin riêng, URL /powerpoint/<slug>
│   │   ├── <slug>.mdx
│   │   └── mau-*.mdx             # Chỉ dùng khi chạy local
│   └── ...                      # Docs plugin, URL /docs/...
├── src/
│   ├── components/
│   │   └── PowerPoint/
│   │       ├── PowerPointHero.tsx
│   │       ├── PowerPointUsageGuide.tsx
│   │       ├── GameLibrary.tsx
│   │       ├── GameCard.tsx
│   │       ├── GameImage.tsx
│   │       ├── GameDetailPage.tsx
│   │       ├── PowerPointMDXPage.tsx
│   │       ├── mdx.ts
│   │       ├── library.ts
│   │       ├── styles.module.css
│   │       └── ...
│   │
│   ├── data/
│   │   ├── powerpoint.ts
│   │   └── powerpointSamples.ts
│   │
│   └── pages/
│       └── powerpoint/
│           ├── index.tsx
│
└── static/
    └── img/
        └── powerpoint/
```

Đây là cấu trúc đang áp dụng. Các file `.tsx` cũ không được tự động chuyển đổi hoặc xóa. Khi cần chuyển một trang cũ sang MDX, phải giữ đúng tên file/URL, chuyển đủ nội dung và bảo đảm chỉ còn một file tạo route đó.

`src/pages/powerpoint/index.tsx` chỉ ghép `PowerPointHero`, `GameLibrary` và `PowerPointUsageGuide` bên trong Layout. CSS chung nằm cạnh các component tại `src/components/PowerPoint/styles.module.css`; thư mục `pages/powerpoint` chỉ chứa các file tạo route. Các component không phụ thuộc vào stylesheet trong thư mục trang nữa.

### Quy tắc routing

- Trang thư viện tiếp tục sử dụng TSX tại `/powerpoint`.
- Trang chi tiết sử dụng MDX.
- Mỗi trò chơi có một slug duy nhất.
- Không tạo hai file sinh cùng route.
- Không thay đổi các URL đã công khai nếu chưa có phương án tương thích.

Đối với Docusaurus, vị trí file MDX phụ thuộc vào cách cấu hình plugin Docs hoặc Pages.

Plugin Pages `powerpoint` dùng `path: 'docs/powerpoint'`, `routeBasePath: 'powerpoint'`, chỉ đọc file `.mdx` ở ngay thư mục này. Docs plugin mặc định loại trừ `powerpoint/**` để tránh sinh route `/docs/powerpoint/...` hoặc công bố trang mẫu. Không thêm lại cùng một game vào `src/pages/powerpoint`.

Plugin local `plugins/powerpoint-mdx/index.ts` loại thư mục này khỏi loader MDX của Docs. Quy tắc `docs.exclude` chỉ ngăn tạo route, không ngăn loader xử lý file do plugin khác nhập; cần cả hai để tránh biên dịch MDX hai lần. Các loader và tài liệu khác được giữ nguyên. Plugin local này phải đứng sau plugin Pages PowerPoint trong cấu hình.

Không tự ý thay đổi `routeBasePath` của website.

---

## 5. Quy trình thêm trò chơi PowerPoint

### Bước 1 — Xác nhận dữ liệu thật

Trước khi công bố, xác nhận:

- Tên trò chơi.
- Mô tả.
- Mục tiêu dạy học.
- Cách chơi.
- Khối lớp hoặc đối tượng sử dụng.
- Quyền chia sẻ.
- Trạng thái macro.
- Ảnh chụp giao diện thật.
- Liên kết tải nếu có.

Không suy luận thông tin chưa được kiểm chứng.

### Bước 2 — Thêm metadata TypeScript

Thêm một mục theo kiểu `PowerPointGame` vào:

`src/data/powerpoint.ts`

Yêu cầu:

- `id` duy nhất.
- `slug` duy nhất và ổn định.
- Chọn `category` từ `gameCategories`.
- Slug dùng chữ thường không dấu, số và dấu gạch ngang.
- Không sử dụng slug `index`.
- Không sử dụng tiền tố `mau-` cho trò chơi công khai.

Chỉ khai báo các trường tùy chọn khi có thông tin thật.

### Bước 3 — Tạo nội dung MDX

Tạo một file `.mdx` cho trò chơi.

Tên file nên tương ứng với slug.

Ví dụ:

`docs/powerpoint/ai-la-trieu-phu.mdx`

File MDX dùng để viết nội dung dài, không sao chép toàn bộ metadata từ TypeScript.

Tên file phải trùng chính xác với `slug` trong `powerpointGames`. Không khai báo frontmatter `slug`, `title`, mô tả hoặc metadata trùng lặp; không thêm tiêu đề H1. Trang chi tiết lấy H1 và SEO từ TypeScript. Không import hoặc bọc nội dung bằng `GameDetailPage`/`Layout` trong MDX: Pages plugin đã gọi component tích hợp chung.

Có thể sao chép mẫu soạn thảo tại `project-context/templates/powerpoint-game.mdx.example`, thay toàn bộ nội dung minh họa rồi lưu thành file MDX của game thật. File `.example` không tạo route và không được công bố.

Nội dung MDX nên tuân theo cấu trúc:

1. Giới thiệu.
2. Mục tiêu dạy học.
3. Hướng dẫn cách chơi.
4. Cách tổ chức hoạt động.
5. Lưu ý khi sử dụng.
6. Nội dung bổ sung nếu có.

Các thông tin như ảnh đại diện, loại trò chơi, phiên bản và liên kết tải được component TSX hiển thị từ dữ liệu TypeScript.

### Bước 4 — Liên kết dữ liệu với trang chi tiết

Tích hợp file MDX với `GameDetailPage`.

Component này chịu trách nhiệm:

- Nhận metadata do `PowerPointMDXPage` lấy theo tên file/slug.
- Hiển thị metadata.
- Hiển thị nội dung MDX.
- Hiển thị cảnh báo macro.
- Hiển thị hình ảnh, demo và liên kết tải khi có.
- Cung cấp liên kết quay về thư viện.

Cơ chế tích hợp phải tương thích với cách Docusaurus biên dịch MDX.

Không xây dựng hệ thống tải MDX động bằng đường dẫn runtime nếu Docusaurus không hỗ trợ cách đó.

### Bước 5 — Kiểm tra ảnh và liên kết

Với ảnh đặt trong `static/img`, sử dụng đường dẫn:

`/img/...`

Không thêm `/tech-blog/` bằng tay.

Các component TSX cần sử dụng `useBaseUrl` hoặc cơ chế URL tương thích Docusaurus.

Các liên kết điều hướng nội bộ sử dụng `Link` của Docusaurus khi phù hợp.

Chỉ khai báo `downloadUrl` khi đã xác nhận quyền chia sẻ.

URL phải sử dụng giao thức hợp lệ hoặc đường dẫn nội bộ hợp lệ.

Không hiển thị URL sai định dạng.

### Bước 6 — Kiểm tra macro

Trường `macroStatus` có ba giá trị:

- `yes`: Có sử dụng macro.
- `no`: Đã xác nhận không sử dụng macro.
- `unknown`: Chưa xác định.

Không suy luận độ an toàn của tệp chỉ từ phần mở rộng.

Khi có macro, trang chi tiết phải hiển thị lưu ý để người dùng kiểm tra nguồn và độ tin cậy trước khi bật macro.

### Bước 7 — Kiểm thử

Chạy:

```bash
npm run typecheck
node src/components/PowerPoint/__tests__/library.test.cjs
npm run build
```

Đồng thời kiểm tra giao diện trên:

- Điện thoại.
- Máy tính bảng.
- Máy tính.
- Chế độ sáng và tối nếu có.
- Điều hướng bàn phím.

Chỉ chạy các script khi chúng tồn tại và phù hợp với repository hiện tại. Báo cáo rõ nếu thiếu script hoặc kiểm thử không thể thực hiện.

Không đưa tệp PowerPoint dung lượng lớn vào repository tùy tiện. Ưu tiên sử dụng nguồn lưu trữ đã được xác nhận.

---

## 6. Cách giao diện thư viện hoạt động

### GameLibrary

`GameLibrary` dùng React `useState` quản lý:

- Từ khóa tìm kiếm.
- Loại trò chơi.
- Khối lớp.
- Mục đích sử dụng.

Kết quả phải thỏa mãn đồng thời các điều kiện đang chọn.

Xóa từ khóa không được làm mất các bộ lọc khác.

Đặt lại bộ lọc phải xóa toàn bộ điều kiện và đưa focus về ô tìm kiếm.

### Tìm kiếm

Tìm kiếm cần:

- Không phân biệt chữ hoa/thường.
- Hỗ trợ tiếng Việt có dấu và không dấu.
- Chấp nhận khoảng trắng giữa các từ.
- Tìm trong tên, mô tả, mục đích, cách chơi tóm tắt, môn học và từ khóa.

Không cần tìm trực tiếp toàn bộ nội dung MDX trong giai đoạn đầu.

Các trường tìm kiếm được lấy từ dữ liệu TypeScript để tránh phải phân tích nội dung MDX ở runtime.

### Bộ lọc

- Chỉ liệt kê các giá trị thực sự có dữ liệu.
- Loại game dùng nút chọn nhanh với `aria-pressed`.
- Khối lớp và mục đích dùng danh sách chọn.
- Loại game và mục đích chỉ xuất hiện khi có ít nhất hai giá trị khác nhau.
- Bộ lọc tự xuống dòng trên điện thoại, tránh cuộn ngang không cần thiết.

### GameCard

`GameCard` được tái sử dụng ở:

- Thư viện PowerPoint.
- Khu vực PowerPoint trên Trang chủ.

Card chỉ hiển thị thông tin ngắn gọn.

Không đưa toàn bộ hướng dẫn trong MDX lên card.

Card điều hướng đến URL chi tiết tương ứng.

### GameImage

`GameImage` hiển thị ảnh theo tỷ lệ 16:9.

Yêu cầu:

- Không làm méo hoặc cắt mất nội dung quan trọng.
- Sử dụng placeholder trung tính nếu không có ảnh hoặc ảnh lỗi.
- Không thể hiện placeholder như ảnh chụp trò chơi thật.
- Hỗ trợ alt text phù hợp.

### CSS

- Ưu tiên CSS Modules.
- Tái sử dụng biến màu hiện có.
- Hỗ trợ chế độ sáng/tối.
- Giữ bố cục responsive.
- Không thay đổi hệ thống thiết kế toàn website nếu không cần thiết.

---

## 7. Trang chi tiết trò chơi — MDX + TSX

### Nguyên tắc

**MDX là nguồn nội dung chi tiết. TSX là lớp giao diện trình bày. TypeScript là nguồn metadata.**

Không tạo một trang `.tsx` độc lập cho từng trò chơi nếu hệ thống MDX đã đảm nhận việc tạo route.

### GameDetailPage

Component `GameDetailPage` tiếp tục được sử dụng làm giao diện chi tiết dùng chung.

Chức năng:

- Nhận dữ liệu trò chơi.
- Hiển thị tiêu đề, metadata và ảnh.
- Hiển thị nội dung MDX qua `children` hoặc cơ chế tích hợp phù hợp.
- Hiển thị phần có dữ liệu và ẩn phần thiếu dữ liệu.
- Hiển thị cảnh báo macro.
- Hiển thị nút tải hợp lệ hoặc thông báo chưa có liên kết tải.
- Đọc `updatedAt` dạng `YYYY-MM-DD` và hiển thị ngày theo định dạng tiếng Việt.
- Demo sử dụng liên kết thay vì tự động nhúng trình phát bên ngoài.

### Ví dụ file MDX

Ví dụ file:

`docs/powerpoint/ten-tro-choi.mdx`

```mdx
## Giới thiệu

Nội dung giới thiệu trò chơi.

## Hướng dẫn cách chơi

1. Bước thứ nhất.
2. Bước thứ hai.
3. Bước thứ ba.

## Lưu ý khi sử dụng

Các lưu ý bổ sung dành cho giáo viên.

```

Đây là ví dụ cấu trúc nội dung, không phải trò chơi đã được xác nhận.

**Cách ghép nội dung:** `PowerPointMDXPage` nhận file MDX từ Pages plugin, dùng `metadata.source` để suy ra tên file, rồi tìm game trong TypeScript. `GameDetailPage` là nơi duy nhất tạo Layout và H1. Những trang MDX ngoài PowerPoint tiếp tục dùng `@theme/MDXPage` mặc định. Thiếu metadata tương ứng sẽ báo lỗi, thay vì xuất bản trang thiếu dữ liệu. MDX được biên dịch lúc build, không tải động theo đường dẫn runtime.

Không sao chép lại metadata vào front matter MDX nếu các trường đó đã có trong TypeScript. Nếu Docusaurus yêu cầu front matter để tạo route, sidebar hoặc SEO, chỉ khai báo phần tối thiểu cần thiết và có cơ chế kiểm tra đồng bộ với nguồn dữ liệu chuẩn.

### Quy tắc URL

Dự án hiện sử dụng:

`trailingSlash: false`

URL chuẩn của trang chi tiết:

`/tech-blog/powerpoint/<slug>`

Giữ nguyên quy ước này.

Không đổi cấu hình toàn website chỉ để thêm dấu `/` ở cuối URL.

---

## 8. Các trường dữ liệu bổ sung

| Trường | Vai trò |
|---|---|
| `slug` | Định danh URL ổn định |
| `purpose` | Mục tiêu dạy học, sử dụng cho bộ lọc |
| `audience` | Đối tượng sử dụng |
| `organization` | Cách tổ chức cá nhân hoặc nhóm |
| `tags` | Từ khóa tìm kiếm |
| `subjects` | Môn học phù hợp |
| `gameplay` | Tóm tắt cách chơi, phục vụ card và tìm kiếm |
| `instructions` | Hướng dẫn ngắn có cấu trúc nếu thực sự cần |
| `durationMinutes` | Thời gian đã xác nhận |
| `screenshots` | Ảnh chụp giao diện thật |
| `macroStatus` | Trạng thái sử dụng macro |
| `author` | Tác giả |
| `version` | Phiên bản |
| `updatedAt` | Ngày cập nhật |

### Quy tắc riêng cho instructions

Nội dung hướng dẫn dài phải được viết trong MDX.

Không lưu cùng một bản hướng dẫn đầy đủ trong cả `instructions` và MDX.

Nếu cần hiển thị hướng dẫn tóm tắt trong TypeScript, hãy sử dụng `gameplay`.

Ưu tiên loại bỏ trường `instructions` nếu không có chức năng riêng cần dữ liệu có cấu trúc.

Hiện vẫn giữ `instructions` để tương thích các trang TSX cũ. Khi truyền nội dung MDX vào `GameDetailPage`, hướng dẫn cũ sẽ không hiển thị đồng thời. Với game mới, đặt hướng dẫn đầy đủ trong MDX; `gameplay` chỉ dùng làm tóm tắt ngắn. Không sao chép lại `purpose`, yêu cầu kỹ thuật, thông tin macro hoặc liên kết tải vào MDX nếu chúng đã được layout hiển thị.

Không tạo thêm schema song song với `PowerPointGame`.

---

## 9. Phạm vi kiểm thử

Bộ kiểm thử cần bao phủ:

- Tìm kiếm tiếng Việt.
- Bộ lọc kết hợp.
- Trạng thái thư viện rỗng.
- Placeholder ảnh.
- Metadata tùy chọn.
- Trạng thái macro.
- Kiểm tra URL.
- Ngày cập nhật.
- Slug duy nhất.
- Quan hệ giữa dữ liệu TypeScript và các trang MDX.
- Phát hiện route chi tiết bị thiếu.
- Phát hiện route trùng lặp.
- Kiểm tra không xuất bản các trang mẫu.
- Khả năng build production.

Dữ liệu kiểm thử chỉ nằm trong file kiểm thử và không được import vào website production.

Có thể sử dụng adapter tối thiểu cho kiểm thử render nếu phù hợp với cấu trúc hiện tại.

Kiểm thử đơn vị không thay thế việc kiểm tra giao diện và tương tác thực tế bằng trình duyệt.

Hiện chưa có trò chơi thật nên chưa thể nghiệm thu đầy đủ:

- Quy trình tải tệp thực tế.
- Hình ảnh trò chơi thật.
- Nội dung chi tiết thực tế.
- Tương thích với file PowerPoint được chia sẻ.

---

## 10. Nguyên tắc phát triển lâu dài

Khi phát triển thư viện PowerPoint, phải bảo đảm:

1. Thêm trò chơi mới chủ yếu bằng việc bổ sung metadata và nội dung MDX.
2. Không cần tạo component TSX mới cho từng trò chơi.
3. Không sao chép cùng một thông tin giữa TypeScript và MDX.
4. Không tạo route trùng lặp.
5. Không thay đổi URL công khai không cần thiết.
6. Không tự ý thay đổi cấu hình Docusaurus toàn website.
7. Không công bố dữ liệu mẫu hoặc liên kết tải giả.
8. Không bổ sung backend, CMS hoặc dependency khi chưa có nhu cầu.
9. Giữ tương thích GitHub Pages.
10. Ưu tiên kiến trúc đơn giản, rõ ràng và dễ bảo trì.

**Kiến trúc cuối cùng:**

- `GameLibrary.tsx`: Thư viện và bộ lọc.
- `GameCard.tsx`: Card trò chơi.
- `GameImage.tsx`: Hình ảnh và placeholder.
- `GameDetailPage.tsx`: Giao diện chi tiết dùng chung.
- `powerpoint.ts`: Metadata và danh sách trò chơi.
- `<slug>.mdx`: Nội dung dài của từng trò chơi.

Mọi thay đổi kỹ thuật cần dựa trên repository thực tế và tuân thủ `AGENTS.md` cùng tài liệu ngữ cảnh gốc.
