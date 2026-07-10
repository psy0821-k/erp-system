'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/client';
import { cn } from '@/lib/utils';
import { buttonStyle } from '@/app/style/buttonStyle';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.refresh();
    router.push('/sign-in');
  };

  return (
    <Button type="button" onClick={handleLogout} className={cn(buttonStyle.base, buttonStyle.delete, 'w-full')}>
      <LogOut className="h-4 w-4" aria-hidden="true" />
      로그아웃
    </Button>
  );
}
