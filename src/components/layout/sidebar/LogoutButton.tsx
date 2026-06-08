import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { logoutAction } from '@/app/actions/auth';

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" className="w-full bg-red-700 hover:bg-red-800">
        <LogOut className="h-4 w-4" />
        로그아웃
      </Button>
    </form>
  );
}
