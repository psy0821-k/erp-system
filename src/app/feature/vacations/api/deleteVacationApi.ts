import { createClient } from '@/lib/client';

export const deleteVacation = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from('vacations').delete().eq('id', id).eq('status', 'PENDING');

  if (error) {
    throw error;
  }

  return id;
};
