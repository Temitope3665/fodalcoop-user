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

interface EachStatus {
  Active: ReactNode;
  Declined: ReactNode;
  Pending: ReactNode;
}

interface RowData {
  status: keyof EachStatus;
  // Add other properties of row.original here
}

export const columns: {
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
    accessorKey: 'monthly_deduction',
    header: 'Monthly Deduction (₦)',
    key: 'monthly_deduction',
    cell: ({ row }: any) => {
      const { monthly_deduction } = row.original;
      return <p className="">{formatCurrency(monthly_deduction)}</p>;
    },
  },
  {
    accessorKey: 'source',
    header: 'Source',
    key: 'source',
    cell: ({ row }: any) => {
      const { savings_product } = row.original;
      return <p className="">{savings_product.name}</p>;
    },
  },
  {
    accessorKey: 'target_amount',
    header: 'Target Amount (₦)',
    key: 'target_amount',
    cell: ({ row }: any) => {
      const { target_amount } = row.original;
      return <p className="">{formatCurrency(target_amount)}</p>;
    },
  },
  {
    accessorKey: 'target_reached',
    header: 'Target Reached (₦)',
    key: 'target_reached',
    cell: ({ row }: any) => {
      const { target_reached } = row.original;
      return <p className="">{target_reached}</p>;
    },
  },
  {
    accessorKey: 'total_payout',
    header: 'Total Payout (₦)',
    key: 'total_payout',
    cell: ({ row }: any) => {
      const { total_payout } = row.original;
      return <p className="">{total_payout}</p>;
    },
  },
  // {
  //   accessorKey: 'newBalance',
  //   header: 'New Balance (₦)',
  //   key: 'newBalance',
  // },
  // {
  //   accessorKey: 'newBalance',
  //   header: 'New Balance (₦)',
  //   key: 'newBalance',
  // },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   key: 'status',
  //   cell: ({ row }: any) => <StatusCell row={row} />,
  // },
  {
    accessorKey: 'start_date',
    header: 'Start Date',
    key: 'start_date',
    cell: ({ row }: any) => {
      const { start_date } = row.original;
      return <p className="">{start_date}</p>;
    },
  },
  {
    accessorKey: 'action',
    header: 'View more',
    key: 'action',
    cell: ({ row }: any) => <SavingsActionCell row={row} />,
  },
];

export const SavingsActionCell = ({ row }: any) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const {
    target_amount,
    id,
    target_reached,
    total_payout,
    interest,
    no_of_withdrawal,
    monthly_deduction,
    savings_product,
    other_saving_status,
    start_date,
    created_at,
    end_date,
  } = row.original;
  return (
    <div className="flex items-center">
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <div className="hover:bg-[#E8F9FF] p-2 rounded-full" role="button">
            <Eye className="" size={18} strokeWidth={1} />
          </div>
        </DialogTrigger>
        <DialogContent className="space-y-2">
          <DialogHeader>
            <DialogTitle>Savings Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-6">
              <p>ID:</p>
              <p>{id}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Target Amount:</p>
              <p>₦{formatCurrency(target_amount)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Target Reached:</p>
              <p>₦{formatCurrency(target_reached)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Interest:</p>
              <p>{interest}%</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Total Payout:</p>
              <p>₦{formatCurrency(total_payout) || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>No of withdrawal:</p>
              <p>{no_of_withdrawal}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Monthly Deduction:</p>
              <p>₦{formatCurrency(monthly_deduction)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Savings Product:</p>
              <p>{savings_product.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Savings Status:</p>
              <p>{other_saving_status.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Start date:</p>
              <p>{start_date || formatDate2(created_at)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>End date:</p>
              <p>{end_date || 'N/A'}</p>
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
    Active: (
      <div className="text-[#25D366] bg-[#25D3661A] w-fit rounded-lg px-4 py-1">
        Active
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
