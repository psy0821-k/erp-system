'use server';

import { createClient } from '@/lib/server';

const getTodayKST = () => {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  return kst.toISOString().split('T')[0];
};

export const getVacationSummary = async () => {
  const supabase = await createClient();

  const today = getTodayKST();

  const { count: todayVacationCount } = await supabase
    .from('vacations')
    .select('*', { count: 'exact', head: true })
    .lte('start_date', today)
    .gte('end_date', today)
    .eq('status', 'APPROVED');

  const { count: pendingCount } = await supabase.from('vacations').select('*', { count: 'exact', head: true }).eq('status', 'PENDING');

  const { count: approvedCount } = await supabase.from('vacations').select('*', { count: 'exact', head: true }).eq('status', 'APPROVED');

  const { count: rejectedCount } = await supabase.from('vacations').select('*', { count: 'exact', head: true }).eq('status', 'REJECTED');

  return [
    {
      title: '오늘 휴가자',
      value: todayVacationCount ?? 0,
      description: '오늘 승인된 휴가자',
    },
    {
      title: '승인 대기',
      value: pendingCount ?? 0,
      description: '처리가 필요한 휴가 신청',
    },
    {
      title: '승인 완료',
      value: approvedCount ?? 0,
      description: '승인된 휴가 신청',
    },
    {
      title: '반려',
      value: rejectedCount ?? 0,
      description: '반려된 휴가 신청',
    },
  ];
};
