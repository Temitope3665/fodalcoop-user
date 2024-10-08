'use client';
import * as React from 'react';
import Link from 'next/link';
import { dashboardConfig } from '@/config/dashboard';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { SidebarNavItem } from '@/types';
import { X } from 'lucide-react';
import CompanyLogo from '@/assets/icons/fodal-icon.svg';
import Image from 'next/image';

interface ISidebarNav {
  setOpen: (arg: boolean) => void;
  open: boolean;
}

export default function SidebarNav({ setOpen, open }: ISidebarNav) {
  return (
    <div
      className={cn(
        'flex h-full max-h-screen flex-col lg:gap-5 fixed w-[85%] bg-white lg:w-[18%] z-50  ease-in-out duration-300 border-r py-8',
        open ? '' : '-translate-x-full md:translate-x-0'
      )}
    >
      <div className="flex-1">
        <div className="px-6 pt-4 pb-3 border-b border-b-[#eeeded] bg-white lg:hidden flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={CompanyLogo}
              alt="company logo"
              width={30}
              height={30}
            />
            <h1 className="text-pr font-semibold">Foodal</h1>
          </div>
          <X role="button" onClick={() => setOpen(false)} />
        </div>
        <nav className="items-start px-2 text-sm font-medium lg:px-4 space-y-2 pt-8 lg:pt-0">
          {dashboardConfig.sidebarNav.map((item, idx) => (
            <div key={idx}>
              <MenuItem item={item} />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

const MenuItem = ({ item }: { item: SidebarNavItem }) => {
  const pathname = usePathname();
  const { href, icon, title, disabled } = item;
  const isActive = href && pathname.startsWith(href);
  return (
    <Link
      className={cn(
        'py-4 font-light trans text-sm px-4 rounded-lg  w-[80%] ml-4 lg:ml-0 text-default bg-white flex items-center space-x-2',
        isActive && 'bg-primary text-white',
        disabled && 'opacity-55 cursor-not-allowed'
      )}
      href={disabled ? '#' : href}
    >
      <div>{icon}</div>
      <p>{title}</p>
    </Link>
  );
};
