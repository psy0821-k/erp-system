'use client';

import { useQuery } from '@tanstack/react-query';
import { attendanceKeys } from '../queryKey/queryKeys';
import { getAttendanceDetail, getAttendanceList } from '../api/attendanceApi';
import { AttendanceListParams } from '../type/attendance';
import { getTodayAttendance } from '../api/check_in_out';
import { getTodayAttendanceAll } from '../api/getDashboardStats';

export const useTodayAttendance = (employeeId: string) => {
  return useQuery({
    queryKey: attendanceKeys.today(employeeId),
    queryFn: () => getTodayAttendance(employeeId),
    enabled: !!employeeId,
  });
};

export const useAttendanceList = (params: AttendanceListParams) => {
  return useQuery({
    queryKey: attendanceKeys.list(params),
    queryFn: () => getAttendanceList(params),
  });
};

export const useAttendanceDetail = (id: string) => {
  return useQuery({
    queryKey: attendanceKeys.detail(id),
    queryFn: () => getAttendanceDetail(id),
    enabled: !!id,
  });
};

export const useTodayAttendanceAll = () => {
  return useQuery({
    queryKey: attendanceKeys.todayAll(),
    queryFn: () => getTodayAttendanceAll(),
  });
};
