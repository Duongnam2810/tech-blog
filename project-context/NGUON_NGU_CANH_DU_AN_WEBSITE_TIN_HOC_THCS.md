# NGUỒN NGỮ CẢNH GỐC — DỰ ÁN WEBSITE CÁ NHÂN GIÁO VIÊN TIN HỌC THCS

> Phiên bản: 1.0 — 09/11/2026  
> Trạng thái: Tài liệu định hướng và yêu cầu dự án (Project Context / Product Requirements / AI Working Instructions).  
> Mục đích: Dùng làm nguồn ngữ cảnh chuẩn khi trao đổi với ChatGPT, Codex và các AI Agent khác.  
> Lưu ý: Những thông tin chưa được chủ website xác nhận được đánh dấu `[Blog Tin Học]`; đề xuất kỹ thuật được đánh dấu **Đề xuất**, không được hiểu là tính năng đã triển khai.

---

## 1. DANH TÍNH DỰ ÁN

- **Tên làm việc:** Website cá nhân giáo viên Tin học THCS / Tech Blog.
- **Website hiện tại:** https://duongnam2810.github.io/tech-blog/
- **Repository:** https://github.com/duongnam2810/tech-blog
- **Chủ dự án:** Một giáo viên Tin học đang giảng dạy ở cấp THCS, các khối lớp 6, 7, 8, 9.
- **Tên hiển thị công khai:** `[Blog Tin Học]`.
- **Đơn vị công tác, học vị, thành tích, chứng chỉ:** `[Blog Tin Học]`.
- **Ngôn ngữ chính:** Tiếng Việt; có thể giữ tên ngôn ngữ lập trình và thuật ngữ kỹ thuật tiếng Anh.
- **Nền tảng đã sử dụng theo thông tin chủ dự án:** Docusaurus, TypeScript, GitHub Pages/GitHub, Visual Studio Code, AI Agent Codex và skill UI-UX-Pro-Max.
- **Tình trạng:** Đã có website, nhưng nội dung còn ít; cần phát triển nội dung và nâng cấp trải nghiệm. Không coi thiết kế, chức năng hay cấu trúc gợi ý trong tài liệu này là hiện trạng đã hoàn thành.

## 2. TUYÊN BỐ SỨ MỆNH

Xây dựng một website cá nhân chuyên nghiệp, dễ sử dụng và có giá trị thực tế, nơi một giáo viên Tin học THCS:

1. Giới thiệu bản thân, công việc giảng dạy, chuyên môn và các sản phẩm đã thực hiện.
2. Chia sẻ tài liệu tham khảo, bài dạy và đề kiểm tra Tin học dành cho lớp 6–9.
3. Giới thiệu, hướng dẫn và chia sẻ trò chơi PowerPoint phục vụ dạy học.
4. Chia sẻ kiến thức lập trình, đặc biệt là Python, từ nền tảng đến bài tập/dự án thực hành.
5. Tạo một địa chỉ đáng tin cậy để giáo viên, học sinh và người yêu công nghệ có thể tìm kiếm, tham khảo và học tập.

### Tầm nhìn dài hạn

Website trở thành **hồ sơ nghề nghiệp + thư viện học liệu Tin học THCS + kho trò chơi PowerPoint + không gian tự học lập trình Python**; tăng trưởng bằng nội dung chất lượng, sử dụng được và cập nhật ổn định.

### Tiêu chí thành công

- Người mới truy cập hiểu website làm gì trong 5–10 giây.
- Giáo viên tìm đúng loại học liệu và khối lớp nhanh, ít thao tác.
- Mỗi tài nguyên có mô tả rõ, hình xem trước, hướng dẫn và đường dẫn sử dụng/tải thực tế.
- Bài Python dễ đọc, có ví dụ chạy được và bài luyện tập.
- Thông tin cá nhân có thật, chuyên nghiệp, không khoa trương.
- Website tải nhanh, hiển thị tốt trên điện thoại, dễ bảo trì và mở rộng.

## 3. ĐỐI TƯỢNG NGƯỜI DÙNG

| Nhóm | Nhu cầu chính | Hành trình mong muốn |
|---|---|---|
| Giáo viên Tin học THCS | Tài liệu tham khảo, bài dạy, đề kiểm tra, trò chơi | Chọn loại tài nguyên → khối lớp → chủ đề → xem chi tiết → tải/sử dụng |
| Học sinh THCS | Ôn tập, kiến thức lập trình, ví dụ Python | Chọn bài học → đọc → xem ví dụ → luyện tập |
| Giáo viên các môn khác | Game PowerPoint có thể tùy chỉnh | Xem danh sách → xem demo → đọc hướng dẫn → tải game |
| Người mới học Python | Lộ trình và bài tập dễ hiểu | Bắt đầu từ cơ bản → học theo thứ tự → luyện tập |
| Đồng nghiệp, đối tác | Tìm hiểu chuyên môn và sản phẩm của chủ website | Vào Portfolio → xem dự án → liên hệ |

Ưu tiên sản phẩm chính: **giáo viên Tin học THCS và học sinh THCS**. Các nhóm khác là đối tượng mở rộng.

