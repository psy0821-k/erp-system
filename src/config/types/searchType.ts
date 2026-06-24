import { AssetStatus, AssetType } from '@/config/types/asset';

export type EmployeeListParams = {
  page?: number;
  keyword?: string;
  department?: string;
  position?: string;
};

export type AssetsListParams = {
  page?: number;
  keyword?: string;
  status?: AssetStatus;
  asset_type?: AssetType;
};
