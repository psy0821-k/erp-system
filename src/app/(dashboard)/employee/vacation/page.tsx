import { getCurrentEmployee } from '@/app/api/getEmployee';
import AdminVacationListClient from '@/app/feature/vacations/components/AdminVacationListClient';
import MyVacationListClient from '@/app/feature/vacations/components/MyVacationClientTable';
import SummaryVacationCard from '@/app/feature/vacations/components/SummaryVacationCard';
import VacationListClient from '@/app/feature/vacations/components/VacationClientTable';
import Link from 'next/link';
import { Plus, CalendarDays, UserCheck, Clock, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonStyle } from '@/app/style/buttonStyle';
import { cardStyle } from '@/app/style/tableStyle';

const VacationPage = async () => {
  const employee = await getCurrentEmployee();
  if (!employee) return;
  const isAdmin = employee.role === 'ADMIN' && employee.role === 'HR_MANAGER';

  if (employee === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50/50 p-6 dark:bg-slate-950">
        <div className="max-w-sm rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="font-medium text-slate-500 dark:text-slate-400">직원 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 dark:bg-slate-950 sm:p-8">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className={cardStyle.pageHeader}>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">휴가관리</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">직원 휴가 신청 현황과 승인 상태를 통합 관리합니다.</p>
          </div>

          <Link href="/employee/vacation/create" className={cn(buttonStyle.createNew, buttonStyle.base)}>
            <Plus className="h-4 w-4" />
            <span>휴가 신청</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <h2 className="sr-only">휴가 요약 정보</h2>
          <SummaryVacationCard />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_480px]">
          <div className={cn(cardStyle.wrapper, 'flex flex-col')}>
            <div className={cardStyle.sectionHeader}>
              <CalendarDays className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">금일 휴가자</h2>
                <p className="mt-0.5 text-xs text-slate-500  dark:text-slate-500">사내 구성원의 오늘 자 휴가 유형 및 승인 상태입니다.</p>
              </div>
            </div>

            <div className="flex-1 p-5">
              <VacationListClient />
            </div>
          </div>

          <aside className="space-y-6">
            <div className={cardStyle.wrapper}>
              <div className={cardStyle.sectionHeader}>
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">휴가 승인 대기</h2>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">내가 결재 요청한 승인 대기 상태의 휴가입니다.</p>
                </div>
              </div>

              <div className="h-52 overflow-y-auto p-5">
                <MyVacationListClient statuses={['PENDING']} isModalBtn={false} />
              </div>
            </div>

            <div className={cardStyle.wrapper}>
              <div className={cardStyle.sectionHeader}>
                <UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">휴가 승인 결과</h2>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">내가 신청한 휴가의 최종 승인/반려 내역입니다.</p>
                </div>
              </div>

              <div className="h-52 overflow-y-auto p-5">
                <MyVacationListClient statuses={['APPROVED', 'REJECTED']} isModalBtn />
              </div>
            </div>
          </aside>
        </div>

        {isAdmin && (
          <div className={cn(cardStyle.wrapper, 'mt-6')}>
            <div className={cardStyle.sectionHeader}>
              <ShieldAlert className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">휴가 관리 전용 테이블 (Admin)</h3>
                <p className="mt-0.5 text-black dark:text-slate-300">전체 임직원의 결재 대상 문서를 조회하고 승인/반려 처리를 수행합니다.</p>
              </div>
            </div>

            <div className="p-5">
              <AdminVacationListClient employee={employee} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default VacationPage;
