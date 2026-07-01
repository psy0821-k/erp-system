import { useQuery } from '@tanstack/react-query';

import { noticeKeys } from '../queryKey/noticeKeys';
import { getDashboardNotices } from '../api/dashboardNotice';

export const useDashboardNotices = () => {
  return useQuery({
    queryKey: noticeKeys.dashboard(),
    queryFn: getDashboardNotices,
  });
};
