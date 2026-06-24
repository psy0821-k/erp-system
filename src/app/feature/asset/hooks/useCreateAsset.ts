import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createAsset } from '../api/assetApi';
import { assetKeys } from '../queryKey/assetKeys';

export const useCreateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAsset,

    onSuccess: () => {
      toast.success('자산이 등록되었습니다.');

      queryClient.invalidateQueries({
        queryKey: assetKeys.lists(),
      });
    },

    onError: () => {
      toast.error('자산 등록에 실패했습니다.');
    },
  });
};
