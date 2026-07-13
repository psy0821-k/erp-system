import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createAssetRequest } from '../api/assetRequestApi';
import { assetRequestKeys } from '../queryKeys/assetRequestKeys';

export const useCreateAssetRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAssetRequest,

    onSuccess: () => {
      toast.success('IT 물품 요청이 등록되었습니다.');

      queryClient.invalidateQueries({
        queryKey: assetRequestKeys.lists(),
      });
    },

    onError: () => {
      toast.error('IT 물품 요청 등록에 실패했습니다.');
    },
  });
};
