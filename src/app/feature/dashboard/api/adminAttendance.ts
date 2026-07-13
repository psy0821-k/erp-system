import { createClient } from '@/lib/client';
import { getToday } from '@/lib/utils';

export const getTodayAttendanceSummary = async () => {
  const supabase = createClient();

  const today = getToday();

  const { data, error } = await supabase.from('attendance').select('status').eq('work_date', today);

  if (error) {
    throw error;
  }

  const summary = {
    PRESENT: 0,
    LATE: 0,
    ABSENT: 0,
    VACATION: 0,
    BUSINESS_TRIP: 0,
  };

  data.forEach(item => {
    summary[item.status as keyof typeof summary]++;
  });

  return summary;
};
