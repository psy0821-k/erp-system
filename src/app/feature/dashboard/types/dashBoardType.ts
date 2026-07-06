import { DepartmentType } from '@/config/types/department';
import { CalendarPlus, FolderKanban, Laptop, Megaphone } from 'lucide-react';

export interface DepartmentChartItem {
  department: DepartmentType;
  count: number;
}

export interface AttendanceChartItem {
  status: string;
  label: string;
  count: number;
}

export interface AdminDashboardCharts {
  departmentStats: DepartmentChartItem[];
  attendanceStats: AttendanceChartItem[];
}

export const vacationActions = [
  {
    title: '휴가 신청',
    description: '연차 및 휴가를 신청합니다.',
    href: '/employee/vacation/create',
    icon: CalendarPlus,
  },
  {
    title: '프로젝트',
    description: '참여 프로젝트를 확인합니다.',
    href: '/project',
    icon: FolderKanban,
  },
  {
    title: '공지사항',
    description: '최신 공지사항을 확인합니다.',
    href: '/notice',
    icon: Megaphone,
  },
  {
    title: 'IT 자산',
    description: '자산 및 요청 현황을 확인합니다.',
    href: '/asset',
    icon: Laptop,
  },
];
