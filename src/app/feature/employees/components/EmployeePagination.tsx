'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // 미니멀 룩을 위한 화살표 아이콘 추가

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
    <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-slate-100 pt-6">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="h-9 w-9 rounded-xl border-slate-200 text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
        aria-label="이전 페이지"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from({ length: totalPage }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <Button
            key={page}
            variant={isActive ? 'default' : 'outline'}
            onClick={() => handlePageChange(page)}
            className={`h-9 min-w-9 px-2 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
              isActive
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100 border-transparent'
                : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
            }`}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPage}
        onClick={() => handlePageChange(currentPage + 1)}
        className="h-9 w-9 rounded-xl border-slate-200 text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
        aria-label="다음 페이지"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
