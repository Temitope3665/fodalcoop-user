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

import { ONBOARDING_STEP_ONE_URL, RESET_PASSWORD_URL } from '@/config/paths';
import { Eye, EyeOff } from 'lucide-react';
import InputAdornment from '@/components/ui/input-adornment';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/config/apis/auth';
import { toast } from 'sonner';

export const formSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Invalid email format',
  }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export default function UserAuthForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => toast.success(response.message),
    onError: (error: any) => toast.error(error.response.data.message),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data);
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
                  type="email"
                  invalid={fieldState.invalid}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
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
                      placeholder="******"
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
          <Link
            className="text-sm mt-3 text-primary flex justify-end"
            href={RESET_PASSWORD_URL}
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          size="lg"
          pending={isPending}
          pendingText="Please wait"
          className="w-full"
        >
          Login
        </Button>
      </form>
      <p className="inline-block text-sm mt-3">
        Don't have an account ?{' '}
        <Link className="text-primary" href={ONBOARDING_STEP_ONE_URL}>
          Sign up
        </Link>
      </p>
    </Form>
  );
}
