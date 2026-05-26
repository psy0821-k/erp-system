import Image from 'next/image';
import { Bell, Search } from 'lucide-react';

import { DarkModeToggle } from '../ui/darkmode';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="relative w-72">
        <label htmlFor="search" className="sr-only">
          검색
        </label>

        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input id="search" type="text" placeholder="검색어를 입력하세요" className="pl-10" />
      </div>

      <div className="flex items-center gap-4">
        <DarkModeToggle />

        <button type="button" aria-label="알림" className="rounded-full p-2 transition-colors hover:bg-muted">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <Image src="/no-profile.svg" alt="사용자 프로필" width={40} height={40} className="rounded-full border" />

          <div className="hidden text-sm sm:block">
            <strong className="block font-semibold">박성윤</strong>

            <p className="text-muted-foreground">Frontend Developer</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
