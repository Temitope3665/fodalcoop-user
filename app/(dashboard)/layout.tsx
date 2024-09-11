'use client';
import FooterNav from '@/components/nav/footer-nav';
import MainNav from '@/components/nav/main-nav';
import SidebarNav from '@/components/nav/sidebar-nav';
import { getUser } from '@/lib/actions';
import useStore from '@/lib/use-store';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUser(user); // Update the store with the user data
    }

    fetchUser();
  }, [setUser]);

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA]">
      <MainNav isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="w-full mt-12 lg:flex lg:fixed h-[92vh]">
        <div
          className={cn(
            'border-r border-r-[#F5F5F5] bg-white hidden lg:w-[18%] lg:block'
          )}
        >
          <SidebarNav setOpen={setIsOpen} open={isOpen} />
        </div>
        <div
          className={cn(
            'lg:col-span-10 bg-[#F8F9FD] relative lg:w-[82%] py-6 lg:py-20 lg:pt-4 ',
            isOpen && 'fixed'
          )}
        >
          {children}
          <div className="fixed bottom-0 w-full pt-20 lg:hidden block">
            <FooterNav />
          </div>
        </div>
      </div>
    </div>
  );
}
