'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateEmployee } from '../api/employeesApi';
import { employeeKeys } from '../query/queryKeys';

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployee,

    onSuccess: data => {
      toast.success('직원 정보가 수정되었습니다.');

      queryClient.invalidateQueries({
        queryKey: employeeKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: employeeKeys.detail(data.id),
      });
    },

    onError: error => {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error('직원 수정 중 오류가 발생했습니다.');
    },
  });
};
