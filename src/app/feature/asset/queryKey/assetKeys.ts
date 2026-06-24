import { AssetsListParams } from '@/config/types/searchType';

export const assetKeys = {
  all: ['assets'] as const,
  lists: () => [...assetKeys.all, 'list'] as const,
  list: (params: AssetsListParams) => [...assetKeys.lists(), params] as const,
  detail: (id: string) => [...assetKeys.all, 'detail', id] as const,
};
