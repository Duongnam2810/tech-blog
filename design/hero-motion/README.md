# Nâng cấp chuyển động Hero — kết quả thực hiện

Đã bổ sung motion cho Hero hiện có tại `/tech-blog/about`. Không thay bố cục hai cột, màu, font, kích thước card hoặc các section khác. Không cài thư viện, commit hay triển khai.

## File mã nguồn đã sửa

- `src/components/About/AboutHero.tsx`: cấu trúc quỹ đạo/chấm chuyển động, lớp xuất hiện, nút tạm dừng, theo dõi vùng hiển thị và sự kiện ẩn trang. Cleanup observer/listener khi component unmount. Đồ họa dùng `role="group"` để nút điều khiển vẫn truy cập được bằng trình đọc màn hình.
- `src/pages/about.module.css`: toàn bộ CSS motion và hover giới hạn ở Hero; cấu hình mobile và reduced motion.
- `src/data/about.ts`: Việt hóa riêng nội dung Hero, nhãn nút điều khiển và mô tả đồ họa. Giữ nguyên tên hiện có do người dùng chỉnh. Không bổ sung tiểu sử hoặc thông tin cá nhân chưa xác nhận.

## Chuyển động

| Thành phần | Thực hiện |
|---|---|
| Cột giới thiệu | Fade-up 6px, 520–560ms; stagger 0/60/100/160ms. Nội dung có sẵn trong HTML; không khóa thao tác trong lúc xuất hiện. |
| Chữ Aa | Fade-up 8px, scale .98 → 1 trong 680ms; sau đó trôi nhẹ 3px theo chu kỳ 6 giây. |
| Đường elip | Xoay ngược chiều nhau trong 32 và 40 giây. Tâm và hình dạng ban đầu giữ nguyên. |
| Chấm trên quỹ đạo | CSS `offset-path` và `offset-distance`, chu kỳ 28/36 giây. Tách đường viền elip khỏi chấm để chấm giữ hình tròn. |
| Lưới | Giữ nguyên lưới; dải quét xanh có opacity .025, chu kỳ 22 giây. Không thêm gradient chuyển động. |
| Dấu cộng và ngôi sao | Trôi 2px theo chu kỳ 5–6 giây. |
| Nhãn kỹ thuật | Trôi 1px, opacity .8–1 trong 6 giây. |
| Hover | Chỉ chuột chính xác: nâng card 2px, viền xanh và bóng nhẹ trong 240ms; nhãn đổi màu nhẹ. |
| Mobile | Quỹ đạo chính 40 giây; quỹ đạo thứ hai, chấm thứ hai, quét lưới và trang trí phụ không animation. |
| Tạm dừng | Nút 44×44px, nhãn tiếng Việt, trạng thái `aria-pressed`; dừng mọi animation trong Hero. |
| Ngoài màn hình / ẩn tab | Tạm dừng qua IntersectionObserver và Page Visibility; không dùng requestAnimationFrame hoặc timer để điều khiển chuyển động. |
| Reduced motion | Không còn animation, không có quét lưới hoặc nâng card; chữ và hình vẫn hiện đầy đủ. Nút dừng được ẩn vì không còn chuyển động. |

## Kiểm tra đã chạy

- `npm run typecheck`: hoàn tất, exit 0.
- `npm run build`: bản cuối hoàn tất, exit 0.
- `git diff --check`: exit 0.
- `node design/hero-motion/verify.cjs`: hoàn tất, exit 0, `passed: true`.
- Chrome headless, 1440/834/390px, cả light/dark: khung hình và cỡ chữ khớp bản trước thay đổi. HTML của bảy section còn lại giữ nguyên.
- Không tràn ngang ở 320/375/576/768/996/1024/1920px.
- Đã đo transform quỹ đạo và offset-distance chấm tại hai thời điểm để xác nhận chúng thực sự thay đổi.
- Hover thực tế: card nâng 2px, đổi viền và có bóng nhẹ.
- Sau khi nhấn tạm dừng: không còn animation đang chạy.
- Cuộn ra khỏi Hero dừng motion; cuộn trở lại tiếp tục motion.
- Đã mô phỏng `visibilitychange` với trạng thái ẩn để kiểm tra listener; đây không phải phép đo trên tab ẩn bằng thao tác hệ điều hành.
- Bật reduced motion ngay trong phiên: không còn animation, chữ opacity 1, monogram trở về transform gốc.
- Mobile không reduced motion trong cả hai theme: quét lưới tắt, quỹ đạo phụ tĩnh, quỹ đạo chính 40 giây.
- Không ghi nhận JavaScript runtime exception trong các kiểm tra.

Ảnh `before-*.png` / `after-*.png` được chụp ở reduced motion để đối chiếu hình tĩnh. `baseline.json` và `validation.json` chứa số đo. Các file `*.before.*` là bản sao phục vụ đối chiếu, không được ứng dụng import. `verify.cjs` tái sử dụng Chrome và gói `ws` sẵn có.

Desktop/tablet giữ nguyên chiều cao Hero. Ở viewport mobile 390px, bản Việt hóa ngắn hơn một dòng nên Hero giảm khoảng 29px; khung hình 280×350px, thứ tự xếp dọc, font và khoảng cách CSS không đổi. Đây là thay đổi ngắt dòng của nội dung, không phải thu nhỏ thiết kế.

Giới hạn: kiểm tra trên Chrome với viewport mô phỏng, chưa kiểm tra thiết bị iOS/Android thật hoặc đo CPU trên thiết bị yếu. Các section khác vẫn giữ nội dung hiện có theo yêu cầu giới hạn phạm vi; không Việt hóa toàn bộ website trong tác vụ này.
