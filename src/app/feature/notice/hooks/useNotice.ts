import { useQuery } from '@tanstack/react-query';

import { getNotice } from '../api/noticeApi';
import { noticeKeys } from '../queryKey/noticeKeys';

export const useNotice = (id: string) => {
  return useQuery({
    queryKey: noticeKeys.detail(id),
    queryFn: () => getNotice(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
