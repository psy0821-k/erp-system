'use client';

import MyVacationTable from './myVacationTable';
import { ApprovalStatus } from '../type/vacationType';
import { useVacationEmployees } from '../api/vacationApi';

type Props = {
  statuses: ApprovalStatus[];
};

export default function MyVacationListClient({ statuses }: Props) {
  const { data, isLoading, isError } = useVacationEmployees(statuses);

  const vacations = data ?? [];

  if (isLoading) {
    return <div>휴가 목록을 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>휴가 목록을 불러오지 못했습니다.</div>;
  }

  if (vacations.length === 0) {
    return <div>등록된 휴가가 없습니다.</div>;
  }

  return <MyVacationTable vacations={vacations} />;
}
