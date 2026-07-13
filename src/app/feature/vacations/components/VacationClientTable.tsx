'use client';

import GetTodayVacationTable from './getTodayVacationTable';
import { useTodayVacations } from '../hooks/useVacation';
import CardSkeleton from '@/components/ui/cardSkeleton';

export default function VacationListClient() {
  const { data, isLoading, isError } = useTodayVacations();

  const vacations = data ?? [];

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return <div>오늘 휴가자 정보를 불러오지 못했습니다.</div>;
  }

  if (vacations.length === 0) {
    return <div>오늘 예정된 휴가자가 없습니다.</div>;
  }

  return <GetTodayVacationTable vacations={vacations} />;
}
