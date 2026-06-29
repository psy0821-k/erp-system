import { z } from 'zod';

export const noticeCreateSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  author_id: z.string().min(1, '작성자 정보가 필요합니다.'),
  is_pinned: z.boolean(),
});

export type NoticeCreateInput = z.infer<typeof noticeCreateSchema>;
