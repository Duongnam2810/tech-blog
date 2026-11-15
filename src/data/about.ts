/**
 * Nội dung cá nhân do chủ website xác nhận; sản phẩm đối chiếu với repository.
 * Chỉ thêm URL liên hệ khi đã được cung cấp. URL nội bộ không chứa /tech-blog/.
 */
export type AboutIconName = 'arrow' | 'book' | 'code' | 'layers' | 'web';
export type SectionCopy = {eyebrow: string; title: string[]; description?: string[]};
export type InterestArea = {number: string; icon: AboutIconName; title: string; description: string; label: string};
export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  contribution?: string;
  technologies: string[];
  status: string;
  layout: 'featured' | 'secondary' | 'compact';
  visual?: 'website' | 'python' | 'slides';
  preview?: {src: string; alt: string};
  url?: string;
  sourceUrl?: string;
  pendingNote?: string;
};
export type Milestone = {title: string; description: string; emphasized?: boolean};
export type TechCategory = {label: string; items: {name: string; note?: string}[]};
export type ContactLink = {label: string; value: string; url?: string};

export const pageMetadata = {
  title: 'NAM DƯƠNG — Dương Tấn Nam',
  description: 'Dương Tấn Nam — Giáo viên Tin học THCS. Công nghệ · Sáng tạo · Giáo dục. Tìm hiểu chuyên môn, sản phẩm và định hướng ứng dụng công nghệ trong giảng dạy.',
};

export const profile = {
  eyebrow: 'CÔNG NGHỆ · SÁNG TẠO · GIÁO DỤC',
  greeting: 'Xin chào, tôi là',
  // Mỗi phần tử là một dòng hiển thị; dòng cuối nhận màu nhấn hiện có.
  nameLines: ['NAM', 'DƯƠNG'],
  initials: 'ND',
  role: 'Dương Tấn Nam | Giáo viên Tin học THCS',
  introduction: [
    'Tôi là một giáo viên Tin học THCS với niềm yêu thích dành cho công nghệ, lập trình và thiết kế các sản phẩm số.',
    'Tôi đặc biệt quan tâm đến phát triển Web, thiết kế giao diện UI/UX, phát triển phần mềm và xây dựng các trò chơi PowerPoint phục vụ giảng dạy.',
    'Với tinh thần chủ động học hỏi và sáng tạo, tôi mong muốn vận dụng kiến thức công nghệ để tạo ra những sản phẩm thiết thực, hiệu quả, góp phần mang đến những trải nghiệm học tập sinh động và thú vị.',
  ],
  projectsLabel: 'Khám phá sản phẩm',
  contactLabel: 'Liên hệ với tôi',
  caption: 'Công nghệ · Sáng tạo · Giáo dục',
  // Chỉ thêm ảnh chân dung khi chủ website cung cấp và đồng ý công khai.
  portrait: undefined as {src: string; alt: string} | undefined,
  visual: {
    label: 'Đồ họa hình học mang thương hiệu NAM DƯƠNG',
    heading: 'NAM DƯƠNG / DẤU ẤN CÁ NHÂN',
    coordinates: ['x: tò mò', 'y: khám phá'],
    footer: 'HỌC / SÁNG TẠO / CHIA SẺ',
    caption: '01 / NAM DƯƠNG',
    captionDetail: 'Công nghệ và giáo dục',
    pauseLabel: 'Tạm dừng chuyển động',
    resumeLabel: 'Tiếp tục chuyển động',
  },
};

export const chapters = [
  {id: 'about', label: '01 Về tôi'},
  {id: 'interests', label: '02 Chuyên môn'},
  {id: 'projects', label: '03 Sản phẩm'},
  {id: 'journey', label: '04 Định hướng'},
  {id: 'tools', label: '05 Kỹ năng & công cụ'},
  {id: 'philosophy', label: '06 Triết lý'},
  {id: 'contact', label: '07 Liên hệ'},
];

