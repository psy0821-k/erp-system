import { createClient } from '@/lib/server';
import { Package, Truck, Users, UserX } from 'lucide-react';

export const getDashboardStats = async () => {
  const supabase = await createClient();

  const today = new Date().toLocaleDateString('sv-SE');

  const { count: totalEmployees } = await supabase.from('employees').select('*', { count: 'exact', head: true });
  const { count: activeEmployees } = await supabase
    .from('attendance')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PRESENT')
    .eq('work_date', today);
  const { count: absentEmployees } = await supabase
    .from('attendance')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'ABSENT')
    .eq('work_date', today);
  const { count: lateEmployees } = await supabase
    .from('attendance')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'LATE')
    .eq('work_date', today);
  const { count: vacationEmployees } = await supabase
    .from('employees')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'VACATION')
    .eq('work_date', today);
  return [
    {
      title: '총 직원 수',
      value: totalEmployees ?? 0,
      description: '전체 등록 직원',
      icon: Users,
    },
    {
      title: '출근 인원',
      value: activeEmployees ?? 0,
      description: '오늘 출근 인원',
      icon: Truck,
    },
    {
      title: '지각 인원',
      value: lateEmployees ?? 0,
      description: '오늘 지각 인원',
      icon: Truck,
    },
    {
      title: '결근 인원',
      value: absentEmployees ?? 0,
      description: '오늘 결근 인원',
      icon: UserX,
    },
    {
      title: '휴가',
      value: vacationEmployees ?? 0,
      description: '휴가 중인 직원',
      icon: Package,
    },
  ];
};
