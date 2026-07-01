import { ApprovalStatus } from '../type/vacationType';

export const vacationKeys = {
  all: ['vacations'] as const,
  lists: () => [...vacationKeys.all, 'list'] as const,
  list: (status: ApprovalStatus[]) => [...vacationKeys.lists(), status] as const,
  detail: (id: string) => [...vacationKeys.all, 'detail', id] as const,

  myRecent: (employeeId: string) => [...vacationKeys.all, 'myRecent', employeeId] as const,

  today: () => [...vacationKeys.all, 'today'] as const,
};
