export const resourceTypes = {
  'tham-khao': 'Tài liệu tham khảo',
  'de-kiem-tra': 'Đề kiểm tra',
  'bai-day': 'Bài dạy',
} as const;

export type Grade = 6 | 7 | 8 | 9;
export type ResourceType = keyof typeof resourceTypes;
export type ResourceFile = {
  label: string;
  url: string;
  format: 'pdf' | 'pptx' | 'docx' | 'zip' | 'other';
  sizeLabel?: string;
};
export type Resource = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  type: ResourceType;
  grades: Grade[];
  subject?: string;
  tags?: string[];
  goals?: string[];
  contentFormat?: 'mdx';
  thumbnail?: string;
  preview?: {kind: 'image' | 'pdf'; url: string; label: string};
  files?: ResourceFile[];
  updatedAt?: string;
  author?: string;
  source?: {label: string; url?: string};
  license?: string;
};

// Lớp 8 được ghi trong frontmatter của bài Python hiện có.
// Không chuyển liên kết Drive mẫu trong bài gốc thành tệp đính kèm.
export const resources: Resource[] = [
  {
    id: 'python-introduction',
    slug: 'lam-quen-voi-python',
    title: 'Bài 1 — Làm quen với Python',
    summary: 'Giới thiệu Python và hoạt động thực hành lệnh print dành cho học sinh mới bắt đầu.',
    type: 'tham-khao',
    grades: [8],
    subject: 'Python cơ bản',
    tags: ['Python', 'Lập trình', 'print'],
    goals: ['Làm quen với ngôn ngữ lập trình Python.', 'Thực hành lệnh print và thay đổi lời chào trong bài học.'],
    contentFormat: 'mdx',
    source: {
      label: 'Bài Python hiện có trên Blog Tin Học',
      url: '/docs/python-tutorial/bai-1-lam-quen-python',
    },
  },
];

export function getResource(slug: string): Resource {
  const resource = resources.find(item => item.slug === slug);
  if (!resource) throw new Error(`Không tìm thấy tài liệu: ${slug}`);
  return resource;
}
