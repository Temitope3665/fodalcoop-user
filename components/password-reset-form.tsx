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
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { CREATE_NEW_PASSWORD_URL, LOGIN_URL } from '@/config/paths';
import { wait } from '@/lib/utils';

export const formSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Enter a valid email address',
  }),
});

export default function CreateNewPasswordForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const [isPending, setIsPending] = React.useState(false);

  function onSubmit() {
    setIsPending(true);
    wait().then(() => {
      router.push(CREATE_NEW_PASSWORD_URL);
      setIsPending(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  invalid={fieldState.invalid}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          pending={isPending}
          pendingText="Please wait"
          className="w-full"
        >
          Send OTP
        </Button>
        <Link
          className="inline-block text-sm -mt-4 text-primary"
          href={LOGIN_URL}
        >
          Log in instead
        </Link>
      </form>
    </Form>
  );
}
