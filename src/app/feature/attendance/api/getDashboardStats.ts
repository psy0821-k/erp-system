import { createClient } from '@/lib/client';
import { getToday } from '@/lib/utils';
import { CalendarDays, Clock, Truck, Users, UserX } from 'lucide-react';

export const getDashboardStats = async () => {
  const supabase = createClient();

  const today = getToday();

  const { count: totalEmployees, error: totalEmployeesError } = await supabase.from('employees').select('*', { count: 'exact', head: true });

  const { count: presentEmployees, error: presentError } = await supabase
    .from('attendance')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PRESENT')
    .eq('work_date', today);

  const { count: lateEmployees, error: lateError } = await supabase
    .from('attendance')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'LATE')
    .eq('work_date', today);

  const { count: absentEmployees, error: absentError } = await supabase
    .from('attendance')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'ABSENT')
    .eq('work_date', today);

  const { count: vacationEmployees, error: vacationError } = await supabase
    .from('attendance')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'VACATION')
    .eq('work_date', today);

  if (totalEmployeesError) throw totalEmployeesError;
  if (presentError) throw presentError;
  if (lateError) throw lateError;
  if (absentError) throw absentError;
  if (vacationError) throw vacationError;

  return {
    totalEmployee: {
      title: '총 직원 수',
      value: totalEmployees ?? 0,
      description: '전체 등록 직원',
      icon: Users,
    },

    attendanceStats: [
      {
        title: '출근 인원',
        value: presentEmployees ?? 0,
        description: '오늘 출근 인원',
        icon: Truck,
      },
      {
        title: '지각 인원',
        value: lateEmployees ?? 0,
        description: '오늘 지각 인원',
        icon: Clock,
      },
      {
        title: '결근 인원',
        value: absentEmployees ?? 0,
        description: '오늘 결근 인원',
        icon: UserX,
      },
      {
        title: '휴가 인원',
        value: vacationEmployees ?? 0,
        description: '오늘 휴가 인원',
        icon: CalendarDays,
      },
    ],
  };
};
