import { AttendanceListParams } from '../type/attendance';

export const attendanceKeys = {
  all: ['attendance'] as const,

  lists: () => [...attendanceKeys.all, 'list'] as const,
  list: (params: AttendanceListParams) => [...attendanceKeys.lists(), params] as const,
  detail: (id: string) => [...attendanceKeys.all, 'detail', id] as const,

  today: (employeeId: string) => [...attendanceKeys.all, 'today', employeeId] as const,
  todayAll: () => [...attendanceKeys.all, 'todayAll'] as const,

  late: () => [...attendanceKeys.all, 'list'] as const,
};
