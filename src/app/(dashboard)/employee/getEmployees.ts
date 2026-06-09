import { createClient } from '@/lib/server';

export async function getEmployees(keyword: string, page: number) {
  const supabase = await createClient();

  let query = supabase.from('employees').select('*');

  if (keyword) {
    query = query.or(`name.ilike.%${keyword}%, employee_number.ilike.%${keyword}%, department.ilike.%${keyword}%, position.ilike.%${keyword}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}
