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
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  ONBOARDING_REVIEW_URL,
  ONBOARDING_STEP_THREE_URL,
} from '@/config/paths';
import { wait } from '@/lib/utils';
import { DefaultImage } from '@/assets/svgs';
import { Label } from '../ui/label';

interface IDefaultUser {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  residential: string | undefined;
  offAddress: string | undefined;
  dob: Date | undefined;
  doe: Date | undefined;
  nokName: string | undefined;
  nokRel: string | undefined;
  nokTel: string | undefined;
  nokAddress: string | undefined;
  image: string | undefined;
}

export const formSchema = z.object({
  image: z.string().refine((value) => {
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
  const getCurrentUser =
    (typeof window !== 'undefined' && localStorage.getItem('new_user')) || '{}';
  const defaultUser: IDefaultUser = JSON.parse(getCurrentUser);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: defaultUser.image || '',
    },
  });
  const [isPending, setIsPending] = React.useState(false);

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsPending(true);
    wait().then(() => {
      localStorage.setItem(
        'new_user',
        JSON.stringify({ ...defaultUser, ...data })
      );
      router.push(ONBOARDING_REVIEW_URL);
      setIsPending(false);
    });
  }

  function handleBack() {
    setIsBack(true);
    wait().then(() => {
      router.push(ONBOARDING_STEP_THREE_URL);
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
          form.setValue('image', result);
          form.setError('image', { message: '' });
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
          name="image"
          render={({ field, fieldState }) => (
            <FormItem>
              <Label>Upload passport</Label>
              <FormControl>
                <FormGroup>
                  <div className="border-dashed rounded-sm p-5 border w-full border-[rgba(47, 74, 137, 0.25)] flex space-x-4 items-center">
                    <div className="rounded-full w-[80px] h-[80px] flex justify-center items-center bg-[#2F4A891A]">
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
            Save & Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
