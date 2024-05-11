import LayoutBackground from '@/assets/images/login-background.png';
// import { useMediaQuery } from '@/hooks/use-media-query';

const Layout = ({ children }: { children: React.ReactNode }) => {
  //   const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <div
      style={{
        backgroundImage: `url(${LayoutBackground.src})`,
        backgroundSize: 'cover',
      }}
      className="lg:flex justify-center items-center lg:min-h-[100vh]"
    >
      {children}
    </div>
  );
};

export default Layout;
