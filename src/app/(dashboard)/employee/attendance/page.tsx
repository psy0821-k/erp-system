import AttendanceClientList from '@/app/feature/attendance/components/AttendanceClientList';
import AttendanceFiltering from '@/components/filtering/attendanceFiltering';
import EmployeeSearch from '@/app/feature/employees/components/EmployeeSearch';
import LateUserClientList from '@/app/feature/attendance/components/LateUserClientList';
import TodayAttendanceStatsGrid from '@/app/feature/attendance/components/TodayAttendanceStatsGrid';
import { cardStyle } from '@/app/style/tableStyle';
import { getCurrentEmployee } from '@/app/api/getEmployee';

export default async function AttendancePage() {
  const employee = await getCurrentEmployee();
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 dark:bg-slate-950 sm:p-8">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className={cardStyle.pageHeader}>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">근태관리</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">직원들의 출근, 지각, 결근, 휴가 현황을 일자별로 투명하게 관리합니다.</p>
          </div>
        </div>

        <TodayAttendanceStatsGrid />

        <div className={cardStyle.toolbar}>
          <div className="w-full sm:max-w-md">
            <EmployeeSearch placeholder="직원 이름을 입력해주세요" />
          </div>

          <div className="flex w-full justify-end sm:w-auto">
            <AttendanceFiltering />
          </div>
        </div>

        <div className={cardStyle.wrapper}>
          <AttendanceClientList employeeRole={employee?.role} />
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl space-y-6">
        <div className={cardStyle.pageHeader}>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">지각 사유가 추가된 직원</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">지각 사유가 등록되어 수정 요청한 직원 목록입니다.</p>
          </div>
        </div>

        <div className={cardStyle.wrapper}>
          <LateUserClientList employeeRole={employee?.role} />
        </div>
      </section>
    </div>
  );
}
