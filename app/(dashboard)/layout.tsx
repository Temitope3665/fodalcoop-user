import MainNav from '@/components/nav/main-nav';
import SidebarNav from '@/components/nav/sidebar-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA]">
      <MainNav />

      <div className="grid grid-cols-12 w-full min-h-[95vh]">
        <div className="col-span-2 border-r border-r-[#F5F5F5] bg-white py-4">
          <SidebarNav />
        </div>
        <div className="col-span-10">{children}</div>
      </div>
    </div>
  );
}
