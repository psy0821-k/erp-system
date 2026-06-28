import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteProject } from '../api/projectApi';
import { projectKeys } from '../queryKeys/projectKeys';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,

    onSuccess: () => {
      toast.success('프로젝트가 삭제되었습니다.');

      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });
    },

    onError: error => {
      console.error(error);
      toast.error('프로젝트 삭제에 실패했습니다.');
    },
  });
};
