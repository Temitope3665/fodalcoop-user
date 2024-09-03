import ShowError from '@/components/showError';
import { Button } from '@/components/ui/button';
import { submitLoanRepaymentDeposit } from '@/config/apis/loans';
import useStore from '@/lib/use-store';
import { converBase64ToFile, formatCurrency, wait } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { SuccessIcon } from '@/assets/svgs';
import { REPAYMENT_LOAN_KEY } from '@/lib/query-keys';

const RepayReviewForm = ({
  setCurrentFormView,
  setOpenSheet,
  loan,
}: {
  setCurrentFormView: (arg: number) => void;
  setOpenSheet: (arg: boolean) => void;
  loan: { id: number; loan_product: { name: string } };
}) => {
  const [open, setOpen] = useState(false);
  const queryClient: any = useQueryClient();
  const setCurrentLoanRepayment = useStore(
    (state) => state.setCurrentLoanRepayment
  );
  const [customErrorField, setCustomErrorField] = React.useState<string>('');
  const { currentLoanRepayment } = useStore();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: submitLoanRepaymentDeposit,
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries(REPAYMENT_LOAN_KEY);
    },
    onError: (error: any) =>
      setCustomErrorField(error?.response?.data?.message || 'An error occured'),
  });

  const handleSubmit = () => {
    const base64: string = currentLoanRepayment?.file || '';
    const file = converBase64ToFile(base64);
    const payload = {
      file,
      narration: currentLoanRepayment?.narration || '',
      paymentOption: currentLoanRepayment?.paymentOption || '',
      amount: JSON.parse(currentLoanRepayment?.amount || '{}').amount,
      loanProfile: JSON.parse(currentLoanRepayment?.loanProfile || '{}').id,
      repaymentLog: JSON.parse(currentLoanRepayment?.amount || '{}').id,
      selectAccount: JSON.parse(currentLoanRepayment?.amount || '{}').id,
    };
    console.log(payload);
    mutate(payload);
  };

  const amount = currentLoanRepayment
    ? JSON.parse(currentLoanRepayment?.amount || '{}')?.amount
    : 'N/A';

  const handleComplete = () => {
    setOpen(false);
    setOpenSheet(false);
    setCurrentFormView(1);
    setCurrentLoanRepayment(null);
  };

  function handleBack() {
    setIsLoading(true);
    wait().then(() => {
      setCurrentFormView(1);
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
        <p className="font-bold text-[10px] text-[#666666]">PROOF OF PAYMENT</p>
        <img
          src={currentLoanRepayment?.file || 'N/A'}
          alt="image"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">LOAN</p>
        <p className="text-xs capitalize">{loan?.loan_product?.name || ''}</p>
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">PAYMENT OPTION</p>
        <p className="text-xs capitalize">
          {currentLoanRepayment?.paymentOption || 'N/A'}
        </p>
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">LOAN PROFILE</p>
        <p className="text-xs capitalize">
          {currentLoanRepayment
            ? JSON.parse(currentLoanRepayment?.loanProfile || '{name: ""}')
                ?.name
            : 'N/A'}
        </p>
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">PAYMENT OPTION</p>
        <p className="text-xs">{currentLoanRepayment?.narration || 'N/A'}</p>
      </div>
      <div>
        <p className="font-bold text-[10px] text-[#666666]">AMOUNT</p>
        <p className="text-xs">NGN {formatCurrency(amount || '') || '-'}.00</p>
      </div>

      <div>
        <p className="font-bold text-[10px] text-[#666666]">SELECTED ACCOUNT</p>
        <p className="text-xs">
          {currentLoanRepayment
            ? JSON.parse(currentLoanRepayment?.selectAccount || '')?.bank_list
                ?.name
            : 'N/A'}
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
                    Your repayment request has been submitted.
                  </h1>
                  <p className="text-[12px] font-light">
                    Your repayment request has been successfully submitted and
                    is now under review. You will receive a notification once it
                    is processed. Thank you for choosing our services.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  pending={isPending}
                  pendingText="Please wait..."
                  onClick={handleComplete}
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

export default RepayReviewForm;
