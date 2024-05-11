import UserAuthForm from '@/components/user-auth-form';

export default function Login() {
  return (
    <div className="lg:bg-white bg-pink lg:rounded-2xl lg:p-2.5 lg:w-[60%] lg:grid lg:grid-cols-3">
      <div className="bg-[rgb(47,74,137)] lg:rounded-2xl p-3 text-white sapce-y-6 col-span-1 pr-[30%] pl-4 lg:pr-0">
        <h3 className="font-semibold">FODAL COOP</h3>
        <div className="h-[80px] lg:h-[200px]"></div>
        <h1 className="text-[36px] lg:text-[32px] font-semibold">
          Welcome to Foodal Coop
        </h1>
        <h2 className="font-light pb-10 lg:pb-0">
          Your one stop solution for all your cooperative needs.{' '}
        </h2>
      </div>
      <div className="space-y-6 col-span-2 lg:w-[88%] mx-auto my-auto lg:rounded-none rounded-tr-3xl rounded-tl-3xl bg-white lg:bg-none p-4 -mt-3 lg:mt-0">
        <div className="space-y-2">
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
