'use client';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { SuccessIcon } from '@/assets/svgs';
import { useState } from 'react';
import { wait } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { DASHBOARD_HOME_URL } from '@/config/paths';

const ReviewOnboarding = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  function handleComplete() {
    setIsPending(true);
    wait().then(() => {
      router.push(DASHBOARD_HOME_URL);
      setIsPending(false);
    });
  }
  return (
    <div className="space-y-4">
      <div className="space-y-5">
        <h1 className="text-[20px] font-semibold">Review and Submit</h1>
        <div className="space-y-3">
          <div className="grid grid-cols-2">
            <div className="space--y-2">
              <p role="heading" className="text-[10px] text-[#888888]">
                FIRST NAME
              </p>
              <p className="text-sm">Chike</p>
            </div>
            <div className="space--y-2">
              <p role="heading" className="text-[10px] text-[#888888]">
                LAST NAME
              </p>
              <p className="text-sm">Opara</p>
            </div>
          </div>
          <div className="space--y-2">
            <p role="heading" className="text-[10px] text-[#888888]">
              EMAIL ADDRESS
            </p>
            <p className="text-sm">chikexyz@domain.com</p>
          </div>
          <div className="space--y-2">
            <p role="heading" className="text-[10px] text-[#888888]">
              RESIDENTIAL ADDRESS
            </p>
            <p className="text-sm">1, anywhere street, Ikeja, Lagos</p>
          </div>
          <div className="space--y-2">
            <p role="heading" className="text-[10px] text-[#888888]">
              OFFICE ADDRESS
            </p>
            <p className="text-sm">123, Somewhere street, Ikoyi, Lagos</p>
          </div>
          <div className="space--y-2">
            <p role="heading" className="text-[10px] text-[#888888] capitalize">
              DATE OF BIRTH
            </p>
            <p className="text-sm">17/04/1914</p>
          </div>
          <div className="space--y-2">
            <p role="heading" className="text-[10px] text-[#888888] capitalize">
              NEXT OF KIN
            </p>
            <p className="text-sm">Shina Peters</p>
          </div>
          <div className="space--y-2">
            <p role="heading" className="text-[10px] text-[#888888] capitalize">
              RELATIONSHIP NEXT OF KIN
            </p>
            <p className="text-sm">Uncle</p>
          </div>
          <div className="space--y-2">
            <p role="heading" className="text-[10px] text-[#888888] capitalize">
              NEXT OF KIN TELEPHONE
            </p>
            <p className="text-sm">08189357878</p>
          </div>
          <div className="space--y-2">
            <p role="heading" className="text-[10px] text-[#888888] capitalize">
              NEXT OF KIN ADDRESS
            </p>
            <p className="text-sm">1, Village street, Abule</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button
            type="button"
            size="lg"
            // pending={isBack}
            pendingText="Please wait"
            className="w-full"
            // onClick={handleBack}
            variant="outline"
          >
            Back
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="submit"
                size="lg"
                pendingText="Please wait"
                className="w-full"
              >
                Submit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:w-[380px]">
              <AlertDialogHeader>
                <AlertDialogDescription className="flex justify-center items-center w-full">
                  <div className="text-center space-y-4">
                    <SuccessIcon className="mx-auto" />
                    <div className="space-y-1">
                      <h1 className="font-bold text-[#222222]">
                        Your records have been updated
                      </h1>
                      <p className="text-[12px] font-light">
                        You can now proceed to your dashboard.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      pending={isPending}
                      pendingText="Please wait..."
                      onClick={handleComplete}
                    >
                      Go to dashboard
                    </Button>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default ReviewOnboarding;
