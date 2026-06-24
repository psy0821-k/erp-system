import { AssetsListParams } from '@/config/types/searchType';
import { useQuery } from '@tanstack/react-query';
import { assetKeys } from '../queryKey/assetKeys';
import { getAssets } from '../api/assetApi';

export function useAssets(params: AssetsListParams) {
  return useQuery({
    queryKey: assetKeys.list(params),
    queryFn: () => getAssets(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
