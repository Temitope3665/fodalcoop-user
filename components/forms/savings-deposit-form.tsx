'use client';

import * as React from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';

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

import { cn } from '@/lib/utils';
import { loanType } from '@/config/loan-config';
import { Textarea } from '../ui/textarea';
import {
  CashDepositIcon,
  SuccessIcon,
  TransferDepositIcon,
} from '@/assets/svgs';
import { Label } from '../ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBanks } from '@/config/apis/dashboard';
import { BANKS_KEY } from '@/lib/query-keys';
import { depositSavings } from '@/config/apis/savings';
import { ErrorMessages } from '../showError';

export const savingsDepositSchema = z.object({
  savingsType: z.string().min(1, { message: 'Savings type is required' }),
  selectAccount: z.string().min(1, { message: 'Bank is required' }),
  amount: z.string().min(1, { message: 'Amount is required' }),
  narration: z.string().min(1, { message: 'Narration is required' }),
  paymentOption: z.string().min(1, { message: 'Payment method is required' }),
});

export default function SavingsDepositForm({
  setOpen,
}: {
  setOpen: (arg: boolean) => void;
}) {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const queryClient = useQueryClient();
  const [errorField, setErrorField] = React.useState<any | null>(null);
  const form = useForm<z.infer<typeof savingsDepositSchema>>({
    resolver: zodResolver(savingsDepositSchema),
    defaultValues: {
      savingsType: '',
      narration: '',
      paymentOption: '',
      selectAccount: '',
      amount: '',
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryFn: getBanks,
    queryKey: [BANKS_KEY],
  });

  const paymentMethods: { name: string; icon: React.ReactNode }[] = [
    {
      name: 'Cash payment',
      icon: <CashDepositIcon className="mx-auto" />,
    },
    {
      name: 'Transfer/Deposit',
      icon: <TransferDepositIcon className="mx-auto" />,
    },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: depositSavings,
    onSuccess: () => {
      setOpen(false);
      setOpenDialog(true);
      // queryClient.invalidateQueries()
    },
    onError: (error: any) =>
      setErrorField(
        error.response.data.errors || { Error: [error.response.data.error] }
      ),
  });

  function onSubmit(data: z.infer<typeof savingsDepositSchema>) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <ErrorMessages errors={errorField} setErrors={setErrorField} />
        <FormField
          control={form.control}
          name="savingsType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a savings type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select savings type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loanType.map((loan) => (
                    <SelectItem value={loan.type}>{loan.name}</SelectItem>
                  ))}
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
              <FormLabel>Enter amount to pay</FormLabel>
              <FormControl className="relative">
                <FormGroup>
                  <p className="absolute pl-3 right-10 text-[#888888]">NGN</p>
                  <Input
                    placeholder="200,000"
                    className="pr-6"
                    type="number"
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
          name="narration"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Narration</FormLabel>
              <FormControl className="relative">
                <Textarea
                  placeholder="200,000"
                  className="pr-6"
                  invalid={fieldState.invalid}
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
                  {isLoading ? (
                    <p className="text-sm font-light italic p-3">
                      Loading banks
                    </p>
                  ) : (
                    <React.Fragment>
                      {data?.map((each) => (
                        <SelectItem
                          value={each.id.toString()}
                          key={each.accountNumber}
                        >
                          {`${each.bank.name} - ${each.accountNumber}`}
                        </SelectItem>
                      ))}
                    </React.Fragment>
                  )}
                  {isError && (
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
          name="paymentOption"
          render={({ field, fieldState }) => (
            <FormItem>
              <Label>Select payment method</Label>
              <div className="grid grid-cols-2 gap-4 text-sm font-light text-center w-full">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    role="button"
                    className={cn(
                      'bg-[#FAFAFA] px-4 py-4 lg:py-6 rounded-sm border space-y-1 trans',
                      form.getValues('paymentOption') === method.name &&
                        'border-primary',
                      fieldState.error?.message && 'border-destructive'
                    )}
                    onClick={() => {
                      form.setValue('paymentOption', method.name);
                      form.setError('paymentOption', { message: '' });
                    }}
                  >
                    <div className="mx-auto text-center">{method.icon}</div>
                    <p>{method.name}</p>
                  </div>
                ))}
              </div>
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
            Cancel
          </Button>
          <Button
            type="submit"
            pending={isPending}
            pendingText="Please wait..."
            className="w-full"
          >
            Save
          </Button>
        </div>
      </form>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="sm:w-[380px]">
          <AlertDialogHeader>
            <AlertDialogDescription className="flex justify-center items-center w-full">
              <div className="text-center space-y-4">
                <SuccessIcon className="mx-auto" />
                <div className="space-y-1">
                  <h1 className="font-bold text-[#222222]">
                    Savings Deposit Completed Successfully!
                  </h1>
                  <p className="text-[12px] font-light">
                    Your savings deposit has been successfully completed. Your
                    funds are now securely added to your account, bringing you
                    one step closer to achieving your financial goals.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  pending={isPending}
                  pendingText="Please wait..."
                  onClick={() => setOpenDialog(false)}
                >
                  Complete
                </Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
}
