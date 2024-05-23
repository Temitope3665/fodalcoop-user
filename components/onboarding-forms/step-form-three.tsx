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
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  ONBOARDING_STEP_FOUR_URL,
  ONBOARDING_STEP_ONE_URL,
} from '@/config/paths';
import { wait } from '@/lib/utils';
import { PhoneInput } from '../ui/phone-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const formSchema = z.object({
  nextOfKinName: z.string().min(1, { message: 'Next of kin is required' }),
  relationship: z
    .string()
    .min(1, { message: 'Relationship with next is kin is required' }),
  nextOfKinTelephone: z
    .any()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
  nextOfKinAddress: z
    .string()
    .min(1, { message: 'Next of kin phone number is required' }),
});

export default function StepThreeForm() {
  const router = useRouter();
  const [isBack, setIsBack] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nextOfKinName: '',
      relationship: '',
      nextOfKinTelephone: '',
    },
  });
  const [isPending, setIsPending] = React.useState(false);

  function onSubmit() {
    setIsPending(true);
    wait().then(() => {
      router.push(ONBOARDING_STEP_FOUR_URL);
      setIsPending(false);
    });
  }

  function handleBack() {
    setIsBack(true);
    wait().then(() => {
      router.back();
      setIsBack(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="nextOfKinName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Next of kin name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Full name of next of kin"
                  type="text"
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
          name="relationship"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Relationship with next of kin</FormLabel>
              <FormControl>
                <Input
                  placeholder="How is your next of kin related to you?"
                  type="text"
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
          name="nextOfKinTelephone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Phone Number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput placeholder="+234 800 000 0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nextOfKinAddress"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Next of kin address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Full name of next of kin"
                  invalid={fieldState.invalid}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <Button
            type="button"
            size="lg"
            pending={isBack}
            pendingText="Please wait"
            className="w-full"
            onClick={handleBack}
            variant="outline"
          >
            Back
          </Button>
          <Button
            type="submit"
            size="lg"
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
