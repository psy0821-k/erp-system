import { useQuery } from '@tanstack/react-query';
import { getNotices } from '../api/noticeApi';
import { noticeKeys } from '../queryKey/noticeKeys';
import { NoticeListParams } from '../type/noticeType';

export const useNotices = (params: NoticeListParams) => {
  return useQuery({
    queryKey: noticeKeys.list(params),
    queryFn: () => getNotices(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
