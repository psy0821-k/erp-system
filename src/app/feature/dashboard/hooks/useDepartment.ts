'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardKeys } from '../queryKeys/dashboardKeys';
import { getDepartment } from '../api/adminDepartmentApi';

export const useDepartment = () => {
  return useQuery({
    queryKey: dashboardKeys.department(),
    queryFn: getDepartment,
  });
};
