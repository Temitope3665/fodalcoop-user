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

import { formatCurrency, wait } from '@/lib/utils';
import { loanType } from '@/config/loan-config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addCustomPayments,
  deleteCustomPayments,
  getCustomPayments,
  getLoanProducts,
  getLoanProfile,
} from '@/config/apis/loans';
import {
  CUSTOM_PAYMENT_KEY,
  LOAN_PRODUCT_KEY,
  LOAN_PROFILE_KEY,
} from '@/lib/query-keys';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import useStore from '@/lib/use-store';
import ShowError, { ErrorMessages } from '@/components/showError';

const repaymentSchema = z.object({
  month: z.string().min(1, { message: 'Month is required' }),
  amount: z.string().min(1, { message: 'Amount is required' }),
  monthId: z.string().optional(),
});

export const loanFormSchema = z.object({
  loanType: z.string().min(1, { message: 'Loan type is required' }),
  loanProduct: z.string({ message: 'Loan product is required' }),
  noOfMonth: z.string().optional(),
  repaymentModel: z.string().min(1, { message: 'Repayment model is required' }),
  amount: z.string().min(1, { message: 'Amount is required' }),
  interest: z.string().min(1, { message: 'Loan interest is required' }),
  totalLoan: z.string({ message: 'Total loan is required' }),
  total: z.string().optional(),
  repayment_plan: z.array(repaymentSchema).optional(),
});

