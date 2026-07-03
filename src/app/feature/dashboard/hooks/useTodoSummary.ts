import { useQuery } from '@tanstack/react-query';
import { dashboardKeys } from '../queryKeys/dashboardKeys';
import { getTodoSummary } from '../api/getTodoSummaryApi';

export const useTodoSummary = () => {
  return useQuery({
    queryKey: dashboardKeys.todoSummary(),
    queryFn: getTodoSummary,
  });
};
