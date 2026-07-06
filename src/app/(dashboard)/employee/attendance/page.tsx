import AttendanceClientList from '@/app/feature/attendance/components/AttendanceClientList';
import AttendanceFiltering from '@/components/filtering/attendanceFiltering';
import EmployeeSearch from '@/app/feature/employees/components/EmployeeSearch';
import LateUserClientList from '@/app/feature/attendance/components/LateUserClientList';
import TodayAttendanceStatsGrid from '@/app/feature/attendance/components/TodayAttendanceStatsGrid';

export default function AttendancePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8">
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-6 mt-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">근태관리</h1>
            <p className="text-sm text-slate-500 mt-1">직원들의 출근, 지각, 결근, 휴가 현황을 일자별로 투명하게 관리합니다.</p>
          </div>
        </div>

        <TodayAttendanceStatsGrid />

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
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-6 mt-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">지각 사유가 추가된 직원</h1>
            <p className="text-sm text-slate-500 mt-1">지각 사유가 등록되어 수정 요청한 테이블 입니다.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <LateUserClientList />
        </div>
      </section>
    </div>
  );
}
