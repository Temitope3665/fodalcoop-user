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

      <div className="w-full pt-14 flex fixed">
        <div className="border-r border-r-[#F5F5F5] bg-white py-4 w-[18%]">
          <SidebarNav />
        </div>
        <div className="col-span-10 w-[82%] h-[94vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
