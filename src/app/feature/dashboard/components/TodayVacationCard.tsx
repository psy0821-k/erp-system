'use client';

import Link from 'next/link';
import { CalendarDays, ChevronRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useTodayDashboardVacations } from '../../vacations/hooks/useVacation';
import { VACATION_TYPE_LABEL } from '../../vacations/type/vacationType';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));

export default function TodayVacationCard() {
  const { data: vacations = [], isLoading, isError } = useTodayDashboardVacations();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          금일 휴가자
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">휴가 정보를 불러오는 중입니다.</p>
        ) : isError ? (
          <p className="text-sm text-destructive">휴가 정보를 불러오지 못했습니다.</p>
        ) : vacations.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">오늘 휴가 중인 직원이 없습니다.</p>
        ) : (
          vacations.slice(0, 4).map(vacation => (
            <div key={vacation.id} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">{vacation.employee?.name}</p>

                <p className="text-sm text-muted-foreground">
                  {vacation.employee?.department} | {VACATION_TYPE_LABEL[vacation.vacation_type]}
                </p>
              </div>

              <span className="text-xs text-muted-foreground">{formatDate(vacation.start_date)}</span>
            </div>
          ))
        )}

        <Button variant="outline" className="w-full justify-between" asChild>
          <Link href="/employee/vacation">
            더보기
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
