import { Search } from 'lucide-react';
import React from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Filtering = () => {
  return (
    <header className="flex justify-between mb-8">
      <div className="relative w-72">
        <label htmlFor="search" className="sr-only">
          검색
        </label>

        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input id="search" type="text" placeholder="검색어를 입력하세요" className="pl-10" />
      </div>
      <div className="flex gap-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="직급 선택" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="STAFF">사원</SelectItem>
              <SelectItem value="MANAGER">과장</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="부서 선택" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="frontend">프론트엔드</SelectItem>
              <SelectItem value="backend">백엔드</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default Filtering;
