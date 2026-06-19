import QueryProvider from '@/components/provider/query-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/sidebar/AppSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-6">{children}</main>
      </SidebarProvider>
    </QueryProvider>
  );
}
