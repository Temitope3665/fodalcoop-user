'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { cn, wait } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import { LoanIcon } from '@/assets/svgs';
import { Label } from '../ui/label';
import { Check, CreditCardIcon } from 'lucide-react';

export const formSchema = z.object({
  cardNumber: z.string().min(1, { message: 'Card number is required' }),
  expiryDate: z.string().min(1, { message: 'Expiry date is required' }),
  cvv: z.string().min(1, { message: 'CVV is required' }),
  narration: z.string().min(1, { message: 'Narration is required' }),
  bank: z.string().min(1, { message: 'Bank is required' }),
});

export default function SelectPaymentMethodForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      narration: '',
      bank: '',
    },
  });
  const methods = [
    {
      icon: <LoanIcon />,
      name: 'Cash payment',
    },
    {
      icon: <CreditCardIcon size={16} />,
      name: 'Transfer/Deposit',
    },
  ];
  const [selectedMethod, setSelectedMethod] = React.useState(methods[0].name);
  const [isPending, setIsPending] = React.useState(false);

  function onSubmit() {
    setIsPending(true);
    wait().then(() => {
      setIsPending(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <Label>Select payment method</Label>

        {methods.map((method) => (
          <div
            key={method.name}
            className={cn(
              'flex justify-between items-center trans bg-[#FAFAFA] border border-[#F5F5F5] p-4 rounded-lg',
              method.name === selectedMethod && 'text-primary'
            )}
            onClick={() => setSelectedMethod(method.name)}
            role="button"
          >
            <div
              className={cn(
                'flex space-x-3 items-center font-light text-xs',
                method.name !== selectedMethod && 'opacity-25'
              )}
            >
              {method.icon}
              <p>{method.name}</p>
            </div>
            <div
              className={cn(
                'bg-primary w-4 h-4 rounded-full flex items-center justify-center',
                method.name !== selectedMethod && 'opacity-25'
              )}
            >
              <Check className="text-white" size={16} />
            </div>
          </div>
        ))}

        {selectedMethod === 'Cash payment' && (
          <React.Fragment>
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Card number</FormLabel>
                  <FormControl className="relative">
                    <FormGroup>
                      <Input
                        placeholder="**** **** **** ****"
                        className=""
                        invalid={fieldState.invalid}
                        {...field}
                      />
                    </FormGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Expiry date</FormLabel>
                    <FormControl className="relative">
                      <FormGroup>
                        <Input
                          placeholder="MM/YY"
                          className=""
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
                name="cvv"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl className="relative">
                      <FormGroup>
                        <Input
                          placeholder="**** **** **** ****"
                          className=""
                          invalid={fieldState.invalid}
                          {...field}
                        />
                      </FormGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </React.Fragment>
        )}

        {selectedMethod === 'Transfer/Deposit' && (
          <FormField
            control={form.control}
            name="bank"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Select bank</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0089676288">
                      Access bank -{' '}
                      <span className="font-semibold">0089676288</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
      </form>
    </Form>
  );
}
