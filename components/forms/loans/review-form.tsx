import ShowError from '@/components/showError';
import { Button } from '@/components/ui/button';
import { submitLoanRequest } from '@/config/apis/loans';
import useStore from '@/lib/use-store';
import { formatCurrency, wait } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { SuccessIcon } from '@/assets/svgs';
import { LOAN_APPLICATIONS_KEY, RUNNING_LOAN_KEY } from '@/lib/query-keys';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ReviewForm = ({
  setCurrentFormView,
  setOpenSheet,
}: {
  setCurrentFormView: (arg: number) => void;
  setOpenSheet: (arg: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const queryClient: any = useQueryClient();
  const setCurrentLoanCreation = useStore(
    (state) => state.setCurrentLoanCreation
  );
  const [customErrorField, setCustomErrorField] = React.useState<string>('');
  const { currentLoanCreation } = useStore();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  console.log(currentLoanCreation, '->currentLoanCreation');

  const guarantors = currentLoanCreation
    ? currentLoanCreation.guarantor.loan_guarantor
    : [];

  console.log(guarantors, '-> guarantos');

  const { mutate, isPending } = useMutation({
    mutationFn: submitLoanRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(LOAN_APPLICATIONS_KEY);
      queryClient.invalidateQueries(RUNNING_LOAN_KEY);
      setOpen(true);
    },
    onError: (error: any) =>
      setCustomErrorField(error?.response?.data?.message || 'An error occured'),
  });

  console.log(currentLoanCreation, '-> #D6D6D6');

  const handleSubmit = () => {
    const payload = {
      loanProduct: JSON.parse(currentLoanCreation.loanProduct).id,
      paymentOption: '1',
      amount: currentLoanCreation.amount,
      interest: currentLoanCreation.interest,
      totalAmount: currentLoanCreation.total,
      loanProfile: JSON.parse(currentLoanCreation.loanType).id,
      monthlyRepayment: currentLoanCreation.repaymentModel,
      duration: JSON.parse(currentLoanCreation.loanProduct).duration,
    };
    console.log(payload);
    mutate(payload);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSheet(false);
    const params = new URLSearchParams(searchParams);
    params.set('tab', 'Applications');
    replace(`${pathname}?${params.toString()}`);
    setCurrentLoanCreation(null);
  };

  function handleBack() {
    setCustomErrorField('');
    setIsLoading(true);
    wait().then(() => {
      setCurrentFormView(2);
      setIsLoading(false);
    });
  }

  return (
    <div className="space-y-4">
      <ShowError
        errorMessage={customErrorField}
        setErrorMessage={setCustomErrorField}
      />
      <div>
        <p className="font-bold text-[10px] text-[#666666]">LOAN TYPE</p>
        <p className="text-xs">
          {currentLoanCreation
            ? JSON.parse(currentLoanCreation.loanType).name
            : '-'}
        </p>
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">LOAN PRODUCT</p>
        <p className="text-xs">
          {currentLoanCreation
            ? JSON.parse(currentLoanCreation.loanProduct).name
            : '-'}
        </p>
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">LOAN AMOUNT</p>
        <p className="text-xs">
          NGN {formatCurrency(currentLoanCreation?.amount) || '-'}.00
        </p>
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">LOAN INTEREST</p>
        <p className="text-xs">
          {formatCurrency(currentLoanCreation.interest)}%
        </p>
      </div>
      <div className="">
        <p className="font-bold text-[10px] text-[#666666]">GUARANTOR</p>

        {guarantors.length === 0 && (
          <p className="text-xs">No guarantor selected</p>
        )}
        {guarantors.map(
          (guarantor: {
            id: number;
            member: { lastName: string; firstName: string };
            liability: string;
          }) => (
            <div className="space-y-2" key={guarantor.id}>
              <div className="grid grid-cols-2 text-xs">
                <p>{`${guarantor.member.firstName} ${guarantor.member.lastName}`}</p>
                <p>NGN {formatCurrency(guarantor.liability)}.00</p>
              </div>
            </div>
          )
        )}
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">TOTAL AMOUNT</p>
        <p className="text-xs">
          NGN {formatCurrency(currentLoanCreation.total)}.00
        </p>
      </div>

      <div className="flex space-x-4">
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleBack}
          pending={isLoading}
          pendingText="Please wait..."
        >
          Back
        </Button>
        <Button
          type="submit"
          pendingText="Please wait"
          className="w-full"
          pending={isPending}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="sm:w-[380px]">
          <AlertDialogHeader>
            <AlertDialogDescription className="flex justify-center items-center w-full">
              <div className="text-center space-y-4">
                <SuccessIcon className="mx-auto" />
                <div className="space-y-1">
                  <h1 className="font-bold text-[#222222]">
                    Your loan request has been submitted.
                  </h1>
                  <p className="text-[12px] font-light">
                    Your loan application has been successfully submitted and is
                    now under review. You will receive a notification once the
                    application is processed. Thank you for choosing our
                    services.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  pending={isPending}
                  pendingText="Please wait..."
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReviewForm;
