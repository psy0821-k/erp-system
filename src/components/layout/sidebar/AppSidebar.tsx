import Link from 'next/link';
import { ChevronDown, LayoutDashboard, User } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { dashboardNavigation } from '@/config/navigation';
import { UserInfo } from './userInfo';

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <LayoutDashboard aria-hidden="true" />
                <span>대시보드</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ERP 메뉴</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardNavigation.map(menu =>
                menu.href ? (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton asChild>
                      <Link href={menu.href}>
                        <LayoutDashboard aria-hidden="true" />
                        <span>{menu.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <Collapsible key={menu.title} asChild defaultOpen={false} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <span>{menu.title}</span>
                          <ChevronDown aria-hidden="true" className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <SidebarMenuSub>
                          {menu.children?.map(subMenu => (
                            <SidebarMenuSubItem key={subMenu.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subMenu.href ?? '/'}>
                                  <span>{subMenu.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <UserInfo />
        </SidebarMenuItem>
      </SidebarMenu>
    </Sidebar>
  );
};

export default AppSidebar;
