import { DepartmentType } from '@/config/types/department';

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
