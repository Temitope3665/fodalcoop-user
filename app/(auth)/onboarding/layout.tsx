import { LOGIN_URL } from '@/config/paths';
import Link from 'next/link';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="lg:p-10 flex items-center w-full bg-[#FAFAFA] h-screen">
      <div className="space-y-4 w-full px-4 lg:py-0">
        <Link href={LOGIN_URL}>
          <h1>FODAL COOP</h1>
        </Link>
        {children}
      </div>
    </div>
  );
};

export default Layout;
