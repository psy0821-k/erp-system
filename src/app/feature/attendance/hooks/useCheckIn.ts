'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { attendanceKeys } from '../queryKey/queryKeys';
import { checkIn } from '../api/check_in_out';

export const useCheckIn = (employeeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => checkIn(employeeId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attendanceKeys.today(employeeId),
      });

      toast.success('출근 처리가 완료되었습니다.');
    },

    onError: () => {
      toast.error('출근 처리에 실패했습니다.');
    },
  });
};
