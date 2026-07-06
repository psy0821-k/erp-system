import { AssetRequestListParams } from '../type/assetRequestType';

export const assetRequestKeys = {
  all: ['assetRequests'] as const,
  lists: () => [...assetRequestKeys.all, 'list'] as const,
  list: (params: AssetRequestListParams) => [...assetRequestKeys.lists(), params] as const,
  pending: (page: number) => [...assetRequestKeys.all, 'PENDING', page] as const,
  availableAssets: (assetType: string) => [...assetRequestKeys.all, 'available-assets', assetType] as const,
};
