'use client';

import { useQuery } from '@tanstack/react-query';
import { ApprovalStatus, Vacation } from '../type/vacationType';
import { vacationKeys } from '../keys/queryKeys';
import { getMyVacations, getTodayVacations } from '../api/vacationApi';

export function useVacationEmployees(statuses: ApprovalStatus[]) {
  return useQuery({
    queryKey: vacationKeys.list(statuses),
    queryFn: () => getMyVacations(statuses),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export const useTodayVacations = () => {
  return useQuery({
    queryKey: ['today-vacations'],
    queryFn: getTodayVacations,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useTodayDashboardVacations = () => {
  return useQuery<Vacation[]>({
    queryKey: vacationKeys.today(),
    queryFn: getTodayVacations,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
