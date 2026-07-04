import { Fragment } from 'react';
import TodayAttendanceCard from '../feature/dashboard/components/TodayAttendanceCard';
import { getCurrentEmployee } from '../api/getEmployee';
import MyVacationStatusCard from '../feature/dashboard/components/MyVacationCard';
import MyProjectCard from '../feature/dashboard/components/MyProjectCard';
import NoticeSummaryCard from '../feature/dashboard/components/NoticeSummaryCard';
import QuickActionCard from '../feature/dashboard/components/QuickActionCard';
import TodayVacationCard from '../feature/dashboard/components/TodayVacationCard';
import AdminTodoCard from '../feature/dashboard/components/AdminTodoCard';
import TodayAttendanceIssueCard from '../feature/dashboard/components/TodayAttendanceIssueCard';
import DepartmentChartCard from '../feature/dashboard/components/ChartDepartment';

export default async function DashboardPage() {
  const employee = await getCurrentEmployee();

  if (!employee) {
    return null;
  }

  return (
    <Fragment>
      <section className="space-y-1">
        <h1 className="text-2xl font-bold">안녕하세요, {employee.name}님</h1>
        <p className="text-sm text-muted-foreground">오늘의 근무 상태를 확인해보세요.</p>
      </section>
      <section>
        <h2>관리자 전용 대시보드</h2>
        <section aria-labelledby="admin-dashboard-title" className="space-y-4">
          <h2 id="admin-dashboard-title" className="sr-only">
            관리자 대시보드 요약
          </h2>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AdminTodoCard />
            <DepartmentChartCard />
            <TodayAttendanceIssueCard />
          </div>
        </section>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-3">
        <h2 className="sr-only">공통 대시보드</h2>
        <TodayAttendanceCard employeeId={employee.id} />
        <MyVacationStatusCard employeeId={employee.id} />
        <MyProjectCard employeeId={employee.id} />
        <NoticeSummaryCard />
        <TodayVacationCard />
        <QuickActionCard />
      </section>
    </Fragment>
  );
}
