'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { checkOut } from '../api/attendanceApi';
import { attendanceKeys } from '../queryKey/queryKeys';

export const useCheckOut = (attendanceId: string, employeeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => checkOut(attendanceId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attendanceKeys.today(employeeId),
      });

      toast.success('퇴근 처리가 완료되었습니다.');
    },

    onError: () => {
      toast.error('퇴근 처리에 실패했습니다.');
    },
  });
};
