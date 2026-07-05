'use client';

import { Clock } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTodayAttendance } from '../../attendance/hooks/useAttendance';
import { AttendanceButtons } from '../../attendance/components/AttendanceButtons';
import LateReasonDialog from '../../attendance/components/LateReasonButton';

interface Props {
  employeeId: string;
}

export default function TodayAttendanceCard({ employeeId }: Props) {
  const { data: attendance, isLoading } = useTodayAttendance(employeeId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-7 w-7 p-1 rounded-full bg-blue-100  text-blue-700" aria-hidden="true" />
          오늘 나의 근태
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 flex justify-center gap-10">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">근태 정보를 불러오는 중입니다.</p>
          ) : (
            <div className="grid grid-cols-2 ">
              <div className="aspect-square flex flex-col justify-center border-r p-8">
                <p className="text-sm text-muted-foreground">출근 시간</p>
                <p className="text-2xl font-bold">{attendance?.check_in}</p>
              </div>

              <div className="aspect-square flex flex-col justify-center border-r p-8">
                <p className="text-sm text-muted-foreground">퇴근 시간</p>
                <p className="text-2xl font-bold">{attendance?.check_out}</p>
              </div>
            </div>
          )}
          <AttendanceButtons employeeId={employeeId} />
        </div>
        <div>{attendance && <LateReasonDialog attendance={attendance} />} </div>
      </CardContent>
    </Card>
  );
}
