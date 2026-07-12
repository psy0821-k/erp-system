import ProjectCreateDialog from '@/app/feature/project/components/ProjectCreateDialog';
import { cardStyle } from '@/app/style/tableStyle';
import { cn } from '@/lib/utils';
import { textStyle } from '@/app/style/textStyle';
import RoleGuard from '@/components/auth/RoleGuard';
import { getCurrentEmployee } from '@/app/api/getEmployee';
import ProjectClientList from '@/app/feature/project/components/ProjectClientList';

export default async function ProjectPage() {
  const employee = await getCurrentEmployee();

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8 dark:bg-[#0b1120]">
      <section className="max-w-7xl mx-auto space-y-6">
        <div className={cardStyle.pageHeader}>
          <div>
            <h2 className={cn('text-3xl font-bold tracking-tight', textStyle.title)}>프로젝트 관리</h2>

            <p className={cn('mt-1 text-sm', textStyle.muted)}>사내 프로젝트 진행 현황과 참여 정보를 한눈에 확인합니다.</p>
          </div>

          <RoleGuard role={employee?.role} permission="PROJECT_MANAGE">
            <ProjectCreateDialog />
          </RoleGuard>
        </div>
        <ProjectClientList employeeRole={employee?.role} />
      </section>
    </div>
  );
}
