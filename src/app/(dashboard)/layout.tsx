import AppSidebar from '@/components/layout/sidebar/AppSidebar';
import { DarkModeToggle } from '@/components/ui/darkmode';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-background px-4">
          <SidebarTrigger className="size-8" />

          <span className="text-sm font-semibold">ERP System</span>
          <DarkModeToggle />
        </header>

        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
