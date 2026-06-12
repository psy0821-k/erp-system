import type { ReadonlyURLSearchParams } from 'next/navigation';

export const getEmployeeSearchParams = (searchParams: ReadonlyURLSearchParams) => {
  return {
    page: Number(searchParams.get('page') ?? 1),
    keyword: searchParams.get('keyword') ?? '',
    department: searchParams.get('department') ?? '',
  };
};
