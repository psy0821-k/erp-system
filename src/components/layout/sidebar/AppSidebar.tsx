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
import { getCurrentEmployee } from '@/app/api/getEmployee';
import { hasPermission } from '@/config/permissions';

const AppSidebar = async () => {
  const employee = await getCurrentEmployee();
  if (!employee) return;
  const filteredNavigation = dashboardNavigation
    .map(menu => {
      if (!menu.children?.length) {
        return menu;
      }

      const children = menu.children.filter(child => {
        if (child.href === '/employee') {
          return hasPermission(employee.role, 'EMPLOYEE_MANAGE');
        }

        if (child.href === '/employee/attendance') {
          return hasPermission(employee.role, 'ATTENDANCE_MANAGE');
        }

        if (child.href === '/asset/create') {
          return hasPermission(employee.role, 'ASSET_MANAGE');
        }

        return true;
      });

      if (children.length === 0) {
        return null;
      }

      return {
        ...menu,
        children,
      };
    })
    .filter((menu): menu is NonNullable<typeof menu> => menu !== null);

  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" className="border-r bg-background">
      <SidebarHeader className="border-b px-3 py-4.5">
        <div className="flex flex-col group-data-[collapsible=icon]:items-center">
          <span className="text-sm font-bold tracking-tight group-data-[collapsible=icon]:hidden">ERP Company</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">ERP 메뉴</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavigation.map(menu =>
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
