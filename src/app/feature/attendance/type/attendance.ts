export type AttendanceStatus = 'PRESENT' | 'LATE' | 'ABSENCE' | 'VACATION' | 'BUSINESS_TRIP';

export interface Attendance {
  id: string;
  employee_id: string;
  work_date: string;
  check_in: string | null;
  check_out: string | null;
  status: AttendanceStatus;
  late_reason: string | null;
  created_at: string;
}

export interface AttendanceListParams {
  page?: number;
  keyword?: string;
  department?: string;
  status?: AttendanceStatus;
}
