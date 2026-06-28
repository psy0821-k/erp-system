import EmployeeListClient from '../../feature/employees/components/employeesListClient';
import Link from 'next/link';
import EmployeeSearch from '@/app/feature/employees/components/EmployeeSearch';
import EmployeeFiltering from '@/components/filtering/employeeFiltering';
import { Plus } from 'lucide-react';

export default async function Page() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8">
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">직원 관리</h2>
            <p className="text-sm text-slate-500 mt-1">사내 구성원의 정보와 권한을 통합 관리합니다.</p>
          </div>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2.5 text-white font-medium rounded-xl shadow-sm shadow-indigo-100"
          >
            <Plus className="w-4 h-4" />
            <span>직원 신규 등록</span>
          </Link>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="w-full sm:max-w-md">
            <EmployeeSearch placeholder="직원 이름 또는 사번을 입력해주세요" />
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            <EmployeeFiltering />
          </div>
        </div>

        <EmployeeListClient />
      </section>
    </div>
  );
}