export const sectionCopy = {
  about: {eyebrow: '01 / GIỚI THIỆU', title: ['Về tôi'], description: ['Đam mê công nghệ, sáng tạo trong giáo dục']},
  interests: {eyebrow: '02 / CÔNG NGHỆ VÀ GIÁO DỤC', title: ['Chuyên môn'], description: ['Kết hợp kiến thức công nghệ và hoạt động giảng dạy']},
  projects: {eyebrow: '03 / HỌC LIỆU VÀ SẢN PHẨM SỐ', title: ['Sản phẩm nổi bật'], description: ['Website, bài học Python và trò chơi PowerPoint hiện có trên Blog Tin Học.']},
  journey: {eyebrow: '04 / TIẾP TỤC PHÁT TRIỂN', title: ['Mục tiêu và', 'định hướng'], description: ['Học hỏi, sáng tạo và ứng dụng công nghệ']},
  tools: {eyebrow: '05 / TỪ KIẾN THỨC ĐẾN THỰC HÀNH', title: ['Kỹ năng và công cụ'], description: ['Nền tảng công nghệ thông tin và những công cụ đang được sử dụng cho website.']},
  philosophy: {eyebrow: '06 / QUAN ĐIỂM HỌC TẬP', title: ['Học hỏi, sáng tạo và chia sẻ']},
  contact: {eyebrow: '07 / CÙNG TRAO ĐỔI', title: ['Liên hệ'], description: ['Kết nối và chia sẻ']},
} satisfies Record<string, SectionCopy>;

export const introduction = {
  lead: 'Tôi tốt nghiệp đại học chuyên ngành Công nghệ thông tin và bắt đầu công việc giảng dạy từ năm 2026, với các khối lớp 6, 7, 8 và 9.',
  paragraphs: [
    {heading: 'Công nghệ và tư duy thiết kế', body: 'Bên cạnh công việc giảng dạy, tôi dành sự quan tâm đặc biệt cho lĩnh vực phát triển phần mềm, lập trình Web, thiết kế giao diện UI/UX và ứng dụng công nghệ trong giáo dục. Tôi yêu thích việc kết hợp kiến thức kỹ thuật với tư duy thiết kế để xây dựng các sản phẩm trực quan, dễ sử dụng và có giá trị thực tế.'},
    {heading: 'Học hỏi và cùng làm việc', body: 'Trong công việc, tôi luôn đề cao tinh thần học hỏi, khả năng giải quyết vấn đề và phối hợp làm việc nhóm.'},
  ],
  focus: '“Biến những kiến thức Tin học tưởng chừng khô khan thành những bài học sinh động, gần gũi và thú vị.”',
  teachingParagraphs: [
    'Tôi mong muốn khơi gợi niềm yêu thích khám phá công nghệ ở mỗi học sinh, giúp các em chủ động tiếp thu kiến thức, phát huy khả năng sáng tạo và cảm thấy hứng thú trong mỗi giờ học.',
    'Đối với tôi, việc sử dụng công nghệ trong giảng dạy không chỉ là phương tiện hỗ trợ truyền đạt kiến thức mà còn là cơ hội để đổi mới cách tổ chức hoạt động học tập.',
  ],
};

export const interests: InterestArea[] = [
  {number: '01', icon: 'book', title: 'Giảng dạy Tin học THCS', description: 'Giảng dạy môn Tin học cho học sinh các khối lớp 6, 7, 8 và 9. Bắt đầu hành trình giảng dạy từ năm 2026, tôi tập trung học hỏi, tích lũy kinh nghiệm và tìm kiếm những phương pháp giúp bài học trở nên sinh động, dễ tiếp cận.', label: 'TIN HỌC · LỚP 6–9'},
  {number: '02', icon: 'layers', title: 'Thiết kế trò chơi PowerPoint', description: 'Quan tâm đến việc thiết kế và sử dụng các trò chơi tương tác trên PowerPoint nhằm hỗ trợ tổ chức hoạt động học tập, tạo hứng thú và tăng cường sự tham gia của học sinh trong giờ học.', label: 'TƯƠNG TÁC · HỌC TẬP'},
  {number: '03', icon: 'code', title: 'Công nghệ và phát triển phần mềm', description: 'Có nền tảng đào tạo đại học chuyên ngành Công nghệ thông tin, cùng kiến thức và kỹ năng liên quan đến lập trình, phát triển phần mềm và các công nghệ Web.', label: 'LẬP TRÌNH · WEB'},
];
export const interestsNote = '';

