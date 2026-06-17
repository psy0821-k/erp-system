import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVacationStatus } from '../api/vacationUpdateApi';

export const useUpdateVacationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVacationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vacations', 'admin', 'infinite'],
      });
    },
  });
};
