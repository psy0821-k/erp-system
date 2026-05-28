import { NavigationItem } from './type';

export const approvalNavigation: NavigationItem[] = [
  {
    title: '결재 작성',
    href: '/approval/write',
  },
  {
    title: '승인 대기',
    href: '/approval/pending',
  },
  {
    title: '결재 내역',
    href: '/approval/history',
  },
];
