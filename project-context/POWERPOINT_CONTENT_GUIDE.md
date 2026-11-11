# Bổ sung nội dung PowerPoint

Trang `/powerpoint` đọc danh sách `powerpointGames` từ `src/data/powerpoint.ts`. Hiện danh sách rỗng vì chưa có trò chơi được xác nhận.

## Xem thử với dữ liệu mẫu

Chạy `npm start`, mở `/tech-blog/powerpoint` trên máy local. Khi chưa có game thật, giao diện hiển thị ba mục trong `src/data/powerpointSamples.ts`: Đố vui Tin học, Giải mã ô chữ và Khởi động nhanh. Có thể thử tìm kiếm, lọc và mở trang chi tiết.

Mẫu có nhãn rõ ràng, không có ảnh sản phẩm hoặc liên kết tải giả. Các số phút và cách chơi chỉ minh họa. Dữ liệu mẫu chỉ tồn tại khi `NODE_ENV=development`; các trang `mau-*.tsx` đã được cấu hình loại khỏi production. `npm run build` và `npm run serve` sẽ hiển thị dữ liệu công khai, không hiển thị các mẫu này. Khi bổ sung game thật, thư viện tự ưu tiên danh sách thật.

## Quy trình thêm trò chơi

1. Xác nhận tên, mô tả, quyền chia sẻ, cách chơi và trạng thái macro của tệp thật.
2. Thêm một mục có kiểu `PowerPointGame` vào danh sách. `id` và `slug` phải duy nhất, ổn định. Chọn `category` trong `gameCategories`. Slug dùng chữ thường không dấu, số và dấu gạch ngang; không dùng `index` hoặc tiền tố `mau-` (bị cấu hình hiện tại loại khỏi production).
3. Chỉ khai báo khối lớp, hình ảnh, yêu cầu kỹ thuật, demo và liên kết tải khi có thông tin thực tế. Không dùng ảnh minh họa làm ảnh chụp giao diện game.
4. Với ảnh trong `static/img`, dùng đường dẫn `/img/...`, không thêm `/tech-blog/` bằng tay. Component dùng `useBaseUrl` để xử lý tiền tố. Các liên kết dùng `Link` của Docusaurus.
5. Chỉ thêm `downloadUrl` khi đã xác nhận quyền chia sẻ; ghi điều kiện sử dụng trong `license` khi có thông tin. Liên kết tải xuất hiện khi URL hợp lệ; không dùng sự có mặt của trường giấy phép để suy luận quyền chia sẻ. URL web phải có `https://` hoặc `http://`; đường dẫn nội bộ bắt đầu bằng `/`. URL sai định dạng hoặc giao thức không được hiển thị.
6. Đặt `macroStatus` là `yes`, `no` hoặc `unknown` theo thông tin đã kiểm tra. Không suy luận tệp an toàn chỉ từ phần mở rộng.
7. Tạo file trang theo hướng dẫn bên dưới, cùng lúc với việc thêm dữ liệu để liên kết trên thẻ không bị hỏng.
8. Chạy `npm run typecheck`, `node src/components/PowerPoint/__tests__/library.test.cjs` và `npm run build`. Xem thử trang trên màn hình nhỏ, sáng/tối, dùng bàn phím và thử các bộ lọc kết hợp.

Không đưa tệp PowerPoint lớn vào repository tùy tiện. Dùng liên kết lưu trữ đã được chủ dự án xác nhận và kiểm tra quyền truy cập trước khi công bố.

## Cách giao diện hoạt động

