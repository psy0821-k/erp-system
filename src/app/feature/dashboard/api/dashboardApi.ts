import { createClient } from '@/lib/client';
import { AdminDashboardCharts } from '../types/dashBoardType';
import { getTodayAttendanceSummary } from './adminAttendance';

const ATTENDANCE_STATUS_OPTIONS = [
  { status: 'PRESENT', label: '출근' },
  { status: 'LATE', label: '지각' },
  { status: 'ABSENT', label: '결근' },
  { status: 'VACATION', label: '휴가' },
  { status: 'BUSINESS_TRIP', label: '출장' },
] as const;

export const getAdminDashboardCharts = async (): Promise<AdminDashboardCharts> => {
  const supabase = createClient();
  const today = getTodayAttendanceSummary();

  const { data: employees, error: employeeError } = await supabase.from('employees').select('department');

  if (employeeError) {
    throw employeeError;
  }

  const { data: attendance, error: attendanceError } = await supabase.from('attendance').select('status').eq('work_date', today);

  if (attendanceError) {
    throw attendanceError;
  }

  const departmentMap = new Map<string, number>();

  employees?.forEach(employee => {
    const department = employee.department ?? '미지정';
    departmentMap.set(department, (departmentMap.get(department) ?? 0) + 1);
  });

  const attendanceMap = new Map<string, number>();

  attendance?.forEach(item => {
    attendanceMap.set(item.status, (attendanceMap.get(item.status) ?? 0) + 1);
  });

  const departmentStats = Array.from(departmentMap.entries()).map(([department, count]) => ({
    department,
    count,
  }));

  const attendanceStats = ATTENDANCE_STATUS_OPTIONS.map(item => ({
    status: item.status,
    label: item.label,
    count: attendanceMap.get(item.status) ?? 0,
  }));

  return {
    departmentStats,
    attendanceStats,
  };
};
