// Chỉ gắn liên kết khi đã có nội dung đích phù hợp trong repository.
export const pythonLessonPath = '/docs/python-tutorial/bai-1-lam-quen-python';

export type ResourceCategory = {
  icon: 'book' | 'presentation' | 'code';
  title: string;
  description: string;
  tone: 'blue' | 'mint' | 'violet';
  href?: string;
  actionLabel?: string;
};

export const resources: ResourceCategory[] = [
  {
    icon: 'book',
    title: 'Tài liệu Tin học THCS',
    description: 'Tài liệu tham khảo, đề kiểm tra và bài dạy cho lớp 6–9. Chưa có bộ tài liệu được công bố tại đây.',
    tone: 'blue',
  },
  {
    icon: 'presentation',
    title: 'Trò chơi PowerPoint',
    description: 'Hoạt động ôn tập qua trò chơi dành cho lớp học. Chưa có tệp trò chơi được công bố tại đây.',
    tone: 'mint',
    href: '/powerpoint',
    actionLabel: 'Khám phá trò chơi',
  },
  {
    icon: 'code',
    title: 'Lập trình Python',
    description: 'Làm quen với Python và thử lệnh print đầu tiên trong bài học dành cho người mới bắt đầu.',
    tone: 'violet',
    href: pythonLessonPath,
  },
];

export type GradeItem = {
  grade: number;
  tone: 'blue' | 'mint' | 'amber' | 'violet';
  href?: string;
};

export const grades: GradeItem[] = [
  {grade: 6, tone: 'blue'},
  {grade: 7, tone: 'mint'},
  {grade: 8, tone: 'amber', href: pythonLessonPath},
  {grade: 9, tone: 'violet'},
];

export const featuredLesson = {
  title: 'Bài 1 — Làm quen với Python',
  description: 'Khám phá Python, thử thay đổi lời chào và thực hành lệnh print trong khung code của bài học.',
  grade: 'Lớp 8',
  subject: 'Python cơ bản',
  href: pythonLessonPath,
};
