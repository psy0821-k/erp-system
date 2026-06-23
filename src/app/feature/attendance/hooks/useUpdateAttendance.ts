import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateAttendance, UpdateAttendanceInput } from '../api/attendanceApi';
// import { attendanceKeys } from './attendanceKeys';

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateAttendanceInput) => updateAttendance(input),

    onSuccess: () => {
      toast.success('근태 정보가 수정되었습니다.');

      queryClient.invalidateQueries({
        queryKey: ['attendance'],
      });
    },

    onError: () => {
      toast.error('근태 정보 수정에 실패했습니다.');
    },
  });
};
