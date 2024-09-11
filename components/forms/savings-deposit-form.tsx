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
import { Textarea } from '../ui/textarea';
import { CashDepositIcon, SuccessIcon } from '@/assets/svgs';
import { Label } from '../ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBanks } from '@/config/apis/dashboard';
import {
  BANKS_KEY,
  DEPOSIT_LOG_KEY,
  SAVINGS_PROFILE_KEY,
  TARGETED_SAVINGS_KEY,
} from '@/lib/query-keys';
import {
  depositSavings,
  getSavingsProfile,
  getStandardSavings,
} from '@/config/apis/savings';
import { ErrorMessages } from '../showError';
import { Landmark } from 'lucide-react';
import { TARGET_SAVINGS_EP } from '@/config/endpoints';

export const savingsDepositSchema = z
  .object({
    savingsType: z.string().min(1, { message: 'Savings type is required' }),
    targetSavingsProfile: z
      .string()
      .min(1, { message: 'Savings product is required' }),
    selectAccount: z.string().min(1, { message: 'Bank is required' }),
    amount: z.string().min(1, { message: 'Amount is required' }),
    narration: z.string().min(1, { message: 'Narration is required' }),
    paymentOption: z.string().min(1, { message: 'Payment method is required' }),
  })
  .refine(
    (data) => {
      return (
        data.targetSavingsProfile !== '2' ||
        data.targetSavingsProfile.length > 0
      );
    },
    {
      message: 'Savings product is required when savings type is 2',
      path: ['targetSavingsProfile'],
    }
  );

export default function SavingsDepositForm({
  setOpen,
}: {
  setOpen: (arg: boolean) => void;
}) {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = React.useState<string>('');
  const queryClient: any = useQueryClient();
  const [errorField, setErrorField] = React.useState<any | null>(null);
  const form = useForm<z.infer<typeof savingsDepositSchema>>({
    resolver: zodResolver(savingsDepositSchema),
    defaultValues: {
      savingsType: '',
      targetSavingsProfile: '',
      narration: '',
      paymentOption: 'bank',
      selectAccount: '',
      amount: '',
    },
  });

  const watchSavingsType = form.watch('savingsType');

  const { data, isLoading, isError } = useQuery({
    queryFn: getBanks,
    queryKey: [BANKS_KEY],
  });

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  }: any = useQuery({
    queryFn: () => getStandardSavings(TARGET_SAVINGS_EP),
    queryKey: [TARGETED_SAVINGS_KEY],
    enabled: watchSavingsType === '2',
  });

  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
  } = useQuery({
    queryFn: getSavingsProfile,
    queryKey: [SAVINGS_PROFILE_KEY],
  });

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

  const { mutate, isPending } = useMutation({
    mutationFn: depositSavings,
    onSuccess: () => {
      setOpenDialog(true);
      queryClient.invalidateQueries(DEPOSIT_LOG_KEY);
    },
    onError: (error: any) =>
      setErrorField(
        error.response.data.errors || { Error: [error.response.data.error] }
      ),
  });

  React.useEffect(() => {
    const paymentMethod = form.watch((value, { name, type }) => {
      setSelectedMethod(value.paymentOption || '');
    });
    return () => paymentMethod.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch]);

  function onSubmit(data: z.infer<typeof savingsDepositSchema>) {
    setErrorField('');
    mutate(data);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <ErrorMessages errors={errorField} setErrors={setErrorField} />
          <FormField
            control={form.control}
            name="savingsType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a savings type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select savings type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading1 ? (
                      <p className="text-sm font-light px-4 py-2 italic">
                        Loading types...
                      </p>
                    ) : (
                      <React.Fragment>
                        {data1?.map((each) => (
                          <SelectItem value={each.id.toString()}>
                            {each.name}
                          </SelectItem>
                        ))}
                      </React.Fragment>
                    )}
                    {isError1 && (
                      <p className="text-sm font-light italic p-3 text-destructive">
                        Can't fetch type at the moment
                      </p>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchSavingsType === '2' && (
            <FormField
              control={form.control}
              name="targetSavingsProfile"
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
                      {isLoading2 ? (
                        <p className="px-4 py-2 text-xs font-light text-primary">
                          Loading savings product...
                        </p>
                      ) : (
                        <React.Fragment>
                          {data2?.length === 0 ? (
                            <p className="px-4 py-2 text-sm font-light">
                              No savings product
                            </p>
                          ) : (
                            <React.Fragment>
                              {data2?.map(
                                (each: {
                                  savings_product: { name: string; id: string };
                                }) => (
                                  <SelectItem
                                    value={each.savings_product.id.toString()}
                                    key={each.savings_product.name}
                                  >
                                    {each.savings_product.name}
                                  </SelectItem>
                                )
                              )}
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                      {isError2 && (
                        <p className="px-4 py-2 text-sm font-light text-destructive">
                          An error occured while fetching loan product...
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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
                    placeholder="Enter narration here"
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
                        field.value.toLowerCase() ===
                          method.name.toLowerCase() && 'border-primary',
                        fieldState.error?.message && 'border-destructive'
                      )}
                      onClick={() => {
                        form.setValue(
                          'paymentOption',
                          method.name.toLowerCase()
                        );
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

          {form.getValues('paymentOption') === 'bank' && (
            <FormField
              control={form.control}
              name="selectAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select bank</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                              {`${each.bank_list.name} - ${each.accountNumber}`}
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
          )}

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
      </Form>

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
                  onClick={() => {
                    setOpen(false);
                    setOpenDialog(false);
                  }}
                >
                  Complete
                </Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
