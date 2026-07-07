'use client';

import { useSearchParams } from 'next/navigation';

import { useEmployees } from '@/app/feature/employees/hooks/useEmployees';
import EmployeePagination from './EmployeePagination';
import TableSkeleton from '@/components/ui/tableSkelleton';
import { EmployeeTable } from './employeeTable';

export default function EmployeeListClient() {
  const searchParams = useSearchParams();

  const params = {
    page: Number(searchParams.get('page') ?? 1),
    keyword: searchParams.get('keyword') ?? '',
    department: searchParams.get('department') ?? '',
    position: searchParams.get('position') ?? '',
  };
  const { data, isLoading, isError } = useEmployees(params);

  const employees = data?.employees ?? [];
  const totalCount = data?.totalCount ?? 0;
  const pageSize = data?.pageSize ?? 10;

  if (isLoading) {
    return <TableSkeleton columns={8} rows={10} />;
  }

  if (isError) {
    return <div>직원 목록을 불러오지 못했습니다.</div>;
  }

  if (!employees || employees.length === 0) {
    return <div>등록된 직원이 없습니다.</div>;
  }

  return (
    <div>
      <EmployeeTable employees={employees} />
      <EmployeePagination currentPage={params.page} totalCount={totalCount} pageSize={pageSize} />
    </div>
  );
}
