import type { NavigationItem } from './type';

import { employeeNavigation } from './employee-navigation';
import { systemNavigation } from './system-navigation';
import { approvalNavigation } from './approval-navigation';
import { assetNavigation } from './asset-navigation';
import { projectNavigation } from './project-navigation';

export const dashboardNavigation: NavigationItem[] = [
  {
    title: '대시보드',
    href: '/',
  },

  {
    title: '인사관리',
    value: 'hr',
    children: employeeNavigation,
  },
  {
    title: '프로젝트',
    value: 'project',
    children: projectNavigation,
  },

  {
    title: 'IT자산관리',
    value: 'asset',
    children: assetNavigation,
  },

  {
    title: '시스템관리',
    value: 'system',
    children: systemNavigation,
  },
];
