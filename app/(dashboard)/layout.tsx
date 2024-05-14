'use client';
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
  const [isOpen, setIsOpen] = useState<boolean>();
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA]">
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-[#222835A6] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
      )}
      <MainNav isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="w-full lg:pt-14 lg:flex lg:fixed">
        <div className="border-r border-r-[#F5F5F5] bg-white lg:py-4 lg:w-[18%]">
          {(isOpen || isDesktop) && <SidebarNav setOpen={setIsOpen} />}
        </div>
        <div
          className={cn(
            'lg:col-span-10 lg:w-[82%] pt-20 lg:pt-0 ',
            isOpen && 'fixed'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
