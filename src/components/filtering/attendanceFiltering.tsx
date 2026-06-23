'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PositionFilter from './PositionFilter';
import DepartmentFilter from './DepartmentFilter';
import StatusFilter from './StatusFilter';

const AttendanceFiltering = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const position = searchParams.get('position') ?? 'all';
  const department = searchParams.get('department') ?? 'all';
  const status = searchParams.get('status') ?? 'all';

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
    <header className="flex justify-between mb-8">
      <div className="flex gap-4">
        <PositionFilter value={position} onChange={handleFilterChange} />
        <DepartmentFilter value={department} onChange={handleFilterChange} />
        <StatusFilter value={status} onChange={handleFilterChange} />
      </div>
    </header>
  );
};

export default AttendanceFiltering;
