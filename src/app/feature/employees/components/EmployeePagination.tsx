'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type EmployeePaginationProps = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
};

export default function EmployeePagination({ currentPage, totalCount, pageSize }: EmployeePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPage = Math.ceil(totalCount / pageSize);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(page));

    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPage <= 1) return null;

  return (
    <div className="mt-6 flex justify-center gap-2">
      <Button variant="outline" disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)}>
        이전
      </Button>

      {Array.from({ length: totalPage }, (_, index) => {
        const page = index + 1;

        return (
          <Button key={page} variant={page === currentPage ? 'default' : 'outline'} onClick={() => handlePageChange(page)}>
            {page}
          </Button>
        );
      })}

      <Button variant="outline" disabled={currentPage >= totalPage} onClick={() => handlePageChange(currentPage + 1)}>
        다음
      </Button>
    </div>
  );
}
