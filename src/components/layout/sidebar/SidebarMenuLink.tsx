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
        tooltip={menu.title}
        className={isActive ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : ''}
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
          <span>{menu.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
