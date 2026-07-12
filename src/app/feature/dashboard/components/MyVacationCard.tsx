'use client';

import Link from 'next/link';
import { CalendarDays, FileText, ChevronRight, Inbox } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui 스켈레톤 추가

import { VACATION_TYPE_LABEL } from '../../vacations/type/vacationType';
import { APPROVAL_STATUS_LABEL } from '@/config/types/approvalStatus';
import { useMyVacation } from '../hooks/useMyVacation';
import StatusBadge from '@/components/ui/statusBadge';
import { APPROVAL_BADGE_MAP } from '@/components/badge';

interface Props {
  employeeId: string;
}

const formatDate = (date?: string | null) => {
  if (!date) return '-';
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return '-';

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(parsedDate);
};

export default function MyVacationStatusCard({ employeeId }: Props) {
  const { data: recentVacation, isLoading } = useMyVacation(employeeId);

  return (
    <Card className="overflow-hidden border bg-card shadow-sm transition-all hover:shadow-md">
      <CardHeader className="border-b bg-muted/20 pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
          </div>
          나의 최근 휴가 신청
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-5 space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
            <Skeleton className="h-16 w-full rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        ) : recentVacation ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-lg text-foreground tracking-tight">{VACATION_TYPE_LABEL[recentVacation.vacation_type]}</p>
                <p className="mt-1 text-sm text-muted-foreground font-medium tabular-nums">
                  {formatDate(recentVacation.start_date)} ~ {formatDate(recentVacation.end_date)}
                </p>
              </div>

              <StatusBadge label={APPROVAL_STATUS_LABEL[recentVacation.status]} variant={APPROVAL_BADGE_MAP[recentVacation.status]} />
            </div>

            <div className="rounded-r-md border border-l-2 border-l-indigo-500 bg-muted/40 p-3.5 transition-colors hover:bg-muted/60">
              <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                <FileText className="h-3.5 w-3.5 text-muted-foreground/70" />
                신청 사유
              </p>
              <p className="line-clamp-2 text-sm text-foreground/90 leading-relaxed pl-5">{recentVacation.reason || '작성된 사유가 없습니다.'}</p>
            </div>

            <Button variant="outline" size="sm" className="w-full h-9 font-medium text-muted-foreground hover:text-foreground group" asChild>
              <Link href="/employee/vacation">
                <span>
                  <span className="sr-only">휴가 정보</span> 자세히 보기
                </span>
                <ChevronRight className="h-4 w-4 ml-0.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </>
        ) : (
          <div className="flex min-h-40 flex-col items-center justify-center p-4 text-center">
            <div className="p-3 bg-muted/50 rounded-full text-muted-foreground/60 mb-3">
              <Inbox className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-4">최근 신청한 휴가가 없습니다.</p>

            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 shadow-sm" asChild>
              <Link href="/employee/vacation">휴가 신청하기</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
