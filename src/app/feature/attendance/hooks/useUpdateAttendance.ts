import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateAttendance, UpdateAttendanceInput } from '../api/attendanceApi';
import { updateLateReason, UpdateLateReasonInput } from '../api/lateReasonApi';

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
export const useUpdateLateReason = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateLateReasonInput) => updateLateReason(input),

    onSuccess: () => {
      toast.success('지각 사유가 수정되었습니다.');

      queryClient.invalidateQueries({
        queryKey: ['late'],
      });
    },

    onError: () => {
      toast.error('근태 정보 수정에 실패했습니다.');
    },
  });
};
