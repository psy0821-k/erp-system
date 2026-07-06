import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVacation } from '../api/deleteVacationApi';
import { toast } from 'sonner';
import { vacationKeys } from '../keys/queryKeys';

export const useDeleteVacation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVacation,

    onSuccess: () => {
      toast.success('휴가가 삭제되었습니다.');

      queryClient.invalidateQueries({
        queryKey: vacationKeys.lists(),
      });
    },

    onError: error => {
      console.error(error);
      toast.error('휴가 삭제에 실패했습니다.');
    },
  });
};
