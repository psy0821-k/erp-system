import { useQuery } from '@tanstack/react-query';
import { assetKeys } from '../../asset/queryKey/assetKeys';
import { getMyAssets } from '../api/assetReportApi';

export const useMyAssets = (reporter_id: string) => {
  return useQuery({
    queryKey: [...assetKeys.all, 'my-assets', reporter_id],
    queryFn: () => getMyAssets(reporter_id),
    enabled: !!reporter_id,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
