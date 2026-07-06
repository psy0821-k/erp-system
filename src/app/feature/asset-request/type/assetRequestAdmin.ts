import { Asset, AssetType } from '@/config/types/asset';
import { AssetRequestStatus } from './assetRequestType';

export interface AssetRequestEmployee {
  id: string;
  name: string;
  department: string;
  position: string;
}

export interface AssetRequestAdmin {
  id: string;
  requester_id: string;
  asset_type: AssetType;
  title: string;
  reason: string | null;
  status: AssetRequestStatus;
  created_at: string;

  requester: AssetRequestEmployee | null;
}

export interface PendingAssetRequestResponse {
  data: AssetRequestAdmin[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApproveAssetRequestInput {
  requestId: string;
  assetId: string;
  requesterId: string;
}

export interface RejectAssetRequestInput {
  requestId: string;
  resultMessage?: string | null;
}

export type AvailableAsset = Pick<Asset, 'id' | 'asset_name' | 'serial_number' | 'asset_type'>;
