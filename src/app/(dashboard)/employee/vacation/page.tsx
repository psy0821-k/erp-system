import { getCurrentEmployee } from '@/app/api/getEmployee';
import AdminVacationListClient from '@/app/feature/vacations/components/AdminVacationListClient';
import MyVacationListClient from '@/app/feature/vacations/components/MyVacationClientTable';
import SummaryVacationCard from '@/app/feature/vacations/components/SummaryVacationCard';
import VacationListClient from '@/app/feature/vacations/components/VacationClientTable';
import Link from 'next/link';
import { Plus, CalendarDays, UserCheck, Clock, ShieldAlert } from 'lucide-react';

const VacationPage = async () => {
  const employee = await getCurrentEmployee();
  const isAdmin = true;

  if (employee === null) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm text-center max-w-sm">
          <p className="text-slate-500 font-medium">직원 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8">
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">휴가관리</h2>
            <p className="text-sm text-slate-500 mt-1">직원 휴가 신청 현황과 승인 상태를 통합 관리합니다.</p>
          </div>
          <Link
            href={'/employee/vacation/create'}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2.5 text-white font-medium rounded-xl shadow-sm shadow-indigo-100"
          >
            <Plus className="w-4 h-4" />
            <span>휴가 신청</span>
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <h2 className="sr-only">휴가 요약 정보</h2>
          <SummaryVacationCard />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_480px]">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-indigo-600" />
              <div>
                <h2 className="text-base font-bold text-slate-800">금일 휴가자</h2>
                <p className="text-xs text-slate-400 mt-0.5">사내 구성원의 오늘 자 휴가 유형 및 승인 상태입니다.</p>
              </div>
            </div>
            <div className="p-5 flex-1">
              <VacationListClient />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <div>
                  <h2 className="text-base font-bold text-slate-800">휴가 승인 대기</h2>
                  <p className="text-xs text-slate-400 mt-0.5">내가 결재 요청한 승인 대기 상태의 휴가입니다.</p>
                </div>
              </div>
              <div className="p-5 h-52 overflow-y-auto">
                <MyVacationListClient statuses={['PENDING']} isModalBtn={false} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-emerald-500" />
                <div>
                  <h2 className="text-base font-bold text-slate-800">휴가 승인 결과</h2>
                  <p className="text-xs text-slate-400 mt-0.5">내가 신청한 휴가의 최종 승인/반려 내역입니다.</p>
                </div>
              </div>
              <div className="p-5 h-52 overflow-y-auto">
                <MyVacationListClient statuses={['APPROVED', 'REJECTED']} isModalBtn={true} />
              </div>
            </div>
          </aside>
        </div>

        {isAdmin && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mt-6">
            <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-rose-500" />
              <div>
                <h3 className="text-base font-bold text-slate-800">휴가 관리 전용 테이블 (Admin)</h3>
                <p className="text-xs text-slate-400 mt-0.5">전체 임직원의 결재 대상 문서를 조회하고 승인/반려 처리를 수행합니다.</p>
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
