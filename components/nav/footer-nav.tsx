'use client';
import { dashboardConfig } from '@/config/dashboard';
import { cn } from '@/lib/utils';
import { Ellipsis } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';

const FooterNav = () => {
  const [open, setOpen] = React.useState<boolean>();
  const pathname = usePathname();
  return (
    <div
      className="grid grid-cols-5 bg-white"
      style={{ boxShadow: '0px -4px 12px 0px #334DAA0D' }}
    >
      {dashboardConfig.sidebarNav.slice(0, 4).map((item, idx) => (
        <Link href={item.href}>
          <div
            key={idx}
            className={cn(
              'text-[#55678C] border-t-2 border-t-white text-center w-full pt-4 trans pb-4 space-y-1',
              pathname.startsWith(item.href) &&
                'text-primary border-t-2 border-t-primary'
            )}
          >
            <div className="w-fit mx-auto">{item.icon}</div>
            <p className="text-xs font-light">{item.title}</p>
          </div>
        </Link>
      ))}

      <DropdownMenu onOpenChange={setOpen} open={open}>
        <DropdownMenuTrigger asChild>
          <div className="text-[#55678C] border-t-2 border-t-white text-center w-full pt-4 trans pb-4 space-y-1">
            <div className="w-fit mx-auto">
              <Ellipsis size={16} />
            </div>
            <p className="text-xs font-light">More</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-3">
          {dashboardConfig.sidebarNav
            .slice(4, dashboardConfig.sidebarNav.length)
            .map((item, idx) => (
              <DropdownMenuItem>
                <Link
                  href={item.href}
                  className="space-x-2"
                  onClick={() => setOpen(false)}
                >
                  <div
                    key={idx}
                    className={cn(
                      'text-[#55678C] border-t-2 border-t-white space-x-2 flex text-center w-full py-2 trans',
                      pathname.startsWith(item.href) && 'text-primary'
                    )}
                  >
                    <div className="w-fit">{item.icon}</div>
                    <p className="text-xs font-light">{item.title}</p>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FooterNav;
