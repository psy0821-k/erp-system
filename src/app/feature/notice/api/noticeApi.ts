import { createClient } from '@/lib/client';
import { NoticeListParams } from '../type/noticeType';
import { NoticeCreateInput, UpdateNoticeDTO } from '../schema/noticeSchema';

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

export const uploadNoticeImage = async (file: File) => {
  const supabase = createClient();

  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `notices/${fileName}`;

  const { error } = await supabase.storage.from('notice-images').upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from('notice-images').getPublicUrl(filePath);

  return data.publicUrl;
};

export const getNotice = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
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
      `
    )
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateNotice = async (input: UpdateNoticeDTO) => {
  const supabase = createClient();

  const { id, ...values } = input;

  const { data, error } = await supabase
    .from('notices')
    .update({
      ...values,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

const NOTICE_IMAGE_BUCKET = 'notice-images';

const extractNoticeImagePaths = (content: string) => {
  const imageUrls = Array.from(content.matchAll(/<img[^>]+src=["']([^"']+)["']/g)).map(match => match[1]);

  return imageUrls
    .map(url => {
      const marker = `/storage/v1/object/public/${NOTICE_IMAGE_BUCKET}/`;
      const index = url.indexOf(marker);

      if (index === -1) return null;

      return decodeURIComponent(url.slice(index + marker.length));
    })
    .filter((path): path is string => Boolean(path));
};

export const deleteNotice = async (id: string) => {
  const supabase = createClient();

  const { data: notice, error: fetchError } = await supabase.from('notices').select('id, content').eq('id', id).single();

  if (fetchError) {
    throw fetchError;
  }

  const imagePaths = extractNoticeImagePaths(notice.content ?? '');

  if (imagePaths.length > 0) {
    const { error: storageError } = await supabase.storage.from(NOTICE_IMAGE_BUCKET).remove(imagePaths);

    if (storageError) {
      throw storageError;
    }
  }

  const { error: deleteError } = await supabase.from('notices').delete().eq('id', id);

  if (deleteError) {
    throw deleteError;
  }

  return id;
};
