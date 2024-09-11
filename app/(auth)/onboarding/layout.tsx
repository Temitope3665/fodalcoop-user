'use client';
import { LOGIN_URL } from '@/config/paths';
import { ReactNode } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';

const Layout = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  return (
    <div className="lg:p-10 flex items-center w-full bg-[#FAFAFA] min-h-screen">
      <div className="space-y-4 w-full px-4 lg:py-0">
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="flex items-center space-x-2 border rounded-full px-2 py-1 w-fit"
              role="button"
            >
              <MoveLeft size={18} /> <p className="text-sm">Go home</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                Your current data will be erased if you proceed to go back home.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>

              <Button
                type="button"
                onClick={() => {
                  localStorage.removeItem('new_user');
                  push(LOGIN_URL);
                }}
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {children}
      </div>
    </div>
  );
};

export default Layout;
