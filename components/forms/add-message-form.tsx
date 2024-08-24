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
import { Textarea } from '../ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { composeMessage } from '@/config/apis/dashboard';
import { toast } from 'sonner';
import { INBOX_MESSAGES_KEY, OUTBOX_MESSAGES_KEY } from '@/lib/query-keys';
import { ErrorMessages } from '../showError';
import { IMessageResponse } from '@/types';

export const formSchema = z.object({
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
  file: z.any().optional(),
  messageId: z.string().optional(),
});

const AddMessageForm = ({
  message,
  setOpen,
}: {
  message?: IMessageResponse | null;
  setOpen?: (arg: boolean) => void;
}) => {
  const queryClient: any = useQueryClient();
  const [errorField, setErrorField] = React.useState<any | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: message
        ? message.isView
          ? message.subject
          : `Re: ${message.subject}`
        : '',
      message: message?.body || '',
      file: message?.file_path || undefined,
      messageId: message?.id.toString() || '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: composeMessage,
    onSuccess: async (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(INBOX_MESSAGES_KEY);
      queryClient.invalidateQueries(OUTBOX_MESSAGES_KEY);
      setOpen && setOpen(false);
    },
    onError: (error: any) =>
      setErrorField(
        error.response.data.errors || { Error: [error.response.data.error] }
      ),
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize: number = 5 * 1024 * 1024;
    const file: any = e.target.files?.[0];
    if (file.size >= maxSize) {
      toast.error('File is too large. Max size of 5MB');
    } else {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          form.setValue('file', file);
          form.setError('file', { message: '' });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    setErrorField(null);
    mutate(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <ErrorMessages errors={errorField} setErrors={setErrorField} />
        <div className="grid grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="subject"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm">Subject</FormLabel>
                <FormControl className="relative">
                  <FormGroup>
                    <Input
                      placeholder="Enter subject"
                      className="text-sm placeholder:text-sm"
                      disabled={!!message}
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
                <FormLabel className="text-sm">Message</FormLabel>
                <FormControl className="relative">
                  <FormGroup>
                    <Textarea
                      placeholder="Enter message"
                      className="text-sm placeholder:text-sm"
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

        {!message?.isView && (
          <FormField
            control={form.control}
            name="file"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm">
                  File Upload (optional)
                </FormLabel>
                <FormControl className="relative">
                  <FormGroup>
                    <Input
                      placeholder="Upload file"
                      type="file"
                      className="text-sm placeholder:text-sm"
                      invalid={fieldState.invalid}
                      accept=".jpg, .jpeg, .png"
                      onChange={handleUpload}
                    />
                  </FormGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!message?.isView && (
          <Button
            type="submit"
            pending={isPending}
            pendingText="Please wait"
            className="w-full font-light"
          >
            {!!message ? 'Reply' : 'Add Message'}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default AddMessageForm;
