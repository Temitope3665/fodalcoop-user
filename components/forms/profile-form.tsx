'use client';

import * as React from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { phoneNumberPattern } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import { IUser } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAgencies } from '@/config/apis/auth';
import { AGENCY_KEY } from '@/lib/query-keys';
import { updateProfile } from '@/config/apis/profile';
import { toast } from 'sonner';
import { ErrorMessages } from '../showError';
import useStore from '@/lib/use-store';
import { storeAccess } from '@/lib/actions';

export const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  phone: z.string().regex(phoneNumberPattern, {
    message: 'Invalid phone number',
  }),
  email: z.string().min(1, { message: 'Email is required' }),
  agency: z.string().min(1, { message: 'Agency is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
});

const ProfileForm = ({ user }: { user: IUser | null }) => {
  const setUser = useStore((state) => state.setUser);
  const [errorField, setErrorField] = React.useState<any | null>(null);

  const { data, isLoading, isError, error }: any = useQuery({
    queryFn: getAgencies,
    queryKey: [AGENCY_KEY],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.member.firstName || '',
      lastName: user?.member.lastName || '',
      phone: user?.member.phone || '',
      email: user?.member.email || '',
      agency: user?.member.agency_id.toString() || '',
      address: user?.member.residentialAddress || '',
    },
  });

  React.useEffect(() => {
    form.setValue('firstName', user?.member.firstName || '');
    form.setValue('lastName', user?.member.lastName || '');
    form.setValue('phone', user?.member.phone || '');
    form.setValue('email', user?.member.email || '');
    form.setValue('address', user?.member.residentialAddress || '');
    form.setValue('agency', user?.member.agency_id.toString() || '');
  }, [user, data]);

  console.log(user);

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: async (response, variables: any) => {
      const userUpdate: any = {
        ...user,
        member: { ...user?.member, ...variables, agency_id: variables.agency },
      };
      setUser(userUpdate);
      await storeAccess({
        user: userUpdate,
      });
      toast.success('Profile updated successfully');
    },
    onError: (error: any) =>
      setErrorField(
        error.response.data.errors || { Error: [error.response.data.error] }
      ),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <ErrorMessages errors={errorField} setErrors={setErrorField} />
        <div>
          <h3 className="text-[11px] font-light">Membership ID</h3>
          <p className="font-semibold ">{user?.member.id || '-'}</p>
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
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-[12px]">Phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter phone number"
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
                      disabled
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isError && (
                    <p className="p-4 text-sm font-light italic text-destructive">
                      {error.message}
                    </p>
                  )}
                  {isLoading ? (
                    <p className="p-4 text-sm font-light italic">
                      Loading agencies...
                    </p>
                  ) : (
                    <React.Fragment>
                      {data?.map((each: { id: string; name: string }) => (
                        <SelectItem
                          value={each.id.toString()}
                          key={each.id.toString()}
                        >
                          {each.name}
                        </SelectItem>
                      ))}
                    </React.Fragment>
                  )}
                </SelectContent>
              </Select>
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
          pendingText="Please wait..."
          className="w-full font-light"
          disabled={!form.formState.isDirty}
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
