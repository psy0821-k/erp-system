'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PositionFilter from './PositionFilter';
import DepartmentFilter from './DepartmentFilter';

const EmployeeFiltering = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const position = searchParams.get('position') ?? 'all';
  const department = searchParams.get('department') ?? 'all';

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="w-full lg:w-auto">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <PositionFilter value={position} onChange={handleFilterChange} />
        <DepartmentFilter value={department} onChange={handleFilterChange} />
      </div>
    </header>
  );
};

export default EmployeeFiltering;
