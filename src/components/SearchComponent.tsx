'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useFiltering } from '@/hooks/use-filtering';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function SearchComponent() {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') ?? '');
  const { handleSearch } = useFiltering();

  return (
    <div className="relative w-72">
      <label htmlFor="search" className="sr-only">
        검색
      </label>

      <Search className="absolute top-1/2 -translate-y-2/2 left-3 h-4 w-4  text-muted-foreground" />

      <Input
        id="search"
        type="text"
        placeholder="검색어를 입력하세요"
        className="pl-10"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch(keyword);
          }
        }}
      />
    </div>
  );
}
