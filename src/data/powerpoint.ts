export const gameCategories = {
  'gameshow': 'Gameshow thi đấu',
  'giai-ma': 'Phiêu lưu giải mã',
  'tinh-huong': 'Xử lý tình huống tương tác',
  'luyen-tap': 'Luyện tập nhanh',
  'khoi-dong': 'Khởi động',
  'khac': 'Khác',
} as const;

export type Grade = 6 | 7 | 8 | 9;
export type PowerPointGame = {
  id: string;
  slug: string;
  isSample?: boolean;
  title: string;
  summary: string;
  category: keyof typeof gameCategories;
  grades?: Grade[];
  organization?: string;
  purpose?: string;
  audience?: string;
  subjects?: string[];
  tags?: string[];
  gameplay?: string;
  durationMinutes?: number;
  thumbnail?: string;
  screenshots?: string[];
  /** Hỗ trợ trang TSX cũ; game mới viết hướng dẫn dài trong MDX. */
  instructions?: string[];
  requirements?: string[];
  macroStatus: 'yes' | 'no' | 'unknown';
  demoUrl?: string;
  downloadUrl?: string;
  license?: string;
  author?: string;
  version?: string;
  updatedAt?: string;
};

// Chỉ thêm trò chơi thật đã được xác nhận nội dung và quyền chia sẻ.
// Đường dẫn nội bộ không chứa baseUrl; Docusaurus tự thêm /tech-blog/.
export const powerpointGames: PowerPointGame[] = [
  {
    id: 'danh-thuc-nang-luc',
    slug: 'danh-thuc-nang-luc',
    title: 'Đánh thức năng lực',
    summary:
      'Giúp học sinh có thêm hoạt động vui vẻ trong giờ học thông qua việc thực hiện các động tác được ẩn sau những mảnh ghép.',
    category: 'giai-ma',
    grades: [6, 7, 8, 9],
    organization: 'Cá nhân hoặc nhóm',
    gameplay:
      'Một bức tranh "siêu năng lực" được che bởi 6 mảnh ghép. Học sinh lần lượt chọn mảnh ghép và đứng tại chỗ thực hiện thử thách. Khi thực hiện thành công, mảnh ghép được mở. Sau khi cả 6 mảnh ghép mở ra, bức tranh hoàn chỉnh xuất hiện.',
    macroStatus: 'no',
    thumbnail:
      '/img/powerpoint/danh-thuc-nang-luc/cover.png',
    screenshots: [
      '/img/powerpoint/danh-thuc-nang-luc/overview.png',
    ],
    downloadUrl:
      'https://docs.google.com/presentation/d/1NrFjHv6yVSN9_eaWIJfLa-owjpCgeQ9-/edit?usp=drive_link&ouid=101668545794741001611&rtpof=true&sd=true',
  },
];

// Báo lỗi sớm nếu trang chi tiết trỏ đến slug chưa có trong danh sách.
export function getPowerPointGame(slug: string): PowerPointGame {
  const game = powerpointGames.find(item => item.slug === slug);
  if (!game) throw new Error(`Không tìm thấy trò chơi PowerPoint: ${slug}`);
  return game;
}
