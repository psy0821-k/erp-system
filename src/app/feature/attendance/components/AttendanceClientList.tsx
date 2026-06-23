'use client';

import { useSearchParams } from 'next/navigation';

import EmployeePagination from '../../employees/components/EmployeePagination';
import AttendanceTable from './AttendanceTable';
import { useAttendanceList } from '../hooks/useAttendance';
import { AttendanceStatus } from '@/config/types/attendanceStatus';

export default function AttendanceClientList() {
  const searchParams = useSearchParams();
  const rawStatus = searchParams.get('status');

  const params = {
    page: Number(searchParams.get('page') ?? 1),
    keyword: searchParams.get('keyword') ?? '',
    department: searchParams.get('department') ?? '',
    position: searchParams.get('position') ?? '',
    status: rawStatus ? (rawStatus as AttendanceStatus) : undefined,
  };
  const { data, isLoading, isError } = useAttendanceList(params);

  const attendances = data?.attendance ?? [];
  const totalCount = data?.totalCount ?? 0;
  const pageSize = data?.pageSize ?? 10;

  if (isLoading) {
    return <div>직원 목록을 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>직원 목록을 불러오지 못했습니다.</div>;
  }

  if (!attendances || attendances.length === 0) {
    return <div>등록된 직원이 없습니다.</div>;
  }

  return (
    <div>
      <AttendanceTable attendances={attendances} />
      <EmployeePagination currentPage={params.page} totalCount={totalCount} pageSize={pageSize} />
    </div>
  );
}
