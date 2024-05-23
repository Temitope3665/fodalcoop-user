import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="lg:p-10 flex items-center w-full bg-[#FAFAFA] h-screen">
      {/* <MainNav /> */}
      {/* <div className="pt-24">
        <div
          className="w-[90%] lg:w-[35%] mx-auto rounded-xl bg-white border"
          style={{
            boxShadow: '0px 0px 24px 0px rgba(85, 108, 103, 0.05)',
            border: '1px solid rgba(245, 245, 245, 1)',
          }}
        >
          <div className="p-4"> */}
      <div className="space-y-4 w-full px-4 lg:py-0">
        {/* <h3 className="font-semibold">FODAL COOP</h3> */}
        {children}
      </div>
      {/* </div>
        </div>
      </div> */}
    </div>
  );
};

export default Layout;