export default function LoanRequestForm({
  setOpen,
  setCurrentFormView,
}: {
  setOpen: (arg: boolean) => void;
  setCurrentFormView: (arg: number) => void;
}) {
  const [customErrorField, setCustomErrorField] = React.useState<string>('');
  const queryClient: any = useQueryClient();
  const { currentLoanCreation } = useStore();
  const setCurrentLoanCreation = useStore(
    (state) => state.setCurrentLoanCreation
  );
  const [selectedLoanProduct, setSelectedLoanProduct] = React.useState<
    null | any
  >(null);
  const form = useForm<z.infer<typeof loanFormSchema>>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      loanType: currentLoanCreation?.loanType || '',
      loanProduct: currentLoanCreation?.loanProduct || '',
      noOfMonth: currentLoanCreation?.noOfMonth || '',
      repaymentModel: currentLoanCreation?.repaymentModel || '',
      amount: currentLoanCreation?.amount || '',
      interest: currentLoanCreation?.interest || '',
      totalLoan: currentLoanCreation?.totalLoan || '',
      total: currentLoanCreation?.total || '',
      repayment_plan: currentLoanCreation?.repayment_plan || [
        { month: '', amount: '', monthId: '' },
      ],
    },
  });
  const [selectedItem, setSelectedItem] = React.useState(loanType[0]);
  const [isRouting, setIsRouting] = React.useState(false);

  console.log(currentLoanCreation, '-currentLoanCreation');

  const { fields, append, prepend, remove } = useFieldArray({
    control: form.control,
    name: 'repayment_plan',
  });

  const { data, isLoading, isError } = useQuery({
    queryFn: getLoanProfile,
    queryKey: [LOAN_PROFILE_KEY],
  });

  const {
    data: customPayment,
    isLoading: fetchingCustomPayment,
    isError: isCustomPaymentErorr,
  } = useQuery({
    queryFn: getCustomPayments,
    queryKey: [CUSTOM_PAYMENT_KEY],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addCustomPayments,
    onSuccess: async () => {
      await queryClient.invalidateQueries(CUSTOM_PAYMENT_KEY);
      append({ month: '', amount: '', monthId: '' });
      toast.success('Payment added successfully');
    },
    onError: (error: any) =>
      setCustomErrorField(error?.response?.data?.message || 'An error occured'),
  });

  const { mutate: deleteCustom, isPending: isDeleting } = useMutation({
    mutationFn: deleteCustomPayments,
    onSuccess: async () => {
      await queryClient.invalidateQueries(CUSTOM_PAYMENT_KEY);
      append({ month: '', amount: '', monthId: '' });
      toast.success('Payment removed successfully');
    },
    onError: (error: any) =>
      setCustomErrorField(error?.response?.data?.message || 'An error occured'),
  });

  console.log(customPayment);

  const watchLoanType = form.watch('loanType');
  const watchLoanProduct = form.watch('loanProduct');
  const watchLoanAmount = form.watch('amount');
  const watchRepayment = form.watch('repaymentModel');
  const watchRePaymentPlan = form.watch('repayment_plan');
  const watchTotal = form.watch('total');

  const loanPeriod = selectedLoanProduct
    ? Math.round(Number(selectedLoanProduct.duration) / 30)
    : '';
  const interestRate = selectedLoanProduct
    ? Number(selectedLoanProduct.interest) / 100
    : '';
  const loanInterest = selectedLoanProduct
    ? Number(watchLoanAmount) * Number(interestRate)
    : '';
  const totalLoan: number | null = selectedLoanProduct
    ? Number(loanInterest) + Number(watchLoanAmount)
    : null;
  const monthlyRepayment = selectedLoanProduct
    ? Number(totalLoan) / Number(loanPeriod)
    : '';

  const {
    data: loanProduct,
    isLoading: loadingLoanProduct,
    isError: isLoanProductError,
  } = useQuery({
    queryFn: () => getLoanProducts(JSON.parse(watchLoanType).id),
    queryKey: [LOAN_PRODUCT_KEY, watchLoanType],
    enabled: !!watchLoanType,
  });

  React.useEffect(() => {
    if (watchLoanProduct) {
      console.log(watchLoanProduct, '-> watchLoanProduct');
      const selectedLoanProduct = watchLoanProduct
        ? JSON.parse(watchLoanProduct)
        : null;
      setSelectedLoanProduct(selectedLoanProduct);
      form.setValue('interest', selectedLoanProduct.interest);
    }
  }, [watchLoanProduct]);

  React.useEffect(() => {
    if (watchLoanAmount) {
      form.setValue('total', totalLoan?.toString() || '');
    }
  }, [watchLoanAmount, totalLoan]);

  const [selectedItemToDelete, setSelectedToDelete] =
    React.useState<string>('');

  const handleAppend = async () => {
    setCustomErrorField('');
    const amount = watchRePaymentPlan
      ? watchRePaymentPlan[watchRePaymentPlan?.length - 1].amount
      : '';
    const month = watchRePaymentPlan
      ? watchRePaymentPlan[watchRePaymentPlan?.length - 1].month
      : '';
    const monthId = watchRePaymentPlan
      ? watchRePaymentPlan[watchRePaymentPlan?.length - 1].monthId?.toString()
      : '';

    if (!amount || !month) {
      toast.error('Amount or month must not be empty');
    } else {
      if (!!monthId) {
        append({ month: '', amount: '', monthId: '' });
      } else {
        const payload = {
          amount,
          monthsTarget: watchRePaymentPlan?.length.toString() || '',
          principal: watchLoanAmount,
          totalLoan,
        };
        mutate(payload);
      }
    }
  };

  const hanldeRemoveCustom = async (index: number, id: string) => {
    if (id) {
      setSelectedToDelete(id);
      await deleteCustom(id, { onSuccess: () => remove(index) });
    } else {
      remove(index);
    }
  };

  const handleRepaymentChange = (input: string, field: any, index: number) => {
    const cleanedValue = input.replace(/[^0-9.]/g, ''); // Allow only numbers and decimals
    const value = parseFloat(cleanedValue); // Convert the cleaned string to a floating-point number

    // Check if the input is a valid number and within the allowed range
    if (!isNaN(value) && (Number(totalLoan) - Number(totalAmount)).toFixed(2)) {
      form.clearErrors(`repayment_plan.${index}.amount`);
      form.clearErrors(`repayment_plan.${index}.month`);
      field.onChange(cleanedValue.toString()); // Set the value as a string to retain the decimal point
    } else {
      form.setError(`repayment_plan.${index}.amount`, {
        type: 'onChange',
        message: 'Amount cannot be greater than loan value',
      });
      form.setError(`repayment_plan.${index}.month`, {
        type: 'onChange',
        message: 'Amount cannot be greater than loan value',
      });
    }
  };

  const totalLoanAmountLeft = watchRePaymentPlan
    ? watchRePaymentPlan.reduce((sum, item) => sum + Number(item.amount), 0)
    : null;

  const periodLength = Array.from({ length: loanPeriod || 1 }, (_, i) => ({
    month: (i + 1).toString(),
  }));

  const totalAmount = customPayment
    ? customPayment.data.reduce((sum, item) => {
        return sum + parseFloat(item.amount);
      }, 0)
    : null;

  const totalAmountLeft = customPayment
    ? Number(totalAmount) - Number(customPayment?.total)
    : null;

  React.useEffect(() => {
    if (customPayment) {
      const updatedPayment: any = customPayment.data.map((each) => ({
        month: each?.month || '',
        amount: each?.amount || '',
        monthId: each?.id.toString() || '',
      }));
      form.setValue('repayment_plan', updatedPayment);
    }
  }, [customPayment, fetchingCustomPayment]);

  function onSubmit(data: z.infer<typeof loanFormSchema>) {
    if (data.repaymentModel === 'Self-determined') {
      if (Number(customPayment?.total) !== Number(totalLoan)) {
        toast.error('Kindly complete your loan repayment');
      } else {
        setIsRouting(true);
        setCurrentLoanCreation(data);
        wait().then(() => {
          setCurrentFormView(2);
          setIsRouting(false);
        });
      }
    } else {
      setIsRouting(true);
      setCurrentLoanCreation(data);
      wait().then(() => {
        setCurrentFormView(2);
        setIsRouting(false);
      });
    }
  }

  console.log(form.formState.errors, '->fields');

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
                    {loadingLoanProduct ? (
                      <p className="px-4 py-2 text-xs font-light text-primary">
                        Loading loan product...
                      </p>
                    ) : (
                      <React.Fragment>
                        {loanProduct?.length === 0 ? (
                          <p className="px-4 py-2 text-sm font-light">
                            No loan product
                          </p>
                        ) : (
                          <React.Fragment>
                            {loanProduct?.map((each) => (
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
                    {isLoanProductError && (
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

        {selectedLoanProduct && (
          <FormField
            control={form.control}
            name="noOfMonth"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>No. of Month(s)</FormLabel>
                <FormControl className="relative">
                  <FormGroup>
                    <Input
                      placeholder="12"
                      className="disabled:opacity-90"
                      value={loanPeriod}
                      disabled
                      invalid={fieldState.invalid}
                    />
                  </FormGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {watchLoanProduct && (
          <React.Fragment>
            <FormField
              control={form.control}
              name="interest"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Loan interest</FormLabel>
                  <FormControl className="relative">
                    <FormGroup>
                      <Input
                        placeholder="%"
                        type="number"
                        className="disabled:text-[#000]"
                        disabled
                        invalid={fieldState.invalid}
                        {...field}
                      />
                      <p className="absolute right-4 pl-3">%</p>
                    </FormGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="grid grid-cols-3 text-xs font-light border rounded-md p-3">
              <div>
                <p>Loan Interest</p>
                <p className="font-semibold">₦{formatCurrency(loanInterest)}</p>
              </div>
              <div>
                <p>Total Loan</p>
                <p className="font-semibold">₦{formatCurrency(totalLoan)}</p>
              </div>
              <div>
                <p>M/ Repayment</p>
                <p className="font-semibold">
                  ₦
                  {monthlyRepayment
                    ? formatCurrency(Number(monthlyRepayment).toFixed(2))
                    : ''}
                </p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="totalLoan"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Total loan amount</FormLabel>
                  <FormControl className="relative">
                    <FormGroup>
                      <p className="absolute text-[#000] pl-3 disabled:opacity-90">
                        ₦
                      </p>
                      <Input
                        placeholder="200,000"
                        className="pl-6 disabled:opacity-90 disabled:text-[#000]"
                        disabled
                        value={totalLoan || ''}
                        invalid={fieldState.invalid}
                        // {...field}
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

        {watchRepayment === 'Standard' && (
          <div className="grid grid-cols-2 text-xs font-light border rounded-md p-3">
            <div className="">
              <p>Principal Balance </p>
              <p className="font-semibold">
                {`${'₦' + formatCurrency(Number(totalLoan) - Number(loanInterest))}`}
              </p>
            </div>
            <div className="">
              <p>M/Repayment </p>
              <p className="font-semibold">
                {`${
                  monthlyRepayment
                    ? '₦' + formatCurrency(Number(monthlyRepayment).toFixed(2))
                    : ''
                }`}
              </p>
            </div>
          </div>
        )}

        <ShowError
          errorMessage={customErrorField}
          setErrorMessage={setCustomErrorField}
        />

        {watchRepayment === 'Self-determined' && (
          <React.Fragment>
            <div className="rounded-md border px-3 py-2 border-primary">
              <p className="text-xs font-light text-primary">
                Loan amount left:{' '}
                {(Number(totalLoan) - Number(totalAmount)).toFixed(2)}
              </p>
            </div>
            <div className="space-y-2 relative">
              <div className="grid grid-cols-3 gap-4">
                <FormLabel>Enter amount</FormLabel>
                <FormLabel>Select month</FormLabel>
              </div>

              {fields.map((each, index) => (
                <div className="grid grid-cols-5 items-center gap-4 w-full">
                  <FormField
                    control={form.control}
                    name={`repayment_plan.${index}.amount`}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormControl>
                          <Input
                            placeholder="Enter amount"
                            className="h-10 w-full"
                            max={(
                              Number(totalLoan) - Number(totalAmount)
                            ).toFixed(2)}
                            onChange={({ target }) =>
                              handleRepaymentChange(target.value, field, index)
                            }
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.repayment_plan?.[index]?.root
                            ?.message || ''}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  {/* <div className="flex items-center space-x-2 w-full relative"> */}
                  <FormField
                    control={form.control}
                    name={`repayment_plan.${index}.month`}
                    render={({ field }) => (
                      <FormItem className="w-full col-span-2">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder="Select loan product"
                                  className="w-full"
                                />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent className="w-full">
                              {periodLength.map((each) => (
                                <SelectItem
                                  value={each.month.toString()}
                                  key={each.month}
                                  className="w-full"
                                  disabled={
                                    !!watchRePaymentPlan?.find(
                                      (paym) => paym.month === each.month
                                    )
                                  }
                                >
                                  {each.month + ' months'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage className="text-white">
                          {form.formState.errors.repayment_plan?.[index]?.root
                            ?.message || ''}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <div className="col-span-0.5 flex items-center space-x-4">
                    {fields.length > 1 && (
                      <div role="button" className="w-[10%]">
                        {isDeleting && each.monthId === selectedItemToDelete ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2
                            className="text-destructive"
                            size={16}
                            strokeWidth={1}
                            onClick={() =>
                              hanldeRemoveCustom(index, each.monthId || '')
                            }
                          />
                        )}
                      </div>
                    )}

                    {fields[fields.length - 1].id === each.id && (
                      <div>
                        {Number(customPayment?.total) !== Number(totalLoan) && (
                          <div
                            className="flex space-x-2 w-fit items-center justify-center text-xs text-primary right-6 bottom-[56px] rounded-full bg-[#506CC0BF] p-1.5"
                            role="button"
                            onClick={handleAppend}
                          >
                            {isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
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
