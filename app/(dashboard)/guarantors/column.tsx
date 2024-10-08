'use client';
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
  Approved: ReactNode;
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
    accessorKey: 'member',
    header: 'Sender',
    key: 'member',
    cell: ({ row }: any) => {
      const { member } = row.original;
      return (
        <p className="font-bold">{`${member.firstName} ${member.lastName}`}</p>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    key: 'phone',
    cell: ({ row }: any) => {
      const { member } = row.original;
      return <p className="font-bold">{member.phone}</p>;
    },
  },
  {
    accessorKey: 'liability',
    header: 'Liability (₦)',
    key: 'liability',
    cell: ({ row }: any) => {
      const { liability } = row.original;
      return <p className="font-bold">{formatCurrency(liability)}</p>;
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
  // {
  //   accessorKey: 'action',
  //   header: '',
  //   key: 'action',
  //   cell: ({ row }: any) => <ActionCell row={row} />,
  // },
];

export const ActionCell = ({ row }: any) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { orderID } = row.original;
  return (
    <div className="flex items-center">
      <div className="hover:bg-[#E8F9FF] p-2 rounded-full" role="button">
        <Eye className="" size={18} />
      </div>

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
