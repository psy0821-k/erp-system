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
import { SidebarMenuLink } from './SidebarMenuLink';
import { SidebarCollapsibleMenu } from './SidebarCollapsibleMenu';

const AppSidebar = () => {
  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" className="border-r bg-background">
      <SidebarHeader className="border-b px-3 py-3">
        <div className="flex flex-col group-data-[collapsible=icon]:items-center">
          <span className="text-sm font-bold tracking-tight group-data-[collapsible=icon]:hidden">ERP Company</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">ERP 메뉴</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardNavigation.map(menu =>
                menu.children?.length ? <SidebarCollapsibleMenu key={menu.title} menu={menu} /> : <SidebarMenuLink key={menu.title} menu={menu} />
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <UserInfo />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
