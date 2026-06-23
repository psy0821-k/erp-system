'use client';

import { Label } from '../ui/label';
import { Button } from '../ui/button';

type WorkDateFilterProps = {
  value: string;
  onChange: (key: string, value: string) => void;
};

function WorkDateFilter({ value, onChange }: WorkDateFilterProps) {
  return (
    <div className="flex gap-2">
      <Label htmlFor="filtering-work-date" className="sr-only">
        근태 날짜 필터링
      </Label>

      <input
        id="filtering-work-date"
        type="date"
        value={value}
        onChange={e => onChange('workDate', e.target.value)}
        className="h-9 rounded-md border px-3 text-sm"
      />

      <Button type="button" variant="outline" onClick={() => onChange('workDate', '')}>
        초기화
      </Button>
    </div>
  );
}

export default WorkDateFilter;
