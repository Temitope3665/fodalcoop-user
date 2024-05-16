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
import { wait } from '@/lib/utils';
import { loanType } from '@/config/loan-config';

export const formSchema = z.object({
  loanType: z.string().min(1, { message: 'Loan type is required' }),
  loanProduct: z.string().min(1, { message: 'Loan product is required' }),
  repaymentModel: z.string().min(1, { message: 'Repayment model is required' }),
  amount: z.string().min(1, { message: 'Amount is required' }),
  interest: z.string().min(1, { message: 'Loan interest is required' }),
  total: z.string().min(1, { message: 'Total is required' }),
});

export default function LoanRequestForm({
  setOpen,
  setCurrentFormView,
}: {
  setOpen: (arg: boolean) => void;
  setCurrentFormView: (arg: number) => void;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanType: '',
      loanProduct: '',
      repaymentModel: '',
      amount: '',
      interest: '',
      total: '',
    },
  });
  const [selectedItem, setSelectedItem] = React.useState(loanType[0]);
  const [isPending, setIsPending] = React.useState(false);

  function onSubmit() {
    setIsPending(true);
    wait().then(() => {
      setCurrentFormView(2);
      setIsPending(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="loanType"
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

        {form.getValues('loanType') && (
          <FormField
            control={form.control}
            name="loanProduct"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Select loan product</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedItem.loanType.map((loan) => (
                      <SelectItem value={loan.type}>{loan.type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.getValues('loanProduct') && (
          <React.Fragment>
            <FormField
              control={form.control}
              name="amount"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Enter loan amount</FormLabel>
                  <FormControl className="relative">
                    <FormGroup>
                      <p className="absolute pl-3">₦</p>
                      <Input
                        placeholder="200,000"
                        className="pl-6"
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
              name="interest"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Loan interest</FormLabel>
                  <FormControl className="relative">
                    <FormGroup>
                      <p className="absolute pl-3">₦</p>
                      <Input
                        placeholder="200,000"
                        className="pl-6"
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
              name="total"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Total loan amount</FormLabel>
                  <FormControl className="relative">
                    <FormGroup>
                      <p className="absolute pl-3">₦</p>
                      <Input
                        placeholder="200,000"
                        className="pl-6"
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
          </React.Fragment>
        )}

        {form.getValues('total') && (
          <FormField
            control={form.control}
            name="repaymentModel"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Select loan repayment</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan repayment model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedItem.repaymentModel.map((loan) => (
                      <SelectItem value={loan.model}>{loan.model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
            pending={isPending}
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
