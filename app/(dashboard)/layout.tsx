'use client';
import FooterNav from '@/components/nav/footer-nav';
import MainNav from '@/components/nav/main-nav';
import SidebarNav from '@/components/nav/sidebar-nav';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA]">
      {/* {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed h-[100%] inset-0 w-full ease-in-out duration-300 z-30 bg-[#222835A6] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
      )} */}
      <MainNav isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="w-full lg:pt-14 lg:flex lg:fixed">
        <div
          className={cn(
            'border-r border-r-[#F5F5F5] bg-white hidden lg:py-4 lg:w-[18%] lg:block'
          )}
        >
          {/* {(isOpen || isDesktop) && ( */}
          <SidebarNav setOpen={setIsOpen} open={isOpen} />
          {/* )} */}
        </div>
        <div
          className={cn(
            'lg:col-span-10 bg-[#F8F9FD] relative lg:w-[82%] py-20 lg:pt-0 ',
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
