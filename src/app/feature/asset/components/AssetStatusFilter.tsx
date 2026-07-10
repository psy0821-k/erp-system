'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ASSET_STATUS_OPTIONS } from '@/config/types/asset';

type AssetStatusFilterProps = {
  value: string;
  onChange: (key: string, value: string) => void;
};

function AssetStatusFilter({ value, onChange }: AssetStatusFilterProps) {
  return (
    <div>
      <Label htmlFor="filtering-asset-status" className="sr-only">
        자산 상태별 필터링
      </Label>

      <Select value={value} onValueChange={value => onChange('status', value)}>
        <SelectTrigger id="filtering-asset-status" className="w-26">
          <SelectValue placeholder="상태 선택" />
        </SelectTrigger>

        <SelectContent position="popper">
          <SelectGroup>
            <SelectItem value="all">상태 선택</SelectItem>

            {ASSET_STATUS_OPTIONS.map(status => (
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

export default AssetStatusFilter;
