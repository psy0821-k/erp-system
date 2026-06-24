import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteAsset } from '../api/assetApi';
import { assetKeys } from '../queryKey/assetKeys';

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAsset,

    onSuccess: () => {
      toast.success('자산이 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: assetKeys.lists(),
      });
    },

    onError: () => {
      toast.error('자산 삭제에 실패했습니다.');
    },
  });
};
