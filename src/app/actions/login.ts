import { createClient } from '@/lib/client';
import { LoginFormData } from '@/lib/zod/auth';

export async function login(data: LoginFormData) {
  const supabase = createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  return authData;
}
