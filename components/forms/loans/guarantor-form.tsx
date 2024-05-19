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
import { Plus } from 'lucide-react';
import { DeleteIcon } from '@/assets/svgs';
import { wait } from '@/lib/utils';

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
  const [value, setValue] = React.useState({ memberID: '', amount: '' });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guarantors: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'guarantors',
  });

  console.log(form.getValues('guarantors'));

  const [isPending, setIsPending] = React.useState(false);

  function onSubmit(data: any) {
    setIsPending(true);
    wait().then(() => {
      setCurrentFormView(3);
      setIsPending(false);
    });
  }

  function handleBack() {
    setIsLoading(true);
    wait().then(() => {
      setCurrentFormView(1);
      setIsLoading(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <h2 className="font-bold text-sm -mb-2">Guarantor</h2>

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
                    className="pl-6"
                    type="number"
                    invalid={fieldState.invalid}
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
          onClick={() => {
            append(value);
            setValue({ memberID: '', amount: '' });
            form.setValue('memberID', '');
            form.setValue('amount', '');
          }}
          type="button"
          disabled={!value.amount || !value.memberID}
        >
          <Plus size={18} />
          <p>Add guarantor</p>
        </Button>

        <div className="w-full border rounded-sm">
          <div className="grid grid-cols-2 bg-[#F5F5F5] py-2 px-4 rounded-sm font-medium">
            <p>Member</p>
            <p>Amount</p>
          </div>

          {fields.map((field, index: number) => (
            <React.Fragment key={field.memberID}>
              <div className="grid px-4 py-2 grid-cols-2 border-b">
                <p>{field.memberID}</p>
                <div className="flex justify-between w-full">
                  <p>{field.amount}</p>
                  <DeleteIcon onClick={() => remove(index)} role="button" />
                </div>
              </div>
            </React.Fragment>
          ))}
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
            pending={isPending}
            pendingText="Please wait..."
            className="w-full"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
