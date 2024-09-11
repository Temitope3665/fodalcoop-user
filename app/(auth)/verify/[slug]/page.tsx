'use client';
import VerifyOTPForm from '@/components/forms/auth/verify-otp-form';
import { LOGIN_URL } from '@/config/paths';
import { AppContext } from '@/context/app-context';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default async function VerifyOTP(props: { params: { slug: string } }) {
  const router = useRouter();
  const { data } = useContext(AppContext);
  return (
    <div className="w-full">
      <div className="flex w-[100%] lg:hidden items-center justify-center">
        <div className="p-3 text-white sapce-y-6 col-span-1 pr-[30%] pl-4 lg:pr-0">
          <h3 className="font-semibold">{data?.name || ''}</h3>
          <div className="h-[20px] lg:h-[50px]"></div>
          <h1 className="text-[36px] lg:text-[32px] font-semibold">
            Welcome to {data?.name || ''}
          </h1>
          <h2 className="font-light pb-10 lg:pb-0">
            Your one stop solution for all your cooperative needs.
          </h2>
        </div>
      </div>

      <div className="space-y-4 lg:w-[100%] mx-auto my-auto bg-white rounded-tl-3xl lg:rounded-none rounded-tr-3xl lg:bg-none p-4 -mt-3 lg:mt-0">
        <div onClick={() => router.push(LOGIN_URL)} role="button">
          <h3 className="font-semibold">{data?.name || ''}</h3>
        </div>
        <div className="space-y-1">
          <h1 className="text-[20px] font-bold">Verify OTP</h1>
          <p className="text-sm font-light text-[#888888]">
            Proceed to verify the code you received from email
          </p>
        </div>

        <VerifyOTPForm />
      </div>
    </div>
  );
}
