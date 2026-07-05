import { AssetType } from '@/config/types/asset';

export const ASSET_REQUEST_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export type AssetRequestStatus = (typeof ASSET_REQUEST_STATUS)[keyof typeof ASSET_REQUEST_STATUS];

export const ASSET_REQUEST_STATUS_OPTIONS = [
  { title: '승인 대기', value: ASSET_REQUEST_STATUS.PENDING },
  { title: '승인', value: ASSET_REQUEST_STATUS.APPROVED },
  { title: '반려', value: ASSET_REQUEST_STATUS.REJECTED },
  { title: '지급 완료', value: ASSET_REQUEST_STATUS.COMPLETED },
  { title: '취소', value: ASSET_REQUEST_STATUS.CANCELLED },
] as const;

export const ASSET_REQUEST_STATUS_LABEL: Record<AssetRequestStatus, string> = {
  [ASSET_REQUEST_STATUS.PENDING]: '승인 대기',
  [ASSET_REQUEST_STATUS.APPROVED]: '승인',
  [ASSET_REQUEST_STATUS.REJECTED]: '반려',
  [ASSET_REQUEST_STATUS.COMPLETED]: '지급 완료',
  [ASSET_REQUEST_STATUS.CANCELLED]: '취소',
};

export const ASSET_REQUEST_STATUS_BADGE_VARIANT: Record<AssetRequestStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  [ASSET_REQUEST_STATUS.PENDING]: 'secondary',
  [ASSET_REQUEST_STATUS.APPROVED]: 'default',
  [ASSET_REQUEST_STATUS.REJECTED]: 'destructive',
  [ASSET_REQUEST_STATUS.COMPLETED]: 'outline',
  [ASSET_REQUEST_STATUS.CANCELLED]: 'destructive',
};

export interface AssetRequestRow {
  id: string;
  requester_id: string;
  asset_type: AssetType;
  request_title: string;
  reason: string;
  status: AssetRequestStatus;
  admin_message: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface AssetRequestRequester {
  id: string;
  name: string;
  email: string;
  employee_number: string;
  department: string;
  position: string;
}

export interface AssetRequest extends AssetRequestRow {
  requester: AssetRequestRequester;
}

export interface CreateAssetRequestInput {
  requester_id: string;
  asset_type: AssetType;
  request_title: string;
  reason: string;
}

export interface UpdateAssetRequestStatusInput {
  id: string;
  status: AssetRequestStatus;
  admin_message?: string | null;
}

export interface AssetRequestListParams {
  page?: string;
  keyword?: string;
  status?: AssetRequestStatus | '';
  assetType?: AssetType | '';
}
