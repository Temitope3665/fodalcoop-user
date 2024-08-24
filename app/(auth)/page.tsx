import UserAuthForm from '@/components/forms/auth/user-auth-form';

export default function Login() {
  return (
    <div className="w-full">
      <div className="flex w-[100%] lg:hidden items-center justify-center">
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
      {/* <div className="p-3 sapce-y-6 col-span-1 pr-[30%] pl-4 lg:pr-0">
        <h3 className="font-semibold">FODAL COOP</h3>
        <div className="h-[20px] lg:h-[50px]"></div>
        <h1 className="text-[36px] lg:text-[32px] font-semibold">
          Welcome to Foodal Coop
        </h1>
        <h2 className="font-light pb-10 lg:pb-0">
          Your one stop solution for all your cooperative needs.{' '}
        </h2>
      </div> */}
      <div className="space-y-4 lg:w-full mx-auto my-auto bg-white rounded-tl-3xl lg:rounded-none rounded-tr-3xl lg:bg-none p-4 -mt-3 lg:mt-0">
        <h3 className="font-semibold">FODAL COOP</h3>
        <div className="space-y-">
          <h1 className="text-[20px] font-bold">Member log in</h1>
          <p className="text-sm font-light">
            Enter your details to log in to your account
          </p>
        </div>

        <UserAuthForm />
      </div>
    </div>
  );
}
