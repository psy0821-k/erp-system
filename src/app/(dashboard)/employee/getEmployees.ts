import { createClient } from '@/lib/server';

export async function getEmployees(keyword: string, page: number) {
  const supabase = await createClient();

  let query = supabase.from('employees').select('*');

  if (keyword) {
    query = query.ilike('name', `%${keyword}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}
