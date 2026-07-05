'use client';

import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DEPARTMENT_TYPE_OPTIONS } from '@/config/types/department';

type DepartmentFilterProps = {
  value: string;
  onChange: (key: string, value: string) => void;
};

function DepartmentFilter({ value, onChange }: DepartmentFilterProps) {
  return (
    <div>
      <Label htmlFor="filtering-department" className="sr-only">
        부서 별 필터링
      </Label>

      <Select value={value} onValueChange={value => onChange('department', value)}>
        <SelectTrigger id="filtering-department" className="w-26">
          <SelectValue placeholder="부서 선택" />
        </SelectTrigger>

        <SelectContent position="popper" className="bg-white">
          <SelectGroup>
            <SelectItem value="all">부서 선택</SelectItem>

            {DEPARTMENT_TYPE_OPTIONS.map(department => (
              <SelectItem key={department.value} value={department.value}>
                {department.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default DepartmentFilter;
