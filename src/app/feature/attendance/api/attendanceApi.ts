import { createClient } from '@/lib/client';
import { Attendance, AttendanceListParams } from '../type/attendance';
import { AttendanceStatus } from '@/config/types/attendanceStatus';

const PAGE_SIZE = 10;

export const getAttendanceList = async (params: AttendanceListParams) => {
  const supabase = createClient();

  const page = params.page ?? 1;

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
        employee_number,
        department,
        position
      )
    `,
      { count: 'exact' }
    )
    .order('work_date', { ascending: false });

  if (params.status) {
    query = query.eq('status', params.status);
  }
  if (params.keyword) {
    query = query.or(`employee.name.ilike.%${params.keyword}%`);
  }

  if (params.department) {
    query = query.eq('employee.department', params.department);
  }
  if (params.position) {
    query = query.eq('employee.position', params.position);
  }
  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw error;
  }

  return {
    attendance: data as Attendance[],
    count,
    totalCount: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
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
        employee_number,
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

export type UpdateAttendanceInput = {
  id: string;
  status: AttendanceStatus;
};

export const updateAttendance = async (input: UpdateAttendanceInput) => {
  const supabase = createClient();

  const { id, ...updateData } = input;

  const { data, error } = await supabase.from('attendance').update(updateData).eq('id', id).select().single();

  if (error) {
    throw error;
  }

  return data;
};
