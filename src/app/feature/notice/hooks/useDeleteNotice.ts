import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteNotice } from '../api/noticeApi';
import { noticeKeys } from '../queryKey/noticeKeys';

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotice,

    onSuccess: () => {
      toast.success('공지사항이 삭제되었습니다.');

      queryClient.invalidateQueries({
        queryKey: noticeKeys.lists(),
      });
    },

    onError: () => {
      toast.error('공지사항 삭제에 실패했습니다.');
    },
  });
};
