import DashboardCard from '@/components/dashboard/dashboard-card';
import EmployeeDashboard from '../../employeeDashboard';
import { getDashboardStats } from '@/app/feature/attendance/api/getDashboardStats';
import AttendanceClientList from '@/app/feature/attendance/components/AttendanceClientList';
import AttendanceFiltering from '@/components/filtering/attendanceFiltering';
import EmployeeSearch from '@/app/feature/employees/components/EmployeeSearch';

export default async function AttendancePage() {
  const stats = await getDashboardStats();

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8">
      <section className="max-w-7xl mx-auto space-y-6">
        <EmployeeDashboard />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-6 mt-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">근태관리</h1>
            <p className="text-sm text-slate-500 mt-1">직원들의 출근, 지각, 결근, 휴가 현황을 일자별로 투명하게 관리합니다.</p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {stats.map(stat => (
            <DashboardCard key={stat.title} title={stat.title} value={stat.value} description={stat.description} icon={stat.icon} />
          ))}
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:max-w-md">
            <EmployeeSearch placeholder="직원 이름을 입력해주세요" />
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            <AttendanceFiltering />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <AttendanceClientList />
        </div>
      </section>
    </div>
  );
}
