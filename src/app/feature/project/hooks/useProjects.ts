import { useQuery } from '@tanstack/react-query';

import { getProjects } from '../api/projectApi';
import { projectKeys } from '../queryKeys/projectKeys';
import { ProjectListParams } from '../types/projectType';

export const useProjects = (params: ProjectListParams) => {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => getProjects(params),
  });
};
