'use client';

import { useSearchParams } from 'next/navigation';
import { useAssets } from '../hooks/useAssetList';
import EmployeePagination from '../../employees/components/EmployeePagination';
import AssetsTable from './AssetTable';
import TableSkeleton from '@/components/ui/tableSkelleton';

function AssetClientList() {
  const searchParams = useSearchParams();

  const params = {
    page: Number(searchParams.get('page') ?? 1),
    keyword: searchParams.get('keyword') ?? '',
    asset_type: searchParams.get('asset_type') ?? '',
    status: searchParams.get('status') ?? '',
  };

  const { data, isLoading, isError } = useAssets(params);

  const assets = data?.assets ?? [];
  const totalCount = data?.totalCount ?? 0;
  const pageSize = data?.pageSize ?? 10;

  if (isLoading) {
    return <TableSkeleton columns={6} rows={5} />;
  }

  if (isError) {
    return <div>자산 정보를 불러오지 못했습니다.</div>;
  }

  if (!assets || assets.length === 0) {
    return <div>등록된 자산정보가 없습니다.</div>;
  }
  return (
    <>
      <AssetsTable assets={assets} />
      <EmployeePagination currentPage={params.page} totalCount={totalCount} pageSize={pageSize} />
    </>
  );
}

export default AssetClientList;
