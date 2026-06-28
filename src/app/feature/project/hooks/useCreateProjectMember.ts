import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { projectKeys } from '../queryKeys/projectKeys';
import { createProjectMember } from '../api/projectMemberApi';

export const useCreateProjectMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProjectMember,

    onSuccess: () => {
      toast.success('참여자가 추가되었습니다.');

      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });
    },

    onError: error => {
      console.error(error);
      toast.error('참여자 추가에 실패했습니다.');
    },
  });
};
