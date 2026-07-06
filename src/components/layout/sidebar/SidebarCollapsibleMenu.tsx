'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type SidebarCollapsibleMenuProps = {
  menu: {
    title: string;
    children?: {
      title: string;
      href?: string;
    }[];
  };
};

export const SidebarCollapsibleMenu = ({ menu }: SidebarCollapsibleMenuProps) => {
  const pathname = usePathname();

  const isParentActive = menu.children?.some(subMenu => subMenu.href === pathname);

  return (
    <SidebarMenuItem>
      <Collapsible defaultOpen={isParentActive} className="group/collapsible">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton type="button" isActive={isParentActive}>
            <span className="font-bold">{menu.title}</span>
            <ChevronDown aria-hidden="true" className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <SidebarMenuSub>
            {menu.children?.map(subMenu => {
              const href = subMenu.href ?? '/';
              const isActive = pathname === href;

              return (
                <SidebarMenuSubItem key={subMenu.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={isActive}
                    className={
                      isActive
                        ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 font-semibold'
                        : 'hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50'
                    }
                  >
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={event => {
                        if (isActive) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <span>{subMenu.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};
