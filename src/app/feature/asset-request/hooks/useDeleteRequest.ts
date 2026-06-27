import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteAssetRequest } from '../api/assetRequestApi';
import { assetRequestKeys } from '../queryKeys/assetRequestKeys';

export const useDeleteAssetRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAssetRequest,

    onSuccess: () => {
      toast.success('IT 물품 요청이 삭제되었습니다.');

      queryClient.invalidateQueries({
        queryKey: assetRequestKeys.lists(),
      });
    },

    onError: () => {
      toast.error('IT 물품 요청 삭제에 실패했습니다.');
    },
  });
};