## 4. PHẠM VI VÀ KIẾN TRÚC THÔNG TIN

### 4.1. Menu chính (ưu tiên)

1. **Trang chủ** `/`
2. **Tài liệu** `/tai-lieu/`
3. **PowerPoint** `/powerpoint/`
4. **Lập trình** `/lap-trinh/` (ưu tiên Python)
5. **Giới thiệu** `/gioi-thieu/` (Portfolio)

Có thể dùng nút tìm kiếm trên header. **Blog** là tính năng sẵn có của Docusaurus nhưng **không bắt buộc** phải giữ trên menu; chỉ bổ sung khi có chiến lược nội dung thực sự cần dạng bài đăng theo thời gian.

Các đường dẫn ở trên là **đề xuất**. Trước khi áp dụng, kiểm tra `baseUrl`, route hiện có và liên kết đã được chia sẻ. Không thay đổi URL gây gãy liên kết nếu chưa có kế hoạch phù hợp với GitHub Pages.

### 4.2. Sơ đồ cấu trúc

Website cá nhân giáo viên Tin học THCS
├── Trang chủ
│   ├── Giới thiệu ngắn & thông điệp chính
│   ├── Lối vào nhanh: Tài liệu / PowerPoint / Python
│   ├── Học liệu nổi bật / mới cập nhật
│   ├── Trò chơi PowerPoint nổi bật
│   ├── Khám phá lập trình Python
│   ├── Thông tin tác giả rút gọn
│   └── Lời mời khám phá / liên hệ
├── Tài liệu
│   ├── Tài liệu tham khảo
│   ├── Đề kiểm tra
│   └── Bài dạy
│       (Mỗi loại đều lọc theo lớp 6 / 7 / 8 / 9, chủ đề, từ khóa)
├── PowerPoint
│   ├── Danh sách trò chơi
│   ├── Phân loại theo loại hình / môn / lớp (nếu phù hợp)
│   └── Trang chi tiết: xem trước / hướng dẫn / tải
├── Lập trình
│   ├── Bắt đầu với Python
│   ├── Python cơ bản
│   ├── Bài tập thực hành
│   ├── Dự án nhỏ
│   └── Kiến thức lập trình mở rộng (sau này)
└── Giới thiệu / Portfolio
    ├── Giới thiệu bản thân
    ├── Công việc giảng dạy
    ├── Kỹ năng chuyên môn
    ├── Sản phẩm / dự án tiêu biểu
    ├── Định hướng phát triển
    └── Liên hệ
