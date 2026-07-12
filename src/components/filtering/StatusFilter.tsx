'use client';

import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ATTENDANCE_STATUS_OPTIONS } from '@/config/types/attendanceStatus';

type StatusFilterProps = {
  value: string;
  onChange: (key: string, value: string) => void;
};

function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div>
      <Label htmlFor="filtering-status" className="sr-only">
        출근 상태 필터링
      </Label>

      <Select value={value} onValueChange={value => onChange('status', value)}>
        <SelectTrigger id="filtering-status" className="w-26">
          <SelectValue placeholder="상태 선택" />
        </SelectTrigger>

        <SelectContent position="popper" className="bg-white">
          <SelectGroup>
            <SelectItem value="all">상태 선택</SelectItem>

            {ATTENDANCE_STATUS_OPTIONS.map(status => (
              <SelectItem key={status.value} value={status.value}>
                {status.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default StatusFilter;
