import { UserCircle } from 'lucide-react';
import LogoutButton from './LogoutButton';
import { getCurrentEmployee } from '@/app/api/getEmployee';

export async function UserInfo() {
  const employee = await getCurrentEmployee();

  return (
    <div className="border-t border-white/10 p-4">
      <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
        <UserCircle className="h-9 w-9 " />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{employee?.name ?? '로그인 필요'}</p>

          <p className="truncate text-xs">{employee?.email ?? '로그인이 필요한 기능입니다'}</p>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}

export default UserInfo;
