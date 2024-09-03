'use client';
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { MessageIcon, UserProfileIcon } from '@/assets/svgs';
import { Headset, Info, Loader, LogOut, Settings } from 'lucide-react';
import { LOGIN_URL, SETTINGS_URL, SUPPORT_URL } from '@/config/paths';
import { ReactNode, useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import CompanyLogo from '@/assets/icons/fodal-icon.svg';
import useStore, { defaultUser } from '@/lib/use-store';
import { userLogoutAction } from '@/lib/actions';
import { toast } from 'sonner';

interface IMainNav {
  isOpen?: boolean;
  setIsOpen?: any;
}

export default function MainNav({ isOpen, setIsOpen }: IMainNav) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { user } = useStore();
  const pathname = usePathname();
  const setUser = useStore((state) => state.setUser);

  const handleLogout = () => {
    startTransition(async () => {
      const response: any = await userLogoutAction();
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
        router.push(LOGIN_URL);
        setUser(defaultUser);
      }
    });
  };

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
              <p>
                {`${user?.member.firstName || ''} ${user?.member.lastName || ''}`}
              </p>
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
                    {item.icon}
                    <span className="text-sm font-light">{item.title}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <p>Logout</p>
                {pending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              </DropdownMenuItem>
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
    icon: <Headset className="mr-2 h-4 w-4" />,
  },
];
