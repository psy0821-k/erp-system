import { createClient } from '@/lib/client';
import { Attendance, AttendanceListParams } from '../type/attendance';

const PAGE_SIZE = 10;

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

export const getAttendanceList = async (params: AttendanceListParams) => {
  const supabase = createClient();

  const page = Number(params.page) || 1;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
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
    `,
      { count: 'exact' }
    )
    .order('work_date', { ascending: false })
    .range(from, to);

  if (params.status) {
    query = query.eq('status', params.status);
  }

  if (params.department) {
    query = query.eq('employee.department', params.department);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    attendance: data as Attendance[],
    count,
  };
};

export const getAttendanceDetail = async (id: string) => {
  const supabase = createClient();

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
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data as Attendance;
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
