import { createClient } from '@/lib/client';
import { Attendance } from '../type/attendance';

const getToday = () => {
  return new Date().toLocaleDateString('sv-SE');
};

const isLate = () => {
  const now = new Date();

  const lateTime = new Date();
  lateTime.setHours(10, 0, 0, 0);

  return now > lateTime;
};

export const getTodayAttendance = async (employeeId: string) => {
  const supabase = createClient();

  const today = getToday();

  const { data, error } = await supabase.from('attendance').select('*').eq('employee_id', employeeId).eq('work_date', today).maybeSingle();

  if (error) {
    throw error;
  }

  return data as Attendance | null;
};

export const checkIn = async (employeeId: string) => {
  const supabase = createClient();

  const today = getToday();
  const now = new Date().toLocaleTimeString('sv-SE', {
    hour12: false,
  });
  const status = isLate() ? 'LATE' : 'PRESENT';

  const todayAttendance = await getTodayAttendance(employeeId);

  if (todayAttendance) {
    throw new Error('이미 오늘 출근 처리가 완료되었습니다.');
  }

  const { data, error } = await supabase
    .from('attendance')
    .insert({
      employee_id: employeeId,
      work_date: today,
      check_in: now,
      status,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Attendance;
};

export const checkOut = async (attendanceId: string) => {
  const supabase = createClient();

  const nowTime = new Date().toLocaleTimeString('sv-SE', {
    hour12: false,
  });

  const { data, error } = await supabase
    .from('attendance')
    .update({
      check_out: nowTime,
    })
    .eq('id', attendanceId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Attendance;
};
