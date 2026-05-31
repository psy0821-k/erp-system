import { attendanceSummary } from '@/app/mock-data/hr';
import AttendanceCharts from '@/components/dashboard/attendance-chart';
import Filtering from '@/components/filtering';
import TableComponent from '@/components/table/tableComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserInfo from '@/components/userCard/userInfo';

export default function AttendancePage() {
  return (
    <main className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold">근태관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">직원들의 출근, 지각, 결근, 휴가 현황을 관리합니다.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {attendanceSummary.map(item => (
          <Card key={item.label}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{item.count}명</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-3">
        <AttendanceCharts />
        <UserInfo />
        <UserInfo />
      </section>
      <Filtering />
      <Card>
        <CardHeader>
          <CardTitle>근태 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <TableComponent />
        </CardContent>
      </Card>
    </main>
  );
}
