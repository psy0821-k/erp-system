import { getCurrentEmployee } from '@/app/api/getEmployee';
import NoticeCreatePageView from '@/app/feature/notice/components/NoticeCreatePageView';

export default async function NoticeCreatePage() {
  const employee = await getCurrentEmployee();

  return <NoticeCreatePageView employee={employee} />;
}
