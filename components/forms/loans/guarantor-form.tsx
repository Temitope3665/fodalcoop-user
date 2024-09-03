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
import { Loader2, Plus } from 'lucide-react';
import { DeleteIcon } from '@/assets/svgs';
import { formatCurrency, wait } from '@/lib/utils';
import useStore from '@/lib/use-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addGuarantor,
  deleteLoanGuarantor,
  getLoanGuarantors,
} from '@/config/apis/loans';
import { toast } from 'sonner';
import ShowError, { ErrorMessages } from '@/components/showError';
import { LOAN_GUARANTOR_KEY } from '@/lib/query-keys';
import EmptyComponent from '@/components/empty';

export const guarantorSchema = z.object({
  memberID: z.string().min(1, { message: 'Member ID is required' }),
  amount: z.string().min(1, { message: 'Amount is required' }),
});

const formSchema = z.object({
  memberID: z.string(),
  amount: z.string(),
  guarantors: z.array(guarantorSchema).refine((data: any) => {
    for (const [index, item] of data.entries()) {
      if (item.memberID === '') {
        throw new z.ZodError([
          {
            code: 'custom',
            path: ['guarantors', index], // Pass the index here
            message: 'Guarantor is required',
          },
        ]);
      }
    }

    return true;
  }),
});

export default function GuarantorForm({
  setCurrentFormView,
}: {
  setOpen: (arg: boolean) => void;
  setCurrentFormView: (arg: number) => void;
}) {
  const setCurrentLoanCreation = useStore(
    (state) => state.setCurrentLoanCreation
  );
  const queryClient: any = useQueryClient();
  const [customErrorField, setCustomErrorField] = React.useState<string>('');
  const [selectedGuarantor, setSelectedGuarantor] = React.useState<
    number | null
  >(null);
  const { currentLoanCreation } = useStore();
  const [value, setValue] = React.useState({
    memberID: '',
    amount: '',
  });
  const [isBacking, setIsBacking] = React.useState<boolean>(false);
  const [isRouting, setIsRouting] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guarantors: [],
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: 'guarantors',
  });

  const { data, isLoading, isError, error } = useQuery({
    queryFn: getLoanGuarantors,
    queryKey: [LOAN_GUARANTOR_KEY],
  });

  console.log(data, '-> data');

  const { mutate, isPending } = useMutation({
    mutationFn: addGuarantor,
    onSuccess: async () => {
      await queryClient.invalidateQueries(LOAN_GUARANTOR_KEY);
      toast.success('Guarantor added successfully');
    },
    onError: (error: any) =>
      setCustomErrorField(error?.response?.data?.message || 'An error occured'),
  });

  const { mutate: removeGuarantor, isPending: isRemoving } = useMutation({
    mutationFn: deleteLoanGuarantor,
    onSuccess: async () => {
      await queryClient.invalidateQueries(LOAN_GUARANTOR_KEY);
      toast.success('Guarantor removed successfully');
      form.reset();
    },
    onError: (error: any) =>
      setCustomErrorField(error?.response?.data?.message || 'An error occured'),
  });

  const handleAddGuarantor = () => {
    setCustomErrorField('');
    const payload = {
      guarantorId: value.memberID,
      guarantorAmount: value.amount,
      total_loan: currentLoanCreation?.total || '',
    };
    mutate(payload);
    console.log(payload);
  };

  function handleNext() {
    const payload = { ...currentLoanCreation, guarantor: data };
    console.log(payload);

    setIsRouting(true);
    wait().then(() => {
      setCurrentLoanCreation(payload);
      setCurrentFormView(3);
      setIsRouting(false);
    });
  }

  function handleBack() {
    setIsBacking(true);
    wait().then(() => {
      setCurrentFormView(1);
      setIsBacking(false);
    });
  }

  const totalLiability = data?.loan_guarantor?.reduce((sum, item) => {
    return sum + parseFloat(item?.liability);
  }, 0);

  console.log(formatCurrency(totalLiability || 0));

  if (isError) {
    setCustomErrorField('An error occured while accessing the server');
  }

  return (
    <Form {...form}>
      <form className="grid gap-4">
        <h2 className="font-bold text-sm -mb-2">Guarantor</h2>
        <ShowError
          errorMessage={customErrorField}
          setErrorMessage={setCustomErrorField}
        />
        <FormField
          control={form.control}
          name="memberID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Member ID"
                  value={value.memberID}
                  className="disabled:opacity-100"
                  onChange={({ target }: any) =>
                    setValue((prev) => ({ ...prev, memberID: target.value }))
                  }
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.guarantors?.[fields.length - 1]?.root
                  ?.message || ''}
              </FormMessage>
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
                    placeholder="Amount"
                    invalid={fieldState.invalid}
                    className="disabled:opacity-100 pl-6"
                    value={value.amount}
                    onChange={({ target }: any) =>
                      setValue((prev) => ({ ...prev, amount: target.value }))
                    }
                  />
                </FormGroup>
              </FormControl>
              <FormMessage>
                {form.formState.errors.guarantors?.[fields.length - 1]?.root
                  ?.message || ''}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button
          className="font-light text-primary bg-[#F4F7FF] rounded-sm border-dashed border border-[#7C91D0] hover:bg-[#e8ecf8] space-x-2"
          onClick={handleAddGuarantor}
          pending={isPending}
          pendingText="Please wait ..."
          type="button"
          disabled={!value.amount || !value.memberID}
        >
          <Plus size={18} />
          <p>Add guarantor</p>
        </Button>

        <div className="w-full border rounded-sm">
          <div className="grid grid-cols-2 bg-[#F5F5F5] py-2 px-4 rounded-sm font-medium">
            <p>Member</p>
            <p>Amount (₦)</p>
          </div>

          {isLoading ? (
            <p className="text-primary font-sm font-light italic p-2">
              Loading Guarantor
            </p>
          ) : (
            <React.Fragment>
              {!data ? (
                <EmptyComponent
                  title="No Guarantor Added"
                  description="There are no guarantor added yet"
                  className="mt-4 mb-4"
                />
              ) : (
                <React.Fragment>
                  {data?.loan_guarantor?.map((field, index: number) => (
                    <React.Fragment key={field.id + field.guarantor}>
                      <div className="grid px-4 py-2 grid-cols-2 border-b">
                        <p>{`${field.member.firstName} ${field.member.lastName}`}</p>
                        <div className="flex justify-between w-full">
                          <p>{formatCurrency(field.liability)}.00</p>

                          <div className="flex space-x-2 items-center">
                            <DeleteIcon
                              onClick={() => {
                                setSelectedGuarantor(field.id);
                                removeGuarantor(field.id);
                              }}
                              role="button"
                            />
                            {isRemoving && selectedGuarantor === field.id && (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}

                  <p className="px-2 py-2 text-sm font-light">
                    Total liability added:{' '}
                    {formatCurrency(totalLiability || 0) || 0}
                    .00 of {formatCurrency(currentLoanCreation?.total || '')}
                    .00
                  </p>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleBack}
            pending={isBacking}
            pendingText="Please wait..."
          >
            Back
          </Button>
          <Button
            type="button"
            pending={isRouting}
            pendingText="Please wait..."
            className="w-full"
            onClick={handleNext}
            disabled={!data || totalLiability === 0}
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
