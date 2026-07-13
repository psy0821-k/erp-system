import { useQuery } from '@tanstack/react-query';

import { getAssetReports } from '../api/assetReportApi';
import { AssetReportListParams } from '../type/assetReportType';
import { assetReportKeys } from '../queryKeys/assetReportKeys';

export const useAssetReports = (params: AssetReportListParams) => {
  return useQuery({
    queryKey: assetReportKeys.list(params),
    queryFn: () => getAssetReports(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
