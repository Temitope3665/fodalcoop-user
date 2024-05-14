'use client';
import * as React from 'react';
import Link from 'next/link';
import { dashboardConfig } from '@/config/dashboard';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { SidebarNavItem } from '@/types';
import { X } from 'lucide-react';

interface ISidebarNav {
  setOpen: (arg: boolean) => void;
}

export default function SidebarNav({ setOpen }: ISidebarNav) {
  return (
    <div className="flex h-full max-h-screen flex-col lg:gap-5 fixed w-[85%] bg-white lg:w-[18%] z-50">
      <div className="flex-1">
        <div className="px-6 pt-4 pb-3 border-b border-b-[#eeeded] bg-white lg:hidden flex items-center justify-between">
          <h1 className="text-pr font-semibold">Foodal</h1>
          <X role="button" onClick={() => setOpen(false)} />
        </div>
        <nav className="items-start px-2 text-sm font-medium lg:px-4 space-y-2 pt-8 lg:pt-0">
          {dashboardConfig.sidebarNav.map((item, idx) => (
            <React.Fragment key={idx}>
              <MenuItem item={item} />
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}

const MenuItem = ({ item }: { item: SidebarNavItem }) => {
  const pathname = usePathname();
  const { href, icon, title } = item;
  const isActive = href && pathname.startsWith(href);
  return (
    <Link
      className={cn(
        'py-4 font-light trans text-sm px-4 rounded-lg  w-[80%] ml-4 lg:ml-0 text-default bg-white flex items-center space-x-2',
        isActive && 'bg-primary text-white'
      )}
      href={href}
    >
      <div>{icon}</div>
      <p>{title}</p>
    </Link>
  );
};
