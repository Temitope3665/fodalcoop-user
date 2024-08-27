import { Checkbox } from '@/components/ui/checkbox';

import { Eye, Trash2 } from 'lucide-react';
import { ReactNode, useState } from 'react';

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
import { formatCurrency, formatDate2 } from '@/lib/utils';

interface RowData {
  payment_status: {
    name: 'Active' | 'Canceled' | 'Pending';
  };
}

interface StatusCellProps {
  row: {
    original: RowData;
  };
}

export const logColumns: {
  accessorKey: string;
  header: any;
  key: string;
  cell?: any;
}[] = [
  // {
  //   accessorKey: 'select',
  //   header: ({ table }: any) => {
  //     return (
  //       <div className="flex items-center space-x-2">
  //         <Checkbox
  //           id="selectAll"
  //           aria-label="Select all"
  //           className="translate-y-[2px]"
  //           checked={
  //             table.getIsAllPageRowsSelected() ||
  //             (table.getIsSomePageRowsSelected() && 'indeterminate')
  //           }
  //           onCheckedChange={(value) =>
  //             table.toggleAllPageRowsSelected(!!value)
  //           }
  //         />
  //       </div>
  //     );
  //   },
  //   key: 'select',
  //   cell: ({ row }: any) => (
  //     <div className="flex items-center space-x-2">
  //       <Checkbox
  //         id="selectAll"
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'id',
    header: 'ID',
    key: 'id',
  },
  {
    accessorKey: 'amount',
    header: 'Amount (₦)',
    key: 'amount',
    cell: ({ row }: any) => {
      const { amount } = row.original;
      return <p className="">{formatCurrency(amount)}</p>;
    },
  },
  {
    accessorKey: 'month',
    header: 'Month',
    key: 'month',
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    key: 'paymentMethod',
    cell: ({ row }: any) => {
      const { paymentMethod } = row.original;
      return <p className="capitalize">{paymentMethod}</p>;
    },
  },
  {
    accessorKey: 'narration',
    header: 'Narration',
    key: 'narration',
    cell: ({ row }: any) => {
      const { narration } = row.original;
      return <p className="capitalize multiline-truncate">{narration}</p>;
    },
  },
  {
    accessorKey: 'savings_profile',
    header: 'Savings Profile',
    key: 'savings_profile',
    cell: ({ row }: any) => {
      const { savings_profile } = row.original;
      return <p className="">{savings_profile.name}</p>;
    },
  },
  {
    accessorKey: 'payment_status',
    header: 'Status',
    key: 'payment_status',
    cell: ({ row }: any) => <StatusCell row={row} />,
  },
  {
    accessorKey: 'created_at',
    header: 'Date Created',
    key: 'created_at',
    cell: ({ row }: any) => {
      const { created_at } = row.original;
      return <p className="">{formatDate2(created_at)}</p>;
    },
  },
  // {
  //   accessorKey: 'action',
  //   header: '',
  //   key: 'action',
  //   cell: ({ row }: any) => <LoanActionCell row={row} />,
  // },
];

export const LoanActionCell = ({ row }: any) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <div className="flex items-center">
      <div className="hover:bg-[#E8F9FF] p-2 rounded-full" role="button">
        <Eye className="" size={18} strokeWidth={1} />
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <div className="hover:bg-[#E8F9FF] p-2 rounded-full" role="button">
            <Trash2 size={18} role="button" strokeWidth={1} />
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
    Active: (
      <div className="text-[#25D366] bg-[#25D3661A] w-fit rounded-lg px-4 py-1">
        Active
      </div>
    ),
    Canceled: (
      <div className="text-[#DE1D3E] bg-[#F8D2D81A] w-fit rounded-lg px-4 py-1">
        Canceled
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
