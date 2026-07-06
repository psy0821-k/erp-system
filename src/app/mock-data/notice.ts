export type NoticeType = 'SYSTEM' | 'HR' | 'PROJECT' | 'SECURITY';

export interface Notice {
  id: number;
  title: string;
  type: NoticeType;
  date: string;
  isNew: boolean;
}
