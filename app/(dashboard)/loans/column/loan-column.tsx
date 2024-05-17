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

interface EachStatus {
  Active: ReactNode;
  Canceled: ReactNode;
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
  {
    accessorKey: 'select',
    header: ({ table }: any) => {
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="selectAll"
            aria-label="Select all"
            className="translate-y-[2px]"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        </div>
      );
    },
    key: 'select',
    cell: ({ row }: any) => (
      <div className="flex items-center space-x-2">
        <Checkbox
          id="selectAll"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
  },
  {
    accessorKey: 'loanID',
    header: 'Loan ID',
    key: 'loanID',
    cell: ({ row }: any) => {
      const { loanID } = row.original;
      return <p className="font-bold">{loanID}</p>;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount (₦)',
    key: 'amount',
    cell: ({ row }: any) => {
      const { amount } = row.original;
      return <p className="font-bold">{amount}</p>;
    },
  },
  {
    accessorKey: 'month',
    header: 'Month',
    key: 'month',
  },
  {
    accessorKey: 'source',
    header: 'Source',
    key: 'source',
  },
  {
    accessorKey: 'oldBalance',
    header: 'Old Balance (₦)',
    key: 'oldBalance',
  },
  {
    accessorKey: 'newBalance',
    header: 'New Balance (₦)',
    key: 'newBalance',
  },
  {
    accessorKey: 'newBalance',
    header: 'New Balance (₦)',
    key: 'newBalance',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    key: 'status',
    cell: ({ row }: any) => <StatusCell row={row} />,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    key: 'date',
  },
  {
    accessorKey: 'action',
    header: '',
    key: 'action',
    cell: ({ row }: any) => <LoanActionCell row={row} />,
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
  const { status } = row.original as RowData;

  const eachStatus: EachStatus = {
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
