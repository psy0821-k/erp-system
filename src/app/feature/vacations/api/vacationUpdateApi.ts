import { createClient } from '@/lib/client';
import { ApprovalStatus } from '../type/vacationType';

type UpdateVacationStatusParams = {
  id: string;
  status: ApprovalStatus;
  approver_id: string;
  result_message: string;
};

export const updateVacationStatus = async ({ id, status, approver_id, result_message }: UpdateVacationStatusParams) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('vacations')
    .update({
      status,
      approver_id,
      result_message,
      approved_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
