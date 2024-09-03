import { Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const repaymentColumns: {
  accessorKey: string;
  header: any;
  key: string;
  cell?: any;
}[] = [
  {
    accessorKey: 'loan_id',
    header: 'Loan ID',
    key: 'loan_id',
    cell: ({ row }: any) => {
      const { loan_id } = row.original;
      return <p className="font-bold">{loan_id}</p>;
    },
  },
  {
    accessorKey: 'old_balance',
    header: 'Old Balance (₦)',
    key: 'old_balance',
    cell: ({ row }: any) => {
      const { old_balance } = row.original;
      return <p>{old_balance}</p>;
    },
  },
  {
    accessorKey: 'new_balance',
    header: 'New Balance (₦)',
    key: 'new_balance',
    cell: ({ row }: any) => {
      const { new_balance } = row.original;
      return <p>{new_balance}</p>;
    },
  },
  {
    accessorKey: 'payment_source',
    header: 'Payment Source',
    key: 'payment_source',
    cell: ({ row }: any) => {
      const { payment_source } = row.original;
      return <p>{payment_source.name}</p>;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount (₦)',
    key: 'amount',
    cell: ({ row }: any) => {
      const { amount } = row.original;
      return <p>{amount}</p>;
    },
  },
  {
    accessorKey: 'month',
    header: 'Month',
    key: 'month',
    cell: ({ row }: any) => {
      const { month } = row.original;
      return <p>{month.name}</p>;
    },
  },
  {
    accessorKey: 'payment_status',
    header: 'Status',
    key: 'payment_status',
    cell: ({ row }: any) => <StatusCell row={row} />,
  },
  {
    accessorKey: 'payment_date',
    header: 'Payment Date',
    key: 'payment_date',
  },
];

export const LoanActionCell = ({ row }: any) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { orderID } = row.original;
  return (
    <div className="flex items-center">
      {/* <Link href={encodeURI(ADMIN_ORDER_DETAILS_URL, orderID)}> */}
      <div className="hover:bg-[#E8F9FF] p-2 rounded-full" role="button">
        <Eye className="" size={18} />
      </div>
      {/* </Link> */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <div className="hover:bg-[#E8F9FF] p-2 rounded-full" role="button">
            <Trash2 size={18} role="button" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to continue with this action?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="w-full flex gap-2">
              <Button
                onClick={() => setShowDialog(false)}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                // loadingText="Deleting..."
              >
                Continue
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const StatusCell = ({ row }: any) => {
  const { payment_status } = row.original;
  const status = payment_status.name;

  const eachStatus: Record<typeof status, JSX.Element> = {
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
