'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';

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

import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { CREATE_NEW_PASSWORD_URL, LOGIN_URL } from '@/config/paths';
import ShowError, { ErrorMessages } from '../../showError';
import { useMutation } from '@tanstack/react-query';
import { resetPassword, verifyOTP } from '@/config/apis/auth';
import { toast } from 'sonner';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Loader2 } from 'lucide-react';

export const formSchema = z.object({
  email: z.string(),
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export default function VerifyOTPForm() {
  const params: { slug: string } = useParams();
  const router = useRouter();
  const [errorField, setErrorField] = React.useState<any | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
      email: decodeURIComponent(params.slug) || '',
    },
  });

  console.log(params);

  const { mutate, isPending } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: async (response) => {
      toast.success('OTP verified successfully');
      router.push(`${CREATE_NEW_PASSWORD_URL}/${response}`);
    },
    onError: (error: any) =>
      setErrorField(
        error.response.data.errors || { Error: [error.response.data.error] }
      ),
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: () => resetPassword({ email: decodeURIComponent(params.slug) }),
    onSuccess: async (response) => {
      setErrorField(null);
      toast.success(response.message);
    },
    onError: (error: any) =>
      setErrorField(
        error.response.data.errors || { Error: [error.response.data.error] }
      ),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setErrorField(null);
    mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <ErrorMessages errors={errorField} setErrors={setErrorField} />
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>One-Time Password</FormLabel> */}
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
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
            Verify OTP
          </Button>

          <div className="flex space-x-2 items-center">
            <p
              className="inline-block text-sm text-primary"
              role="button"
              onClick={() => resendOtp()}
            >
              Resend OTP ?
            </p>
            {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          </div>
        </div>
      </form>
    </Form>
  );
}
