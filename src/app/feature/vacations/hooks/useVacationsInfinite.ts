import { useInfiniteQuery } from '@tanstack/react-query';
import { getVacations } from '../api/vacationApi';

export const useVacationsInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['vacations', 'admin', 'infinite'],
    queryFn: ({ pageParam }) => getVacations({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPage,
  });
};
