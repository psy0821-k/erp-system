import { createClient } from '@/lib/client';
import { NoticeListParams } from '../type/noticeType';
import { NoticeCreateInput } from '../schema/noticeSchema';

const PAGE_SIZE = 10;

export const getNotices = async (params: NoticeListParams) => {
  const supabase = createClient();

  const page = Number(params.page) || 1;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from('notices')
    .select(
      `
        *,
        author:employees!notices_author_id_fkey (
          id,
          name,
          email,
          department,
          position
        )
      `,
      { count: 'exact' }
    )
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (params.keyword) {
    query = query.ilike('title', `%${params.keyword}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    notices: data,
    count,
    totalPages: Math.ceil((count || 0) / PAGE_SIZE),
    currentPage: page,
  };
};

export const createNotice = async (input: NoticeCreateInput) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('notices').insert(input).select().single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteNotice = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from('notices').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return id;
};
