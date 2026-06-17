import type { NavigationItem } from './type';

export const employeeNavigation: NavigationItem[] = [
  {
    title: '직원 목록',
    href: '/employee',
  },
  {
    title: '근태 관리',
    href: '/employee/attendance',
  },
  {
    title: '휴가 관리',
    href: '/employee/vacation',
  },
];
