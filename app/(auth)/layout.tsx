'use client';
import LayoutBackground from '@/assets/images/login-background.png';
import { useMediaQuery } from '@/hooks/use-media-query';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <div
      style={{
        backgroundImage: isDesktop ? `url(${LayoutBackground.src})` : '',
        backgroundSize: 'cover',
      }}
      className="lg:flex justify-between items-center lg:min-h-screen lg:bg-none bg-[#2F4A89]"
    >
      <div className="lg:w-[35%] w-full lg:flex items-center lg:h-screen lg:bg-white lg:pt-0">
        {/* <div className="flex w-[100%] lg:hidden items-center justify-center">
          <div className="p-3 text-white sapce-y-6 col-span-1 pr-[30%] pl-4 lg:pr-0">
            <h3 className="font-semibold">FODAL COOP</h3>
            <div className="h-[20px] lg:h-[50px]"></div>
            <h1 className="text-[36px] lg:text-[32px] font-semibold">
              Welcome to Foodal Coop
            </h1>
            <h2 className="font-light pb-10 lg:pb-0">
              Your one stop solution for all your cooperative needs.{' '}
            </h2>
          </div>
        </div> */}
        {children}
      </div>
      <div className="hidden w-[65%] lg:flex items-center justify-center">
        <div className="p-3 text-white sapce-y-6 col-span-1 pr-[30%] pl-4 lg:pr-0">
          <h3 className="font-semibold">FODAL COOP</h3>
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
  );
};

export default Layout;
