import { createClient } from '@/lib/client';
import { TodoSummary } from '../types/todoSummary';

export const getTodoSummary = async (): Promise<TodoSummary> => {
  const supabase = createClient();

  const [vacationResult, assetRequestResult, assetRepairResult, lateReasonResult] = await Promise.all([
    supabase.from('vacations').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),

    supabase.from('asset_requests').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),

    supabase.from('asset_repairs').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),

    supabase
      .from('attendance')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'LATE')
      .eq('late_reason_reviewed', false)
      .not('late_reason', 'is', null),
  ]);

  if (vacationResult.error) throw vacationResult.error;
  if (assetRequestResult.error) throw assetRequestResult.error;
  if (assetRepairResult.error) throw assetRepairResult.error;
  if (lateReasonResult.error) throw lateReasonResult.error;

  return {
    vacationPendingCount: vacationResult.count ?? 0,
    assetRequestPendingCount: assetRequestResult.count ?? 0,
    assetRepairPendingCount: assetRepairResult.count ?? 0,
    lateReasonRequiredCount: lateReasonResult.count ?? 0,
  };
};