```

## 5. YÊU CẦU CHI TIẾT TỪNG TRANG

### 5.1. Trang chủ

**Mục tiêu:** Giúp khách truy cập hiểu ngay website có gì và đi nhanh tới nội dung họ cần. Trang chủ không phải danh sách dài các liên kết hoặc bài viết.

**Thứ tự nội dung được khuyến nghị:**

1. **Header:** Logo/tên website; năm mục điều hướng; tìm kiếm (nếu đã triển khai); nút chuyển chế độ sáng/tối nếu tương thích.
2. **Hero:** Tiêu đề rõ giá trị, ví dụ *“Chia sẻ học liệu Tin học, trò chơi PowerPoint và kiến thức lập trình”*. Một đoạn giới thiệu 1–2 câu, nút “Khám phá tài liệu” và “Học Python”. Có thể dùng ảnh chân dung được chủ website cung cấp hoặc minh họa công nghệ phù hợp.
3. **Ba thẻ khám phá nhanh:** Tài liệu THCS – PowerPoint dạy học – Lập trình Python, mỗi thẻ có mô tả và liên kết cụ thể.
4. **Tài liệu nổi bật / mới cập nhật:** 4–6 tài nguyên; có lớp, loại nội dung, tên, mô tả ngắn, ngày cập nhật nếu có.
5. **Trò chơi PowerPoint nổi bật:** 3–6 game có thumbnail, mục đích, nút xem chi tiết.
6. **Khám phá lập trình:** Giới thiệu lộ trình Python, các chủ đề nhập môn và nút bắt đầu học.
7. **Vì sao website hữu ích?:** Nội dung tổ chức theo khối lớp, mô tả rõ, học liệu phục vụ dạy học thực tế, ưu tiên dễ sử dụng; chỉ nêu những cam kết có thể thực hiện.
8. **Giới thiệu tác giả rút gọn:** Hình ảnh/tên/chuyên môn được xác nhận, liên kết đến Portfolio.
9. **Cập nhật mới nhất:** Dòng thời gian nhỏ hoặc 3 tài nguyên mới (không bắt buộc nếu chưa đủ nội dung).
10. **CTA cuối trang:** “Khám phá kho tài liệu”, “Xem các trò chơi”, “Liên hệ chia sẻ”.
11. **Footer:** Điều hướng phụ, GitHub, liên hệ được chủ dự án cung cấp, thông tin bản quyền, giấy phép nội dung nếu đã chọn.

**Lưu ý UX:** Trang chủ giới thiệu được giá trị và đưa người dùng đi tiếp; không sao chép toàn bộ nội dung các chuyên mục. Khi nội dung chưa nhiều, hiển thị ít mục nhưng có chất lượng; không tạo thống kê hoặc lượt tải giả.

### 5.2. Trang Tài liệu

**Ba loại bắt buộc:**

- **Tài liệu tham khảo:** Hệ thống hóa kiến thức, hướng dẫn, phiếu học tập, sơ đồ tổng hợp, tài liệu giáo viên/học sinh.
- **Đề kiểm tra:** Đề ôn tập, giữa kỳ, cuối kỳ, ma trận, đặc tả, đáp án/hướng dẫn chấm nếu được phép chia sẻ.
- **Bài dạy:** Giáo án/kế hoạch bài dạy, slide, hoạt động thực hành, học liệu đi kèm.

**Định hướng điều hướng:** Trên trang `/tai-lieu/`, cho phép **lọc theo loại tài liệu và theo khối 6/7/8/9**, sau đó theo chủ đề và từ khóa. Có thể tạo thêm trang `/tai-lieu/lop-6/` v.v. nếu hữu ích cho SEO và điều hướng. Không nhất thiết sao chép cùng một nội dung thành nhiều trang.

**Danh sách tài liệu:**

- Ô tìm kiếm theo tiêu đề/từ khóa.
- Bộ lọc: khối lớp, loại tài liệu, chủ đề; có nút xóa bộ lọc.
- Thẻ tài liệu gồm tiêu đề, mô tả ngắn, nhãn lớp, loại tài liệu, định dạng, ngày cập nhật.
- Kết quả rỗng phải có thông báo hữu ích.
- Ưu tiên phân trang/tải thêm khi số lượng tăng; không tải cùng lúc hàng trăm file/ảnh.

**Trang chi tiết:**
- Nội dung MDX
- Tiêu đề; khối lớp; loại tài liệu; chủ đề/bài học; mô tả; mục tiêu hoặc lợi ích; tệp đính kèm.
- Thumbnail hoặc bản xem trước PDF/ảnh khi có.
- Liên kết tải có tên rõ, định dạng tệp và dung lượng nếu biết.
- Ngày cập nhật, tác giả/nguồn, giấy phép sử dụng, tài liệu liên quan.
- Với đề kiểm tra: thông tin thời lượng, hình thức, đáp án hoặc hướng dẫn chấm nếu có; không công khai tài liệu nhạy cảm, tài liệu thi chưa được phép phát hành.

### 5.3. Trang PowerPoint

**Mục tiêu:** Giới thiệu các trò chơi PowerPoint được tác giả thiết kế phục vụ dạy học, để người khác dễ hình dung cách chơi và sử dụng.

**Trang danh sách game:**

- Banner giới thiệu kho game; cách sử dụng và lưu ý về các phiên bản PowerPoint.
- Gallery thẻ game có thumbnail hấp dẫn, tiêu đề, cách tổ chức (cá nhân/nhóm), mục đích, đối tượng phù hợp.
- Bộ lọc đề xuất: loại trò chơi, kỹ năng/mục đích, khối lớp phù hợp (nếu có), từ khóa.
- Các loại trò chơi đề xuất để gắn nhãn: Gameshow thi đấu, Phiêu lưu giải mã, Xử lý tình huống tương tác, Luyện tập nhanh, Khởi động. Đây là hệ thống phân loại gợi ý, không khẳng định đã có các sản phẩm này.

**Trang chi tiết game:**

1. Ảnh bìa/ảnh giao diện thật.
2. Video demo hoặc ảnh chụp các màn hình chính (nếu có).
3. Mục tiêu sư phạm, nội dung/kỹ năng có thể áp dụng, số người chơi, thời gian đề xuất.
4. Cách chơi/các bước điều khiển; các nút bấm và quy trình tính điểm nếu có.
5. Yêu cầu kỹ thuật: bản PowerPoint, macro/VBA nếu có, font, âm thanh và lưu ý tương thích.
6. Liên kết tải file và tài nguyên đi kèm; dung lượng/phiên bản nếu có.
7. Hướng dẫn chỉnh sửa câu hỏi/nội dung, kèm cảnh báo nếu file có macro.
8. Tác giả, giấy phép chia sẻ, ngày cập nhật, trò chơi liên quan.
9. Nội dung MDX

**Quy tắc quan trọng:** Không tải lên file PPTX/PPTM lớn vào repo một cách tùy tiện. Đề xuất lưu các tệp lớn trên Google Drive hoặc dịch vụ lưu trữ phù hợp, và dùng website làm lớp giới thiệu/điều hướng. Không cam kết chơi PowerPoint trực tiếp trên trình duyệt nếu chưa xây giải pháp riêng. Chỉ đưa nút “Chơi trực tuyến” khi thật sự có một phiên bản web hoạt động.

### 5.4. Trang Lập trình — trọng tâm Python

**Mục tiêu:** Tạo không gian học Python có cấu trúc, giúp người mới bắt đầu và học sinh hiểu được khái niệm, thực hành và tạo sản phẩm.

**Lộ trình ban đầu:**

1. Giới thiệu lập trình, Python và môi trường viết mã.
2. In dữ liệu, nhập dữ liệu, biến và kiểu dữ liệu.
3. Toán tử và biểu thức.
4. Điều kiện `if/elif/else`.
5. Vòng lặp `for/while`.
6. Chuỗi và danh sách.
7. Hàm.
8. Bài tập tổng hợp, debug và đọc lỗi.
9. Dự án nhỏ: máy tính cơ bản, trò đoán số, quiz, quản lý danh sách đơn giản.

**Mẫu bài học chuẩn:** Mục tiêu → Kiến thức giải thích ngắn, đúng → Ví dụ mã nguồn có chú thích → Giải thích đầu vào/đầu ra → Lỗi thường gặp → 2–5 bài tập → Gợi ý/đáp án tách biệt khi thích hợp → Liên kết bài tiếp theo.

**Tính năng giai đoạn đầu:** Nội dung MDX, syntax highlighting, nút sao chép mã, mục lục tự động, bài tiếp theo/trước, tìm kiếm.

**Tính năng giai đoạn sau (chỉ nghiên cứu, chưa bắt buộc):** Monaco Editor + Pyodide cho thực hành Python trong trình duyệt, bài tập kiểm tra đầu ra. Cần đánh giá hiệu năng trên điện thoại, bảo mật, kích thước tải và hỗ trợ input/output trước khi triển khai.

### 5.5. Giới thiệu — Portfolio

**Mục tiêu:** Xây dựng sự tin cậy và thương hiệu cá nhân thông qua thông tin thật, hành trình nghề nghiệp và sản phẩm cụ thể.

**Nội dung:**

1. Ảnh chân dung (nếu chủ dự án cung cấp và đồng ý công khai), tên và vai trò.
2. Giới thiệu ngắn: hiện giảng dạy Tin học THCS lớp 6–9, đam mê thiết kế học liệu và lập trình.
3. Quan điểm giáo dục/triết lý giảng dạy (chủ dự án tự xác nhận).
4. Kỹ năng: giảng dạy Tin học THCS, thiết kế trò chơi PowerPoint; Docusaurus/TypeScript/Python/VS Code/Codex chỉ ghi mức thành thạo khi được xác nhận.
5. Sản phẩm và dự án tiêu biểu: game PowerPoint, bộ học liệu, website, dự án Python có ảnh và link thực tế.
6. Hoạt động chuyên môn/chia sẻ (nếu có thật).
7. Mục tiêu phát triển nghề nghiệp: đổi mới dạy học Tin học, nâng chất lượng tài nguyên, học và vận dụng công nghệ.
8. Liên hệ: email/GitHub/mạng xã hội do chủ dự án chọn công khai.

**Nguyên tắc:** Không bịa thành tích, trường công tác, bằng cấp, chứng chỉ, số năm kinh nghiệm, học sinh đạt giải, giải thưởng hoặc dự án chưa tồn tại.

## 6. CẤU TRÚC DỮ LIỆU NỘI DUNG

Nên dùng **Markdown/MDX cho phần nội dung dài** và **dữ liệu có cấu trúc TypeScript/JSON cho bộ lọc, danh sách card, trang tổng hợp**. Tách nội dung khỏi phần giao diện để cập nhật dễ hơn. Các cấu trúc sau chỉ là hợp đồng dữ liệu đề xuất; phải điều chỉnh theo kiến trúc thực tế.

### 6.1. Tài liệu

```ts
type Grade = 6 | 7 | 8 | 9;
type ResourceType = 'tham-khao' | 'de-kiem-tra' | 'bai-day';

