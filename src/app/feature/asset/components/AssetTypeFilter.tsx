'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ASSET_TYPE_OPTIONS } from '@/config/types/asset';

type AssetTypeFilterProps = {
  value: string;
  onChange: (key: string, value: string) => void;
};

function AssetTypeFilter({ value, onChange }: AssetTypeFilterProps) {
  return (
    <div>
      <Label htmlFor="filtering-asset-type" className="sr-only">
        자산 종류별 필터링
      </Label>

      <Select value={value} onValueChange={value => onChange('asset_type', value)}>
        <SelectTrigger id="filtering-asset-type" className="w-30">
          <SelectValue placeholder="자산 종류" />
        </SelectTrigger>

        <SelectContent position="popper" className="bg-white">
          <SelectGroup>
            <SelectItem value="all">물품 선택</SelectItem>

            {ASSET_TYPE_OPTIONS.map(assetType => (
              <SelectItem key={assetType.value} value={assetType.value}>
                {assetType.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default AssetTypeFilter;
