'use server';

import { createClient } from '@/lib/server';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect('/sign-in');
}
