'use client';

import { useTodayAttendance } from '../hooks/useAttendance';
import CheckInButton from './CheckInButton';
import CheckOutButton from './CheckOutButton';

interface Props {
  employeeId: string;
}

export function AttendanceButtons({ employeeId }: Props) {
  const { data: todayAttendance, isLoading } = useTodayAttendance(employeeId);

  if (isLoading) {
    return <p>근태 정보 불러오는 중...</p>;
  }

  return (
    <div>
      {!todayAttendance ? (
        <CheckInButton employeeId={employeeId} />
      ) : !todayAttendance.check_out ? (
        <CheckOutButton attendanceId={todayAttendance.id} employeeId={employeeId} />
      ) : (
        <p>오늘 근무 종료</p>
      )}
    </div>
  );
}
