'use client';

import * as React from 'react';

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

import { Eye, EyeOff } from 'lucide-react';
import InputAdornment from '@/components/ui/input-adornment';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '@/config/apis/profile';
import { ErrorMessages } from '../showError';

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'Current password is required' }),
    password: z.string().min(1, { message: 'New password is required' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // This will attach the error message to the confirmPassword field
  });

export default function ChangePasswordForm() {
  const [errorField, setErrorField] = React.useState<any | null>(null);
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);
  const togglePasswordVisibility1 = () =>
    setShowPassword1((prevState) => !prevState);
  const togglePasswordVisibility2 = () =>
    setShowPassword2((prevState) => !prevState);

  const { mutate, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success('Password updated successfully');
    },
    onError: (error: any) =>
      setErrorField(
        error.response.data.errors || { Error: [error.response.data.error] }
      ),
  });

  function onSubmit(data: z.infer<typeof passwordSchema>) {
    setErrorField(null);
    mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <ErrorMessages errors={errorField} setErrors={setErrorField} />
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
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
                    adornment={
                      showPassword ? (
                        <EyeOff size={20} strokeWidth={1} />
                      ) : (
                        <Eye size={20} strokeWidth={1} />
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
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <FormGroup>
                  <Input
                    type={showPassword1 ? 'text' : 'password'}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="******"
                    invalid={fieldState.invalid}
                    {...field}
                  />
                  <InputAdornment
                    adornment={
                      showPassword1 ? (
                        <EyeOff size={20} strokeWidth={1} />
                      ) : (
                        <Eye size={20} strokeWidth={1} />
                      )
                    }
                    onClick={togglePasswordVisibility1}
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
              <FormLabel>Confirm New password</FormLabel>
              <FormControl>
                <FormGroup>
                  <Input
                    type={showPassword2 ? 'text' : 'password'}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="******"
                    invalid={fieldState.invalid}
                    {...field}
                  />
                  <InputAdornment
                    adornment={
                      showPassword2 ? (
                        <EyeOff size={20} strokeWidth={1} />
                      ) : (
                        <Eye size={20} strokeWidth={1} />
                      )
                    }
                    onClick={togglePasswordVisibility2}
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
          pendingText="Please wait..."
          className="w-full"
          disabled={!form.formState.isDirty}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
