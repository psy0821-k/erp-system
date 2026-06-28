import { createClient } from '@/lib/client';
import { CreateProjectMemberInput } from '../types/projectType';

export const createProjectMember = async (input: CreateProjectMemberInput) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('project_members')
    .insert({
      project_id: input.project_id,
      employee_id: input.employee_id,
      role: input.role,
    })
    .select(
      `
      id,
      role,
      employee:employees (
        id,
        name,
        email,
        department,
        position
      )
    `
    )
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteProjectMember = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from('project_members').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return id;
};