export const projects: Project[] = [
  {id: 'blog', title: 'Blog Tin Học', category: '01 / WEBSITE GIÁO DỤC', description: 'Không gian chia sẻ học liệu Tin học THCS, trò chơi PowerPoint và kiến thức lập trình Python dành cho giáo viên và học sinh.', technologies: ['Docusaurus', 'React', 'TypeScript', 'MDX'], status: 'Website hiện có', layout: 'featured', visual: 'website', url: '/', sourceUrl: 'https://github.com/Duongnam2810/tech-blog'},
  {id: 'python', title: 'Bài 1 — Làm quen với Python', category: '02 / BÀI HỌC LẬP TRÌNH', description: 'Bài học giới thiệu Python và hoạt động thực hành lệnh print cho học sinh mới bắt đầu.', technologies: ['Python'], status: 'Bài học hiện có', layout: 'secondary', visual: 'python', url: '/docs/python-tutorial/bai-1-lam-quen-python'},
  {id: 'powerpoint', title: 'Đánh thức năng lực', category: '03 / TRÒ CHƠI POWERPOINT', description: 'Trò chơi giúp học sinh thực hiện các thử thách vận động được ẩn sau sáu mảnh ghép để khám phá bức tranh “siêu năng lực”.', technologies: ['PowerPoint'], status: 'Có hướng dẫn sử dụng', layout: 'secondary', visual: 'slides', url: '/powerpoint/danh-thuc-nang-luc'},
];

export const projectVisuals = {
  website: {label: 'Minh họa giao diện Blog Tin Học, không phải ảnh chụp màn hình', heading: 'SẢN PHẨM / WEBSITE GIÁO DỤC', brand: 'Blog Tin Học', navigation: 'HỌC · SÁNG TẠO · CHIA SẺ', eyebrow: 'KHÔNG GIAN HỌC TẬP SỐ', headline: ['Khám phá tri thức.', 'Sáng tạo mỗi ngày.'], caption: 'MINH HỌA GIAO DIỆN'},
  python: '[ py ]',
  slides: ['Học qua', 'trò chơi.'],
  visitLabel: 'Khám phá sản phẩm',
  sourceLabel: 'Xem mã nguồn',
};

export const journeyNote = ['Định hướng học tập và ứng dụng công nghệ trong công việc giảng dạy.'];
export const milestones: Milestone[] = [
  {title: 'Phát triển kiến thức và kỹ năng', description: 'Tôi mong muốn tiếp tục phát triển kiến thức và kỹ năng trong những lĩnh vực mình yêu thích, đặc biệt là lập trình Web, thiết kế UI/UX, phát triển phần mềm và thiết kế trò chơi PowerPoint.'},
  {title: 'Ứng dụng công nghệ trong giảng dạy', description: 'Trong công việc giảng dạy, tôi hướng đến việc vận dụng công nghệ để tạo ra những hoạt động học tập sinh động, gần gũi, giúp học sinh hứng thú hơn với môn Tin học.', emphasized: true},
  {title: 'Học hỏi và giải quyết vấn đề', description: 'Tôi đề cao tinh thần học hỏi liên tục, sáng tạo và khả năng giải quyết những vấn đề thực tế thông qua công nghệ.'},
];

export const techStack = {
  usingLabel: 'Công nghệ đang dùng cho website',
  usingNote: 'Thông tin về mã nguồn, không phải đánh giá mức độ thành thạo cá nhân',
  using: [
    {label: 'Giao diện Web', items: [{name: 'React'}, {name: 'TypeScript'}, {name: 'HTML'}, {name: 'CSS'}]},
    {label: 'Nội dung lập trình', items: [{name: 'Python', note: 'Bài học nhập môn'}]},
    {label: 'Nền tảng và nội dung', items: [{name: 'Docusaurus'}, {name: 'MDX'}]},
    {label: 'Quản lý mã nguồn', items: [{name: 'GitHub'}, {name: 'npm'}]},
  ] as TechCategory[],
  exploringLabel: 'Lĩnh vực tiếp tục học hỏi',
  exploring: 'Lập trình Web, thiết kế UI/UX, phát triển phần mềm và thiết kế trò chơi PowerPoint.',
};

export const philosophy = {
  words: ['Learn.', 'Create.', 'Share.'],
  lines: ['Học hỏi để hiểu biết.', 'Sáng tạo để khám phá.', 'Chia sẻ để cùng phát triển.'],
  footer: 'TIẾP TỤC HỌC HỎI ↗',
};

// Các nền tảng chưa có URL chỉ hiển thị bằng chữ.
export const contactLinks: ContactLink[] = [
  {label: 'Email', value: 'tinhocblog01@gmail.com', url: 'mailto:tinhocblog01@gmail.com'},
  {label: 'GitHub', value: 'github.com/Duongnam2810', url: 'https://github.com/Duongnam2810'},
  {label: 'Mạng xã hội', value: 'Facebook · TikTok · Instagram · YouTube · X'},
];
export const contactNote = 'Tôi luôn trân trọng những cơ hội trao đổi kiến thức, học hỏi kinh nghiệm và kết nối với những người có chung niềm quan tâm đến công nghệ và giáo dục.';
