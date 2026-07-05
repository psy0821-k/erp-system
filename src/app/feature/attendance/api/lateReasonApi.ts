import { createClient } from '@/lib/client';
import { Attendance } from '../type/attendance';

export interface UpdateLateReasonInput {
  id: string;
  late_reason: string;
}

export const updateLateReason = async ({ id, late_reason }: UpdateLateReasonInput) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('attendance')
    .update({
      late_reason,
    })
    .eq('id', id)
    .select('id, late_reason')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getLateUserList = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('attendance')
    .select(
      `
      *,
      employee:employees!attendance_employee_id_fkey!inner (
        id,
        name,
        email,
        employee_number,
        department,
        position
      )
    `
    )
    .eq('status', 'LATE')
    .not('late_reason', 'is', null)
    .eq('late_reason_reviewed', false)
    .order('work_date', { ascending: false });

  if (error) {
    throw error;
  }

  return {
    late_user: data as Attendance[],
  };
};
