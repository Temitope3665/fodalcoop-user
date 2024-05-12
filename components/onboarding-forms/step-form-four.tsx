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
  FormGroup,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { ONBOARDING_REVIEW_URL, ONBOARDING_STEP_ONE_URL } from '@/config/paths';
import { wait } from '@/lib/utils';
import { DefaultImage } from '@/assets/svgs';
import { Label } from '../ui/label';

export const formSchema = z.object({
  passport: z.string().refine((value) => {
    // Check if the value is a valid base64 string
    if (!/^data:image\/(png|jpg|jpeg);base64,/.test(value)) {
      throw new z.ZodError([
        {
          code: 'custom',
          path: ['passport'], // Pass the index here
          message: 'Passport is required',
        },
      ]);
    }
    return true;
  }),
});

export default function StepFourForm() {
  const router = useRouter();
  const [isBack, setIsBack] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passport: '',
    },
  });
  const [isPending, setIsPending] = React.useState(false);

  function onSubmit() {
    setIsPending(true);
    wait().then(() => {
      router.push(ONBOARDING_REVIEW_URL);
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize: number = 3 * 1024 * 1024;
    const file: any = e.target.files?.[0];
    if (file.size >= maxSize) {
      console.error('File is too large. Max size of 3mb');
    } else {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          form.setValue('passport', result);
          form.setError('passport', { message: '' });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="passport"
          render={({ field, fieldState }) => (
            <FormItem>
              <Label>Upload passport</Label>
              <FormControl>
                <FormGroup>
                  <div className="border-dashed rounded-sm p-5 border w-full border-[rgba(47, 74, 137, 0.25)] flex space-x-4 items-center">
                    <div className="rounded-full w-[40px] h-[40px] flex justify-center items-center bg-[#2F4A891A]">
                      {field.value ? (
                        <img
                          src={field.value}
                          alt="logo"
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <DefaultImage />
                      )}
                    </div>
                    <div className="font-light text-sm">
                      <p>Select an image to upload or</p>
                      <p className="font-semibold text-primary">
                        click to browse
                      </p>
                    </div>
                  </div>
                  <Input
                    type="file"
                    className="absolute h-full border-b border-0 w-fit rounded-none inset-0 cursor-pointer opacity-0"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleUpload}
                  />
                </FormGroup>
              </FormControl>
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