- `GameLibrary` dùng `useState` giữ từ khóa, loại game, khối lớp và mục đích đang chọn; kết quả phải thỏa mãn đồng thời các điều kiện. Xóa từ khóa giữ nguyên các bộ lọc khác; đặt lại bộ lọc xóa toàn bộ điều kiện và đưa focus về ô tìm kiếm.
- Tìm kiếm bỏ dấu tiếng Việt, không phân biệt chữ hoa/thường và chấp nhận khoảng trắng giữa các từ. Có thể tìm trong tên, mô tả, mục đích, cách chơi, môn học và từ khóa. Bộ lọc chỉ liệt kê giá trị thực sự có dữ liệu; loại game và mục đích chỉ xuất hiện khi có ít nhất hai giá trị khác nhau.
- Loại game dùng nút chọn nhanh, trạng thái được công bố bằng `aria-pressed`. Khối lớp và mục đích dùng danh sách chọn. Các nút tự xuống dòng trên màn hình nhỏ, không cần cuộn ngang.
- `GameCard` tái sử dụng ở trang PowerPoint và khu vực PowerPoint của trang chủ. Thẻ điều hướng đến trang chi tiết, không lặp hướng dẫn dài trong gallery.
- `GameImage` hiển thị ảnh theo tỷ lệ 16:9, không cắt nội dung ảnh; khi thiếu ảnh hoặc tải ảnh lỗi sẽ dùng placeholder trung tính. Placeholder không phải ảnh chụp sản phẩm.
- CSS Module giới hạn kiểu hiển thị trong component; màu dùng biến hiện có để theo chế độ sáng/tối.
- `GameDetailPage` nhận dữ liệu của một game, hiển thị các phần có dữ liệu, cảnh báo macro và thông báo khi chưa có liên kết tải. Ngày cập nhật dùng `YYYY-MM-DD`. Demo mở bằng liên kết, không nhúng trình phát từ dịch vụ bên ngoài.

## Tạo trang chi tiết cho game thật

Docusaurus tạo route từ tên file trong `src/pages`. Với slug thực tế đã khai báo, tạo `src/pages/powerpoint/<slug>.tsx`, thay `SLUG_THUC_TE` trong đoạn dưới bằng slug đó:

```tsx
import type {ReactNode} from 'react';
import GameDetailPage from '@site/src/components/PowerPoint/GameDetailPage';
import {getPowerPointGame} from '@site/src/data/powerpoint';

export default function GamePage(): ReactNode {
  return <GameDetailPage game={getPowerPointGame('SLUG_THUC_TE')} />;
}
```

Đây là mẫu mã để tạo trang, không phải dữ liệu game mẫu. Hàm `getPowerPointGame` báo lỗi khi slug không tồn tại để tránh xuất bản trang thiếu dữ liệu. Mỗi game cần đúng một file trang; không tạo thêm `.mdx` trùng route với `.tsx`.

Cấu hình hiện tại dùng `trailingSlash: false`, nên URL chuẩn là `/tech-blog/powerpoint/<slug>` và build sinh `<slug>.html`. Giữ nguyên quy ước này cùng URL thư viện `/tech-blog/powerpoint`; không đổi cấu hình toàn website chỉ để thêm dấu `/` cuối đường dẫn.

Nội dung dài có thể viết bằng MDX dưới `src/components/PowerPoint/`, sau đó import và truyền làm `children` của `GameDetailPage`. Dữ liệu dùng cho tìm kiếm/gallery vẫn đặt tại `src/data/powerpoint.ts`.

## Các trường bổ sung

| Trường | Ý nghĩa |
| --- | --- |
| `slug` | Liên kết ổn định, trùng tên file trang chi tiết |
| `purpose` | Mục tiêu dạy học, cũng dùng làm bộ lọc khi có nhiều mục đích |
| `audience`, `organization` | Đối tượng và cách tổ chức cá nhân/nhóm nếu đã xác nhận |
| `tags`, `subjects` | Từ khóa và môn học để tìm kiếm |
| `gameplay`, `instructions` | Cách chơi tóm tắt và hướng dẫn từng bước |
| `durationMinutes` | Thời gian gợi ý đã được xác nhận |
| `screenshots` | Các ảnh chụp giao diện thật |
| `author`, `version`, `updatedAt` | Thông tin biên tập hiển thị trên trang chi tiết |

Các trường này mở rộng kiểu `PowerPointGame` hiện có, không tạo một schema song song. Thiếu dữ liệu tùy chọn thì không hiện phần tương ứng.

## Phạm vi kiểm thử

Lệnh kiểm thử Node dùng TypeScript và React đã có trong dự án, không cần cài thư viện. Các ca kiểm thử bao phủ tìm kiếm tiếng Việt, điều kiện lọc kết hợp, placeholder, nội dung tùy chọn, macro, URL, ngày cập nhật và kiểm tra file trang tương ứng với dữ liệu công khai. Dữ liệu kiểm thử chỉ nằm trong file `.test.cjs`, không được import bởi website.

Kiểm thử render thay lớp vỏ Docusaurus bằng adapter tối thiểu; không thay thế kiểm tra tương tác bằng trình duyệt. Hiện chưa có game thật nên chưa nghiệm thu được hành trình tải tệp thực tế và route chi tiết với nội dung đã xác nhận.
