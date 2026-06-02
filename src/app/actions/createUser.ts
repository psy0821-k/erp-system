import { createClient } from '@/lib/client';

type SignUpParams = {
  email: string;
  password: string;
  name: string;
  department: string;
};

export async function createUser({ email, password, name, department }: SignUpParams) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        department,
        role: 'employee',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
