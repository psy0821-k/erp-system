import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createProject } from '../api/projectApi';
import { projectKeys } from '../queryKeys/projectKeys';

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      toast.success('프로젝트가 등록되었습니다.');

      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });
    },

    onError: () => {
      toast.error('프로젝트 등록에 실패했습니다.');
    },
  });
};
