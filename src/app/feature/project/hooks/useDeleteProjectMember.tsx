import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { projectKeys } from '../queryKeys/projectKeys';
import { deleteProjectMember } from '../api/projectMemberApi';

export const useDeleteProjectMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProjectMember,

    onSuccess: () => {
      toast.success('참여자가 제거되었습니다.');

      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });
    },

    onError: error => {
      console.error(error);
      toast.error('참여자 제거에 실패했습니다.');
    },
  });
};
