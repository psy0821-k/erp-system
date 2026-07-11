import Link from 'next/link';
import { Plus } from 'lucide-react';

import { buttonStyle } from '@/app/style/buttonStyle';
import RoleGuard from '@/components/auth/RoleGuard';
import { cn } from '@/lib/utils';

import { getCurrentEmployee } from '../api/employeesApi';

export default async function EmployeeCreateButton() {
  const employee = await getCurrentEmployee();

  return (
    <RoleGuard role={employee.role} permission="EMPLOYEE_MANAGE">
      <Link href="/sign-up" className={cn(buttonStyle.createNew, buttonStyle.base)}>
        <Plus className="h-4 w-4" aria-hidden="true" />
        <span>직원 신규 등록</span>
      </Link>
    </RoleGuard>
  );
}
