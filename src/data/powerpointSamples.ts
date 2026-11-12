import type {PowerPointGame} from './powerpoint';

// Chỉ dùng để xem giao diện local; bản production luôn nhận danh sách rỗng.
export const powerpointSamples: PowerPointGame[] = process.env.NODE_ENV === 'development' ? [
  {
    id: 'sample-quiz', slug: 'mau-do-vui-tin-hoc', isSample: true,
    title: 'Đố vui Tin học',
    summary: 'Dữ liệu mẫu: thi đố theo nhóm với các câu hỏi trắc nghiệm Tin học.',
    category: 'gameshow', grades: [6, 7], organization: 'Theo nhóm',
    purpose: 'Ôn tập kiến thức', subjects: ['Tin học'], tags: ['trắc nghiệm', 'thi đố'],
    durationMinutes: 15,
    macroStatus: 'unknown',
  },
  {
    id: 'sample-crossword', slug: 'mau-giai-ma-o-chu', isSample: true,
    title: 'Giải mã ô chữ',
    summary: 'Dữ liệu mẫu: khám phá từ khóa qua các gợi ý về máy tính và thuật toán.',
    category: 'giai-ma', grades: [7, 8, 9], organization: 'Theo nhóm',
    purpose: 'Củng cố thuật ngữ', subjects: ['Tin học'], tags: ['ô chữ', 'thuật toán'],
    durationMinutes: 10,
    instructions: ['Chọn một hàng ngang và đọc gợi ý.', 'Các nhóm thảo luận, đưa ra từ khóa phù hợp.', 'Kết nối các đáp án để tìm từ khóa cuối cùng.'],
    macroStatus: 'unknown',
  },
  {
    id: 'sample-warmup', slug: 'mau-khoi-dong-nhanh', isSample: true,
    title: 'Khởi động nhanh',
    summary: 'Dữ liệu mẫu: câu hỏi ngắn để gợi nhớ kiến thức và dẫn vào bài học.',
    category: 'khoi-dong', grades: [6, 7, 8, 9], organization: 'Cá nhân',
    purpose: 'Khởi động tiết học', subjects: ['Tin học'], tags: ['khởi động', 'hỏi đáp'],
    durationMinutes: 5,
    instructions: ['Giới thiệu chủ đề và mời học sinh tham gia.', 'Lần lượt nêu câu hỏi ngắn để học sinh trả lời.', 'Dùng các câu trả lời để kết nối với nội dung bài mới.'],
    macroStatus: 'unknown',
  },
] : [];

export function getSampleGame(slug: string): PowerPointGame {
  const game = powerpointSamples.find(item => item.slug === slug);
  if (!game) throw new Error(`Không có dữ liệu mẫu: ${slug}`);
  return game;
}
