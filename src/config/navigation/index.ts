import type { NavigationItem } from './type';

import { employeeNavigation } from './employee-navigation';
import { assetNavigation } from './asset-navigation';

export const dashboardNavigation: NavigationItem[] = [
  {
    title: '대시보드',
    href: '/',
  },
  {
    title: '공지사항',
    href: '/notice',
  },

  {
    title: '인사관리',
    value: 'hr',
    children: employeeNavigation,
  },
  {
    title: '프로젝트',
    href: '/project',
  },

  {
    title: 'IT자산관리',
    value: 'asset',
    children: assetNavigation,
  },
];
