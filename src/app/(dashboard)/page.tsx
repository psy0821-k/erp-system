import { Fragment } from 'react';
import TodayAttendanceCard from '../feature/dashboard/components/TodayAttendanceCard';
import { getCurrentEmployee } from '../api/getEmployee';
import MyVacationStatusCard from '../feature/dashboard/components/MyVacationCard';
import MyProjectCard from '../feature/dashboard/components/MyProjectCard';
import NoticeSummaryCard from '../feature/dashboard/components/NoticeSummaryCard';
import QuickActionCard from '../feature/dashboard/components/QuickActionCard';
import TodayVacationCard from '../feature/dashboard/components/TodayVacationCard';

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

      <section className="mt-6 grid gap-4 xl:grid-cols-3">
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
