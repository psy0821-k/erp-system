import { vacationSummary } from '@/app/mock-data/vacation';
import DashboardCard from '@/components/dashboard/dashboard-card';
import Link from 'next/link';

const VacationPage = () => {
  return (
    <main className="space-y-6">
      <section className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">휴가관리</h1>
          <p className="mt-1 text-sm text-muted-foreground">직원 휴가 신청 현황과 승인 상태를 관리합니다.</p>
        </div>
        <Link
          href={'/employee/vacation/createVacation'}
          className="pl-2 pr-2 rounded-2xl border bg-(--primary) text-white font-bold flex items-center"
        >
          휴가 신청
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {vacationSummary.map(stat => (
          <DashboardCard key={stat.title} title={stat.title} value={stat.value} description={stat.description} icon={stat.icon} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="rounded-xl border bg-background p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">휴가 신청 목록</h2>
              <p className="mt-1 text-sm text-muted-foreground">신청일, 휴가 유형, 승인 상태를 확인합니다.</p>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border bg-background p-5">
            <h2 className="text-lg font-semibold">오늘 휴가자</h2>
            <p className="mt-1 text-sm text-muted-foreground">오늘 휴가를 사용 중인 직원입니다.</p>

            <div className="mt-5 space-y-3"></div>
          </div>

          <div className="rounded-xl border bg-background p-5">
            <h2 className="text-lg font-semibold">나의 휴가</h2>
            <p className="mt-1 text-sm text-muted-foreground">내가 신청한 휴가에 대해 확인합니다</p>

            <div className="mt-5 space-y-3"></div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default VacationPage;
