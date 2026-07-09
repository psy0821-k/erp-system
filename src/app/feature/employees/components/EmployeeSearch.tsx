'use client';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  placeholder: string;
};

export default function EmployeeSearch({ placeholder }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get('keyword') ?? '');

  const debouncedKeyword = useDebounce(keyword, 250);

  useEffect(() => {
    const currentKeyword = searchParams.get('keyword') ?? '';

    if (debouncedKeyword === currentKeyword) return;

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedKeyword) {
      params.set('keyword', debouncedKeyword);
    } else {
      params.delete('keyword');
    }

    params.set('page', '1');

    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedKeyword, pathname, router, searchParams]);

  return (
    <div className="relative w-full">
      <label htmlFor="employee-search" className="sr-only">
        검색
      </label>

      <Input id="employee-search" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder={placeholder} className="w-full" />
    </div>
  );
}
