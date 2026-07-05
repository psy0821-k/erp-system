'use client';

import AttendanceTable from './AttendanceTable';
import { useLateUserList } from '../hooks/useAttendance';

export default function LateUserClientList() {
  const { data, isLoading, isError } = useLateUserList();

  const late_users = data?.late_user ?? [];

  if (isLoading) {
    return <div>직원 목록을 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>직원 목록을 불러오지 못했습니다.</div>;
  }

  if (!late_users || late_users.length === 0) {
    return <div>등록된 직원이 없습니다.</div>;
  }

  return (
    <div>
      <AttendanceTable attendances={late_users} />
    </div>
  );
}
