import { createClient } from '@/lib/client';
import { AssetsListParams } from '../../../../config/types/searchType';
import { CreateAssetInput, UpdateAssetInput } from '@/config/types/asset';

const PAGE_SIZE = 10;

export const getAssets = async (params: AssetsListParams) => {
  const supabase = createClient();

  const page = params.page ?? 1;

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase.from('assets').select('*', { count: 'exact' }).order('created_at', { ascending: false });

  if (params.keyword) {
    query = query.or(`asset_name.ilike.%${params.keyword}%,serial_number.ilike.%${params.keyword}%`);
  }

  if (params.status) {
    query = query.eq('status', params.status);
  }

  if (params.asset_type) {
    query = query.eq('asset_type', params.asset_type);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw error;
  }

  return {
    assets: data ?? [],
    totalCount: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
  };
};

export const createAsset = async (input: CreateAssetInput) => {
  const supabase = createClient();

  const payload = {
    ...input,
    memo: input.memo?.trim() || null,
  };

  const { data, error } = await supabase.from('assets').insert(payload).select().single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateAsset = async ({ id, ...values }: UpdateAssetInput) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('assets').update(values).eq('id', id).select().single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteAsset = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from('assets').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return id;
};
