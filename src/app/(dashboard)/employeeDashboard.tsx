import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AttendanceButtons } from '../feature/attendance/components/AttendanceButtons';
import { getCurrentEmployee } from '../api/getEmployee';

export default async function EmployeeDashboard() {
  const employee = await getCurrentEmployee();

  if (!employee) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>오늘 내 근태</CardTitle>
        <CardDescription>출근 및 퇴근 상태를 확인합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <AttendanceButtons employeeId={employee.id} />
      </CardContent>
    </Card>
  );
}
