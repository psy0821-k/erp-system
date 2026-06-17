import { createClient } from '@/lib/client';
import { CreateVacationDTO, VacationsResponse } from '../type/vacationType';

const PAGE_SIZE = 10;

export const getAdminVacations = async ({ pageParam = 0 }: { pageParam?: number }): Promise<VacationsResponse> => {
  const supabase = createClient();

  const from = pageParam * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from('vacations')
    .select(
      `
      *,
      employee:employees!vacations_employee_id_fkey (
        id,
        name,
        employee_number,
        email,
        department,
        position
      ),
      approver:employees!vacations_approver_id_fkey (
        id,
        name,
        email,
        department,
        position
      )
    `,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .eq('status', 'PENDING')
    .range(from, to);

  if (error) {
    throw error;
  }

  return {
    vacations: data ?? [],
    nextPage: data && data.length === PAGE_SIZE ? pageParam + 1 : undefined,
    count: count ?? 0,
  };
};
export const createVacation = async (values: CreateVacationDTO) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('vacations')
    .insert({
      ...values,
      status: 'PENDING',
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
