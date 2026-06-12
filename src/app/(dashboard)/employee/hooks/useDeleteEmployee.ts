'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteEmployee } from '../api/employeesApi';
import { employeeKeys } from '../query/queryKeys';

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,

    onSuccess: () => {
      toast.success('직원이 삭제되었습니다.');

      queryClient.invalidateQueries({
        queryKey: employeeKeys.lists(),
      });
    },

    onError: error => {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error('직원 삭제 중 오류가 발생했습니다.');
    },
  });
};
