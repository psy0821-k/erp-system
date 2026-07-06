'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { attendanceKeys } from '../queryKey/queryKeys';
import { getAttendanceDetail, getAttendanceList, submitLateReason } from '../api/attendanceApi';
import { AttendanceListParams } from '../type/attendance';
import { getTodayAttendance } from '../api/check_in_out';
import { getLateUserList } from '../api/lateReasonApi';
import { toast } from 'sonner';
import { getTodayAttendanceAll } from '../../dashboard/api/getTodayAttendanceAll';

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

export const useLateUserList = () => {
  return useQuery({
    queryKey: attendanceKeys.late_user(),
    queryFn: () => getLateUserList(),
  });
};

export const useSubmitLateReason = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitLateReason,

    onSuccess: () => {
      toast.success('지각 사유가 등록되었습니다.');

      queryClient.invalidateQueries({
        queryKey: attendanceKeys.all,
      });
    },

    onError: () => {
      toast.error('지각 사유 등록에 실패했습니다.');
    },
  });
};
