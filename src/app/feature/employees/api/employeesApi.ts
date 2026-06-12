import { employeeCreateSchema } from '@/app/feature/sign-up/schema/employeeSchema';
import { createClient } from '@/lib/client';
import { z } from 'zod';
import { UpdateEmployeeInput } from '../types/employeeType';
import { EmployeeListParams } from '../types/searchType';

const PAGE_SIZE = 10;

export const getEmployees = async (params: EmployeeListParams) => {
  const supabase = createClient();

  const page = params.page ?? 1;

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase.from('employees').select('*', { count: 'exact' }).order('employee_number', {
    ascending: false,
  });

  if (params.keyword) {
    query = query.or(`name.ilike.%${params.keyword}%,email.ilike.%${params.keyword}%`);
  }

  if (params.department) {
    query = query.eq('department', params.department);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw error;
  }

  return {
    employees: data ?? [],
    totalCount: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
  };
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
