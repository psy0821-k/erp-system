'use client';

import Link from 'next/link';
import { AlertCircle, ChevronRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/dashboard-card';
import { useDashboardStats } from '../../attendance/hooks/useDashboardStats';

export default function TodayAttendanceIssueCard() {
  const { data, isLoading, isError } = useDashboardStats();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">오늘 근태 이슈</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">근태 정보를 불러오는 중입니다.</p>
        </CardContent>
      </Card>
    );
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">오늘 근태 이슈 ( 총 : {totalEmployee.value} 명 )</CardTitle>

        <AlertCircle className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {attendanceStats.map(stat => (
            <DashboardCard key={stat.title} title={stat.title} value={stat.value} description={stat.description} icon={stat.icon} />
          ))}
        </div>

        <Button asChild variant="outline" className="w-full">
          <Link href="/employee/attendance">
            근태관리 바로가기
            <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
