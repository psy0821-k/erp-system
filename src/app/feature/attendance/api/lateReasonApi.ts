import { createClient } from '@/lib/client';

export interface UpdateLateReasonInput {
  id: string;
  late_reason: string;
}

export const updateLateReason = async ({ id, late_reason }: UpdateLateReasonInput) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('attendance')
    .update({
      late_reason,
    })
    .eq('id', id)
    .select('id, late_reason')
    .single();

  if (error) {
    throw error;
  }

  return data;
};
