import Image from 'next/image';
import { Bell, Search } from 'lucide-react';

import { DarkModeToggle } from '../ui/darkmode';

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex w-full justify-end items-center gap-4">
        <DarkModeToggle />

        <button type="button" aria-label="알림" className="rounded-full p-2 transition-colors hover:bg-muted">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
