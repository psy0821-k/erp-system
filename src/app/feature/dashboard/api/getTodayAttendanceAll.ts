import { createClient } from '@/lib/client';
import { Attendance } from '../../attendance/type/attendance';
import { getToday } from '@/lib/utils';

export type TodayAttendance = Attendance & {
  employee: {
    id: string;
    name: string;
    email: string;
    department: string;
    position: string;
  };
};

export const getTodayAttendanceAll = async () => {
  const supabase = createClient();

  const today = getToday();

  const { data, error } = await supabase
    .from('attendance')
    .select(
      `
        *,
        employee:employees!attendance_employee_id_fkey (
          id,
          name,
          email,
          department,
          position
        )
      `
    )
    .eq('work_date', today)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data as TodayAttendance[];
};
