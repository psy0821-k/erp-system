import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

type SidebarMenuLinkProps = {
  menu: {
    title: string;
    href?: string;
  };
};

export const SidebarMenuLink = ({ menu }: SidebarMenuLinkProps) => {
  if (!menu.href) return null;

  return (
    <SidebarMenuItem>
      <Link href={menu.href}>
        <SidebarMenuButton>
          <LayoutDashboard aria-hidden="true" />
          <span>{menu.title}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};
