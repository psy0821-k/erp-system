'use client';

import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { dashboardNavigation } from '@/config/navigation';

const Sidebar = () => {
  return (
    <div className="flex sticky justify-between items-center flex-col w-64 bg-[#1E293B] text-white h-screen left-0 top-0 transition-all duration-300 border-r border-white/10">
      <nav>
        <h2 className="sr-only">싸이 컴패니 대시보드 메뉴</h2>

        <ul className="space-y-2">
          {dashboardNavigation.map(menu => (
            <li key={menu.title}>
              {menu.href ? (
                <Link href={menu.href}>{menu.title}</Link>
              ) : (
                <Accordion type="single" collapsible>
                  <AccordionItem value={menu.value ?? menu.title}>
                    <AccordionTrigger>{menu.title}</AccordionTrigger>

                    <AccordionContent>
                      <ul>
                        {menu.children?.map(subMenu => (
                          <li key={subMenu.title}>
                            <Link href={subMenu.href ?? '/'}>{subMenu.title}</Link>
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
  );
};

export default Sidebar;
