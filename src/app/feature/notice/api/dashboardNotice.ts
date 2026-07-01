import { createClient } from '@/lib/client';
import { DashboardNotice } from '../type/noticeType';

export const getDashboardNotices = async (): Promise<DashboardNotice[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('notices')
    .select(
      `
      id,
      title,
      is_pinned,
      created_at,
      author:employees (
        id,
        name
      )
    `
    )
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) throw error;

  return (data ?? []).map(notice => ({
    id: notice.id,
    title: notice.title,
    is_pinned: notice.is_pinned,
    created_at: notice.created_at,
    author: Array.isArray(notice.author) ? (notice.author[0] ?? null) : notice.author,
  }));
};
