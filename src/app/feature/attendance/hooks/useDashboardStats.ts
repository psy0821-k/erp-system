import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../api/getDashboardStats';
import { dashboardKeys } from '../queryKey/queryKeys';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
  });
};
