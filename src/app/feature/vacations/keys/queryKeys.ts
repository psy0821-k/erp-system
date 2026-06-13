import { VacationListParams } from '../type/vacationType';

export const vacationKeys = {
  all: ['vacations'] as const,

  lists: () => [...vacationKeys.all, 'list'] as const,

  list: (params: VacationListParams) => [...vacationKeys.lists(), params] as const,

  detail: (id: string) => [...vacationKeys.all, 'detail', id] as const,
};
