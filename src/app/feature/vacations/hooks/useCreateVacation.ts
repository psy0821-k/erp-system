'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createVacation } from '../api/vacationApi';
import { vacationKeys } from '../keys/queryKeys';

export const useCreateVacation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVacation,

    onSuccess: () => {
      toast.success('휴가 신청이 완료되었습니다.');

      queryClient.invalidateQueries({
        queryKey: vacationKeys.lists(),
      });

      router.push('/employee/vacation');
    },

    onError: error => {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error('휴가 신청 중 오류가 발생했습니다.');
    },
  });
};
