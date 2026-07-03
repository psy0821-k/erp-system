import { AttendanceStatus } from '@/config/types/attendanceStatus';

export interface Attendance {
  id: string;
  employee_id: string;
  work_date: string;
  check_in: string | null;
  check_out: string | null;
  status: AttendanceStatus;
  late_reason: string | null;
  created_at: string;
  late_reason_reviewed: boolean;

  employee?: {
    id: string;
    name: string;
    employee_number: string;
    email: string;
    department: string;
    position: string;
  };
}

export interface AttendanceListParams {
  page?: number;
  keyword?: string;
  department?: string;
  position?: string;
  status?: AttendanceStatus;
  workDate?: string;
}
