'use client';

import { useSearchParams } from 'next/navigation';

import { useEmployees } from '@/app/feature/employees/hooks/useEmployees';
import VacationTable from './VacationTable';

export default function VacationListClient() {
  const searchParams = useSearchParams();

  const params = {
    page: Number(searchParams.get('page') ?? 1),
    keyword: searchParams.get('keyword') ?? '',
    department: searchParams.get('department') ?? '',
    position: searchParams.get('position') ?? '',
  };
  const { data, isLoading, isError } = useEmployees(params);

  const employees = data?.employees ?? [];

  if (isLoading) {
    return <div>직원 목록을 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>직원 목록을 불러오지 못했습니다.</div>;
  }

  if (!employees || employees.length === 0) {
    return <div>등록된 직원이 없습니다.</div>;
  }

  return (
    <div>
      <VacationTable employees={employees} />
    </div>
  );
}
