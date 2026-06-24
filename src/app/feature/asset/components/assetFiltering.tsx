'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AssetStatusFilter from './AssetStatusFilter';
import AssetTypeFilter from './AssetTypeFilter';

const AssetFiltering = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const asset_type = searchParams.get('asset_type') ?? 'all';
  const asset_status = searchParams.get('status') ?? 'all';

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
    <div className="flex gap-4">
      <AssetTypeFilter value={asset_type} onChange={handleFilterChange} />
      <AssetStatusFilter value={asset_status} onChange={handleFilterChange} />
    </div>
  );
};

export default AssetFiltering;
