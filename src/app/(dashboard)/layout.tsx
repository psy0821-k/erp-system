import AppSidebar from '@/components/layout/sidebar/AppSidebar';
import { DarkModeToggle } from '@/components/ui/darkmode';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header
          className="
      sticky top-0 z-40
      flex w-full items-center justify-between
      border-b border-border
      bg-background/80
      backdrop-blur-md
      supports-backdrop-filter:bg-background/60
      px-6 py-2.5
      shadow-sm
    "
        >
          <div className="flex items-center gap-3">
            <SidebarTrigger className="size-8" />
          </div>

          <DarkModeToggle />
        </header>

        <main className="flex-1 bg-background p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
