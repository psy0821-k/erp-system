import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createNotice } from '../api/noticeApi';
import { noticeKeys } from '../queryKey/noticeKeys';

export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNotice,

    onSuccess: () => {
      toast.success('공지사항이 등록되었습니다.');

      queryClient.invalidateQueries({
        queryKey: noticeKeys.lists(),
      });
    },

    onError: () => {
      toast.error('공지사항 등록에 실패했습니다.');
    },
  });
};
