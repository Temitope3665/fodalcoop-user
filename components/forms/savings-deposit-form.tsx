'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
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

import { ONBOARDING_STEP_ONE_URL } from '@/config/paths';
import { cn, wait } from '@/lib/utils';
import { loanType } from '@/config/loan-config';
import { Textarea } from '../ui/textarea';
import { CashDepositIcon, TransferDepositIcon } from '@/assets/svgs';
import { Label } from '../ui/label';

export const formSchema = z.object({
  savingsType: z.string().min(1, { message: 'Savings type is required' }),
  bank: z.string().min(1, { message: 'Bank is required' }),
  amount: z.string().min(1, { message: 'Amount is required' }),
  narration: z.string().min(1, { message: 'Narration is required' }),
  paymentMethod: z.string().min(1, { message: 'Payment method is required' }),
  total: z.string().min(1, { message: 'Total is required' }),
});

export default function SavingsDepositForm({
  setOpen,
}: {
  setOpen: (arg: boolean) => void;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      savingsType: '',
      narration: '',
      paymentMethod: '',
      bank: '',
      amount: '',
      total: '',
    },
  });
  const [selectedItem, setSelectedItem] = React.useState(loanType[0]);
  const [isPending, setIsPending] = React.useState(false);

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

  function onSubmit() {
    setIsPending(true);
    wait().then(() => {
      setIsPending(false);
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="savingsType"
          render={({ field, fieldState }) => (
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
                    <SelectItem
                      value={loan.type}
                      onClick={() => setSelectedItem(loan)}
                    >
                      {loan.name}
                    </SelectItem>
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
          name="bank"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Select bank</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loanType.map((loan) => (
                    <SelectItem
                      value={loan.type}
                      onClick={() => setSelectedItem(loan)}
                    >
                      {loan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
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
                      form.getValues('paymentMethod') === method.name &&
                        'border-primary',
                      fieldState.error?.message && 'border-destructive'
                    )}
                    onClick={() => {
                      form.setValue('paymentMethod', method.name);
                      form.setError('paymentMethod', { message: '' });
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
            pendingText="Please wait"
            className="w-full"
          >
            Proceed
          </Button>
        </div>
      </form>
    </Form>
  );
}
