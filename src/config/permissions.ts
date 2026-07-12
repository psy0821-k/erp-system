import type { EmployeeRole } from '@/app/feature/sign-up/schema/employeeSchema';

export type Permission = 'PROJECT_MANAGE' | 'EMPLOYEE_MANAGE' | 'ATTENDANCE_MANAGE' | 'NOTICE_MANAGE' | 'APPROVAL_MANAGE' | 'ASSET_MANAGE';

interface RoutePermission {
  path: string;
  allowedRoles: readonly EmployeeRole[];
}

export const ROUTE_PERMISSIONS: readonly RoutePermission[] = [
  {
    path: '/project/create',
    allowedRoles: ['TEAM_LEADER', 'ADMIN'],
  },
  {
    path: '/employee',
    allowedRoles: ['HR_MANAGER', 'ADMIN'],
  },
  {
    path: '/employee/attendance',
    allowedRoles: ['HR_MANAGER', 'ADMIN'],
  },
  {
    path: '/notice/create',
    allowedRoles: ['HR_MANAGER', 'ADMIN'],
  },
  {
    path: '/asset/create',
    allowedRoles: ['ASSET_MANAGER', 'ADMIN'],
  },
];

export const ROLE_PERMISSIONS: Record<Permission, readonly EmployeeRole[]> = {
  PROJECT_MANAGE: ['TEAM_LEADER', 'ADMIN'],
  EMPLOYEE_MANAGE: ['HR_MANAGER', 'ADMIN'],
  ATTENDANCE_MANAGE: ['HR_MANAGER', 'ADMIN'],
  NOTICE_MANAGE: ['HR_MANAGER', 'ADMIN'],
  APPROVAL_MANAGE: ['APPROVAL_MANAGER', 'ADMIN'],
  ASSET_MANAGE: ['ASSET_MANAGER', 'ADMIN'],
};

export function hasAllowedRole(role: EmployeeRole | null | undefined, allowedRoles: readonly EmployeeRole[]): boolean {
  if (!role) {
    return false;
  }

  return allowedRoles.includes(role);
}

export function hasPermission(role: EmployeeRole | null | undefined, permission: Permission): boolean {
  return hasAllowedRole(role, ROLE_PERMISSIONS[permission]);
}

export function hasAnyPermission(role: EmployeeRole | null | undefined, permissions: readonly Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

export function isPermissionPathMatch(pathname: string, targetPath: string): boolean {
  if (targetPath === '/employee') {
    return pathname === '/employee' || (pathname.startsWith('/employee/') && !pathname.startsWith('/employee/vacation'));
  }

  return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
}
