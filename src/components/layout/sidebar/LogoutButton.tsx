'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/client';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.refresh();
    router.push('/login');
  };

  return (
    <Button type="button" onClick={handleLogout} className="w-full bg-red-700 text-white hover:bg-red-800">
      <LogOut className="h-4 w-4" aria-hidden="true" />
      로그아웃
    </Button>
  );
}
