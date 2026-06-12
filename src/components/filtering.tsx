'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Filtering = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleDepartmentChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all') {
      params.delete('department');
    } else {
      params.set('department', value);
    }

    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="flex justify-between mb-8">
      <div className="flex gap-4">
        <Select>
          <SelectTrigger className="w-26">
            <SelectValue placeholder="직급 선택" />
          </SelectTrigger>

          <SelectContent position="popper" className="bg-white">
            <SelectGroup>
              <SelectItem className="hover:bg-slate-100" value="STAFF">
                사원
              </SelectItem>
              <SelectItem className="hover:bg-slate-100" value="MANAGER">
                과장
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={searchParams.get('department') ?? 'all'} onValueChange={handleDepartmentChange}>
          <SelectTrigger className="w-30">
            <SelectValue placeholder="부서 선택" />
          </SelectTrigger>

          <SelectContent position="popper" className="bg-white">
            <SelectGroup>
              <SelectItem className="hover:bg-slate-100" value="all">
                전체
              </SelectItem>
              <SelectItem className="hover:bg-slate-100" value="BACKEND">
                백엔드
              </SelectItem>
              <SelectItem className="hover:bg-slate-100" value="FRONTEND">
                프론트엔드
              </SelectItem>
              <SelectItem className="hover:bg-slate-100" value="DESIGN">
                디자이너
              </SelectItem>
              <SelectItem className="hover:bg-slate-100" value="PLANNING">
                기획
              </SelectItem>
              <SelectItem className="hover:bg-slate-100" value="HR">
                인사
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default Filtering;
