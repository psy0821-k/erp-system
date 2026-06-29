import { NoticeListParams } from '../type/noticeType';

export const noticeKeys = {
  all: ['notices'] as const,
  lists: () => [...noticeKeys.all, 'list'] as const,
  list: (params: NoticeListParams) => [...noticeKeys.lists(), params] as const,
  detail: (id: string) => [...noticeKeys.all, 'detail', id] as const,
};
