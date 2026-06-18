import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { dashboardNavigation } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { UserInfo } from './userInfo';

const AppSidebar = () => {
  return (
    <aside className="sticky left-0 top-0 flex h-screen w-64 flex-col justify-between border-r border-white/10 bg-slate-950 text-white">
      <h1 className="hidden">erp 시스템 메뉴</h1>
      <div>
        <div className="flex h-18 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold">E</div>

          <div>
            <strong className="text-lg font-bold tracking-tight">ERP SYSTEM</strong>
            <p className="text-xs text-slate-400">Company Admin</p>
          </div>
        </div>

        <nav className="px-3 py-5">
          <h2 className="sr-only">사이드바 메뉴</h2>

          <ul className="space-y-1">
            {dashboardNavigation.map(menu => (
              <li key={menu.title}>
                {menu.href ? (
                  <Link
                    href={menu.href}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    {menu.title}
                  </Link>
                ) : (
                  <Accordion type="single" collapsible>
                    <AccordionItem value={menu.value ?? menu.title} className="border-none">
                      <AccordionTrigger
                        className={cn(
                          'group flex rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white hover:no-underline',
                          'data-[state=open]:bg-blue-600 data-[state=open]:text-white'
                        )}
                      >
                        <span>{menu.title}</span>
                      </AccordionTrigger>

                      <AccordionContent className="pb-1 pt-2">
                        <ul className="ml-4 space-y-1 border-l border-white/10 pl-3">
                          {menu.children?.map(subMenu => (
                            <li key={subMenu.title}>
                              <Link
                                href={subMenu.href ?? '/'}
                                className="block rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/10 hover:text-white"
                              >
                                {subMenu.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <UserInfo />
    </aside>
  );
};

export default AppSidebar;
