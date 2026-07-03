export interface DepartmentChartItem {
  department: string;
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
