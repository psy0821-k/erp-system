import { useQuery } from '@tanstack/react-query';
import { EmployeeListParams } from '../types/searchType';
import { employeeKeys } from '../keys/queryKeys';
import { getEmployees } from '../api/employeesApi';

export function useEmployees(params: EmployeeListParams) {
  return useQuery({
    queryKey: employeeKeys.list(params),
    queryFn: () => getEmployees(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
