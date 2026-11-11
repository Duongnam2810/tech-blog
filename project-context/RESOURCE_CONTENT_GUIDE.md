# Quản lý thư viện Tài liệu Tin học THCS

## Hiện trạng

- Trang danh sách: `/tai-lieu`.
- Trang chi tiết đầu tiên: `/tai-lieu/lam-quen-voi-python`.
- Bài Python có sẵn được giới thiệu dưới dạng tài liệu tham khảo lớp 8 theo frontmatter gốc. Nội dung giới thiệu nằm ở `src/content/resources/python-introduction.mdx`.
- Chưa có đề kiểm tra, giáo án, PDF, Word hoặc tệp tải thực tế trong thư viện. Không đưa liên kết Drive mẫu của bài Python gốc vào danh sách tệp đính kèm.
- Bài Python gốc vẫn giữ URL `/docs/python-tutorial/bai-1-lam-quen-python`. Menu Tài liệu chuyển đến thư viện mới; các route docs cũ không bị đổi.

## Cấu trúc dữ liệu

`src/data/resources.ts` chứa kiểu `Resource`, danh sách `resources` và hàm `getResource`.

| Trường | Quy ước |
| --- | --- |
| `id`, `slug` | Duy nhất, ổn định; slug dùng chữ thường không dấu, số và dấu gạch ngang, không dùng `index` |
| `title`, `summary` | Tiêu đề và mô tả thật, bằng tiếng Việt |
| `type` | `tham-khao`, `de-kiem-tra` hoặc `bai-day` |
| `grades` | Một hoặc nhiều khối 6, 7, 8, 9 đã xác nhận |
| `subject`, `tags` | Chủ đề và từ khóa phục vụ tìm kiếm |
| `goals` | Mục tiêu/lợi ích có cơ sở từ nội dung |
| `contentFormat` | `mdx` nếu có bài đọc trực tuyến; giao diện hiển thị “Bài đọc trực tuyến” |
| `files` | Tệp thật với `label`, `url`, `format` và `sizeLabel` nếu biết |
| `preview` | `{kind: 'image' hoặc 'pdf', url, label}` cho bản xem trước thật |
| `thumbnail` | Ảnh thật dùng làm bản xem trước khi chưa khai báo `preview` |
| `author`, `license` | Tác giả và điều kiện sử dụng đã xác nhận |
| `source` | `{label, url?}` để ghi nguồn bằng văn bản và gắn liên kết khi có |
| `updatedAt` | `YYYY-MM-DD`; bỏ trống nếu chưa biết ngày cập nhật thực tế |

Kiểu này bám theo `Resource` đề xuất trong nguồn ngữ cảnh. `updatedAt` là tùy chọn để tránh tạo ngày giả. `goals`, `preview`, `contentFormat` phục vụ trang chi tiết. `source` dùng cấu trúc nhỏ để tách tên nguồn khỏi URL.

## Thêm tài liệu thật

1. Xác nhận nội dung, khối lớp, loại tài liệu và quyền công khai. Với đề kiểm tra, không đăng đề chưa được phép phát hành hoặc dữ liệu học sinh.
2. Thêm một mục vào `resources`. Không thêm số liệu, tác giả, ngày hoặc tệp chưa được xác nhận.
3. Viết nội dung dài tại `src/content/resources/<ten-file>.mdx`, bắt đầu bằng heading cấp 2. Tiêu đề cấp 1 do trang chi tiết tạo.
4. Tạo `src/pages/tai-lieu/<slug>.tsx`, tương tự file trang chi tiết Python hiện có: lấy dữ liệu qua `getResource`, import file MDX và truyền nội dung vào `ResourceDetailPage`.
5. Với file trong `static`, dùng đường dẫn `/files/...` hoặc `/img/...`, không tự thêm `/tech-blog/`. Tệp lớn nên lưu ngoài repo bằng liên kết chia sẻ đã xác nhận. Liên kết đi qua `Link`, ảnh và PDF đi qua `useBaseUrl`.
6. Chạy các kiểm tra bên dưới. Thêm dữ liệu và file trang trong cùng một lần để thẻ không trỏ tới route thiếu.

Không sao chép nguyên bố cục `Layout` vào file MDX dưới `src/pages`: Docusaurus đã bọc trang MDX bằng layout riêng. Dự án dùng file `.tsx` để tạo route, file MDX dưới `src/content` để chứa nội dung.

## Hành vi giao diện

- Tìm kiếm không phân biệt chữ hoa/thường hoặc dấu tiếng Việt; tìm trong tiêu đề, mô tả, chủ đề, loại và từ khóa.
- Loại tài liệu và khối lớp kết hợp với từ khóa theo điều kiện đồng thời. Các khối 6–9 và ba loại luôn có thể chọn; nhóm chưa có nội dung trả về thông báo rõ ràng.
- Xóa từ khóa giữ nguyên lựa chọn loại/lớp. Xóa bộ lọc đặt lại tất cả và đưa focus về ô tìm kiếm.
- Trường tùy chọn thiếu sẽ được ẩn. Không có tệp thì hiển thị thông báo, không tạo nút tải.
- PDF chỉ được nhúng khi người dùng bấm xem; luôn có liên kết mở riêng cho trình duyệt không hỗ trợ hoặc dịch vụ chặn nhúng. URL hợp lệ về cú pháp không có nghĩa là tệp đã được xác minh tồn tại: cần tự kiểm tra tệp trước khi đăng.
- Tài liệu liên quan được chọn từ nội dung thật cùng khối lớp hoặc cùng chủ đề, loại chính tài liệu đang xem, tối đa ba mục.
- Màu sắc/font kế thừa design tokens chung; icon và hai hàm thuần xử lý tìm kiếm/URL được tái sử dụng từ PowerPoint, không sửa chuyên mục PowerPoint.

## Kiểm thử

```text
npm run typecheck
node src/components/Resources/__tests__/library.test.cjs
node src/components/PowerPoint/__tests__/library.test.cjs
npm run build
npm start
```

Mở `/tech-blog/tai-lieu` và trang chi tiết. Thử tìm `python`, chọn lớp 8 và loại Tài liệu tham khảo; chọn lớp 6 hoặc Đề kiểm tra để thử trạng thái không có kết quả. Kiểm tra bàn phím, sáng/tối và các chiều rộng 375/768/1440px. Kiểm thử Node sử dụng fixture trong file test, không công bố dữ liệu giả lên website.
