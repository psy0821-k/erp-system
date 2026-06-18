import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { departments } from '@/app/mock-data/hr';
import getEmployee from '@/lib/getEmployee';

type Props = {
  params: {
    id: string;
  };
};

export default async function EmployeeDetailPage({ params }: Props) {
  const { id } = await params;
  const employee = getEmployee(id);

  if (!employee) {
    notFound();
  }

  const department = departments.find(department => department.id === employee.departmentId);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold">직원 상세</h1>
        <p className="mt-1 text-sm text-muted-foreground">직원의 기본 정보와 근태 정보를 확인합니다.</p>
      </section>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">{employee.name}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{employee.id}</p>
          </div>

          <Badge variant={employee.status === '재직' ? 'default' : 'secondary'}>{employee.status}</Badge>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InfoItem label="부서" value={employee.department} />
          <InfoItem label="직급" value={employee.position} />
          <InfoItem label="역할" value={employee.role} />
          <InfoItem label="입사일" value={employee.hireDate} />
        </CardContent>
      </Card>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <InfoItem label="이름" value={employee.name} />
            <InfoItem label="이메일" value={employee.email} />
            <InfoItem label="사번" value={employee.id} />
            <InfoItem label="소속 부서" value={employee.department} />
            <InfoItem label="부서장" value={department?.manager ?? '-'} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>근태 요약</CardTitle>
          </CardHeader>

          {/* <CardContent>
            <div className="text-3xl font-bold">{employee.attendanceRate}%</div>
            <p className="mt-1 text-sm text-muted-foreground">이번 달 출근율</p>

            <div className="mt-5 h-2 rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${employee.attendanceRate}%` }} />
            </div>
          </CardContent> */}
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="space-y-4">
            <li>
              <p className="font-medium">직원 정보 조회</p>
              <p className="text-sm text-muted-foreground">인사관리 페이지에서 상세 정보 확인</p>
            </li>
            <li>
              {/* <p className="font-medium">근태 상태 확인</p> */}
              {/* <p className="text-sm text-muted-foreground">출근율 {employee.attendanceRate}% 기록</p> */}
            </li>
            <li>
              <p className="font-medium">소속 조직 확인</p>
              <p className="text-sm text-muted-foreground">{employee.department} 소속</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
