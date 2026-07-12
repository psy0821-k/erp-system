import { getCurrentEmployee } from '@/app/api/getEmployee';
import NoticeClientPage from '@/app/feature/notice/components/NoticeClientPage';

export default async function NoticeCreatePage() {
  const employee = await getCurrentEmployee();
  return <NoticeClientPage employeeRole={employee?.role} />;
}
