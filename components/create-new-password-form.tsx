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
import InputAdornment from './ui/input-adornment';
import { Eye, EyeOff } from 'lucide-react';

export const formSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function PasswordResetForm() {
  const [isPending, setIsPending] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prevState) => !prevState);

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
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <FormGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Enter password"
                    invalid={fieldState.invalid}
                    {...field}
                  />
                  <InputAdornment
                    adornment={showPassword ? <EyeOff /> : <Eye />}
                    onClick={togglePasswordVisibility}
                    position="end"
                  />
                </FormGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <FormGroup>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Confirm password"
                    invalid={fieldState.invalid}
                    {...field}
                  />
                  <InputAdornment
                    adornment={showConfirmPassword ? <EyeOff /> : <Eye />}
                    onClick={toggleConfirmPasswordVisibility}
                    position="end"
                  />
                </FormGroup>
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
          Save new password
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
