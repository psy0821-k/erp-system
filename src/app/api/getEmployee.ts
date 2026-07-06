import { createClient } from '@/lib/server';

export const getCurrentEmployee = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data: employee, error } = await supabase.from('employees').select('id, name, email,role').eq('id', user.id).single();
  if (error) return null;

  return employee;
};

export const getAllCurrentEmployee = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data: employee, error } = await supabase
    .from('employees')
    .select('id, name, employee_number, department, position, role, status')
    .order('employee_number', { ascending: false });
  if (error) return null;

  return employee;
};
