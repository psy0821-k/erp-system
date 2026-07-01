import { createClient } from '@/lib/client';

export const getMyProjects = async (employeeId: string) => {
  const supabase = createClient();

  const { data: memberRows, error: memberError } = await supabase.from('project_members').select('project_id').eq('employee_id', employeeId);

  if (memberError) throw memberError;

  const projectIds = memberRows?.map(row => row.project_id) ?? [];

  if (projectIds.length === 0) {
    return [];
  }

  const { data: projects, error: projectError } = await supabase
    .from('projects')
    .select(
      `
      id,
      project_name,
      start_date,
      end_date,
      status,
      project_members (
        id
      )
    `
    )
    .in('id', projectIds)
    .order('created_at', { ascending: false });

  if (projectError) throw projectError;

  return projects ?? [];
};
