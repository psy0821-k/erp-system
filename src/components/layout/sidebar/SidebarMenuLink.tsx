'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

type SidebarMenuLinkProps = {
  menu: {
    title: string;
    href?: string;
  };
};

export const SidebarMenuLink = ({ menu }: SidebarMenuLinkProps) => {
  const pathname = usePathname();

  if (!menu.href) return null;
  const isActive = pathname === menu.href || pathname.startsWith(`${menu.href}/`);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={
          isActive
            ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 font-bold'
            : 'font-semibold hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50'
        }
      >
        <Link
          href={menu.href}
          aria-current={isActive ? 'page' : undefined}
          onClick={event => {
            if (isActive) {
              event.preventDefault();
            }
          }}
        >
          <span className="font-bold">{menu.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
