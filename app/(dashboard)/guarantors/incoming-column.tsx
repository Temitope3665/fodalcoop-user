'use client';
import { Check, Eye, Keyboard, X } from 'lucide-react';
import React, { ReactNode, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate2 } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { negotiateRequest, updateRequest } from '@/config/apis/guarantor';
import { INCOMING_GUARANTOR_KEY } from '@/lib/query-keys';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/components/guarantor-request-card';
import { z } from 'zod';

interface EachStatus {
  Approved: ReactNode;
  Declined: ReactNode;
  Pending: ReactNode;
}

interface RowData {
  status: keyof EachStatus;
  // Add other properties of row.original here
}

export const incomingColumns: {
  accessorKey: string;
  header: any;
  key: string;
  cell?: any;
}[] = [
  {
    accessorKey: 'loan',
    header: 'Member Name',
    key: 'loan',
    cell: ({ row }: any) => {
      const { loan } = row.original;
      return (
        <p>{`${loan?.member?.firstName || '-'} ${loan?.member?.lastName || '-'}`}</p>
      );
    },
  },
  {
    accessorKey: 'loan',
    header: 'Member Email',
    key: 'loan',
    cell: ({ row }: any) => {
      const { loan } = row.original;
      return <p>{loan?.member?.email || '-'}</p>;
    },
  },
  {
    accessorKey: 'liability',
    header: 'Liability (₦)',
    key: 'liability',
    cell: ({ row }: any) => {
      const { liability } = row.original;
      return <p>{formatCurrency(liability)}</p>;
    },
  },
  {
    accessorKey: 'liability_accepted',
    header: 'Liability Accepted',
    key: 'liability_accepted',
    cell: ({ row }: any) => {
      const { liability_accepted } = row.original;
      return <p className="">{liability_accepted || 'N/A'}</p>;
    },
    // cell: ({ row }: any) => <StatusCell row={row} />,
  },
  {
    accessorKey: 'created_at',
    header: 'Date Created',
    key: 'created_at',
    cell: ({ row }: any) => {
      const { created_at } = row.original;
      return <p className="">{formatDate2(created_at || '') || 'N/A'}</p>;
    },
  },
  {
    accessorKey: 'action',
    header: 'Action',
    key: 'action',
    cell: ({ row }: any) => <ActionCell row={row} />,
  },
];

export const ActionCell = ({ row }: any) => {
  const { id, status, liability, loan } = row.original;
  const [open, setOpen] = useState<boolean>(false);
  const [openNegotiate, setOpenNegotiate] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [openView, setOpenView] = useState<boolean>(false);

  const queryClient: any = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateRequest(type, id),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries(INCOMING_GUARANTOR_KEY);
      setOpen(false);
      toast.success(
        `Guarantorship ${type === 'approve-request' ? 'accepted' : 'declined'} successfully`
      );
    },
    onError: (error: any) =>
      toast.error(
        error?.response?.data?.message ||
          'Error occured while updating this request',
        { duration: 5000, closeButton: true }
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      guarantorId: id.toString(),
    },
  });

  const { mutate: negotiate, isPending: isNegotiating } = useMutation({
    mutationFn: negotiateRequest,
    onSuccess: async (response) => {
      toast.success('Guarantorship negotiated successfully');
      await queryClient.invalidateQueries(INCOMING_GUARANTOR_KEY);
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
    negotiate(data);
  }

  return (
    <div className="flex items-center">
      <div
        className="hover:bg-[#E8F9FF] p-2 rounded-full"
        role="button"
        onClick={() => {
          loan ? setOpenView(true) : toast.error('Loan is empty');
        }}
      >
        <Eye className="" size={18} strokeWidth={1} />
      </div>
      {status === '3' ? (
        ''
      ) : (
        <React.Fragment>
          <div
            className="hover:bg-[#E8F9FF] p-2 rounded-full"
            role="button"
            onClick={() => {
              setType('approve-request');
              setOpen(true);
            }}
          >
            <Check className="text-primary" size={18} />
          </div>
          <div
            className="hover:bg-[#E8F9FF] p-2 rounded-full"
            role="button"
            onClick={() => setOpenNegotiate(true)}
          >
            <Keyboard className="text-primary" size={18} />
          </div>
          <div
            className="hover:bg-[#E8F9FF] p-2 rounded-full"
            role="button"
            onClick={() => {
              setType('decline-request');
              setOpen(true);
            }}
          >
            <X className="text-destructive" size={18} />
          </div>
        </React.Fragment>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will{' '}
              {type === 'approve-request' ? 'accept' : 'decline'} the
              guarantor's request sent to you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={() => mutate()}
              pending={isPending}
              pendingText="Please wait..."
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={openNegotiate} onOpenChange={setOpenNegotiate}>
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
                  NGN {formatCurrency(liability)}.00
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
                      onClick={() => setOpenNegotiate(false)}
                    >
                      Back
                    </Button>
                    <Button
                      className="w-full"
                      pending={isNegotiating}
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

      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="space-y-2">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-6">
              <p>ID:</p>
              <p>{id}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Member Name:</p>
              <p>{`${loan?.member?.firstName} ${loan?.member?.lastName}`}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Member Email:</p>
              <p>{loan?.member?.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Total Loan:</p>
              <p>{formatCurrency(loan?.totalLoan)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Total Balance:</p>
              <p>{formatCurrency(loan?.total_bal)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Total Paid:</p>
              <p>{formatCurrency(loan?.total_paid)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Monthly Repayment:</p>
              <p>{formatCurrency(loan?.monthly_repay) || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Principal:</p>
              <p>{formatCurrency(loan?.principal)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Principal Balance:</p>
              <p>{formatCurrency(loan?.principal_bal)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Principal Paid:</p>
              <p>{formatCurrency(loan?.principal_paid)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Interest:</p>
              <p>{formatCurrency(loan?.loan_product?.interest)}%</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Interest Balance:</p>
              <p>{formatCurrency(loan?.interest_bal)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Interest Paid:</p>
              <p>{formatCurrency(loan?.interest_paid)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Duration:</p>
              <p>{loan?.loan_product?.duration}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Start date:</p>
              <p>{loan?.start_date || formatDate2(loan?.created_at)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>End date:</p>
              <p>{loan?.end_date || 'N/A'}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const StatusCell = ({ row }: any) => {
  const { status } = row.original as RowData;

  const eachStatus: EachStatus = {
    Approved: (
      <div className="text-[#25D366] bg-[#25D3661A] w-fit rounded-lg px-4 py-1">
        Approved
      </div>
    ),
    Declined: (
      <div className="text-[#DE1D3E] bg-[#F8D2D81A] w-fit rounded-lg px-4 py-1">
        Declined
      </div>
    ),
    Pending: (
      <div className="text-[#F79E1B] bg-[#F79E1B1A] w-fit rounded-lg px-4 py-1">
        Pending
      </div>
    ),
  };
  return <div>{eachStatus[status]}</div>;
};
