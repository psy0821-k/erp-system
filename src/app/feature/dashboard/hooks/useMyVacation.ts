import { useQuery } from '@tanstack/react-query';

import { Vacation } from '../../vacations/type/vacationType';
import { vacationKeys } from '../../vacations/keys/queryKeys';
import { getMyRecentVacation } from '../../vacations/api/recentMyVacation';

export const useMyVacation = (employeeId: string) => {
  return useQuery<Vacation | null>({
    queryKey: vacationKeys.myRecent(employeeId),
    queryFn: () => getMyRecentVacation(employeeId),
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
