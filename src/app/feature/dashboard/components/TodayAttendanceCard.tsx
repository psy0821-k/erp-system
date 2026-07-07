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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
          <Clock className="h-7 w-7 p-1 rounded-full bg-primary/10 text-primary" aria-hidden="true" />
          오늘 나의 근태
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between gap-6">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center py-10">
            <p className="text-sm text-muted-foreground animate-pulse">근태 정보를 불러오는 중입니다...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 divide-x divide-border rounded-lg border border-border bg-card/50">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <p className="text-xs font-medium text-muted-foreground mb-1">출근 시간</p>
              <time
                dateTime={attendance?.check_in ?? undefined}
                aria-label={`출근 시간 ${attendance?.check_in ?? '정보 없음'}`}
                className="text-xl font-bold tracking-tight text-foreground tabular-nums"
              >
                {attendance?.check_in ?? '--:--'}
              </time>{' '}
            </div>

            <div className="flex flex-col items-center justify-center p-6 text-center">
              <p className="text-xs font-medium text-muted-foreground mb-1">퇴근 시간</p>
              <time
                dateTime={attendance?.check_out ?? undefined}
                aria-label={`퇴근 시간 ${attendance?.check_out ?? '정보 없음'}`}
                className="text-xl font-bold tracking-tight text-foreground tabular-nums"
              >
                {attendance?.check_out ?? '--:--'}
              </time>
            </div>
          </div>
        )}

        <div className="space-y-3 mt-auto">
          <AttendanceButtons employeeId={employeeId} />
          {attendance && <LateReasonDialog attendance={attendance} />}
        </div>
      </CardContent>
    </Card>
  );
}
