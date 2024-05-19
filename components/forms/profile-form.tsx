'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormGroup,
} from '@/components/ui/form';
import { wait } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import { PhoneInput } from '../ui/phone-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  phone: z
    .any()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
  email: z.string().min(1, { message: 'Email is required' }),
  agency: z.string().min(1, { message: 'Agency is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
});
const ProfileForm = () => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      agency: '',
      address: '',
    },
  });
  function onSubmit() {
    setIsPending(true);
    wait().then(() => {
      setIsPending(false);
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div>
          <h3 className="text-[11px] font-light">Membership ID</h3>
          <p className="font-semibold ">001</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl className="relative">
                  <FormGroup>
                    <Input
                      placeholder="Enter your first name"
                      className="pr-6"
                      invalid={fieldState.invalid}
                      {...field}
                    />
                  </FormGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl className="relative">
                  <FormGroup>
                    <Input
                      placeholder="Enter your last name"
                      className="pr-6"
                      invalid={fieldState.invalid}
                      {...field}
                    />
                  </FormGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl className="relative">
                  <FormGroup>
                    <PhoneInput
                      placeholder="+234 800 000 0000"
                      {...field}
                      className="w-full"
                    />
                  </FormGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl className="relative">
                  <FormGroup>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className="pr-6"
                      invalid={fieldState.invalid}
                      {...field}
                    />
                  </FormGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="agency"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Agency</FormLabel>
              <FormControl className="relative">
                <FormGroup>
                  <Input
                    placeholder="Enter your agency"
                    className="pr-6"
                    invalid={fieldState.invalid}
                    {...field}
                  />
                </FormGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Contact address</FormLabel>
              <FormControl className="relative">
                <Textarea
                  placeholder="Enter your address"
                  className="pr-6"
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
          pending={isPending}
          pendingText="Please wait"
          className="w-full font-light"
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
