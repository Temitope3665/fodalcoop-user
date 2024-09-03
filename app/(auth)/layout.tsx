'use client';
import LayoutBackground from '@/assets/images/login-background.png';
import LayoutBackground2 from '@/assets/images/beautiful-american-lady.jpeg';
import { useMediaQuery } from '@/hooks/use-media-query';
import React, { useEffect, useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-[#000]">
      <div className="lg:flex justify-between items-center lg:min-h-screen  lg:bg-none bg-[#2F4A89]">
        <div className="lg:w-[40%] w-full lg:flex items-center h-screen lg:bg-white lg:py-6 overflow-y-auto">
          {isClient && <div className="px-6 w-full">{children}</div>}
        </div>
        <div
          className="hidden w-[60%] lg:flex items-center justify-center h-screen relative"
          style={{
            backgroundImage: isDesktop ? `url(${LayoutBackground2.src})` : '',
            backgroundSize: 'cover',
          }}
        >
          <div className="opacity-55 bg-[#000] h-full w-full absolute" />
          <div className="p-3 text-white space-y-3 col-span-1 pr-[30%] pl-4 lg:pr-0 z-[50]">
            {/* <h3 className="font-semibold">FODAL COOP</h3> */}
            <div className="h-[20px] lg:h-[50px]"></div>
            <h1 className="text-[36px] lg:text-[32px] font-semibold">
              Welcome to Foodal Coop
            </h1>
            <h2 className="font-light pb-10 lg:pb-0">
              Your one stop solution for all your cooperative needs.{' '}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
