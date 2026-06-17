import { useInfiniteQuery } from '@tanstack/react-query';
import { getAdminVacations } from '../api/adminVacation';

export const useVacationsInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['vacations', 'admin', 'infinite'],
    queryFn: ({ pageParam }) => getAdminVacations({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPage,
  });
};
