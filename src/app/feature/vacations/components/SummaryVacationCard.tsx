import DashboardCard from '@/components/dashboard/dashboard-card';
import { getVacationSummary } from '../api/vacationServerApi';
import { CalendarCheck, CheckCircle, Clock, XCircle } from 'lucide-react';

const icons = [CalendarCheck, Clock, CheckCircle, XCircle];

export default async function SummaryVacationCard() {
  const summary = await getVacationSummary();

  return (
    <>
      {summary.map((stat, index) => (
        <DashboardCard key={stat.title} title={stat.title} value={stat.value} description={stat.description} icon={icons[index]} />
      ))}
    </>
  );
}
