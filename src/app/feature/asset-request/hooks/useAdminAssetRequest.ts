import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AssetType } from '@/config/types/asset';
import { assetRequestKeys } from '../queryKeys/assetRequestKeys';
import { approveAssetRequest, getAvailableAssetsByType, getPendingAssetRequests, rejectAssetRequest } from '../api/assetAdminRequestApi';

export const usePendingAssetRequests = (page: number) => {
  return useQuery({
    queryKey: assetRequestKeys.pending(page),
    queryFn: () => getPendingAssetRequests({ page }),
  });
};

export const useAvailableAssetsByType = (assetType: AssetType) => {
  return useQuery({
    queryKey: assetRequestKeys.availableAssets(assetType),
    queryFn: () => getAvailableAssetsByType(assetType),
    enabled: !!assetType,
  });
};

export const useApproveAssetRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveAssetRequest,

    onSuccess: () => {
      toast.success('물품 요청이 승인되었습니다.');

      queryClient.invalidateQueries({
        queryKey: assetRequestKeys.all,
      });
    },

    onError: () => {
      toast.error('물품 요청 승인에 실패했습니다.');
    },
  });
};

export const useRejectAssetRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectAssetRequest,

    onSuccess: () => {
      toast.success('물품 요청이 반려되었습니다.');

      queryClient.invalidateQueries({
        queryKey: assetRequestKeys.all,
      });
    },

    onError: () => {
      toast.error('물품 요청 반려에 실패했습니다.');
    },
  });
};
