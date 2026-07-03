export const dashboardKeys = {
  all: ['dashboard'] as const,
  todoSummary: () => [...dashboardKeys.all, 'todoSummary'] as const,
  department: () => [...dashboardKeys.all, 'department'] as const,
};
