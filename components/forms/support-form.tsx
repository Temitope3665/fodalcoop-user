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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { wait } from '@/lib/utils';
import { loanType } from '@/config/loan-config';
import { Textarea } from '../ui/textarea';
import { UploadFileIcon } from '@/assets/svgs';
import { useMutation } from '@tanstack/react-query';
import { composeMessage } from '@/config/apis/dashboard';
import { toast } from 'sonner';
import { ErrorMessages } from '../showError';

export const formSchema = z.object({
  // category: z.string().min(1, { message: 'Category is required' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
  file: z.any(),
});

export default function SupportForm() {
  const [errorField, setErrorField] = React.useState<any | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // category: '',
      subject: '',
      message: '',
      file: '',
    },
  });
  const [file, setFile] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState(loanType[0]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize: number = 5 * 1024 * 1024;
    const file: any = e.target.files?.[0];
    if (file.size >= maxSize) {
      console.error('File is too large. Max size of 5MB');
    } else {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          form.setValue('file', file);
          setFile(result);
          form.clearErrors('file');
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: composeMessage,
    onSuccess: async (response) => {
      toast.success(response.message);
      form.reset();
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 w-[50%]"
      >
        <h1 className="font-semibold">New Message</h1>
        <ErrorMessages errors={errorField} setErrors={setErrorField} />
        {/* <FormField
          control={form.control}
          name="category"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="font-light">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loanType.map((loan) => (
                    <SelectItem
                      value={loan.type}
                      onClick={() => setSelectedItem(loan)}
                    >
                      {loan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="subject"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="font-light">Subject</FormLabel>
              <FormControl className="relative">
                <FormGroup>
                  <Input
                    placeholder="Hello everybody"
                    className="placeholder:text-[14px]"
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
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="font-light">Write your message</FormLabel>
              <FormControl className="relative">
                <FormGroup>
                  <Textarea
                    placeholder="Something just happened right now!"
                    className=""
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
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-light">
                Attach file (Optional)
              </FormLabel>
              <FormControl>
                <FormGroup>
                  <div className="border-[#7C91D0] p-4 rounded-md bg-[#F4F7FF] border-dashed border w-full text-sm">
                    <div className="flex items-center space-x-3">
                      {field.value ? (
                        <div className="">
                          <img
                            src={file}
                            alt="image"
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        </div>
                      ) : (
                        <UploadFileIcon />
                      )}
                      <p className="font-light text-xs">
                        Drag files here to upload or{' '}
                        <span className="text-primary font-semibold">
                          click to browse
                        </span>
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

        <Button
          type="submit"
          pending={isPending}
          pendingText="Please wait..."
          className="w-full font-light"
        >
          Send message
        </Button>
      </form>
    </Form>
  );
}

// Repayment type before amount
// Interest
