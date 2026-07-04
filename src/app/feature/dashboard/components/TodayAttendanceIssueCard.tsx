import Link from 'next/link';
import { AlertCircle, ChevronRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getDashboardStats } from '../../attendance/api/getDashboardStats';
import DashboardCard from '@/components/dashboard/dashboard-card';

export default async function TodayAttendanceIssueCard() {
  const { attendanceStats, totalEmployee } = await getDashboardStats();

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
