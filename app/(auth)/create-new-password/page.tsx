import CreateNewPasswordForm from '@/components/create-new-password-form';

const PasswordReset = () => {
  return (
    <div className="lg:w-[30%]">
      <div className="space-y-6 col-span-2 lg:w-full mx-auto my-auto lg:rounded-2xl rounded-tr-3xl rounded-tl-3xl bg-white lg:bg-none p-8 -mt-3 lg:mt-0">
        <div className="space-y-1">
          <h1 className="text-[20px] font-bold">Password reset</h1>
          <p className="text-sm font-light text-[#888888]">
            Enter your email to reset your password
          </p>
        </div>

        <CreateNewPasswordForm />
      </div>
    </div>
  );
};

export default PasswordReset;
