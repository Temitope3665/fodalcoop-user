'use client';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { SuccessIcon } from '@/assets/svgs';
import React, { useState } from 'react';
import { checkKeysAndValues, converBase64ToFile, wait } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { LOGIN_URL, ONBOARDING_STEP_FOUR_URL } from '@/config/paths';
import { format } from 'date-fns';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAgencies, onboardNewUser } from '@/config/apis/auth';
import { AGENCY_KEY } from '@/lib/query-keys';
import { IDefaultUser } from '@/types';
import { onboardingKeys } from '@/config/constants';
import { ErrorMessages } from '@/components/showError';

const ReviewOnboarding = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isBack, setIsBack] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const getCurrentUser =
    (typeof window !== 'undefined' && localStorage.getItem('new_user')) || '{}';
  const defaultUser: IDefaultUser = JSON.parse(getCurrentUser);

  function handleComplete() {
    setIsPending(true);
    wait().then(() => {
      localStorage.removeItem('new_user');
      router.push(LOGIN_URL);
      setIsPending(false);
    });
  }
  const handleBack = () => {
    setIsBack(true);
    wait().then(() => {
      router.push(ONBOARDING_STEP_FOUR_URL);
      setIsBack(false);
    });
  };
  const { data, isLoading }: any = useQuery({
    queryFn: getAgencies,
    queryKey: [AGENCY_KEY],
  });

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: onboardNewUser,
    onSuccess: () => {
      setOpen(true);
    },
    onError: (error: any) =>
      setError(
        error?.response?.data?.errors || { Error: [error.response.data.error] }
      ),
  });

  const handleSubmit = () => {
    setError(null);
    if (checkKeysAndValues(defaultUser, onboardingKeys)) {
      const base64: string = defaultUser.image;
      const image = converBase64ToFile(base64);
      const payload = {
        ...defaultUser,
        image,
        dob: format(defaultUser.dob, 'yyyy-MM-dd'),
        doe: format(defaultUser.doe, 'yyyy-MM-dd'),
      };
      mutate(payload);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-5">
        <h1 className="text-[20px] font-semibold">Review and Submit</h1>
        <ErrorMessages setErrors={setError} errors={error} />
        <div className="space-y-4">
          <div className="rounded-full w-[60px] h-[60px] flex justify-center items-center bg-[#2F4A891A]">
            <img
              src={defaultUser.image || ''}
              alt="logo"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div className="grid grid-cols-2">
            <div className="space--y-2">
              <p role="heading" className="text-[10px] text-[#888888]">
                FIRST NAME
              </p>
              <p className="text-sm">{defaultUser.firstName || ''}</p>
            </div>
            <div className="space--y-2">
              <p role="heading" className="text-[10px] text-[#888888]">
                LAST NAME
              </p>
              <p className="text-sm">{defaultUser.lastName || ''}</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="space--y-2">
              <p role="heading" className="text-[10px] text-[#888888]">
                EMAIL ADDRESS
              </p>
              <p className="text-sm">{defaultUser.email || ''}</p>
            </div>
            <div className="space--y-2">
              <p role="heading" className="text-[10px] text-[#888888]">
                PHONE NUMBER
              </p>
              <p className="text-sm">{defaultUser.phone || ''}</p>
            </div>
          </div>
          <div className="space--y-2">
            <p role="heading" className="text-[10px] text-[#888888]">
              RESIDENTIAL ADDRESS
            </p>
            <p className="text-sm">{defaultUser.residential || ''}</p>
          </div>
          <div className="grid grid-cols-2">
            <div className="space--y-2">
              <p role="heading" className="text-[10px] text-[#888888]">
                OFFICE ADDRESS
              </p>
              <p className="text-sm">{defaultUser.offAddress || ''}</p>
            </div>
            <div className="space--y-2">
              <p role="heading" className="text-[10px] text-[#888888]">
                SELECTED AGENCY
              </p>
              <p className="text-sm">
                {!isLoading && data
                  ? data.find(
                      (item: { id: string }) =>
                        item?.id?.toString() === defaultUser.agency
                    )?.name
                  : ''}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="space--y-2">
              <p
                role="heading"
                className="text-[10px] text-[#888888] capitalize"
              >
                DATE OF BIRTH
              </p>
              <p className="text-sm">
                {defaultUser.dob
                  ? format(defaultUser.dob, 'EEE, MMM yyyy')
                  : ''}
              </p>
            </div>
            <div className="space--y-2">
              <p
                role="heading"
                className="text-[10px] text-[#888888] capitalize"
              >
                DATE OF APPOINTMENT
              </p>
              <p className="text-sm">
                {defaultUser.doe
                  ? format(defaultUser.doe, 'EEE, MMM yyyy')
                  : ''}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="space--y-2">
              <p
                role="heading"
                className="text-[10px] text-[#888888] capitalize"
              >
                NEXT OF KIN
              </p>
              <p className="text-sm">{defaultUser.nokName || ''}</p>
            </div>
            <div className="space--y-2">
              <p
                role="heading"
                className="text-[10px] text-[#888888] capitalize"
              >
                RELATIONSHIP NEXT OF KIN
              </p>
              <p className="text-sm">{defaultUser.nokRel || ''}</p>
            </div>
          </div>
          <div className="space--y-2">
            <p role="heading" className="text-[10px] text-[#888888] capitalize">
              NEXT OF KIN TELEPHONE
            </p>
            <p className="text-sm">{defaultUser.nokTel}</p>
          </div>
          <div className="space--y-2">
            <p role="heading" className="text-[10px] text-[#888888] capitalize">
              NEXT OF KIN ADDRESS
            </p>
            <p className="text-sm">{defaultUser.nokAddress}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button
            type="button"
            size="lg"
            pending={isBack}
            pendingText="Please wait"
            className="w-full"
            onClick={handleBack}
            variant="outline"
          >
            Back
          </Button>
          <Button
            type="submit"
            size="lg"
            pendingText="Please wait"
            className="w-full"
            pending={isSubmitting}
            disabled={!checkKeysAndValues(defaultUser, onboardingKeys)}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="sm:w-[380px]">
          <AlertDialogHeader>
            <AlertDialogDescription className="flex justify-center items-center w-full">
              <div className="text-center space-y-4">
                <SuccessIcon className="mx-auto" />
                <div className="space-y-1">
                  <h1 className="font-bold text-[#222222]">
                    Account created successfully!
                  </h1>
                  <p className="text-[12px] font-light">
                    Thank you for creating your account. An update will be sent
                    to your email with instructions for the next steps to
                    complete your registration.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  pending={isPending}
                  pendingText="Please wait..."
                  onClick={handleComplete}
                >
                  Go back home
                </Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReviewOnboarding;
// self_update: 0
