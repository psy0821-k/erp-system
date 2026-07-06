'use client';

import Link from 'next/link';
import { AlertCircle, ChevronRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/dashboard-card';
import { useDashboardStats } from '../../attendance/hooks/useDashboardStats';

function TodayAttendanceIssueSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </CardHeader>

              <CardContent className="space-y-2">
                <Skeleton className="h-7 w-12" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Skeleton className="h-9 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}

export default function TodayAttendanceIssueCard() {
  const { data, isLoading, isError } = useDashboardStats();

  if (isLoading) {
    return <TodayAttendanceIssueSkeleton />;
  }

  if (isError || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">오늘 근태 이슈</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">근태 정보를 불러오지 못했습니다.</p>
        </CardContent>
      </Card>
    );
  }

  const { attendanceStats, totalEmployee } = data;

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold tracking-tight text-foreground">
          오늘 근태 이슈 <span className="text-sm font-normal text-muted-foreground ml-1.5">(총 {totalEmployee.value}명)</span>
        </CardTitle>

        <AlertCircle className="h-5 w-5 text-destructive/90" aria-hidden="true" />
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {attendanceStats.map(stat => (
            <DashboardCard key={stat.title} title={stat.title} value={stat.value} description={stat.description} icon={stat.icon} />
          ))}
        </div>

        <Button asChild variant="outline" className="w-full mt-2 group justify-center">
          <Link href="/employee/attendance" aria-label="근태관리 페이지로 이동">
            <span className="text-sm font-medium">근태관리 바로가기</span>
            <ChevronRight className="ml-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
