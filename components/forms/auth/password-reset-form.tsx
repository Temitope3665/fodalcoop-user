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
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { LOGIN_URL, VERIFY_OTP } from '@/config/paths';
import { ErrorMessages } from '../../showError';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/config/apis/auth';
import { toast } from 'sonner';

export const formSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Enter a valid email address',
  }),
});

export default function ResetPasswordForm() {
  const router = useRouter();
  const [errorField, setErrorField] = React.useState<string>('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (response, variables) => {
      toast.success(response.message);
      router.push(`${VERIFY_OTP}/${variables.email}`);
    },
    onError: (error: any) =>
      setErrorField(
        error.response.data.errors || { Error: [error.response.data.error] }
      ),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setErrorField('');
    mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <ErrorMessages errors={errorField} setErrors={setErrorField} />
        <div className="space-y-4">
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
        </div>
      </form>
    </Form>
  );
}
