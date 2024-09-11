'use client';

import * as React from 'react';

import * as z from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormGroup,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn, formatCurrency, wait } from '@/lib/utils';
import { Landmark } from 'lucide-react';
import { toast } from 'sonner';
import useStore from '@/lib/use-store';
import { Textarea } from '@/components/ui/textarea';
import { CashDepositIcon, UploadFileIcon } from '@/assets/svgs';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query';
import { getLoanProfile, getPaymentSchedule } from '@/config/apis/loans';
import { BANKS_KEY, LOAN_PROFILE_KEY } from '@/lib/query-keys';
import { getBanks } from '@/config/apis/dashboard';

export const repaymentFormSchema = z.object({
  loan: z.string().min(1, { message: 'Loan type is required' }),
  narration: z.string({ message: 'Narration is required' }),
  amount: z.string().min(1, { message: 'Amount is required' }),
  paymentOption: z.string().min(1, { message: 'Payment method is required' }),
  file: z.string().min(1, { message: 'Proof of payment is required' }),
  selectAccount: z.string().min(1, { message: 'Account is required' }),
  loanProfile: z.string({ message: 'Loan profile is required' }),
});

export default function LoanRepaymentForm({
  setOpen,
  setCurrentFormView,
  loan,
}: {
  setOpen: (arg: boolean) => void;
  setCurrentFormView: (arg: number) => void;
  loan: { id: number; loan_product: { name: string } };
}) {
  const { currentLoanRepayment } = useStore();
  const [file, setFile] = React.useState(currentLoanRepayment?.file || '');
  const setCurrentLoanRepayment = useStore(
    (state) => state.setCurrentLoanRepayment
  );

  const form = useForm<z.infer<typeof repaymentFormSchema>>({
    resolver: zodResolver(repaymentFormSchema),
    defaultValues: {
      loan: currentLoanRepayment?.loan || loan.id.toString(),
      amount: currentLoanRepayment?.amount || '',
      paymentOption: currentLoanRepayment?.paymentOption || 'bank',
      narration: currentLoanRepayment?.narration || '',
      file: currentLoanRepayment?.file || '',
      loanProfile: currentLoanRepayment?.loanProfile || '',
      selectAccount: currentLoanRepayment?.selectAccount || '',
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryFn: getLoanProfile,
    queryKey: [LOAN_PROFILE_KEY],
  });

  const {
    data: banks,
    isLoading: isFetchingBanks,
    isError: isBankError,
  } = useQuery({
    queryFn: getBanks,
    queryKey: [BANKS_KEY],
  });

  const [isRouting, setIsRouting] = React.useState(false);

  const paymentMethods: {
    name: string;
    icon: React.ReactNode;
  }[] = [
    {
      name: 'Bank',
      icon: <Landmark className="mx-auto" />,
    },
    {
      name: 'Cash',
      icon: <CashDepositIcon className="mx-auto" />,
    },
  ];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize: number = 5 * 1024 * 1024;
    const file: any = e.target.files?.[0];
    if (file.size >= maxSize) {
      console.error('File is too large. Max size of 5MB');
    } else {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          form.setValue('file', result);
          setFile(result);
          form.clearErrors('file');
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const {
    data: schedules,
    isLoading: fetchingSchedules,
    isError: isFetchingError,
  } = useQuery({
    queryFn: () => getPaymentSchedule(loan.id),
    queryKey: ['payment_schedule'],
  });

  function onSubmit(data: z.infer<typeof repaymentFormSchema>) {
    setIsRouting(true);
    setCurrentLoanRepayment(data);
    wait().then(() => {
      setCurrentFormView(2);
      setIsRouting(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="loanProfile"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Select loan type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoading ? (
                    <p className="px-4 py-2 text-xs font-light text-primary">
                      Loading loan type...
                    </p>
                  ) : (
                    <React.Fragment>
                      {data?.length === 0 ? (
                        <p className="px-4 py-2 text-xs font-light text-primary">
                          No loan type
                        </p>
                      ) : (
                        <React.Fragment>
                          {data?.map((each) => (
                            <SelectItem
                              value={JSON.stringify(each)}
                              key={each.name}
                            >
                              {each.name}
                            </SelectItem>
                          ))}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                  {isError && (
                    <p className="px-4 py-2 text-sm font-light text-destructive">
                      An error occured while fetching loan type...
                    </p>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="loan"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Select loan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan to repay" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <React.Fragment>
                    <SelectItem value={loan.id.toString()}>
                      {loan.loan_product.name}
                    </SelectItem>
                  </React.Fragment>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Select amount to pay</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fetchingSchedules ? (
                    <p className="px-4 py-2 text-xs font-light text-primary">
                      Loading payment schedules...
                    </p>
                  ) : (
                    <React.Fragment>
                      {schedules?.length === 0 ? (
                        <p className="px-4 py-2 text-xs font-light text-primary">
                          No payment schedules
                        </p>
                      ) : (
                        <React.Fragment>
                          {schedules?.map((each, index) => (
                            <SelectItem
                              value={JSON.stringify(each)}
                              key={each.amount + index}
                            >
                              {formatCurrency(each.amount)}
                            </SelectItem>
                          ))}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                  {isFetchingError && (
                    <p className="px-4 py-2 text-sm font-light text-destructive">
                      An error occured while fetching repayment schedules...
                    </p>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="narration"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Enter narration</FormLabel>
              <FormControl className="relative">
                <FormGroup>
                  <Textarea
                    placeholder="Enter narration"
                    invalid={fieldState.invalid}
                    {...field}
                  />
                </FormGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentOption"
          render={({ field, fieldState }) => (
            <FormItem>
              <Label>Select payment method</Label>
              <div className="grid grid-cols-2 gap-6 text-sm font-light text-center w-full">
                {paymentMethods.map((method) => (
                  <button
                    key={method.name}
                    role="button"
                    type="button"
                    className={cn(
                      'bg-[#FAFAFA] px-4 py-2 lg:py-2 rounded-sm border space-y-1 trans text-primary',
                      field.value.toLowerCase() === method.name.toLowerCase() &&
                        'border-primary',
                      fieldState.error?.message && 'border-destructive'
                    )}
                    onClick={() => {
                      form.setValue('paymentOption', method.name.toLowerCase());
                      form.setError('paymentOption', { message: '' });
                    }}
                    disabled={
                      field.value.toLowerCase() !== method.name.toLowerCase()
                    }
                  >
                    <div className="mx-auto text-center">{method.icon}</div>
                    <p>{method.name}</p>
                  </button>
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="selectAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select bank</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isFetchingBanks ? (
                    <p className="text-sm font-light italic p-3">
                      Loading banks
                    </p>
                  ) : (
                    <React.Fragment>
                      {banks?.map((each) => (
                        <SelectItem
                          value={JSON.stringify(each)}
                          key={each.accountNumber}
                        >
                          {`${each.bank_list.name} - ${each.accountNumber}`}
                        </SelectItem>
                      ))}
                    </React.Fragment>
                  )}
                  {isBankError && (
                    <p className="text-sm font-light italic p-3 text-destructive">
                      Can't fetch banks at the moment
                    </p>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-light">
                Attach proof of payment
              </FormLabel>
              <FormControl>
                <FormGroup>
                  <div className="border-[#7C91D0] p-4 rounded-md bg-[#F4F7FF] border-dashed border w-full text-sm">
                    <div className="flex items-center space-x-3">
                      {field.value ? (
                        <div className="">
                          <img
                            src={file}
                            alt="image"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                      ) : (
                        <UploadFileIcon />
                      )}
                      <p className="font-light">
                        Drag files here to upload or{' '}
                        <span className="text-primary font-semibold">
                          click to browse
                        </span>
                      </p>
                    </div>
                  </div>
                  <Input
                    type="file"
                    className="absolute h-full border-b border-0 w-fit rounded-none inset-0 cursor-pointer opacity-0"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleUpload}
                  />
                </FormGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Back
          </Button>
          <Button
            type="submit"
            pending={isRouting}
            pendingText="Please wait"
            className="w-full"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
