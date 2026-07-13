import { createClient } from '@/lib/client';
import { AssetType } from '@/config/types/asset';
import { AvailableAsset, PendingAssetRequestResponse } from '../type/assetRequestAdmin';

const PAGE_SIZE = 10;

interface GetPendingAssetRequestsParams {
  page: number;
}

export const getPendingAssetRequests = async ({ page }: GetPendingAssetRequestsParams): Promise<PendingAssetRequestResponse> => {
  const supabase = createClient();

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from('asset_requests')
    .select(
      `
      *,
      requester:employees!asset_requests_requester_id_fkey(
        id,
        name,
        department,
        position
      )
    `,
      { count: 'exact' }
    )
    .eq('status', 'PENDING')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data,
    count: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
  };
};

export const getAvailableAssetsByType = async (assetType: AssetType): Promise<AvailableAsset[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('asset_type', assetType)
    .eq('status', 'AVAILABLE')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
};

interface ApproveAssetRequestInput {
  requestId: string;
  assetId: string;
  requesterId: string;
}

export const approveAssetRequest = async ({ requestId, assetId, requesterId }: ApproveAssetRequestInput) => {
  const supabase = createClient();

  const { error: assetError } = await supabase
    .from('assets')
    .update({
      status: 'IN_USE',
      assigned_employee_id: requesterId,
    })
    .eq('id', assetId)
    .eq('status', 'AVAILABLE');

  if (assetError) throw assetError;

  const { data, error } = await supabase
    .from('asset_requests')
    .update({
      status: 'APPROVED',
    })
    .eq('id', requestId)
    .eq('status', 'PENDING')
    .select()
    .single();

  if (error) throw error;

  return data;
};

interface RejectAssetRequestInput {
  requestId: string;
  resultMessage?: string | null;
}

export const rejectAssetRequest = async ({ requestId, resultMessage }: RejectAssetRequestInput) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('asset_requests')
    .update({
      status: 'REJECTED',
      admin_message: resultMessage ?? null,
    })
    .eq('id', requestId)
    .eq('status', 'PENDING')
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
