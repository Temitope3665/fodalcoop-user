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
import Link from 'next/link';
import { ExternalLink, Trash2 } from 'lucide-react';

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

  const guarantors = currentLoanCreation
    ? currentLoanCreation.guarantor.loan_guarantor
    : [];

  const loanType = currentLoanCreation
    ? JSON.parse(currentLoanCreation.loanType).name
    : '';

  const { mutate, isPending } = useMutation({
    mutationFn: submitLoanRequest,
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries(LOAN_APPLICATIONS_KEY);
      queryClient.invalidateQueries(RUNNING_LOAN_KEY);
    },
    onError: (error: any) =>
      setCustomErrorField(error?.response?.data?.message || 'An error occured'),
  });

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

      {loanType === 'Mortgage Loan' && (
        <div>
          <p className="font-bold text-[10px] text-[#666666]">
            MORTGAGE LOAN DOCUMENT
          </p>
          <React.Fragment>
            <div className="grid grid-cols-2 gap-4 border px-4 py-2 bg-[#EDF0FF] border-[#EDF0FF] text-xs">
              <p>Title</p>
              <p>Document</p>
            </div>
            {currentLoanCreation.documents?.map((field: any, index: number) => (
              <div key={field.id + index} className="space-y-2">
                <div className="grid py-2 px-4 grid-cols-2 gap-4 border text-xs">
                  <div className="flex space-x-2 items-center">
                    <p className="col-span-0.5">{index + 1}.</p>
                    <p>{field.title}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <Link href={field.file_path} target="_blank">
                      <div className="flex space-x-2 items-center text-sm">
                        <p className="text-xs">Link</p>
                        <ExternalLink size={16} strokeWidth={1} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        </div>
      )}

      {loanType === 'Capital Loan' && (
        <div>
          <p className="font-bold text-[10px] text-[#666666]">
            CAPITAL PRODUCT LOAN
          </p>
          <React.Fragment>
            <div className="grid grid-cols-5 border p-2 gap-2 text-xs bg-[#EDF0FF] border-[#EDF0FF]">
              <p>Name</p>
              <p>Qty</p>
              <p>Rate</p>
              <p>Amount</p>
              <p>Inv. No.</p>
            </div>
            {currentLoanCreation.capital_loan_product?.map(
              (field: any, index: number) => (
                <div key={field.id + index} className="space-y-2">
                  <div className="grid py-2 px-2 grid-cols-5 gap-2 border text-xs">
                    <p>{field.title}</p>
                    <p>{field.qty}</p>
                    <p>{formatCurrency(field.rate)}</p>
                    <p>{formatCurrency(field.amount)}</p>
                    <div className="flex justify-between w-full">
                      <p>{field.invoice_number}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </React.Fragment>
        </div>
      )}

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
