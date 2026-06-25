import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateAsset } from '../api/assetApi';
import { assetKeys } from '../queryKey/assetKeys';

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAsset,

    onSuccess: () => {
      toast.success('자산 정보가 수정되었습니다.');

      queryClient.invalidateQueries({
        queryKey: assetKeys.lists(),
      });
    },

    onError: () => {
      toast.error('자산 정보 수정에 실패했습니다.');
    },
  });
};
