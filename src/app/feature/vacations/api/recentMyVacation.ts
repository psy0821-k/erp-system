import { createClient } from '@/lib/client';
import { Vacation } from '../type/vacationType';

export const getMyRecentVacation = async (employeeId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('vacations')
    .select('*')
    .eq('employee_id', employeeId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return data as Vacation | null;
};
