import { createClient } from '@/lib/client';

export const getDepartmentSummary = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from('employees').select('department');

  if (error) throw error;

  const map = new Map<string, number>();

  data.forEach(item => {
    map.set(item.department, (map.get(item.department) ?? 0) + 1);
  });

  return Array.from(map.entries()).map(([department, count]) => ({
    department,
    count,
  }));
};
