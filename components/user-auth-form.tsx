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

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { DASHBOARD_PATH } from '@/config/paths';
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link className="ml-auto inline-block text-sm" href="#">
                  Forgot password?
                </Link>
              </div>
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
          className="w-full"
        >
          Login
        </Button>
      </form>
    </Form>

    // <div className="grid gap-4">
    //   <div className="grid gap-2">
    //     <Label htmlFor="email">Email</Label>
    //     <Input id="email" placeholder="you@example.com" required type="email" />
    //   </div>
    //   <div className="grid gap-2">
    //     <div className="flex items-center">
    //       <Label htmlFor="password">Password</Label>
    //       <Link className="ml-auto inline-block text-sm" href="#">
    //         Forgot password?
    //       </Link>
    //     </div>
    //     <Input id="password" placeholder="*****" required type="password" />
    //   </div>
    //   <Button
    //     className="w-full"
    //     type="submit"
    //     onClick={() => router.push(DASHBOARD_PATH)}
    //   >
    //     Login
    //   </Button>
    // </div>
  );
}
