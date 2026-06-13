import { createClient } from '@/lib/client';
import { CreateVacationDTO, VacationListParams } from '../type/vacationType';

const PAGE_SIZE = 10;

export const getVacations = async (params: VacationListParams) => {
  const supabase = createClient();

  const page = Number(params.page) || 1;

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase.from('vacations').select(
    `
        *,
        employees (
          id,
          name,
          email,
          department,
          position
        )
      `,
    { count: 'exact' }
  );

  if (params.keyword) {
    query = query.or(`name.ilike.%${params.keyword}%,email.ilike.%${params.keyword}%`, { foreignTable: 'employees' });
  }

  if (params.department) {
    query = query.eq('employees.department', params.department);
  }

  if (params.status) {
    query = query.eq('status', params.status);
  }

  const { data, error, count } = await query.order('created_at', { ascending: false }).range(from, to);

  if (error) {
    throw error;
  }

  return {
    vacations: data ?? [],
    totalCount: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
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
