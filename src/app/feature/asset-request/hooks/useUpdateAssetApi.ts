import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateAssetRequestStatus } from '../api/assetRequestApi';
import { assetRequestKeys } from '../queryKeys/assetRequestKeys';

export const useUpdateAssetRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAssetRequestStatus,

    onSuccess: () => {
      toast.success('IT 물품 요청 상태가 수정되었습니다.');

      queryClient.invalidateQueries({
        queryKey: assetRequestKeys.lists(),
      });
    },

    onError: () => {
      toast.error('IT 물품 요청 상태 수정에 실패했습니다.');
    },
  });
};
