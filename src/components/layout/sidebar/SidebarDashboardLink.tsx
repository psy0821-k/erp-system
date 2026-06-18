import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export const SidebarDashboardLink = () => {
  return (
    <SidebarMenuItem>
      <Link href="/">
        <SidebarMenuButton>
          <LayoutDashboard aria-hidden="true" />
          <span>대시보드</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};
