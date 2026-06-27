import { useQuery } from '@tanstack/react-query';

import { getAssetRequests } from '../api/assetRequestApi';
import { assetRequestKeys } from '../queryKeys/assetRequestKeys';
import { AssetRequestListParams } from '../type/assetRequestType';

export const useAssetRequests = (params: AssetRequestListParams) => {
  return useQuery({
    queryKey: assetRequestKeys.list(params),
    queryFn: () => getAssetRequests(params),
  });
};
