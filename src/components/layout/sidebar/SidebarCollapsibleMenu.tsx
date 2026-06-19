'use client';

import Link from 'next/link';
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
  return (
    <SidebarMenuItem>
      <Collapsible defaultOpen={false} className="group/collapsible">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton type="button">
            <span>{menu.title}</span>
            <ChevronDown aria-hidden="true" className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <SidebarMenuSub>
            {menu.children?.map(subMenu => (
              <SidebarMenuSubItem key={subMenu.title}>
                <SidebarMenuSubButton asChild className="text-slate-400 hover:bg-slate-800 hover:text-white">
                  <Link href={subMenu.href ?? '/'}>
                    <span>{subMenu.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};
