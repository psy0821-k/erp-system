import type { ReactNode } from 'react';

import type { EmployeeRole } from '@/app/feature/sign-up/schema/employeeSchema';
import { hasPermission, type Permission } from '@/config/permissions';

interface RoleGuardProps {
  role: EmployeeRole | null | undefined;
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

export default function RoleGuard({ role, permission, children, fallback = null }: RoleGuardProps) {
  if (!hasPermission(role, permission)) {
    return fallback;
  }

  return children;
}