type Resource = {
  id: string;                  // mã duy nhất, ổn định
  slug: string;                // URL thân thiện
  title: string;
  summary: string;
  type: ResourceType;
  grades: Grade[];
  subject?: string;            // chủ đề / mạch kiến thức
  tags?: string[];
  thumbnail?: string;
  updatedAt: string;           // ISO YYYY-MM-DD
  files?: Array<{
    label: string;
    url: string;
    format: 'pdf' | 'pptx' | 'docx' | 'zip' | 'other';
    sizeLabel?: string;
  }>;
  author?: string;
  source?: string;
  license?: string;
};
```

### 6.2. Trò chơi PowerPoint

```ts
type PowerPointGame = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'gameshow' | 'giai-ma' | 'tinh-huong' | 'luyen-tap' | 'khoi-dong' | 'khac';
  grades?: Grade[];            // có thể dùng cho nhiều lớp
  subjects?: string[];         // có thể dùng cho nhiều môn
  gameplay?: string;           // cách chơi ngắn
  durationMinutes?: number;
  thumbnail?: string;
  screenshots?: string[];
  demoUrl?: string;
  downloadUrl?: string;
  requirements?: string[];     // PowerPoint version, macro, font...
  version?: string;
  updatedAt?: string;
  license?: string;
};
```

### 6.3. Bài học Python

```ts
type ProgrammingLesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  level: 'nhap-mon' | 'co-ban' | 'mo-rong';
  order: number;
  tags?: string[];
  estimatedMinutes?: number;
  mdxPath: string;
  updatedAt?: string;
};
```

**Quy tắc:** Dùng dữ liệu thật và link có thật; nếu thiếu trường nào, ẩn thành phần tương ứng, không dùng nút giả, không hiển thị số liệu bịa. Định nghĩa schema bằng TypeScript/Zod chỉ khi thật sự cần validation; không tự thêm thư viện chỉ để phức tạp hóa dữ liệu nhỏ.

## 7. KIẾN TRÚC KỸ THUẬT

### 7.1. Công nghệ cốt lõi cần giữ

- **Docusaurus**: website tĩnh, tài liệu, trang React và khả năng blog khi cần.
- **TypeScript + React**: thành phần giao diện và các trang tùy chỉnh.
- **MDX/Markdown**: bài học, tài liệu, nội dung dài.
- **GitHub**: quản lý mã nguồn, phiên bản và lịch sử thay đổi.
- **GitHub Pages**: xuất bản website tĩnh.
- **Visual Studio Code + Codex**: phát triển mã nguồn, giải thích, kiểm thử và cải tiến.
- **Skill UI-UX-Pro-Max**: hỗ trợ thiết kế trải nghiệm/giao diện nếu đã có và đang hoạt động trong môi trường Codex; không giả định công cụ tự có.

### 7.2. Khuyến nghị bổ sung có điều kiện

| Thành phần | Khi nào cần | Lý do |
|---|---|---|
| CSS Modules/CSS variables | Ngay từ đầu | Giữ giao diện đồng nhất, dễ bảo trì |
| GitHub Actions | Sớm | Kiểm tra build và triển khai tự động |
| Tìm kiếm nội dung | Khi có lượng học liệu đủ lớn | Dễ tìm tài nguyên / bài Python |
| Google Drive / lưu trữ file phù hợp | Khi chia sẻ PPTX/PDF dung lượng lớn | Không làm repository phình to |
| SEO metadata, sitemap, Search Console | Khi website có nội dung công khai ổn định | Tăng khả năng được tìm thấy |
| Pyodide + Monaco | Sau khi có lộ trình Python tốt | Thực hành ngay trong trình duyệt |
| CSDL, đăng nhập, backend | Chỉ khi xuất hiện nhu cầu thực tế | Tránh chi phí và độ phức tạp không cần thiết |

**Không đổi sang Next.js, không bổ sung Supabase, Firebase, backend, đăng nhập, CMS hoặc Tailwind CSS chỉ vì xu hướng**. Chỉ đề xuất khi có một yêu cầu cụ thể mà Docusaurus/website tĩnh không đáp ứng tốt.

### 7.3. Quy tắc GitHub Pages

- Giữ đúng tên repository và cấu hình `url`, `baseUrl`, `organizationName`, `projectName` của Docusaurus theo môi trường thực tế.
- Với website dạng `username.github.io/tech-blog/`, phải xét kỹ `baseUrl` là `/tech-blog/` khi build; không hard-code các đường dẫn root gây lỗi ở GitHub Pages.
- Kiểm tra asset path, ảnh, trang con, liên kết tương đối và refresh trực tiếp URL sau deploy.
- Không sửa cấu hình triển khai khi chưa xem file cấu hình và workflow thực tế.

### 7.4. Cấu trúc thư mục đề xuất

```text
tech-blog/
├── docs/                  # Bài học lập trình, tài liệu dạng docs nếu phù hợp
│   ├── python/
│   ├── powerpoint-detail/
│   └── [các phần cần phân loại]
├── blog/                  # Chỉ sử dụng nếu thật sự có bài viết dạng blog
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── home/
│   │   ├── resources/
│   │   └── powerpoint/
│   ├── data/
│   │   ├── resources.ts
│   │   └── games.ts
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── tai-lieu/
│   │   ├── powerpoint/
│   │   └── gioi-thieu/
│   └── css/
├── static/
│   └── img/
├── AGENTS.md
├── docusaurus.config.ts
├── sidebars.ts
└── package.json
```

Lưu ý: Đây là sơ đồ khái niệm. Docusaurus tự tạo route khác nhau tùy plugin và cấu hình; phải kiểm tra route xung đột, ví dụ `docs` routeBasePath trước khi quyết định vị trí `/lap-trinh/` hoặc `/tai-lieu/`.

## 8. ĐỊNH HƯỚNG THIẾT KẾ UI/UX

- **Phong cách:** Sạch sẽ, hiện đại, tin cậy, thân thiện với giáo viên và học sinh; cảm giác công nghệ nhưng không quá nhiều hiệu ứng.
- **Ngôn ngữ:** 100% giao diện chính bằng tiếng Việt, thuật ngữ kỹ thuật kèm giải thích khi cần.
- **Màu sắc:** Đề xuất xanh dương/xanh navy làm màu chính, tím hoặc cyan làm điểm nhấn, nền sáng trung tính; màu chính thức phải được chọn và chuẩn hóa sau khi xem giao diện hiện tại.
- **Typography:** Font hỗ trợ tiếng Việt tốt, dễ đọc (ví dụ Be Vietnam Pro, Inter hoặc font hệ thống); dùng số lượng font hạn chế.
- **Responsive:** Ưu tiên mobile-first; menu thu gọn, thẻ không tràn, bộ lọc thao tác được trên điện thoại.
- **Accessibility:** Tương phản đủ tốt, điều hướng bàn phím, focus rõ, alt ảnh, nhãn cho form, không biểu đạt trạng thái chỉ bằng màu.
- **Hiệu năng:** Ảnh tối ưu, lazy loading, hạn chế animation nặng và script ngoài không cần thiết.
- **Design system:** Dùng CSS variables/tokens cho màu sắc, spacing, radius, typography, shadow; xây card và nút tái sử dụng.
- **Dark mode:** Có thể giữ nếu hoạt động tốt; không bắt buộc nếu tăng đáng kể công việc và khó bảo trì.

## 9. NỘI DUNG, SEO VÀ QUẢN TRỊ HỌC LIỆU

### Nguyên tắc biên tập

1. Đúng chuyên môn và phù hợp cấp THCS.
2. Ghi rõ đối tượng, khối lớp, mục đích và cách sử dụng khi đăng tài nguyên.
3. Ưu tiên hướng dẫn thực tế hơn văn bản dài chung chung.
4. Nội dung tự viết, nguồn tham khảo đáng tin cậy, trích dẫn khi sử dụng kiến thức/tài liệu bên ngoài.
5. Phân biệt tài liệu gốc, tài liệu biên soạn lại và tài liệu giới thiệu từ nguồn khác.
6. Mỗi tài nguyên có người chịu trách nhiệm, ngày cập nhật và phiên bản khi thích hợp.

### SEO tối thiểu

- Tiêu đề riêng cho từng trang, mô tả phù hợp nội dung, URL dễ đọc.
- Heading H1/H2/H3 có cấu trúc; link nội bộ hợp lý.
- Ảnh có alt text; thumbnail dễ nhìn; metadata chia sẻ mạng xã hội.
- Sitemap và kiểm tra index cho nội dung công khai.
- Không tạo các trang trống hàng loạt chỉ để lấy từ khóa.

### Pháp lý và quyền riêng tư

- Chỉ chia sẻ học liệu, ảnh, video, trò chơi khi có quyền sử dụng/phân phối.
- Không đăng đề kiểm tra chưa được phép công khai, dữ liệu cá nhân/điểm số của học sinh, hình học sinh không có cơ sở đồng ý phù hợp.
- Tách thông tin liên hệ công khai và thông tin riêng tư.
- Không đưa API key, token, mật khẩu, dữ liệu cá nhân vào repository.
- Với macro PowerPoint (`.pptm`), cần thông báo rõ và khuyến nghị kiểm tra file trước khi bật macro.

## 10. PHẠM VI PHIÊN BẢN ĐẦU TIÊN — MVP

**Bắt buộc:**

- Trang chủ được thiết kế lại, hoàn toàn bỏ thông điệp Docusaurus mặc định.
- Menu năm mục theo phạm vi dự án.
- Trang Tài liệu có danh sách và lọc **theo khối 6–9 và loại tài liệu**.
- Trang PowerPoint có gallery và trang chi tiết, liên kết tải thực tế (khi có).
- Trang Lập trình có lộ trình Python và bài học MDX mẫu.
- Trang Portfolio chỉ chứa thông tin thật được chủ dự án xác nhận.
- Responsive, link hoạt động, build thành công, deploy GitHub Pages thành công.

**Có thể làm tiếp:** Tìm kiếm, nhiều loại bộ lọc, giao diện xem trước, nội dung liên quan, SEO nâng cao, video demo, thống kê thực tế.

**Chưa làm ở MVP:** Đăng nhập/đăng ký, hệ thống điểm, diễn đàn, bảng điều khiển quản trị, cơ sở dữ liệu, trình biên dịch Python phức tạp, hệ thống AI chatbot.

### Dữ liệu ban đầu đề xuất để kiểm thử giao diện

- 1–2 tài nguyên thật của mỗi loại: tài liệu tham khảo, đề kiểm tra, bài dạy.
- 2–3 trò chơi PowerPoint thật có ảnh và hướng dẫn.
- 3–5 bài Python cơ bản có nội dung hoàn chỉnh.
- 1 Portfolio được chủ dự án duyệt.

Nếu chưa có dữ liệu thật, dùng mock data **chỉ trong môi trường phát triển**, gắn nhãn dữ liệu mẫu và xóa trước khi xuất bản.

## 11. LỘ TRÌNH PHÁT TRIỂN

### Giai đoạn 1: Khảo sát & nền tảng
- Kiểm tra mã nguồn, cấu hình Docusaurus, route, nhánh Git, workflow deploy, dependency.
- Ghi lại hiện trạng và các rủi ro có thể gây lỗi.
- Chốt sitemap, màu sắc, typography, component cơ bản.
- Thiết lập `AGENTS.md`, checklist kiểm thử, quy ước commit.

### Giai đoạn 2: Trang chủ và Portfolio
- Thiết kế header/footer, hero, CTA, card khám phá nhanh.
- Tạo các khu vực nội dung nổi bật lấy từ dữ liệu thật.
- Tạo Portfolio đúng thông tin được xác nhận.

### Giai đoạn 3: Thư viện Tài liệu
- Chuẩn hóa schema, taxonomy và cấu trúc lưu file/link.
- Triển khai danh sách, bộ lọc, trang chi tiết.
- Đăng nội dung thực tế đầu tiên; thử trên di động.

### Giai đoạn 4: PowerPoint
- Xây gallery, loại game, trang chi tiết, hướng dẫn, demo và tải.
- Kiểm tra link và cách mở game trên các phiên bản PowerPoint.

### Giai đoạn 5: Python & tăng trưởng
- Xây lộ trình bài học MDX, code block, bài tập.
- Hoàn thiện tìm kiếm, SEO, kiểm tra khả năng tiếp cận.
- Đánh giá có cần Pyodide/Monaco sau khi đã có nội dung học tập ổn định.

**Nguyên tắc triển khai:** Mỗi giai đoạn phải có sản phẩm sử dụng được và được kiểm tra trước khi mở rộng. Không xây toàn bộ các tính năng nâng cao trong một lần.

## 12. QUY TẮC LÀM VIỆC VỚI CHATGPT / CODEX

### 12.1. Vai trò AI

Khi nhận tài liệu này, AI đóng vai **Product Strategist + Information Architect + Senior Frontend Developer (React/TypeScript/Docusaurus) + UI/UX Designer + Technical Mentor**. Mục tiêu là giúp chủ dự án vừa xây website tốt, vừa hiểu được mã nguồn và nâng kỹ năng phát triển web.

### 12.2. Nguyên tắc bắt buộc

1. **Bám sát nguồn ngữ cảnh này.** Không tự ý mở rộng công nghệ ngoài phạm vi.
2. **Không giả định đã xem repository.** Nếu chưa truy cập mã nguồn hoặc chưa được cung cấp file, nêu rõ đề xuất dựa trên thông tin mô tả.
3. **Phân biệt ba loại thông tin:** đã có / đang đề xuất / chưa xác nhận.
4. **Ưu tiên thay đổi nhỏ có thể kiểm thử**, giữ Docusaurus, TypeScript, GitHub Pages.
5. **Đọc code hiện tại trước khi sửa.** Kiểm tra dependency, cách định tuyến, CSS, docs plugin và đường dẫn asset.
6. **Không xóa nội dung cũ, đổi route hoặc cài nhiều gói** mà không giải thích lý do và tác động.
7. **Không chế tạo dữ liệu thật**: tiểu sử, thành tích, trường học, số tài liệu, lượt tải, rating, thumbnail, link tải.
8. **Thiết kế có thể dùng được**: responsive, keyboard-accessible, không nút giả.
9. **Mỗi đề xuất kỹ thuật nêu rõ:** mục tiêu, lợi ích, chi phí/phức tạp, độ ưu tiên, phương án đơn giản hơn.
10. **Giải thích để người dùng học:** khi sinh code, tóm tắt vì sao viết như vậy, TypeScript type nào quan trọng, component nào có thể tái sử dụng.
11. **Không triển khai trực tiếp lên production** nếu chưa được yêu cầu; ưu tiên branch/PR và kiểm thử build trước.
12. **Khi được yêu cầu sửa code**, sau khi sửa phải báo file đã thay đổi, cách chạy, cách test, kết quả test thực tế và hạn chế chưa xác minh.

### 12.3. Định dạng phản hồi ưu tiên

Khi chủ website yêu cầu làm một tính năng, trả lời theo trình tự:

- **Mục tiêu:** tính năng này giúp người dùng nào làm việc gì.
- **Giải pháp đề xuất:** ngắn gọn, nhất quán với kiến trúc.
- **Phần cần sửa:** file/component/route dự kiến.
- **Kế hoạch thực hiện:** từng bước nhỏ.
- **Tiêu chí nghiệm thu:** kiểm tra được.
- **Mã nguồn / prompt Codex:** chỉ khi được yêu cầu triển khai.
- **Giải thích học tập:** kiến thức React/TypeScript/Docusaurus rút ra.

### 12.4. Checklist nghiệm thu chung

- [ ] Nội dung tiếng Việt đúng chính tả, không có dữ liệu/giới thiệu giả.
- [ ] Menu và liên kết tương ứng hoạt động.
- [ ] Không lỗi build/typecheck theo các script thực tế của dự án.
- [ ] Không lỗi JavaScript nghiêm trọng trong console.
- [ ] Ảnh/asset hiển thị đúng khi deploy tại `/tech-blog/`.
- [ ] Giao diện dùng được trên mobile, tablet, desktop.
- [ ] Bộ lọc/tìm kiếm có kết quả đúng hoặc có trạng thái rỗng rõ ràng.
- [ ] File tài liệu và PowerPoint có liên kết thực tế, không có nút tải giả.
- [ ] Heading, alt ảnh, metadata và khả năng điều hướng bàn phím đạt mức cơ bản.
- [ ] Phần bổ sung không phá vỡ trang cũ.

## 13. NHỮNG QUYẾT ĐỊNH ĐÃ CHỐT VÀ CHƯA CHỐT

### Đã chốt từ chủ dự án

- Website phục vụ thương hiệu cá nhân của giáo viên Tin học THCS dạy lớp 6, 7, 8, 9.
- Các khu vực trọng tâm: **Trang chủ, Tài liệu, PowerPoint, Giới thiệu/Portfolio**.
- Trang chủ phải giới thiệu mục đích, kho tài nguyên, khám phá lập trình và nội dung nổi bật.
- Tài liệu gồm: **Tài liệu tham khảo, Đề kiểm tra, Bài dạy**, phân cho lớp 6–9.
- PowerPoint nhằm chia sẻ trò chơi phục vụ dạy học.
- Portfolio nhằm giới thiệu bản thân, công việc, kỹ năng, sản phẩm và phát triển thương hiệu cá nhân.
- Vẫn có mong muốn chia sẻ kiến thức lập trình, đặc biệt **Python**, và học xây website bằng Codex.
- Nền tảng hiện dùng: Docusaurus, TypeScript, GitHub Pages, VS Code, Codex và skill UI-UX-Pro-Max.

### Đề xuất để xác nhận khi triển khai

- Đặt **Lập trình** là mục menu độc lập để giữ mục tiêu chia sẻ Python; nếu chủ dự án muốn ít menu hơn, có thể đưa khối Python vào Trang chủ và một route riêng không cần header item.
- Phong cách thiết kế, bộ màu, logo/tên hiển thị.
- Cách phân loại tài liệu ưu tiên loại trước hay khối lớp trước (giao diện cần hỗ trợ cả hai chiều).
- Hệ thống lưu trữ tệp tải và giấy phép sử dụng.
- Có giữ blog Docusaurus trên menu hay chỉ sử dụng cho bài viết phụ.
- Thông tin thật dùng trong Portfolio và dữ liệu tài nguyên ban đầu.

## 14. CÁC THÔNG TIN CHỦ DỰ ÁN CẦN BỔ SUNG SAU

1. Tên hiển thị, ảnh chân dung, giới thiệu ngắn, liên hệ công khai.
2. Đơn vị công tác, kinh nghiệm, chứng chỉ hoặc thành tích muốn giới thiệu (nếu có).
3. Danh sách nội dung thực tế ban đầu: tài liệu, game PowerPoint, bài Python.
4. Link xem trước, link tải, bản quyền/điều kiện sử dụng của mỗi tệp.
5. Logo/bộ màu hiện có hoặc phong cách muốn áp dụng.
6. Xác nhận muốn giữ menu độc lập **Lập trình** và có/không có **Blog**.

Đây là các dữ liệu còn thiếu; không được tự tạo nội dung giả để lấp khoảng trống trong phiên bản công khai.

---

## 15. PROMPT KHỞI ĐỘNG CHO MỖI PHIÊN CHAT MỚI

> Tôi đang phát triển website cá nhân của giáo viên Tin học THCS tại https://duongnam2810.github.io/tech-blog/ bằng Docusaurus, TypeScript, GitHub Pages, VS Code và Codex. Hãy đọc toàn bộ tài liệu `NGUON_NGU_CANH_DU_AN_WEBSITE_TIN_HOC_THCS.md` tôi cung cấp, coi đây là nguồn ngữ cảnh sản phẩm chuẩn. Mục tiêu website gồm Trang chủ, Tài liệu Tin học 6–9 (tài liệu tham khảo, đề kiểm tra, bài dạy), kho game PowerPoint, chuyên mục học lập trình Python và Portfolio cá nhân. Hãy phân biệt rõ hiện trạng với đề xuất, ưu tiên cải tiến từng phần trên nền tảng hiện có, không tự ý thêm công nghệ phức tạp. Khi tôi đưa nhiệm vụ cụ thể, hãy đề xuất giải pháp, các file cần sửa, kế hoạch thực hiện, tiêu chí nghiệm thu và giải thích kiến thức code liên quan. Nếu chưa được xem repository, hãy nói rõ. Nhiệm vụ hôm nay của tôi là: [GHI NHIỆM VỤ TẠI ĐÂY].

## 16. CÁCH SỬ DỤNG TÀI LIỆU NÀY

- **Trong ChatGPT:** Đính kèm file này ở đầu cuộc trò chuyện về website và dùng prompt ở mục 15; không cần dán lại toàn bộ vào mỗi tin nhắn.
- **Trong Codex:** Đặt file trong repository, ví dụ `project-context/WEBSITE_CONTEXT.md`, rồi yêu cầu Codex đọc file trước khi lập kế hoạch hoặc sửa mã. Tạo thêm `AGENTS.md` ngắn, chỉ dẫn Codex luôn tham khảo file ngữ cảnh này.
- **Khi thay đổi định hướng:** Sửa trực tiếp các mục **Đã chốt**, **Chưa chốt** và tăng số phiên bản; tránh để nhiều prompt cũ mâu thuẫn.
- **Khi phát triển một tính năng:** Tạo một nhiệm vụ cụ thể, ví dụ “Thiết kế trang Tài liệu có bộ lọc lớp và loại tài liệu bằng data mẫu”, không yêu cầu AI viết lại toàn bộ website cùng lúc.
