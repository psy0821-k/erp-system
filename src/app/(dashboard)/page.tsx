import { getCurrentEmployee } from '../api/getEmployee';
import AdminTodoCard from '../feature/dashboard/components/AdminTodoCard';
import DashboardDepartmentChart from '../feature/dashboard/components/DashboardDepartmentChart';
import MyProjectCard from '../feature/dashboard/components/MyProjectCard';
import MyVacationStatusCard from '../feature/dashboard/components/MyVacationCard';
import NoticeSummaryCard from '../feature/dashboard/components/NoticeSummaryCard';
import QuickActionCard from '../feature/dashboard/components/QuickActionCard';
import TodayAttendanceCard from '../feature/dashboard/components/TodayAttendanceCard';
import TodayAttendanceIssueCard from '../feature/dashboard/components/TodayAttendanceIssueCard';
import TodayVacationCard from '../feature/dashboard/components/TodayVacationCard';

export default async function DashboardPage() {
  const employee = await getCurrentEmployee();

  if (!employee) {
    return null;
  }

  const isAdmin = employee.role === 'ADMIN';

  return (
    <div className="container mx-auto space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">안녕하세요, {employee.name}님</h1>

        <p className="text-sm text-muted-foreground sm:text-base">오늘의 근무 상태와 주요 일정을 확인해보세요.</p>
      </header>

      {isAdmin && (
        <section aria-labelledby="admin-dashboard-title" className="space-y-4">
          <h2 id="admin-dashboard-title" className="text-xl font-semibold tracking-tight">
            관리자 현황 요약
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AdminTodoCard />

            <DashboardDepartmentChart />

            <div className="sm:col-span-2 lg:col-span-1">
              <TodayAttendanceIssueCard />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="user-dashboard-title" className="space-y-4">
        <h2 id="user-dashboard-title" className="sr-only">
          개인 대시보드 요약
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TodayAttendanceCard employeeId={employee.id} />
          </div>

          <TodayVacationCard />

          <MyVacationStatusCard employeeId={employee.id} />

          <MyProjectCard employeeId={employee.id} />

          <NoticeSummaryCard />
        </div>

        <QuickActionCard />
      </section>
    </div>
  );
}
