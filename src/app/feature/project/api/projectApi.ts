import { createClient } from '@/lib/client';
import { CreateProjectInput, Project, ProjectListParams, UpdateProjectInput } from '../types/projectType';

const PAGE_SIZE = 10;

const projectSelect = `
  *,
  members:project_members (
    id,
    role,
    employee:employees (
      id,
      name,
      email,
      department,
      position
    )
  )
`;

export const getProjects = async (params: ProjectListParams) => {
  const supabase = createClient();

  const page = Number(params.page) || 1;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase.from('projects').select(projectSelect, { count: 'exact' }).order('created_at', { ascending: false });

  if (params.status) {
    query = query.eq('status', params.status);
  }

  if (params.keyword) {
    query = query.or(`project_name.ilike.%${params.keyword}%,description.ilike.%${params.keyword}%`);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw error;
  }

  return {
    projects: data as Project[],
    totalCount: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
  };
};

export const getProject = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('projects').select(projectSelect).eq('id', id).single();

  if (error) {
    throw error;
  }

  return data as Project;
};

export const createProject = async (input: CreateProjectInput) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('projects')
    .insert({
      project_name: input.project_name,
      description: input.description,
      start_date: input.start_date,
      end_date: input.end_date,
      status: input.status,
      github_url: input.github_url || null,
      notion_url: input.notion_url || null,
    })
    .select(projectSelect)
    .single();

  if (error) {
    throw error;
  }

  return data as Project;
};

export const updateProject = async (input: UpdateProjectInput) => {
  const supabase = createClient();

  const { id, ...values } = input;

  const { data, error } = await supabase
    .from('projects')
    .update({
      project_name: values.project_name,
      description: values.description,
      start_date: values.start_date,
      end_date: values.end_date,
      status: values.status,
      github_url: values.github_url || null,
      notion_url: values.notion_url || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(projectSelect)
    .single();

  if (error) {
    throw error;
  }

  return data as Project;
};

export const deleteProject = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return id;
};
