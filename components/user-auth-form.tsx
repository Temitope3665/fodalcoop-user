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

import { DASHBOARD_PATH, RESET_PASSWORD_URL } from '@/config/paths';
import { Eye, EyeOff } from 'lucide-react';
import InputAdornment from '@/components/ui/input-adornment';
import { wait } from '@/lib/utils';

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
  const [isPending, setIsPending] = React.useState(false);

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  function onSubmit() {
    setIsPending(true);
    wait().then(() => {
      router.push(DASHBOARD_PATH);
      setIsPending(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
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
        <Button
          type="submit"
          size="lg"
          pending={isPending}
          pendingText="Please wait"
          className="lg:w-[40%] w-full"
        >
          Login
        </Button>
        <Link
          className="inline-block text-sm -mt-4 text-primary"
          href={RESET_PASSWORD_URL}
        >
          Forgot password?
        </Link>
      </form>
    </Form>
  );
}
