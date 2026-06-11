import { createClient } from '@/lib/client';
import { z } from 'zod';
import { formSchema } from '@/app/(auth)/sign-up/sign-up-schema';

export const getEmployees = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from('employees').select('*').order('employee_number', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const createEmployee = async (values: z.infer<typeof formSchema>) => {
  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });

  if (authError) {
    throw authError;
  }

  if (!authData.user) {
    throw new Error('회원가입 정보를 확인할 수 없습니다.');
  }

  const { data, error } = await supabase
    .from('employees')
    .insert({
      id: authData.user.id,
      name: values.name,
      email: values.email,
      department: values.department,
      position: values.position,
      employee_number: values.employee_number,
      role: values.role,
      status: 'ACTIVE',
      hire_date: values.hire_date,
      authority_level: 0,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
