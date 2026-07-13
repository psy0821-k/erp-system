import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateProject } from '../api/projectApi';
import { projectKeys } from '../queryKeys/projectKeys';

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,

    onSuccess: data => {
      toast.success('프로젝트가 수정되었습니다.');

      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(data.id),
      });
    },

    onError: () => {
      toast.error('프로젝트 수정에 실패했습니다.');
    },
  });
};
