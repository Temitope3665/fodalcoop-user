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
  ONBOARDING_STEP_TWO_URL,
} from '@/config/paths';
import { wait } from '@/lib/utils';
import { PhoneInput } from '../ui/phone-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

interface IDefaultUser {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  residential: string | undefined;
  offAddress: string | undefined;
  dob: Date | undefined;
  doe: Date | undefined;
  nokName: string | undefined;
  nokRel: string | undefined;
  nokTel: string | undefined;
  nokAddress: string | undefined;
}

export const formSchema = z.object({
  nokName: z.string().min(1, { message: 'Next of kin is required' }),
  nokRel: z
    .string()
    .min(1, { message: 'Relationship with next of kin is required' }),
  nokTel: z
    .any()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
  nokAddress: z.string().min(1, { message: 'Next of kin address is required' }),
});

export default function StepThreeForm() {
  const router = useRouter();
  const getCurrentUser =
    (typeof window !== 'undefined' && localStorage.getItem('new_user')) || '{}';
  const defaultUser: IDefaultUser = JSON.parse(getCurrentUser);
  const [isBack, setIsBack] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nokName: defaultUser.nokName || '',
      nokRel: defaultUser.nokRel || '',
      nokTel: defaultUser.nokTel || '',
      nokAddress: defaultUser.nokAddress || '',
    },
  });
  const [isPending, setIsPending] = React.useState(false);

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsPending(true);
    wait().then(() => {
      localStorage.setItem(
        'new_user',
        JSON.stringify({ ...defaultUser, ...data })
      );
      router.push(ONBOARDING_STEP_FOUR_URL);
      setIsPending(false);
    });
  }

  function handleBack() {
    setIsBack(true);
    wait().then(() => {
      localStorage.setItem(
        'new_user',
        JSON.stringify({ ...defaultUser, ...form.getValues() })
      );
      router.push(ONBOARDING_STEP_TWO_URL);
      setIsBack(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <FormField
          control={form.control}
          name="nokName"
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
          name="nokRel"
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
          name="nokTel"
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
          name="nokAddress"
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
            Save & Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
