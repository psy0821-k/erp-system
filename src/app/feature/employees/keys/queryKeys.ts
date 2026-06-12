export const employeeKeys = {
  all: ['employees'] as const,
  lists: () => [...employeeKeys.all, 'list'] as const,
  list: () => [...employeeKeys.lists()] as const,

  detail: (id: string) => [...employeeKeys.all, 'detail', id] as const,
};
