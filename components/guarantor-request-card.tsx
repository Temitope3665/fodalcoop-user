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
  DialogTrigger,
} from '@/components/ui/dialog';
import { wait } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

interface IGuarantorRequestCard {
  data: { name: string; phone: string; liability: string };
}

const GuarantorRequestCard = ({ data }: IGuarantorRequestCard) => {
  const { name, phone, liability } = data;
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
        <p className="text-default text-[13px] font-semibold">₦ {liability}</p>
      </div>

      <div className="space-y-2">
        <AcceptButton />

        <div className="grid grid-cols-2 gap-2">
          <DeclineButton />
          <NegotiateButton />
        </div>
      </div>
    </div>
  );
};

export default GuarantorRequestCard;

const AcceptButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#E4FCEB] w-full text-[#333333] font-light text-sm hover:bg-[#def8e5]">
          Accept
        </Button>
      </DialogTrigger>
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
  );
};

const DeclineButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFECEE] w-full text-[#333333] font-light text-sm hover:bg-[#f0dcde]">
          Decline
        </Button>
      </DialogTrigger>
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
  );
};

export const formSchema = z.object({
  amount: z.string().min(1, { message: 'Amount is required' }),
});

const NegotiateButton = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
    },
  });
  function onSubmit() {
    setIsPending(true);
    wait().then(() => {
      setOpen(false);
      setIsPending(false);
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFF9D8] w-full text-[#333333] font-light text-sm hover:bg-[#f8f1ce]">
          Negotiate
        </Button>
      </DialogTrigger>
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
              <p className="text-sm font-medium">NGN 500,000.00</p>
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
  );
};
