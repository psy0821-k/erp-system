'use client';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EmployeeSearch() {
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
    <div className="relative w-72">
      <label htmlFor="employee-search" className="sr-only">
        직원 검색
      </label>

      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-2/2 text-muted-foreground" />

      <Input id="employee-search" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="직원 이름을 입력하세요" className="pl-10" />
    </div>
  );
}
