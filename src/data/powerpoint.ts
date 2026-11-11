export const gameCategories = {
  gameshow: 'Gameshow thi đấu',
  'giai-ma': 'Phiêu lưu giải mã',
  'tinh-huong': 'Xử lý tình huống tương tác',
  'luyen-tap': 'Luyện tập nhanh',
  'khoi-dong': 'Khởi động',
  khac: 'Khác',
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
export const powerpointGames: PowerPointGame[] = [];

// Báo lỗi sớm nếu trang chi tiết trỏ đến slug chưa có trong danh sách.
export function getPowerPointGame(slug: string): PowerPointGame {
  const game = powerpointGames.find(item => item.slug === slug);
  if (!game) throw new Error(`Không tìm thấy trò chơi PowerPoint: ${slug}`);
  return game;
}
