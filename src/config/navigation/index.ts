import type { NavigationItem } from './type';

import { employeeNavigation } from './employee-navigation';
import { inventoryNavigation } from './inventory-navigation';
import { systemNavigation } from './system-navigation';
import { paymentNavigation } from './payment-navigation';

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
    title: '물류관리',
    value: 'logistics',
    children: inventoryNavigation,
  },

  {
    title: '전자결재',
    value: 'payment',
    children: paymentNavigation,
  },

  {
    title: '시스템관리',
    value: 'system',
    children: systemNavigation,
  },
];
