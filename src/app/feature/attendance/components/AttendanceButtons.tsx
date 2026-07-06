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
    <div className="flex w-full items-center justify-center">
      {!todayAttendance ? (
        <CheckInButton employeeId={employeeId} />
      ) : !todayAttendance.check_out ? (
        <CheckOutButton attendanceId={todayAttendance.id} employeeId={employeeId} />
      ) : (
        <div className="flex h-10 w-full items-center justify-center rounded-lg bg-muted text-sm font-medium text-muted-foreground">
          <span>오늘 근무가 종료되었습니다</span>
        </div>
      )}
    </div>
  );
}
