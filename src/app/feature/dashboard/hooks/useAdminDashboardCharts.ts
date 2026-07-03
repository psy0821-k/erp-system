'use client';

import { useQuery } from '@tanstack/react-query';

import { getAdminDashboardCharts } from '../api/dashboardApi';

export const useAdminDashboardCharts = () => {
  return useQuery({
    queryKey: ['dashboard', 'admin', 'charts'],
    queryFn: getAdminDashboardCharts,
  });
};
