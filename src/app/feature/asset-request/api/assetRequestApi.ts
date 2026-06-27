import { createClient } from '@/lib/client';

import { AssetRequest, AssetRequestListParams, CreateAssetRequestInput, UpdateAssetRequestStatusInput } from '../type/assetRequestType';

const PAGE_SIZE = 10;

const assetRequestSelect = `
  *,
  requester:employees!asset_requests_requester_id_fkey (
    id,
    name,
    email,
    employee_number,
    department,
    position
  )
`;

export const getAssetRequests = async (params: AssetRequestListParams) => {
  const supabase = createClient();

  const page = Number(params.page) || 1;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase.from('asset_requests').select(assetRequestSelect, { count: 'exact' }).order('created_at', { ascending: false });

  if (params.status) {
    query = query.eq('status', params.status);
  }

  if (params.assetType) {
    query = query.eq('asset_type', params.assetType);
  }

  if (params.keyword) {
    query = query.or(`title.ilike.%${params.keyword}%,reason.ilike.%${params.keyword}%`);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw error;
  }

  return {
    requests: data as AssetRequest[],
    totalCount: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
  };
};

export const createAssetRequest = async (input: CreateAssetRequestInput) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('asset_requests')
    .insert({
      requester_id: input.requester_id,
      asset_type: input.asset_type,
      request_title: input.request_title,
      reason: input.reason,
      status: 'PENDING',
    })
    .select(assetRequestSelect)
    .single();

  if (error) {
    throw error;
  }

  return data as AssetRequest;
};

export const updateAssetRequestStatus = async (input: UpdateAssetRequestStatusInput) => {
  const supabase = createClient();

  const { id, status, admin_message } = input;

  const { data, error } = await supabase
    .from('asset_requests')
    .update({
      status,
      admin_message: admin_message ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(assetRequestSelect)
    .single();

  if (error) {
    throw error;
  }

  return data as AssetRequest;
};

export const deleteAssetRequest = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from('asset_requests').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return id;
};
