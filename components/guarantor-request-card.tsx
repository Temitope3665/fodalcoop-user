'use client';
import { DeclineIcon, SuccessIcon } from '@/assets/svgs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
  Form,
  FormControl,
  FormField,
  FormGroup,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { negotiateRequest, updateRequest } from '@/config/apis/guarantor';
import {
  DASHBOARD_GUARANTOR_KEY,
  INCOMING_GUARANTOR_KEY,
} from '@/lib/query-keys';
import { toast } from 'sonner';

interface IGuarantorRequestCard {
  data: { name: string; phone: string; liability: string; id: number };
}

const GuarantorRequestCard = ({ data }: IGuarantorRequestCard) => {
  const { name, phone, liability, id } = data;

  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      <div className="flex space-x-2 items-center">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="text-[#333333] font-semibold text-xs">{name}</h3>
          <p className="text-[10px] font-light text-[#555555]">{phone}</p>
        </div>
      </div>
      <div className="">
        <h3 className="text-[#333333] text-[10px] font-light">Liability</h3>
        <p className="text-default text-[13px] font-semibold">
          ₦{formatCurrency(liability)}.00
        </p>
      </div>

      <div className="space-y-2">
        <AcceptButton id={id} />

        <div className="grid grid-cols-2 gap-2">
          <DeclineButton id={id} />
          <NegotiateButton data={data} />
        </div>
      </div>
    </div>
  );
};

export default GuarantorRequestCard;

interface IButton {
  id: number;
}

const AcceptButton = ({ id }: IButton) => {
  const [open, setOpen] = useState<boolean>(false);
  const [open1, setOpen1] = useState<boolean>(false);
  const queryClient: any = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (type: string) => updateRequest(type, id),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries(DASHBOARD_GUARANTOR_KEY);
      queryClient.invalidateQueries(INCOMING_GUARANTOR_KEY);
      setOpen(false);
      setOpen1(true);
      toast.success('Guarantorship accepted successfully');
    },
    onError: (error: any) =>
      toast.error(
        error?.response?.data?.message ||
          'Error occured while updating this request',
        { duration: 5000, closeButton: true }
      ),
  });

  return (
    <div>
      <Button
        className="bg-[#E4FCEB] w-full text-[#333333] font-light text-sm hover:bg-[#def8e5]"
        onClick={() => setOpen(true)}
        pending={isPending}
        pendingText="Please wait..."
      >
        Accept
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will accept the guarantor's
              request sent to you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={() => mutate('accept-request')}
              pending={isPending}
              pendingText="Please wait..."
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={open1} onOpenChange={setOpen1}>
        <DialogContent className="sm:w-[380px]">
          <DialogHeader>
            <DialogDescription className="flex justify-center items-center w-full">
              <div className="text-center space-y-4">
                <SuccessIcon className="mx-auto" />
                <div className="space-y-1">
                  <h1 className="font-bold text-[#222222]">
                    You accepted a request to be a guarantor.
                  </h1>
                  <p className="text-[12px] font-light">
                    You can track the loan from your guarantor incoming tab
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const DeclineButton = ({ id }: IButton) => {
  const [open, setOpen] = useState<boolean>(false);
  const [open1, setOpen1] = useState<boolean>(false);
  const queryClient: any = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (type: string) => updateRequest(type, id),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries(DASHBOARD_GUARANTOR_KEY);
      queryClient.invalidateQueries(INCOMING_GUARANTOR_KEY);
      setOpen(false);
      setOpen1(true);
      toast.success('Guarantorship declined successfully');
    },
    onError: (error: any) =>
      toast.error(
        error?.response?.data?.message ||
          'Error occured while updating this request',
        { duration: 5000 }
      ),
  });
  return (
    <div>
      <Button
        className="bg-[#FFECEE] w-full text-[#333333] font-light text-sm hover:bg-[#f0dcde]"
        onClick={() => mutate('decline-request')}
        pending={isPending}
        pendingText="Please wait..."
      >
        Decline
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will decline the guarantor's
              request sent to you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={() => mutate('decline-request')}
              pending={isPending}
              pendingText="Please wait..."
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={open1} onOpenChange={setOpen1}>
        <DialogContent className="sm:w-[380px]">
          <DialogHeader>
            <DialogDescription className="flex justify-center items-center w-full">
              <div className="text-center space-y-4">
                <DeclineIcon className="mx-auto" />
                <div className="space-y-1">
                  <h1 className="font-bold text-[#222222]">
                    You declined a request to be a guarantor.
                  </h1>
                  <p className="text-[12px] font-light">
                    The requester will be notified that you declined their
                    request.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const formSchema = z.object({
  amount: z.string().min(1, { message: 'Amount is required' }),
  guarantorId: z.string(),
});

const NegotiateButton = ({
  data,
}: {
  data: { id: number; liability: string };
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      guarantorId: data.id.toString(),
    },
  });

  const queryClient: any = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: negotiateRequest,
    onSuccess: async (response) => {
      toast.success('Guarantorship negotiated successfully');
      await queryClient.invalidateQueries(DASHBOARD_GUARANTOR_KEY);
      queryClient.invalidateQueries(INCOMING_GUARANTOR_KEY);
      setOpen(false);
    },
    onError: (error: any) =>
      toast.error(
        error?.response?.data?.message ||
          'Error occured while updating this request',
        { duration: 5000 }
      ),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data);
  }

  return (
    <div>
      <Button
        className="bg-[#FFF9D8] w-full text-[#333333] font-light text-sm hover:bg-[#f8f1ce]"
        onClick={() => setOpen(true)}
      >
        Negotiate
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:w-[380px]">
          <DialogTitle>Negotiate guarantee</DialogTitle>
          <DialogHeader>
            <DialogDescription className="space-y-4">
              <p className="text-sm font-light -mt-2 text-[#666666]">
                Negotiate how much you want to guarantee
              </p>
              <div className="space-y-1 bg-light p-3 rounded-sm">
                <p className="font-bold text-[10px] text-default">
                  REQUESTED AMOUNT
                </p>
                <p className="text-sm font-medium">
                  NGN {formatCurrency(data.liability)}.00
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-6"
                >
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Enter amount to guarantee</FormLabel>
                        <FormControl className="relative">
                          <FormGroup>
                            <p className="absolute pl-3">₦</p>
                            <Input
                              placeholder="200,000"
                              className="pl-6"
                              type="number"
                              invalid={fieldState.invalid}
                              {...field}
                            />
                          </FormGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      type="button"
                      onClick={() => setOpen(false)}
                    >
                      Back
                    </Button>
                    <Button
                      className="w-full"
                      pending={isPending}
                      pendingText="Submitting..."
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
