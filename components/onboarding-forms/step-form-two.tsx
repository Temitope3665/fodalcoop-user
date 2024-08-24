'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  ONBOARDING_STEP_ONE_URL,
  ONBOARDING_STEP_THREE_URL,
} from '@/config/paths';
import { CalendarIcon } from 'lucide-react';
import { cn, wait } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { useQuery } from '@tanstack/react-query';
import { getAgencies } from '@/config/apis/auth';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { AGENCY_KEY } from '@/lib/query-keys';

interface IDefaultUser {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  residential: string | undefined;
  offAddress: string | undefined;
  dob: Date | undefined;
  doe: Date | undefined;
  agency: string;
}

export const formSchema = z.object({
  residential: z
    .string()
    .min(1, { message: 'Residential address is required' }),
  agency: z.string().min(1, { message: 'Agency field is required' }),
  offAddress: z.string().min(1, { message: 'Office address is required' }),
  dob: z.any({
    required_error: 'Date of birth is required.',
  }),
  doe: z.any({
    required_error: 'Date of appointment is required.',
  }),
});

export default function StepTwoForm() {
  const router = useRouter();
  const [isBack, setIsBack] = React.useState(false);
  const getCurrentUser =
    (typeof window !== 'undefined' && localStorage.getItem('fodal_user')) ||
    '{}';
  const defaultUser: IDefaultUser = JSON.parse(getCurrentUser);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      residential: defaultUser.residential || '',
      offAddress: defaultUser.offAddress || '',
      dob: defaultUser.dob || undefined,
      doe: defaultUser.doe || undefined,
      agency: defaultUser.agency || undefined,
    },
  });
  const [isPending, setIsPending] = React.useState(false);

  const { data, isLoading, isError, error }: any = useQuery({
    queryFn: getAgencies,
    queryKey: [AGENCY_KEY],
  });

  console.log(data);

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsPending(true);
    wait().then(() => {
      localStorage.setItem(
        'fodal_user',
        JSON.stringify({ ...defaultUser, ...data })
      );
      router.push(ONBOARDING_STEP_THREE_URL);
      setIsPending(false);
    });
  }

  function handleBack() {
    setIsBack(true);
    wait().then(() => {
      localStorage.setItem(
        'fodal_user',
        JSON.stringify({ ...defaultUser, ...form.getValues() })
      );
      router.push(ONBOARDING_STEP_ONE_URL);
      setIsBack(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <FormField
          control={form.control}
          name="residential"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Residential address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Where do you live?"
                  type="text"
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
          name="offAddress"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Office address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Where is your office/business located?"
                  type="text"
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
          name="dob"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="single"
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={2015}
                    selected={field.value}
                    onSelect={field.onChange}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doe"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Appointment</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="single"
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={2015}
                    selected={field.value}
                    onSelect={field.onChange}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <div className="flex space-x-4">
          <Button
            type="button"
            size="lg"
            pending={isBack}
            pendingText="Please wait"
            className="w-full"
            onClick={handleBack}
            variant="outline"
          >
            Back
          </Button>
          <Button
            type="submit"
            size="lg"
            pending={isPending}
            pendingText="Please wait"
            className="w-full"
          >
            Save & Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
