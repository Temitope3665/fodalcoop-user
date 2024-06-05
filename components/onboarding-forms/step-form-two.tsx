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

export const formSchema = z.object({
  residentialAddress: z
    .string()
    .min(1, { message: 'Residential address is required' }),
  officeAddress: z.string().min(1, { message: 'Office address is required' }),
  dateOfBirth: z.date({
    required_error: 'A date of birth is required.',
  }),
  dateOfAppointment: z.date({
    required_error: 'A date of appointment is required.',
  }),
});

export default function StepTwoForm() {
  const router = useRouter();
  const [isBack, setIsBack] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      residentialAddress: '',
      officeAddress: '',
      // dateOfBirth: new Date(),
      // dateOfAppointment: new Date(),
    },
  });
  const [isPending, setIsPending] = React.useState(false);

  function onSubmit() {
    setIsPending(true);
    wait().then(() => {
      router.push(ONBOARDING_STEP_THREE_URL);
      setIsPending(false);
    });
  }

  function handleBack() {
    setIsBack(true);
    wait().then(() => {
      router.back();
      setIsBack(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <FormField
          control={form.control}
          name="residentialAddress"
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
          name="officeAddress"
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
          name="dateOfBirth"
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
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfAppointment"
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
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
