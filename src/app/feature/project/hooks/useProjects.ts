import { useQuery } from '@tanstack/react-query';

import { getProjects } from '../api/projectApi';
import { projectKeys } from '../queryKeys/projectKeys';
import { ProjectListParams } from '../types/projectType';
import { getMyProjects } from '../api/myProjectApi';

export const useProjects = (params: ProjectListParams) => {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => getProjects(params),
  });
};

export const useMyProject = (employeeId: string) => {
  return useQuery({
    queryKey: projectKeys.myProject(employeeId),
    queryFn: () => getMyProjects(employeeId),
    enabled: !!employeeId,
  });
};
