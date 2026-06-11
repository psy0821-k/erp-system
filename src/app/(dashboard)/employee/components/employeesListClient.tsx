'use client';

import { useEmployees } from '../hooks/useEmployees';
import EmployeeTable from './employeeTable';

export default function EmployeeListClient() {
  const { data: employees, isLoading, isError } = useEmployees();

  if (isLoading) return <div>직원 목록을 불러오는 중입니다...</div>;

  if (isError) return <div>직원 목록을 불러오지 못했습니다.</div>;

  if (!employees || employees.length === 0) {
    return <div>등록된 직원이 없습니다.</div>;
  }

  return <EmployeeTable employees={employees} />;
}
