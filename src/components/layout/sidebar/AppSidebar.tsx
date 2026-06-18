import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';

import { dashboardNavigation } from '@/config/navigation';
import { UserInfo } from './userInfo';
import { SidebarDashboardLink } from './SidebarDashboardLink';
import { SidebarMenuLink } from './SidebarMenuLink';
import { SidebarCollapsibleMenu } from './SidebarCollapsibleMenu';

const AppSidebar = () => {
  return (
    <Sidebar className="border-r border-slate-800 bg-slate-950 text-slate-100">
      <SidebarHeader className="border-b border-slate-800 px-3 py-4">
        <SidebarMenu>
          <SidebarDashboardLink />
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ERP 메뉴</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardNavigation.map(menu =>
                menu.children?.length ? <SidebarCollapsibleMenu key={menu.title} menu={menu} /> : <SidebarMenuLink key={menu.title} menu={menu} />
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-800 p-3">
        <UserInfo />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
