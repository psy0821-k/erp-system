import { ProjectListParams } from '../types/projectType';

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params: ProjectListParams) => [...projectKeys.lists(), params] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,

  myProject: (employeeId: string) => [...projectKeys.all, 'myProject', employeeId] as const,
};
