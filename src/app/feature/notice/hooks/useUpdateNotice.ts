import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateNotice } from '../api/noticeApi';
import { noticeKeys } from '../queryKey/noticeKeys';

export const useUpdateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotice,

    onSuccess: notice => {
      toast.success('공지사항이 수정되었습니다.');

      queryClient.invalidateQueries({
        queryKey: noticeKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: noticeKeys.detail(notice.id),
      });
    },

    onError: () => {
      toast.error('공지사항 수정에 실패했습니다.');
    },
  });
};
