'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const useFiltering = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword') ?? '';
  const page = Number(searchParams.get('page')) || 1;
  const status = searchParams.get('status') ?? '';

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  return {
    keyword,
    page,
    status,
    setPage: (page: number) => updateQuery('page', String(page)),
    setStatus: (status: string) => updateQuery('status', status),
    handleSearch: (keyword: string) => {
      updateQuery('keyword', keyword);
      updateQuery('page', '1');
    },
  };
};
