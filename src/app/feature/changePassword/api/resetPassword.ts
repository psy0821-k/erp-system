import { createClient } from '@/lib/client';

export interface ResetPasswordInput {
  password: string;
}

export const resetPassword = async ({ password }: ResetPasswordInput) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
