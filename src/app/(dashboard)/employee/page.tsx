import EmployeeListClient from '../../feature/employees/components/employeesListClient';
import Link from 'next/link';
import EmployeeSearch from '@/app/feature/employees/components/EmployeeSearch';
import EmployeeFiltering from '@/components/filtering/employeeFiltering';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonStyle } from '@/app/style/buttonStyle';
import { filterStyle } from '@/app/style/tableStyle';
import RoleGuard from '@/components/auth/RoleGuard';
import { getCurrentEmployee } from '@/app/api/getEmployee';

export default async function Page() {
  const employee = await getCurrentEmployee();
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8 dark:bg-slate-950">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">직원 관리</h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">사내 구성원의 정보와 권한을 통합 관리합니다.</p>
          </div>

          <RoleGuard role={employee?.role} permission="EMPLOYEE_MANAGE">
            <Link href="/sign-up" className={cn(buttonStyle.createNew, buttonStyle.base)}>
              <Plus className="h-4 w-4" />
              <span>직원 신규 등록</span>
            </Link>
          </RoleGuard>
        </div>

        <div className={filterStyle.wrapper}>
          <div className={filterStyle.area}>
            <div className="w-full lg:max-w-md">
              <EmployeeSearch placeholder="직원 이름 또는 사번을 입력해주세요" />
            </div>

            <EmployeeFiltering />
          </div>
        </div>

        <EmployeeListClient />
      </section>
    </div>
  );
}
