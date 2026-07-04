import { createClient } from '@/lib/client';

export interface ForgotPasswordInput {
  email: string;
}

export const sendForgotPasswordEmail = async ({ email }: ForgotPasswordInput) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
