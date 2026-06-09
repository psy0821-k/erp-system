import AttendanceCharts from '@/components/dashboard/attendance-chart';
import DashboardCard from '@/components/dashboard/dashboard-card';
import Filtering from '@/components/filtering';
import TableComponent from '@/components/table/tableComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserInfo from '@/components/userCard/userInfo';
import { getDashboardStats } from '../../attendence';

export default async function AttendancePage() {
  const stats = await getDashboardStats();

  return (
    <main className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold">근태관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">직원들의 출근, 지각, 결근, 휴가 현황을 관리합니다.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map(stat => (
          <DashboardCard key={stat.title} title={stat.title} value={stat.value} description={stat.description} icon={stat.icon} />
        ))}
      </section>
      <section className="grid grid-cols-3">
        <AttendanceCharts />
        <UserInfo />
        <UserInfo />
      </section>
      <Filtering />
      <Card>
        <CardHeader>
          <CardTitle>근태 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <TableComponent />
        </CardContent>
      </Card>
    </main>
  );
}
