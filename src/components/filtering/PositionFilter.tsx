'use client';

import { POSITION_OPTIONS } from '@/config/types/position';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type PositionFilterProps = {
  value: string;
  onChange: (key: string, value: string) => void;
};

function PositionFilter({ value, onChange }: PositionFilterProps) {
  return (
    <div>
      <Label htmlFor="filtering-position" className="sr-only">
        직급 필터링
      </Label>

      <Select value={value} onValueChange={value => onChange('position', value)}>
        <SelectTrigger id="filtering-position" className="w-26">
          <SelectValue placeholder="직급 선택" />
        </SelectTrigger>

        <SelectContent position="popper" className="bg-white">
          <SelectGroup>
            <SelectItem value="all">직급 선택</SelectItem>

            {POSITION_OPTIONS.map(position => (
              <SelectItem key={position.value} value={position.value}>
                {position.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default PositionFilter;
