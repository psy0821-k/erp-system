import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-6 sm:px-6 lg:px-8" aria-busy="true" aria-label="대시보드를 불러오는 중">
      <header className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </header>

      <section className="space-y-4">
        <Skeleton className="h-7 w-40" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-56 w-full rounded-xl" />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-56 w-full lg:col-span-2" />
          <Skeleton className="h-56 w-full" />

          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-56 w-full rounded-xl" />
          ))}
        </div>

        <Skeleton className="h-40 w-full rounded-xl" />
      </section>
    </div>
  );
}
