'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
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
import { Button } from '@/components/ui/button';

import { LOGIN_URL, RESET_PASSWORD_URL } from '@/config/paths';
import { wait } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { ErrorMessages } from '@/components/showError';
import InputAdornment from '@/components/ui/input-adornment';
import { setNewPassword } from '@/config/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { SuccessIcon } from '@/assets/svgs';

export const formSchema = z
  .object({
    id: z.string(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function SetNewPasswordForm() {
  const [open, setOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const [isPending2, setIsPending2] = React.useState(false);
  const params: { slug: string } = useParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [errorField, setErrorField] = React.useState<any | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      id: params.slug,
    },
  });

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prevState) => !prevState);

  const { mutate, isPending: isResetting } = useMutation({
    mutationFn: setNewPassword,
    onSuccess: () => setOpen(true),
    onError: (error: any) =>
      setErrorField(
        error.response.data.errors || { Error: [error.response.data.error] }
      ),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setErrorField('');
    mutate(data);
  }

  function handleRoute(url: string, setPending: (arg: boolean) => void) {
    setPending(true);
    wait().then(() => {
      router.push(url);
      setPending(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <ErrorMessages errors={errorField} setErrors={setErrorField} />
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
                    adornment={
                      showPassword ? (
                        <EyeOff strokeWidth={1} size={20} />
                      ) : (
                        <Eye strokeWidth={1} size={20} />
                      )
                    }
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
                    adornment={
                      showConfirmPassword ? (
                        <EyeOff strokeWidth={1} size={20} />
                      ) : (
                        <Eye strokeWidth={1} size={20} />
                      )
                    }
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
          pending={isResetting}
          pendingText="Reseting..."
          className="w-full"
        >
          Set new password
        </Button>
        <div className="w-full space-y-2">
          <p className="text-sm font-light text-center">Code expired?</p>
          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={() => handleRoute(RESET_PASSWORD_URL, setIsPending)}
            pending={isPending}
            pendingText="Please wait..."
          >
            Request for a new code
          </Button>
        </div>
      </form>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="sm:w-[380px]">
          <AlertDialogHeader>
            <AlertDialogDescription className="flex justify-center items-center w-full">
              <div className="text-center space-y-4">
                <SuccessIcon className="mx-auto" />
                <div className="space-y-1">
                  <h1 className="font-bold text-[#222222]">
                    New Password Set Successfully!
                  </h1>
                  <p className="text-[12px] font-light">
                    Your password has been updated. You can now use your new
                    password to log in to your account securely.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  pending={isPending2}
                  pendingText="Please wait..."
                  onClick={() => handleRoute(LOGIN_URL, setIsPending2)}
                >
                  Go to Login
                </Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
}
