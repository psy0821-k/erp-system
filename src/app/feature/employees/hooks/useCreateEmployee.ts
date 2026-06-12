'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createEmployee } from '../api/employeesApi';
import { employeeKeys } from '../keys/queryKeys';

export const useCreateEmployee = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,

    onSuccess: () => {
      toast.success('직원등록에 성공했습니다');

      queryClient.invalidateQueries({
        queryKey: employeeKeys.lists(),
      });

      router.push('/employee');
    },

    onError: error => {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error('직원 등록 중 오류가 발생했습니다.');
    },
  });
};
