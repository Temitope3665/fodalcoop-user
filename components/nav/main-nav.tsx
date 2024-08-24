'use client';
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { MessageIcon, UserProfileIcon } from '@/assets/svgs';
import { Info, LogOut, Settings } from 'lucide-react';
import { SETTINGS_URL, SUPPORT_URL } from '@/config/paths';
import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import CompanyLogo from '@/assets/icons/fodal-icon.svg';
import useStore from '@/lib/use-store';

interface IMainNav {
  isOpen?: boolean;
  setIsOpen?: any;
}

export default function MainNav({ isOpen, setIsOpen }: IMainNav) {
  const { user } = useStore();
  const pathname = usePathname();

  console.log(user, 'user');

  return (
    <header className="flex justify-between h-[8vh] border-b border-b-[#eeeded] bg-white fixed w-full z-10 top-0">
      <div className="flex space-x-2 items-center lg:border-r lg:w-[18%] px-8">
        <Image src={CompanyLogo} alt="company logo" width={30} height={30} />
        <h1 className="text-pr font-semibold text-primary">Foodal</h1>
      </div>
      <div className="flex space-x-8 font-light text-sm text-[#444444] items-center px-8">
        <div className="relative" role="button">
          <MessageIcon />
          <div className="absolute bg-[#DD2350] w-2 h-2 rounded-full -top-1 -right-1" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="space-x-2 flex" role="button">
              <p>{user?.member.firstName + ' ' + user?.member.lastName}</p>
              <UserProfileIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 px-2 w-[160px]">
            <DropdownMenuGroup className="space-y-1">
              {navItems.map((item) => (
                <Link href={item.href} key={item.title}>
                  <DropdownMenuItem
                    className={cn(
                      'px-2 py-2 text-[#444444] my-2',
                      pathname.startsWith(item.href) &&
                        'bg-accent text-accent-foreground'
                    )}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="text-sm font-light">{item.title}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <div
          role="button"
          onClick={() => setIsOpen((prev: boolean) => !prev)}
          className="lg:hidden relative"
        >
          {isOpen ? <X /> : <Menu />}
        </div> */}
      </div>
    </header>
  );
}

const navItems: { title: string; href: string; icon: ReactNode }[] = [
  {
    title: 'Settings',
    href: SETTINGS_URL,
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Support',
    href: SUPPORT_URL,
    icon: <Info className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Logout',
    href: '#',
    icon: <LogOut className="mr-2 h-4 w-4" />,
  },
];
