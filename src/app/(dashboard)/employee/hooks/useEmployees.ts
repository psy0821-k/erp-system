'use client';

import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../api/employeesApi';
import { employeeKeys } from '../query/queryKeys';

export function useEmployees() {
  return useQuery({
    queryKey: employeeKeys.list(),
    queryFn: getEmployees,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
