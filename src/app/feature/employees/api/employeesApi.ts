import { employeeCreateSchema } from '@/app/feature/sign-up/schema/employeeSchema';
import { createClient } from '@/lib/client';
import { z } from 'zod';
import { UpdateEmployeeInput } from '../types/employeeType';

export const getEmployees = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from('employees').select('*').order('employee_number', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const createEmployee = async (values: z.infer<typeof employeeCreateSchema>) => {
  const response = await fetch('/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message ?? '직원 등록에 실패했습니다.');
  }

  return result.data;
};

export const updateEmployee = async (input: UpdateEmployeeInput) => {
  const supabase = createClient();

  const { id, ...updateData } = input;

  const { data, error } = await supabase.from('employees').update(updateData).eq('id', id).select().single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteEmployee = async (id: string) => {
  const response = await fetch(`/api/employees/${id}`, {
    method: 'DELETE',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};
