import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { checkOutToday } from '../api/check_in_out';
import { attendanceKeys } from '../queryKey/queryKeys';

export const useCheckOut = (employeeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkOutToday,

    onSuccess: () => {
      toast.success('퇴근 처리되었습니다.');

      queryClient.invalidateQueries({
        queryKey: attendanceKeys.today(employeeId),
      });

      queryClient.invalidateQueries({
        queryKey: attendanceKeys.lists(),
      });
    },

    onError: () => {
      toast.error('퇴근 처리에 실패했습니다.');
    },
  });
};
