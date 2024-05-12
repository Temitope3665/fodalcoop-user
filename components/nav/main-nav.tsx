import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { MessageIcon, UserProfileIcon } from '@/assets/svgs';
import { Info, LogOut, Settings } from 'lucide-react';

export default function MainNav() {
  return (
    <header className="flex justify-between py-4 border-b border-b-[#eeeded] px-8 bg-white">
      <h1 className="text-pr font-semibold">Foodal</h1>
      <div className="flex space-x-8 font-light text-sm text-[#444444] items-center">
        <div className="relative" role="button">
          <MessageIcon />
          <div className="absolute bg-[#DD2350] w-2 h-2 rounded-full -top-1 -right-1" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="space-x-2 flex" role="button">
              <p>Chike Opara</p>
              <UserProfileIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 px-2 w-[160px]">
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem className="px-2 py-2 text-[#444444]">
                <Settings className="mr-2 h-4 w-4" />
                <span className="text-sm font-light">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-2 py-2 text-[#444444]">
                <Info className="mr-2 h-4 w-4" />
                <span className="text-sm font-light">Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-2 py-2 text-[#444444]">
                <LogOut className="mr-2 h-4 w-4" />
                <span className="text-sm font-light">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
