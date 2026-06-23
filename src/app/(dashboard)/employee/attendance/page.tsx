import DashboardCard from '@/components/dashboard/dashboard-card';
import Filtering from '@/components/filtering/employeeFiltering';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EmployeeDashboard from '../../employeeDashboard';
import { getDashboardStats } from '@/app/feature/attendance/api/getDashboardStats';
import AttendanceClientList from '@/app/feature/attendance/components/AttendanceClientList';
import AttendanceFiltering from '@/components/filtering/attendanceFiltering';
import { SearchComponent } from '@/components/filtering/SearchComponent';
import EmployeeSearch from '@/app/feature/employees/components/EmployeeSearch';

export default async function AttendancePage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <EmployeeDashboard />
      <section className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">근태관리</h1>
        <p className="text-sm text-muted-foreground">직원들의 출근, 지각, 결근, 휴가 현황을 관리합니다.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr] xs:grid-cols-[1fr]">
        <h2 className="sr-only">근태관리 요약</h2>
        {stats.map(stat => (
          <DashboardCard key={stat.title} title={stat.title} value={stat.value} description={stat.description} icon={stat.icon} />
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="sr-only">근태 목록</h2>
            <p className="sr-only">직원별 근태 기록을 조회하고 필터링합니다.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>근태 기록</CardTitle>
            <CardDescription>일자별 출근, 퇴근, 상태 정보를 표시합니다.</CardDescription>
            <div className="flex justify-between mt-8 ">
              <EmployeeSearch />
              <AttendanceFiltering />
            </div>
          </CardHeader>
          <CardContent>
            <AttendanceClientList />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
