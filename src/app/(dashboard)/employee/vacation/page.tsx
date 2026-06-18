import { getCurrentEmployee } from '@/app/api/getEmployee';
import AdminVacationListClient from '@/app/feature/vacations/components/AdminVacationListClient';
import MyVacationListClient from '@/app/feature/vacations/components/MyVacationClientTable';
import SummaryVacationCard from '@/app/feature/vacations/components/SummaryVacationCard';
import VacationListClient from '@/app/feature/vacations/components/VacationClientTable';
import Link from 'next/link';

const VacationPage = async () => {
  const employee = await getCurrentEmployee();
  const isAdmin = true;
  if (employee === null) {
    return <div>직원 정보를 불러올 수 없습니다.</div>;
  }
  return (
    <div className="space-y-6">
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
        <h2 className="hidden">휴가 요약 카드</h2>
        <SummaryVacationCard />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_480px]">
        <div className="rounded-xl border bg-background p-5">
          <h2 className="text-lg font-semibold">금일 휴가자</h2>
          <p className="mt-1 text-sm text-muted-foreground">신청일, 휴가 유형, 승인 상태를 확인합니다.</p>
          <VacationListClient />
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border bg-background p-5">
            <h2 className="text-lg font-semibold">휴가 승인 대기</h2>
            <p className="mt-1 text-sm text-muted-foreground">내가 신청한 휴가 정보</p>

            <div className="mt-5 space-y-3 h-50">
              <MyVacationListClient statuses={['PENDING']} isModalBtn={false} />
            </div>
          </div>

          <div className="rounded-xl border bg-background p-5">
            <h2 className="text-lg font-semibold">휴가 승인 결과</h2>
            <p className="mt-1 text-sm text-muted-foreground">내가 신청한 휴가 승인 결과</p>

            <div className="mt-5 space-y-3 h-50">
              <MyVacationListClient statuses={['APPROVED', 'REJECTED']} isModalBtn={true} />
            </div>
          </div>
        </aside>
      </section>
      {isAdmin && (
        <section>
          <h2 className="hidden">관리자용 휴가승인 테이블</h2>
          <div className="rounded-xl border bg-background p-5">
            <h2 className="text-lg font-semibold">휴가 관리 테이블</h2>
            <p className="mt-1 text-sm text-muted-foreground">신청일, 휴가 유형, 승인 상태를 확인합니다.</p>
            <AdminVacationListClient employee={employee} />
          </div>
        </section>
      )}
    </div>
  );
};

export default VacationPage;
